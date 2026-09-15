const { GoogleGenerativeAI } = require('@google/generative-ai');
const { OpenAI } = require('openai');
const axios = require('axios');

// Helper to generate intelligent fallback response when API keys are rate-limited or missing
const generateSmartFallback = (question, mode) => {
  const q = question.toLowerCase();
  
  if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
    return {
      explanation: "Hello! Welcome to CALP (Cognitive Adaptive Learning Platform). What concept or topic would you like to explore today?",
      example: null,
      imageKeyword: null,
      videoKeyword: null,
      quiz: null,
      options: null,
      correctAnswer: null
    };
  }

  let explanation = `Here is an adaptive overview of **${question}**:\n\n`;
  if (mode && mode.includes("Step-by-Step")) {
    explanation += `1. **Core Concept**: ${question} is a fundamental concept in learning.\n2. **How it Works**: It breaks down into key components that interact dynamically.\n3. **Key Takeaway**: Understanding this builds a strong foundation for advanced topics.`;
  } else if (mode && mode.includes("Easy Read")) {
    explanation += `${question} is simple to understand! It helps us group ideas and solve problems easily step by step.`;
  } else if (mode && mode.includes("Focus")) {
    explanation += `${question} focuses on core principles to build clarity quickly without unnecessary distractions.`;
  } else {
    explanation += `${question} involves understanding foundational rules and practical application in real-world scenarios.`;
  }

  return {
    explanation: explanation,
    example: `For instance, when studying ${question}, think of how basic building blocks connect together.`,
    imageKeyword: question.split(' ')[0] || "education",
    videoKeyword: question.split(' ')[0] || "learning",
    quiz: `What is the primary goal when learning about ${question}?`,
    options: [
      `To build a strong foundation`,
      `To memorize without understanding`,
      `To skip core principles`,
      `None of the above`
    ],
    correctAnswer: `To build a strong foundation`
  };
};

const getAiResponse = async (question, context, mode) => {
  console.log(`[AI Request] Question: "${question}", Mode: "${mode}"`);
  
  let promptInstructions = "";
  if (mode && mode.includes("Focus")) {
    promptInstructions = "Explain briefly in 2–3 lines and ask a question. IMPORTANT: Set imageKeyword and videoKeyword to null.";
  } else if (mode && mode.includes("Easy Read")) {
    promptInstructions = "Use simple words and short sentences. Make it easy to read. IMPORTANT: Set videoKeyword to null, you may provide an imageKeyword.";
  } else if (mode && mode.includes("Step-by-Step")) {
    promptInstructions = "Explain this in a step-by-step format using clear, simple steps. IMPORTANT: Set imageKeyword and videoKeyword to null. Do NOT return image or video keywords.";
  } else if (mode && mode.includes("Structured")) {
    promptInstructions = "Provide a structured explanation with headings, bullet points, and a summary. Provide both an imageKeyword and a videoKeyword.";
  } else {
    promptInstructions = "Explain clearly and provide an example. Set imageKeyword and videoKeyword to null.";
  }

  promptInstructions += "\nCRITICAL: If the user is asking to learn a completely new topic (e.g., 'Learn Python', 'Teach me HTML'), you MUST start your explanation with a 'Learning Path' syllabus. Provide 4-5 core subtopics, using a '✓' for the first topic (which you will teach now) and '○' for the remaining topics. Then, immediately begin teaching the first topic below the path.";

  const prompt = `
  You are an adaptive AI teacher.
  INSTRUCTIONS: ${promptInstructions}
  
  CRITICAL BEHAVIOR FOR GREETINGS:
  - If the user is just saying "hello", greeting you, or making small talk, respond warmly in the "explanation" field and set "example", "imageKeyword", "videoKeyword", "quiz", "options", and "correctAnswer" to null. Do not try to teach a topic if they just say hi.
  - If the user asks a learning question or wants to learn a topic, provide the full structured response filling out all fields appropriately.

  Question: ${question}
  Context: ${context || 'None'}
  
  Return a JSON object exactly with the following format (no markdown code blocks, just raw JSON):
  {
    "explanation": "your explanation or friendly greeting here",
    "example": "an example demonstrating the concept (or null for greetings)",
    "imageKeyword": "a 1-2 word specific keyword to search for an educational illustration (or null)",
    "videoKeyword": "a short keyword phrase to search for an educational video on youtube (or null)",
    "quiz": "A simple question to check understanding (or null)",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "A"
  }
  `;

  let aiData = null;

  // 1. Try Gemini API with multi-model fallback
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'dummy_key') {
    const geminiModels = ["gemini-flash-latest", "gemini-1.5-flash", "gemini-2.0-flash", "gemini-pro"];
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    for (const modelName of geminiModels) {
      if (aiData) break;
      try {
        console.log(`[AI] Attempting Gemini API with model: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const cleanJsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        aiData = JSON.parse(cleanJsonString);
        console.log(`[AI] Gemini successfully generated response with ${modelName}.`);
      } catch (err) {
        console.warn(`[AI Warning] Gemini model ${modelName} failed (${err.message}). Trying next fallback...`);
      }
    }
  }

  // 2. Try OpenAI API if Gemini failed or key not present
  if (!aiData && process.env.OPENAI_API_KEY) {
    console.log(`[AI] Attempting OpenAI API...`);
    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: prompt }],
      });
      const responseText = completion.choices[0].message.content;
      const cleanJsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      aiData = JSON.parse(cleanJsonString);
      console.log(`[AI] OpenAI successfully generated response.`);
    } catch (err) {
      console.warn(`[AI Warning] OpenAI failed (${err.message}).`);
    }
  }

  // 3. Smart Intelligent Fallback Engine if keys are unavailable/quota-exceeded
  if (!aiData) {
    console.log(`[AI] Using Smart Fallback Response Engine.`);
    aiData = generateSmartFallback(question, mode);
  }

    // 3. Fetch Image from Unsplash (if API key exists)
    let imageUrl = null;
    if (process.env.UNSPLASH_ACCESS_KEY && aiData.imageKeyword) {
      console.log(`[API] Fetching Unsplash image for: ${aiData.imageKeyword}`);
      try {
        const unsplashRes = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query: aiData.imageKeyword, per_page: 1, orientation: 'landscape' },
          headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
        });
        if (unsplashRes.data.results && unsplashRes.data.results.length > 0) {
          imageUrl = unsplashRes.data.results[0].urls.regular;
        }
      } catch (err) {
        console.error("[Unsplash API Error]:", err.message);
      }
    }

    // 4. Fetch Video from YouTube (if API key exists)
    let videoId = null;
    if (process.env.YOUTUBE_API_KEY && aiData.videoKeyword) {
      console.log(`[API] Fetching YouTube video for: ${aiData.videoKeyword}`);
      try {
        const youtubeRes = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            part: 'snippet',
            q: `${aiData.videoKeyword} education`,
            type: 'video',
            maxResults: 1,
            key: process.env.YOUTUBE_API_KEY
          }
        });
        if (youtubeRes.data.items && youtubeRes.data.items.length > 0) {
          videoId = youtubeRes.data.items[0].id.videoId;
        }
      } catch (err) {
        console.error("[YouTube API Error]:", err.message);
      }
    }

    return {
      ...aiData,
      imageUrl: imageUrl,
      videoId: videoId,
      promptUsed: prompt
    };
};

module.exports = {
  getAiResponse,
};
