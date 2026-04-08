# Auth and Session

## Purpose

This document defines the authentication and session model for the Gastar App MVP. It establishes user access, token ownership, and session boundaries.

## Auth Model Summary

The MVP uses **Google** as the only sign-in method for identity verification, but the application **owns the authenticated session** after sign-in.

1. User authenticates with Google.
2. Frontend obtains the Google identity result.
3. Backend verifies the Google identity token.
4. Backend creates or retrieves the application user.
5. Backend issues a short-lived access token and a refresh token.

## Token Model & Cookie Strategy

- **Access Token:** Short-lived, authorizes API requests. Scoped to the authenticated Gastar App user.
- **Refresh Token:** Longer-lived, allows new access token creation. Stored securely in an `httpOnly` cookie managed by the API, inaccessible to frontend JS.

## Environment Separation

Auth configuration must be separated by environment (local, development, production).
- **See [Environments and Configuration](../operations/environments-and-config.md)** for details on allowed origins, Google OAuth clients, and separated secrets.

## Frontend and Backend Responsibilities

**Frontend:**
- Initiates Google sign-in.
- Uses access token for API requests.
- Relies on refresh flow when the access token expires.
- Clears local authenticated state and offline-cached data on logout.

**Backend:**
- Verifies Google tokens.
- Manages application users.
- Issues, rotates, and invalidates access/refresh tokens.
- Protects authenticated routes.

## Offline and Logout Boundary

Offline read-only access is allowed for previously fetched cached data even if the online session cannot be revalidated. Logging out of the application clears the application session, the refresh cookie, and offline-cached finance data, but does not force a global Google account logout.

For offline details, see [PWA Strategy](./pwa-strategy.md).
