# API Contracts & Communication

This document defines the standard for communication between the `web` frontend and the `api` backend.

## Base URL & Routing

The canonical environment/domain layout is defined in [docs/operations/environments-and-config.md](../operations/environments-and-config.md).

This document only locks the API convention that routes are exposed under a versioned base path:

- `/api/v1`

The exact host varies by environment.

## HTTP Status Codes

The API must use standard HTTP status codes:

- `200 OK`: Successful read or update.
- `201 Created`: Successful creation of a resource.
- `204 No Content`: Successful deletion or action with no response body.
- `400 Bad Request`: Validation failure (e.g., Zod error).
- `401 Unauthorized`: Missing or invalid authentication.
- `403 Forbidden`: Authenticated, but lacks permission for the resource.
- `404 Not Found`: Resource does not exist.
- `500 Internal Server Error`: Unexpected backend failure.

## Standard JSON Responses

### Success Response

Successful responses should return the requested resource or a collection of resources.

```json
{
  "data": { ... } // or an array [ ... ]
}
```

### Error Response

All errors must follow a predictable format so the frontend can handle them globally.

```json
{
  "error": {
    "code": "VALIDATION_ERROR", // e.g., VALIDATION_ERROR, NOT_FOUND, UNAUTHORIZED
    "message": "Human readable message",
    "details": [ ... ] // Optional: specific field validation errors from Zod
  }
}
```

## Validation Strategy

- Request payloads must be validated using `zod`.
- The schemas reside in `packages/shared` so both the frontend (React Hook Form) and backend (Express middleware) can use them.
- If validation fails, the API responds with `400 Bad Request` and includes the Zod issues in the `details` array of the error response.

## Authentication Transfer

- The frontend sends the short-lived JWT access token in the `Authorization: Bearer <token>` header.
- The refresh token is sent automatically by the browser via an `httpOnly` cookie.
