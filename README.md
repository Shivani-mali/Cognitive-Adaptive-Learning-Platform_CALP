# Cognitive Adaptive Learning Platform (CALP) - LearnAble AI

Welcome to the **Cognitive Adaptive Learning Platform (CALP)**, also known as **LearnAble AI**! 

CALP is a futuristic, AI-driven educational platform designed to provide a tailored, distraction-free, and adaptive learning experience. The application features a dynamic React frontend and an Express Node.js backend powered by Google's Gemini AI.

---

## 🚀 Features

- **AI-Powered Learning Modes**: Choose between *Socratic* (guided discovery) or *Direct* (straightforward answers) learning methodologies.
- **Adaptive Content Generation**: Powered by the Gemini AI API, delivering content dynamically based on your questions.
- **Distraction-Free Environment**: A sleek, high-contrast monochrome UI (with soft blue accents) designed for maximum focus.
- **Modern & Responsive UI**: Built with React, featuring fluid animations, glassmorphism, and responsive design for all devices.
- **Real-Time History & Progress**: Keep track of your past conversations and view your learning journey.

---

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, Tailwind CSS (or Custom CSS Modules), React Router
- **Backend**: Node.js, Express.js, CORS
- **AI Integration**: Google Gemini AI (`@google/genai`)
- **Deployment**: Vercel (Ready for Serverless deployment)

---

## 💻 Local Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [Git](https://git-scm.com/)
- A Google Gemini API Key. Get one from [Google AI Studio](https://aistudio.google.com/).

### 1. Clone the repository
```bash
git clone https://github.com/Shivani-mali/Cognitive-Adaptive-Learning-Platform_CALP.git
cd Cognitive-Adaptive-Learning-Platform_CALP
```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and set up your environment variables using `.env.example`.
```bash
cd backend
npm install
```
Copy `.env.example` to `.env` in the `backend` folder and add your secret API keys:
```bash
cp .env.example .env
```
In your local `.env` file (which is git-ignored):
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```
Run the backend server:
```bash
npm start
```
*The backend should now be running on http://localhost:5000*

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install dependencies.
```bash
cd frontend
npm install
```
*(Optional)* If you deploy the backend elsewhere, you can configure your `VITE_API_URL` in a `.env` file in the frontend folder.

Run the development server:
```bash
npm run dev
```
*The frontend should now be running on http://localhost:5173*

---

## 🌐 Deployment (Vercel)

This project is configured to be easily deployed on Vercel.

1. Create a new project on [Vercel](https://vercel.com).
2. Import this repository.
3. Vercel will automatically detect the settings. Ensure the **Root Directory** is configured properly if deploying parts separately, OR use the provided `vercel.json` for a unified deployment.
4. Add your environment variables (`GEMINI_API_KEY`, etc.) in your Vercel project settings under **Settings > Environment Variables**.
5. Click **Deploy**.

---

## 🔒 Why `.env` Files Are NEVER Shared or Committed

**Critical Security Policy:** `.env` files contain private, secret API keys (e.g. Gemini, OpenAI, Google Cloud, Unsplash) and database credentials. 

### Why `.env` files must remain strictly private:
1. **Prevent Key Theft & Exploitation**: Publicly committing secret keys allows unauthorized third parties to steal your API credentials, leading to API quota exhaustion, unexpected billing charges, or service suspension.
2. **Repository Protection**: `.gitignore` is configured at both root and backend levels to automatically exclude `.env` files from Git commits.
3. **Template Usage**: Always share `.env.example` templates with empty placeholder values instead of actual live API keys.
4. **Production Configuration**: In production hostings like Vercel or Netlify, environment variables are safely configured via the hosting provider's Dashboard settings instead of code files.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! 
Feel free to check the [issues page](https://github.com/Shivani-mali/Cognitive-Adaptive-Learning-Platform_CALP/issues).

---

*Designed and developed to redefine the future of education.*
