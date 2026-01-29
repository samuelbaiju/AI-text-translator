# Inker Robotics Translation Webhook

A modern, full-stack web application for translating text into any supported language, featuring JWT authentication for secure access. Built with FastAPI (Python) for the backend and React (Vite) for the frontend.

## Features
- 🌐 Translate text to any language using Google Translate API
- 🔒 Secure JWT authentication (login required)
- 🎨 Modern, responsive frontend UI (React + Vite)
- 🚀 Deployed backend (Render) and frontend (Vercel)
- 🛡️ CORS enabled for cross-origin requests

---

## Backend (FastAPI)

### Structure
- `main.py`: FastAPI app, JWT logic, endpoints
- `app/models.py`: Pydantic models
- `app/services.py`: Translation logic
- `requirements.txt`: Dependencies

### Endpoints
- `POST /login`: Obtain JWT token (requires username & password)
- `POST /translate`: Translate text (requires JWT token)

### Example: Login (Postman)
```
POST /login
Content-Type: application/x-www-form-urlencoded

username=YOUR_USERNAME&password=YOUR_PASSWORD
```

### Example: Translate (Postman)
```
POST /translate
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
	"text": "Hello world",
	"target_language": "fr"
}
```

### Local Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload
```

---

## Frontend (React + Vite)

### Structure
- `src/App.jsx`: Main React app (login, translation UI)
- `src/App.css`: Modern UI styles

### Local Development
```bash
# Install dependencies
npm install

# Run frontend
npm run dev
```

---

## Deployment
- Backend: [Render](https://render.com/)
- Frontend: [Vercel](https://vercel.com/)

---

## Environment Variables
- Backend: Set `SECRET_KEY` and other sensitive configs as environment variables on Render.
- Frontend: Set `VITE_API_URL` in `.env` to point to your backend API.

---

## Requirements
- Python 3.8+
- Node.js 16+

---

## License
MIT License

---

## Credits
- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://react.dev/)
- [googletrans](https://py-googletrans.readthedocs.io/en/latest/)
- [python-jose](https://python-jose.readthedocs.io/en/latest/)
- [passlib](https://passlib.readthedocs.io/en/stable/)