# Music Playlist API (WEB2 Final Project)

## Project Overview
This project is a **Music Playlist REST API** built with **Node.js, Express, and MongoDB**.  
It allows users to register, authenticate, create playlists, manage songs, and search music using an **external API**.

The project was developed as a **WEB2 Final Project** and deployed to **Railway**.

---

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- Railway (Deployment)
- External Music API (search artists/songs)

---

## Features
- User registration & login
- JWT-based authentication
- Protected routes
- CRUD operations for playlists
- Song search via external API
- Centralized error handling
- Environment-based configuration
- Deployed backend (no frontend)

---

## Project Structure
```
web2_final/
│── controllers/
│   ├── auth.controller.js
│   ├── users.controller.js
│   ├── playlists.controller.js
│   └── external.controller.js
│
│── models/
│   ├── User.js
│   ├── Playlist.js
│   ├── Song.js
│   ├── Artist.js
│   └── Album.js
│
│── routes/
│   ├── auth.routes.js
│   ├── users.routes.js
│   ├── playlists.routes.js
│   └── external.routes.js
│
│── middleware/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── validate.middleware.js
│
│── utils/
│   ├── jwt.js
│   └── asyncHandler.js
│
│── db.js
│── server.js
│── app.js
│── package.json
│── README.md
```

---

## Environment Variables
Create a `.env` file locally with:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

On Railway, these variables are set in **Service → Variables**.

---

## API Documentation

### Authentication (Public)
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login user |

---

### User (Private)
| Method | Endpoint | Description |
|------|---------|-------------|
| GET | /api/users/profile | Get user profile |
| PUT | /api/users/profile | Update profile |

---

### Playlists (Private)
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /api/playlists | Create playlist |
| GET | /api/playlists | Get user playlists |
| GET | /api/playlists/:id | Get playlist |
| PUT | /api/playlists/:id | Update playlist |
| DELETE | /api/playlists/:id | Delete playlist |

---

### External API
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /api/external/search | Search songs/artists using external API |

Request body example:
```json
{
  "query": "Eminem"
}
```

---

## Health Check
```
GET /api/health
```

Response:
```json
{ "ok": true }
```

---

## Deployment
The project is deployed on **Railway**.

**Base URL:**
```
https://web2final-production.up.railway.app
```

---

## Author
Murat Narynbekov
WEB2 Final Project  
Backend REST API with Node.js & MongoDB
