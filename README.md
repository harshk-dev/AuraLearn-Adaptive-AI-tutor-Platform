# AuraLearn-Adaptive-AI-tutor-Platform
🧠 AuraLearn: Adaptive AI Tutor
Empowering Neurodiverse Students through Personalized Learning

AuraLearn is an intelligent learning platform designed specifically for students with ADHD and Dyslexia. By combining Next.js with FastAPI and Google Gemini 1.5 Flash, the platform dynamically adapts its interface and response tone based on the user's real-time stress levels.

✨ Key Features
Adaptive UI: A "Stress Slider" (1-10) that simplifies the interface by hiding distracting elements and reducing visual noise when stress is high.

Bionic Reading: A specialized toggle that bolds the initial parts of words to improve focus and reading speed for ADHD/Dyslexic users.

Context-Aware AI: The backend uses Pydantic validation to send user stress states to Gemini, which then switches between a "Detailed Professor" and a "Supportive, Concise Coach" persona.

🛠️ Technical Stack
Frontend: Next.js 14, Tailwind CSS, Lucide React, Shadcn/UI.

Backend: FastAPI (Python), Uvicorn, Pydantic.

AI Engine: Google Gemini 1.5 Flash (Generative AI SDK).

🏃 Quick Start
Clone the Repo: git clone https://github.com/YOUR_USERNAME/AuraLearn.git


