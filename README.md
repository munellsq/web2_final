# Music Playlist API (WEB2 Final)

## Overview
Backend API for a Music Playlist Website.
Features:
- JWT authentication (register/login)
- User profile (GET/PUT)
- Playlists CRUD (private)
- External API integration (iTunes) via POST JSON body

## Setup
1) Install dependencies:
npm install

2) Create `.env` using `.env.example`

3) Run:
npm run dev

Health check:
GET /api/health

## API Documentation

### Auth (Public)
- POST /api/auth/register
- POST /api/auth/login

### Users (Private: Bearer Token)
- GET /api/users/profile
- PUT /api/users/profile

### Playlists (Private: Bearer Token)
- POST /api/playlists
- GET /api/playlists
- GET /api/playlists/:id
- PUT /api/playlists/:id
- DELETE /api/playlists/:id

### External (Public)
- POST /api/external/search
Body:
{
  "term": "eminem",
  "limit": 10
}
