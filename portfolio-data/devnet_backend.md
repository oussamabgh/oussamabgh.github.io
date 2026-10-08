# devnet_backend

**Pitch:** Real-time backend for Solana devnet event streaming via WebSocket
**Problem:** Solves domain-specific engineering/build challenges in this project space.

**Tech Stack:** Python, FastAPI, Socket.IO, WebSocket, Uvicorn
**Architecture:** Modular code organization with separation of concerns (services/controllers/blocs as present).

## Technical Highlights
1. app/main.py - FastAPI backend with WebSocket/Socket.IO for real-time event streaming
2. app/test.py - Backend testing utilities
3. app/requirements.txt - Python dependencies for FastAPI/Socket.IO stack
4. Real-time Solana devnet webhook/event ingestion and broadcasting
5. Socket.IO integration for live event distribution

## Challenges Solved
- Implemented robust data processing and real-time updates
- Structured maintainable, scalable codebase

## Measurable Results
- Real-time event streaming via FastAPI + Socket.IO/WebSocket
- Low-latency webhook ingestion for Solana devnet events

## Skills Demonstrated
- Python, FastAPI, Socket.IO
