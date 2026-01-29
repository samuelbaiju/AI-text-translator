from fastapi import APIRouter, HTTPException
from app.models import TranslationRequest, TranslationResponse
from app.services import translate_text

router = APIRouter()

@router.post("/translate", response_model=TranslationResponse)
def translate(request: TranslationRequest):
    try:
        return translate_text(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
