from pydantic import BaseModel, Field


class TutorRequest(BaseModel):
    """Request model for the tutor endpoint."""
    message: str = Field(..., description="The student's question or message")
    stress_level: int = Field(..., ge=1, le=10, description="Stress level from 1-10")


class TutorResponse(BaseModel):
    """Response model for the tutor endpoint."""
    response: str = Field(..., description="The tutor's response")
    stress_level: int = Field(..., description="The stress level that was used")

