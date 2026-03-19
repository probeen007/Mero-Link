# 📡 Mero Link API Reference

Complete REST API documentation for Mero Link endpoints.

---

## Authentication

All protected endpoints require a valid session cookie from NextAuth.js authentication.

### Login (OAuth)
- **Endpoint**: `/api/auth/signIn`
- **Method**: `GET/POST`
- **Provider**: Google OAuth
- **Redirect**: Redirects to auth provider, then back to `/account`

### Logout
- **Endpoint**: `/api/auth/signOut`
- **Method**: `POST`
- **Headers**: 
  ```json
  { "Content-Type": "application/json" }
  ```

---

## Pages API

### Get Live Page Data
Returns page and user data for display.

```http
GET /api/livePageData?uri=username
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `uri` | string | Yes | The username/slug of the page |

**Response:**
```json
{
  "page": {
    "uri": "john-doe",
    "displayName": "John Doe",
    "bio": "Creative designer & developer",
    "theme": "aurora",
    "buttons": [ ... ],
    "links": [ ... ]
  },
  "user": {
    "email": "john@example.com",
    "image": "https://s3.../avatar.png"
  }
}
```

**Cache**: 60s TTL on page data, 300s on user data

---

### Get Share Card
Returns optimized data for social sharing / preview cards.

```http
GET /api/profile/share-card?email=user@example.com
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `email` | string | Yes | User email address |

**Response:**
```json
{
  "fullName": "John Doe",
  "bio": "Creative designer",
  "avatar": "https://s3.../avatar.png",
  "theme": "aurora",
  "qrCodeUrl": "https://...",
  "uri": "john-doe"
}
```

**Cache**: 120s TTL

---

## Page Mutations

All mutation endpoints require authentication.

### Save Page Settings

```http
POST /api/savePageSettings
Content-Type: application/json
```

**Request Body:**
```json
{
  "uri": "john-doe",
  "displayName": "John Doe",
  "location": "New York, USA",
  "bio": "Creative designer & developer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Page settings updated"
}
```

**Cache Invalidation**: Clears `sharecard:page` and `sharecard:user` caches

---

### Save Theme

```http
POST /api/saveTheme
Content-Type: application/json
```

**Request Body:**
```json
{
  "uri": "john-doe",
  "theme": "aurora"
}
```

**Valid Themes:**
```
default, aurora, neon, light, starfield, gamer, coder, 
hacker, elegant, funky, feminine, retro, nature, corporate, 
cosmic, nepal, minecraft, adventure, anime, cartoon, galaxy, 
ocean, forest, egyptian, sakura, viking, cyberpunk, medieval, 
tropical, artdeco, rainycity, desertdune, arcticglass, 
volcanicforge, emeraldlake, sunsetcliff
```

**Response:**
```json
{
  "success": true,
  "message": "Theme updated"
}
```

**Cache Invalidation**: Clears `page:{uri}` and `sharecard:page:{email}` caches

---

### Save Page Buttons

```http
POST /api/savePageButtons
Content-Type: application/json
```

**Request Body:**
```json
{
  "uri": "john-doe",
  "buttons": [
    {
      "id": "1",
      "label": "Download Resume",
      "url": "https://example.com/resume.pdf",
      "type": "link"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Buttons updated"
}
```

---

### Save Page Links

```http
POST /api/savePageLinks
Content-Type: application/json
```

**Request Body:**
```json
{
  "uri": "john-doe",
  "links": [
    {
      "id": "1",
      "key": "instagram",
      "url": "https://instagram.com/johndoe"
    },
    {
      "id": "2",
      "key": "github",
      "url": "https://github.com/johndoe"
    }
  ]
}
```

**Supported Social Keys:**
```
instagram, twitter, linkedin, github, youtube, tiktok, 
facebook, pinterest, twitch, discord, telegram, whatsapp, 
email, website
```

**Response:**
```json
{
  "success": true,
  "message": "Links updated"
}
```

---

## Analytics API

### Record Click Event

```http
POST /api/click
Content-Type: application/json
```

**Request Body:**
```json
{
  "uri": "john-doe",
  "targetUrl": "https://instagram.com/johndoe",
  "type": "link"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Event recorded"
}
```

---

### Get Analytics Dashboard

```http
GET /api/livePageData/analytics?uri=john-doe
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `uri` | string | Yes | Page URI |

**Response:**
```json
{
  "totalClicks": 1250,
  "totalViews": 5420,
  "clickByLink": {
    "instagram": 450,
    "github": 320,
    "twitter": 280
  },
  "clickTrend": [
    { "date": "2024-03-19", "count": 50 },
    { "date": "2024-03-18", "count": 45 }
  ]
}
```

---

## File Upload API

### Upload Avatar/Background

```http
POST /api/upload
Content-Type: multipart/form-data

file: <binary file data>
type: avatar | background
```

**Request Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `file` | File | Yes | Image file (max 5MB) |
| `type` | string | Yes | `avatar` or `background` |

**Supported Formats:** JPG, PNG, WebP, GIF

**Response:**
```json
{
  "success": true,
  "url": "https://s3.../user-avatar-123.png",
  "message": "File uploaded successfully"
}
```

---

### Delete File

```http
POST /api/deleteFile
Content-Type: application/json
```

**Request Body:**
```json
{
  "url": "https://s3.../user-avatar-123.png"
}
```

**Response:**
```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

**Cache Invalidation**: Clears `sharecard:page:{email}` cache

---

## Health Check

### API Health Status

```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-03-19T10:30:00Z",
  "database": "connected",
  "uptime": 3600
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "cid": "correlation-id-12345"
}
```

### Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request (missing/invalid parameters) |
| 401 | Unauthorized (not authenticated) |
| 403 | Forbidden (no permission) |
| 404 | Not Found |
| 409 | Conflict (URI already taken) |
| 413 | Payload Too Large (file > 5MB) |
| 500 | Internal Server Error |

---

## Rate Limiting

- **File Upload**: 10 requests per hour per user
- **Analytics Events**: 100 requests per minute per IP
- **Theme Updates**: 30 requests per hour per user

---

## Pagination

Endpoints that return lists support pagination:

```http
GET /api/events?page=1&limit=20
```

**Parameters:**
- `page` (default: 1)
- `limit` (default: 20, max: 100)

---

## Caching Headers

All API responses include cache headers:

```
Cache-Control: public, max-age=60
ETag: "abc123..."
Last-Modified: Wed, 19 Mar 2024 10:30:00 GMT
```

---

## Webhook Events (Future)

Coming soon: Real-time webhooks for analytics events.

---

## Need Help?

- Open an issue: [GitHub Issues](https://github.com/yourusername/mero-link/issues)
- Check examples: [API Examples](./API-EXAMPLES.md)
- Read docs: [Getting Started](./GETTING-STARTED.md)
