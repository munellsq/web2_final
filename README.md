# Music Playlist API (WEB2 Final)

REST API for creating personal playlists and saving tracks found via an external music search (e.g., iTunes).

## Base URL

- Local: `http://localhost:5000`
- Deployed: `https://web2final-production.up.railway.app`

---

## Features

- User registration & login (JWT)
- View/update profile (protected)
- CRUD playlists (protected)
- Add/remove tracks in playlists (protected)
- External music search endpoint

---

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT Auth
- Joi validation
- Helmet, CORS, Morgan

---

## Quick Start

```bash
npm install
npm run dev
# or
npm start
```

Health check:

```bash
curl http://localhost:5000/api/health
```

---

## Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> `JWT_SECRET` is required by the auth middleware (token signing/verification).

---

## API Endpoints

All endpoints are prefixed with `/api`.

### Health

#### `GET /health`
Returns `{ ok: true }`.

---

## Auth

### `POST /auth/register`
Create a new user.

**Body**
```json
{
  "username": "testuser1",
  "email": "test1@mail.com",
  "password": "12341234"
}
```

Validation:
- `username`: 2–30 chars (required)
- `email`: valid email (required)
- `password`: 6–72 chars (required)

**Response (example)**
- `201 Created` with created user (and/or token depending on controller)
- `400 Bad Request` validation errors

---

### `POST /auth/login`
Login and receive a JWT.

**Body**
```json
{
  "email": "test1@mail.com",
  "password": "12341234"
}
```

**Response (example)**
- `200 OK` with `{ token: "..." }` (field name may be `token`)

---

## Users (Protected)

Add header:
`Authorization: Bearer <JWT>`

### `GET /users/profile`
Get current user profile.

### `PUT /users/profile`
Update profile fields.

**Body (at least 1 field required)**
```json
{
  "username": "newname",
  "email": "new@mail.com",
  "password": "newpassword123"
}
```

Validation:
- `username` 2–30
- `email` valid
- `password` 6–72

---

## Playlists (Protected)

Add header:
`Authorization: Bearer <JWT>`

### `POST /playlists`
Create a playlist.

**Body**
```json
{
  "name": "My Playlist",
  "description": "Chill tracks",
  "songs": []
}
```

Validation:
- `name`: max 80 (required)
- `description`: max 300 (optional, can be empty string)
- `songs`: array of Mongo ObjectId strings (24-hex), defaults to `[]`

---

### `GET /playlists`
Get all playlists of the current user.

---

### `GET /playlists/:id`
Get one playlist by id.

---

### `PUT /playlists/:id`
Update playlist fields.

**Body (at least 1 field required)**
```json
{
  "name": "Updated Playlist Name",
  "description": "Updated description",
  "songs": ["65b8f5b0f1a2c3d4e5f6a7b8"]
}
```

---

### `DELETE /playlists/:id`
Delete playlist by id.

---

## Playlist Tracks (Protected)

These endpoints were added to manage tracks inside a playlist.

Add header:
`Authorization: Bearer <JWT>`

### `POST /playlists/:id/tracks`
Add a track to a playlist (track comes from external search).

**Body (recommended)**
```json
{
  "source": "itunes",
  "trackId": 123456789,
  "trackName": "Song Title",
  "artistName": "Artist Name",
  "collectionName": "Album Name"
  "previewUrl": "https://..."
}
```
---

### `GET /playlists/:id/tracks`
Return tracks for a playlist.

---

### `DELETE /playlists/:id/tracks/:songId`
Remove a track from a playlist by song document id.

---

## External

### `POST /external/search`
Search music from an external source.

**Body**
```json
{
  "term": "Eminem"
}
```

---

## Error Handling

The API uses centralized `notFound` and `errorHandler` middleware.

Typical errors:
- `400` validation error (Joi)
- `401` missing/invalid JWT
- `404` not found route/resource
- `500` server error

---

## Data Models (MongoDB)

### User
- `username` (2–30)
- `email` (unique)
- `password` (hashed in controller)

### Playlist
- `user` (ref User)
- `name`
- `description`
- `songs` (array of ref Song)

### Song
- `source` (default `"itunes"`)
- `trackId` (unique per source)
- `trackName`
- `previewUrl`
- `artist` (ref Artist)
- `album` (ref Album, optional)

### Artist
- `name` (unique)

### Album
- `name` + `artist` (unique pair)

---

## Postman Demo Flow

1. `POST /api/auth/register`
2. `POST /api/auth/login` → save JWT
3. `GET /api/users/profile`
4. `POST /api/playlists` → save playlist id
5. `POST /api/external/search` → pick a track
6. `POST /api/playlists/:id/tracks` → add that track
7. `GET /api/playlists/:id/tracks`
8. `DELETE /api/playlists/:id/tracks/:songId`
9. `DELETE /api/playlists/:id`
10. 
---

## Author
Murat Narynbekov
