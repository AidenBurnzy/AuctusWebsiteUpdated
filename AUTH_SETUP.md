# Auctus Website - Authentication Setup Guide

## Overview
This project includes a complete authentication system with Node.js backend APIs, Neon PostgreSQL database, and JWT-based authentication.

## Prerequisites
- Node.js 18+
- Neon PostgreSQL account with database created
- Vercel account (for deployment)
- Git account (for deployment)

## Backend Setup

### 1. Install Dependencies
```bash
npm install
```

Required packages:
- `pg` - PostgreSQL client
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token handling
- `dotenv` - Environment variables

### 2. Database Schema Setup

#### Option A: Using Neon Console (Recommended)
1. Go to [Neon Console](https://console.neon.tech)
2. Select your project and database
3. Go to "SQL Editor"
4. Copy the contents of `schema.sql` and execute it

#### Option B: Using psql CLI
```bash
psql postgresql://user:password@pooler.neon.tech:5432/neondb?sslmode=require < schema.sql
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://user:password@pooler.neon.tech:5432/neondb?sslmode=require
JWT_SECRET=<32-character hex string>
JWT_REFRESH_SECRET=<32-character hex string>
FRONTEND_URL=https://your-domain.vercel.app
NODE_ENV=production
```

**Generate JWT Secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Run this command twice to get two different secrets.

## API Endpoints

### Authentication Endpoints

#### 1. Register - `POST /api/auth/register`
Create a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "accessToken": "jwt_token",
  "refreshToken": "jwt_token"
}
```

**Errors:**
- `400` - Validation failed (invalid email, weak password, etc.)
- `409` - Email or username already exists
- `500` - Server error

#### 2. Login - `POST /api/auth/login`
Authenticate user and receive tokens.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username"
  },
  "accessToken": "jwt_token",
  "refreshToken": "jwt_token"
}
```

**Errors:**
- `400` - Missing email or password
- `401` - Invalid credentials
- `403` - Account is not active
- `429` - Account locked (5 failed attempts, 15-minute lockout)
- `500` - Server error

#### 3. Refresh Token - `POST /api/auth/refresh`
Get a new access token using a refresh token.

**Request:**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

**Response (200):**
```json
{
  "accessToken": "new_jwt_token"
}
```

**Errors:**
- `400` - Refresh token missing
- `401` - Invalid or expired refresh token
- `403` - User account not active
- `404` - User not found

#### 4. Get Current User - `GET /api/auth/me`
Get the current authenticated user's profile.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    "createdAt": "2024-01-01T00:00:00Z",
    "isActive": true,
    "emailVerified": false
  }
}
```

**Errors:**
- `401` - Missing or invalid token
- `404` - User not found
- `500` - Server error

#### 5. Logout - `POST /api/auth/logout`
Logout the current user (client-side token removal recommended).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

**Errors:**
- `401` - Missing or invalid token
- `500` - Server error

## Security Features

### Password Hashing
- Uses bcryptjs with 10 salt rounds
- Passwords never stored in plaintext
- Automatic hashing on register and verification on login

### JWT Tokens
- **Access Token**: 15-minute expiration (for API requests)
- **Refresh Token**: 7-day expiration (for obtaining new access tokens)
- Signed with environment secret keys

### Account Lockout
- 5 failed login attempts trigger 15-minute lockout
- Failed attempts reset on successful login
- Prevents brute-force attacks

### CORS Protection
- Configured for localhost development and production domain
- Uses environment variable `FRONTEND_URL` for production

### Database Security
- Unique indexes on email and username
- UUID primary keys (not sequential integers)
- Connection pooling (20 max connections)
- SSL/TLS required for Neon connection

## Deployment to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial commit: Auth backend setup"
git push origin main
```

### 2. Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Configure project (use default settings)
5. Click "Deploy"

### 3. Add Environment Variables
In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add each variable from `.env`:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `JWT_REFRESH_SECRET`
   - `FRONTEND_URL` (your Vercel deployment URL)
   - `NODE_ENV=production`
3. Click "Save"

### 4. Redeploy
Trigger a new deployment in Vercel for environment variables to take effect.

## Frontend Integration

### 1. Create Login Page
Add to `script.js` PAGES object:
```javascript
'/login': `
  <div class="auth-container">
    <h1>Login</h1>
    <form id="loginForm">
      <input type="email" id="email" placeholder="Email" required>
      <input type="password" id="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  </div>
`
```

### 2. Create Signup Page
Add to `script.js` PAGES object:
```javascript
'/signup': `
  <div class="auth-container">
    <h1>Sign Up</h1>
    <form id="signupForm">
      <input type="email" id="email" placeholder="Email" required>
      <input type="text" id="username" placeholder="Username" required>
      <input type="password" id="password" placeholder="Password" required>
      <input type="password" id="confirmPassword" placeholder="Confirm Password" required>
      <button type="submit">Sign Up</button>
    </form>
  </div>
`
```

### 3. Add Token Management
```javascript
// Store tokens on login
localStorage.setItem('accessToken', response.accessToken);
localStorage.setItem('refreshToken', response.refreshToken);

// Get token for API requests
const token = localStorage.getItem('accessToken');
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};

// Clear tokens on logout
localStorage.removeItem('accessToken');
localStorage.removeItem('refreshToken');
```

### 4. Handle Token Refresh
```javascript
// When access token expires (401 response)
const refreshResponse = await fetch('/api/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') })
});

if (refreshResponse.ok) {
  const data = await refreshResponse.json();
  localStorage.setItem('accessToken', data.accessToken);
  // Retry original request
}
```

## Local Testing

### Run Backend Locally
```bash
npm install -g nodemon
npm run dev
```

### Test Endpoints with cURL
```bash
# Register
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "confirmPassword": "password123"
  }'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Troubleshooting

### Connection Issues
- Check `DATABASE_URL` format: `postgresql://user:password@pooler.neon.tech:5432/dbname?sslmode=require`
- Verify Neon dashboard shows active database
- Test connection: `psql <DATABASE_URL>`

### 401 Unauthorized
- Check token in Authorization header
- Verify JWT secrets match between register/login and other endpoints
- Check token expiration (access tokens valid for 15 minutes)

### 429 Too Many Failed Attempts
- Account is locked for 15 minutes
- Wait 15 minutes or reset `failed_login_attempts` in database

### Token Validation Fails
- Ensure `NODE_ENV=production` on Vercel
- Verify JWT secrets are identical in all environments
- Check token not expired or corrupted

## Database Maintenance

### View User Records
```sql
SELECT id, email, username, created_at, is_active FROM users;
```

### Reset Failed Login Attempts
```sql
UPDATE users SET failed_login_attempts = 0 WHERE email = 'user@example.com';
```

### Unlock Account
```sql
UPDATE users SET locked_until = NULL WHERE email = 'user@example.com';
```

### Delete User (use with caution)
```sql
DELETE FROM users WHERE email = 'user@example.com';
```

## Next Steps

1. Create database schema in Neon
2. Deploy to Vercel with environment variables
3. Create frontend login/signup pages
4. Integrate API endpoints with forms
5. Implement token storage and auto-login
6. Test full authentication flow
7. Add email verification (optional enhancement)
8. Add password reset functionality (optional enhancement)
