from fastapi import APIRouter, HTTPException
import google.generativeai as genai
import os
from dotenv import load_dotenv 

from models.chat import TutorRequest, TutorResponse

# Load environment variables
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY") # This grabs the key you just pasted


router = APIRouter(prefix="/ask-tutor", tags=["tutor"])

# Configure Gemini API (lazy configuration to avoid errors at import time)
_api_key = None
_configured = False

def _ensure_configured():
    """Ensure Gemini API is configured. Called lazily when needed."""
    global _api_key, _configured
    if not _configured:
        _api_key = os.getenv("GEMINI_API_KEY")
        if not _api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        genai.configure(api_key=_api_key)
        _configured = True

# System instructions for different stress levels
ADHD_FRIENDLY_INSTRUCTION = """You are an AI tutor helping a neurodiverse student who is experiencing high stress (stress level > 7).

IMPORTANT GUIDELINES:
- Be EXTREMELY BRIEF and concise
- Use emojis to make the response more engaging and easier to scan
- Use **bold** formatting for key concepts and important terms
- Break information into very short, digestible chunks
- Focus on the most essential information only
- Use bullet points or numbered lists when possible
- Keep sentences short and direct
- Avoid overwhelming the student with too much information at once

Your goal is to help the student understand the concept without adding to their stress."""

STANDARD_INSTRUCTION = """You are an AI tutor helping a neurodiverse student.

IMPORTANT GUIDELINES:
- Provide a structured, detailed explanation
- Break down complex concepts into clear, logical steps
- Use examples to illustrate key points
- Organize information in a clear hierarchy
- Be patient and thorough in your explanations
- Consider different learning styles and provide multiple ways to understand the concept

Your goal is to help the student fully understand the topic."""


@router.post("", response_model=TutorResponse)
async def ask_tutor(request: TutorRequest):
    """
    Endpoint to ask the AI tutor a question.
    
    The response style adapts based on the student's stress level:
    - Stress level > 7: Brief, ADHD-friendly response with emojis and bold formatting
    - Stress level <= 7: Structured, detailed explanation
    """
    try:
        # Ensure API is configured (lazy initialization)
        _ensure_configured()
        
        # Select system instruction based on stress level
        if request.stress_level > 7:
            system_instruction = ADHD_FRIENDLY_INSTRUCTION
        else:
            system_instruction = STANDARD_INSTRUCTION
        
        # Initialize the Gemini model
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=system_instruction
        )
        
        # Generate response
        response = model.generate_content(request.message)
        
        return TutorResponse(
            response=response.text,
            stress_level=request.stress_level
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating tutor response: {str(e)}"
        )

