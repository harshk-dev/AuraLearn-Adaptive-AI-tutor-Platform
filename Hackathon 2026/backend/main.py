import os
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from dotenv import load_dotenv


load_dotenv()

# Configure Gemini API with error handling
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in environment variables. Please create a .env file with your API key.")

genai.configure(api_key=api_key)

app = FastAPI(
    title="AI Tutor API",
    description="AI Tutor for neurodiverse students - Microsoft Imagine Cup 2026",
    version="1.0.0"
)


# Standard CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],  # Allow localhost:3000 and all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/ask-tutor")
async def ask_tutor(request: Request):
    """
    Endpoint to ask the AI tutor a question.
    Accepts JSON with 'message' (string) and 'stress_level' (integer 1-10).
    """
    try:
        # Parse request body
        data = await request.json()
        message = data.get("message")
        stress_level = data.get("stress_level", 5)

        # Validate inputs
        if not message or not isinstance(message, str) or len(message.strip()) == 0:
            raise HTTPException(
                status_code=400,
                detail="'message' field is required and must be a non-empty string"
            )
        
        try:
            stress_level = int(stress_level)
            if stress_level < 1 or stress_level > 10:
                raise HTTPException(
                    status_code=400,
                    detail="'stress_level' must be an integer between 1 and 10"
                )
        except (ValueError, TypeError):
            raise HTTPException(
                status_code=400,
                detail="'stress_level' must be an integer between 1 and 10"
            )

        # Initialize model
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        # Implementation Logic: ADHD-friendly adaptation
        instructions = "You are Aura, a calm AI tutor helping neurodiverse students."
        if stress_level > 7:
            instructions += " The student is experiencing high stress. Be EXTREMELY BRIEF - use 2-3 short bullet points, include emojis, and use **bold** formatting for key concepts. Keep it concise and easy to scan."
        else:
            instructions += " Provide a structured, detailed explanation with clear steps and examples."
        
        # Generate response
        response = model.generate_content(f"{instructions}\n\nStudent asks: {message}")
        
        return {"reply": response.text}
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating tutor response: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)