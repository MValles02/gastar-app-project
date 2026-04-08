# PWA Offline Strategy

This document defines how the Gastar App MVP handles offline capabilities, fulfilling the "Installable PWA with offline read-only mode" requirement.

## PWA Installation

- The app will use `vite-plugin-pwa` to generate the Web App Manifest and Service Worker.
- The manifest will configure the app as `display: standalone` to provide a native-like experience on mobile devices.

## Offline Read-Only Mechanism

The MVP does not support offline data creation or synchronization conflicts. It only supports reading previously fetched data when offline.

Offline read-only applies to all previously fetched app data on that device. The app does not synthesize missing data while offline; it only shows what has already been cached.

### 1. Asset Caching

The Service Worker will cache the application shell (HTML, CSS, JS, fonts, icons) using standard Workbox caching strategies (e.g., `StaleWhileRevalidate` or `CacheFirst`) so the app can load without an internet connection.

### 2. Data Caching

For app data such as accounts, transactions, categories, recurring rules, and cached summaries:

- We will rely on React Query's built-in caching mechanism combined with a persistent storage persister (like `localforage` or `IndexedDB` via `idb-keyval`).
- When the app loads online, it fetches data and React Query persists it locally.
- When the app loads offline, React Query hydrates its state from the local persistent storage.
- If the device has never loaded app data online before, offline launch should show an empty offline state explaining that data becomes available after first online use.

### 3. Network State Detection

- The frontend must actively monitor the network connection using the browser's `navigator.onLine` API and window events (`online`, `offline`).
- A global state or context will hold the `isOffline` boolean.

### 4. Preventing Offline Writes

When `isOffline` is true:

- All creation, editing, and deletion forms/buttons must be visually disabled.
- The UI must display a clear indicator (e.g., a banner or toast) explaining that the app is offline and in read-only mode.
- Attempting to submit a mutation while offline should be blocked at the UI layer before attempting a network request.
- Write actions should remain visible but disabled so the user understands those features exist but are unavailable offline.

## Session Boundary While Offline

If cached data exists but the app cannot revalidate the current session because the device is offline, the app should still open in offline read-only mode.

This offline behavior does not imply that the online session remains valid. It only allows local cached-data access until connectivity returns.

## Data Freshness Messaging

The offline UI should show that the app is offline and communicate the last sync or last online time.

## Logout And Local Data

Explicit logout should clear locally cached finance data on that device.
