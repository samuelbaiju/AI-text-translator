from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from app.routes import router as translation_router

app = FastAPI(title="Translation Webhook API", description="A webhook for translating text to a target language.")

# Allow CORS for frontend (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"] ,
    allow_headers=["*"]
)

# Logging setup
logging.basicConfig(level=logging.INFO)

@app.get("/")
def root():
    return {"message": "Translation Webhook is running."}

app.include_router(translation_router)