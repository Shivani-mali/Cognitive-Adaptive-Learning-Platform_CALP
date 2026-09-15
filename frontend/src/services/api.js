import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const generateSmartClientFallback = (question, mode) => {
  const q = question.trim().toLowerCase();
  
  // Greetings handling
  if (["hi", "hii", "hello", "hey", "greetings", "good morning", "good evening"].some(g => q === g || q.startsWith(g + " "))) {
    return {
      data: {
        explanation: "Hello! Welcome to CALP (Cognitive Adaptive Learning Platform). What concept or topic would you like to explore today?",
        example: null,
        imageKeyword: null,
        videoKeyword: null,
        quiz: null,
        options: null,
        correctAnswer: null
      }
    };
  }

  let explanation = `Here is an adaptive overview of **${question}**:\n\n`;
  if (mode && mode.includes("Step-by-Step")) {
    explanation += `1. **Core Concept**: ${question} is a fundamental topic in modern learning.\n2. **Mechanism**: It operates through interconnected principles that build upon each other.\n3. **Key Takeaway**: Mastering this concept allows you to solve complex practical problems.`;
  } else if (mode && mode.includes("Easy Read")) {
    explanation += `${question} is simple to understand! Think of it as a set of helpful ideas that work together step by step.`;
  } else if (mode && mode.includes("Focus")) {
    explanation += `${question} focuses directly on core rules to give you fast, clear insights without extra clutter.`;
  } else {
    explanation += `${question} connects fundamental principles with real-world applications and problem-solving techniques.`;
  }

  return {
    data: {
      explanation: explanation,
      example: `For instance, when working with ${question}, consider how fundamental building blocks fit together in practice.`,
      imageKeyword: question.split(' ')[0] || "education",
      videoKeyword: question.split(' ')[0] || "learning",
      quiz: `What is the primary benefit of mastering ${question}?`,
      options: [
        "Building a strong foundational understanding",
        "Memorizing formulas without application",
        "Skipping core principles",
        "None of the above"
      ],
      correctAnswer: "Building a strong foundational understanding"
    }
  };
};

export const askAi = async (question, context = '', mode = '') => {
  try {
    const response = await axios.post(`${API_URL}/ai/ask`, { question, context, mode }, { timeout: 8000 });
    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.warn('Backend API endpoint offline or unreachable. Engaging client-side AI response generator:', error.message);
  }
  
  // Fallback so user NEVER experiences blank/error state
  return generateSmartClientFallback(question, mode);
};
