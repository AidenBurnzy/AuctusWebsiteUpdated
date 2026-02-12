# AuctusWebsiteUpdated

## Environment Variables

Required for email and auth features:

- `DATABASE_URL` - Postgres connection string.
- `JWT_SECRET` - Access token secret.
- `JWT_REFRESH_SECRET` - Refresh token secret.
- `RESEND_API_KEY` - Resend API key.
- `RESEND_FROM` - Verified sender email (e.g., `Auctus Studio <no-reply@yourdomain.com>`).
- `CONTACT_TO` - Comma-separated recipients for contact form emails.
- `WEBSITE_URL` - Public website base URL (used in reset links). Optional; defaults to `FRONTEND_URL` or localhost.
- `AUCTUS_APP_URL` - AuctusApp backend URL (used for portal login proxy).
- `GOOGLE_CLIENT_ID` - Google OAuth client ID (used for Google sign-in).
- `AUCTUS_GOOGLE_AUTH_URL` - AuctusApp endpoint to exchange Google ID tokens for a portal login link.