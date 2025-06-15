## API Documentation – Workout Tracker

## Authentication

```
Authorization: Bearer <token>
```

---

## Endpoints

### User

#### Register

```http
POST /auth/register
```

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:** `201 Created`

---

#### Login

```http
POST /auth/login
```

**Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "token": "JWT_TOKEN_HERE"
}
```

---

### Workout Log

#### Create Workout Log

```http
POST /logs
```

```json
{
  "title": "Push Day",
  "date": "2025-06-13",
  "notes": "Felt strong today"
}
```

**Response:** `201 Created`

---

#### Get All Logs

```http
GET /logs
```


**Response:** `200 OK`

---

### Workout Day

#### Add Workout Day to Log

```http
POST /logs/:logId/days
```

```json
{
  "date": "2025-06-13",
  "title": "Leg Day",
  "notes": "Heavy squats"
}
```

---

### Exercises

#### Get All Exercises

```http
GET /exercises
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "Bench Press",
    "category": "Chest",
    "description": "Barbell chest press"
  }
]
```

---

#### Create New Exercise

```http
POST /exercises
```

```json
{
  "name": "Deadlift",
  "category": "Back",
  "description": "Heavy compound lift"
}
```

---

### Workout Exercises

#### Add Exercise to Workout Day

```http
POST /days/:dayId/exercises
```

```json
{
  "exerciseId": 1
}
```

**Response:** `201 Created`

---

### Sets

#### Add Set to Workout Exercise

```http
POST /workout-exercises/:exerciseInstanceId/sets
```

```json
{
  "setNumber": 1,
  "reps": 8,
  "weight": 60.0
}
```

---

#### Update Set

```http
PUT /sets/:setId
```

```json
{
  "reps": 10,
  "weight": 65.0
}
```

---

## Error Responses

- `401 Unauthorized` – Invalid or missing token
- `404 Not Found` – Resource does not exist
- `400 Bad Request` – Missing/invalid input
- `500 Internal Server Error` – Server issue

---

## Notes

- All dates use `YYYY-MM-DD` format.
- All data returned is in JSON.
- You should validate and sanitize user input on the client side too.

