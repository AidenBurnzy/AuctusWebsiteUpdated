const crypto = require('crypto');
const { Resend } = require('resend');
const { query } = require('../utils/db');
const { corsMiddleware, errorResponse, successResponse } = require('../middleware/response');

module.exports = async (req, res) => {
  if (corsMiddleware(req, res)) return;

  if (req.method !== 'POST') {
    return errorResponse(res, 405, 'Method not allowed');
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !from) {
    return errorResponse(res, 500, 'Email service is not configured');
  }

  const { email } = req.body || {};
  const normalizedEmail = (email || '').trim().toLowerCase();

  if (!normalizedEmail) {
    return errorResponse(res, 400, 'Email is required');
  }

  try {
    const result = await query('SELECT id, email FROM users WHERE email = $1', [normalizedEmail]);
    const user = result.rows[0];

    if (user) {
      const token = crypto.randomBytes(32).toString('hex');
      const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

      await query(
        'INSERT INTO password_resets (user_id, token_hash, expires_at) VALUES ($1, $2, $3)',
        [user.id, tokenHash, expiresAt]
      );

      const baseUrl = process.env.WEBSITE_URL || process.env.FRONTEND_URL || req.headers.origin || 'http://localhost:3000';
      const resetUrl = `${baseUrl.replace(/\/$/, '')}/reset-password.html?token=${token}`;

      const resend = new Resend(apiKey);
      await resend.emails.send({
        from,
        to: [user.email],
        subject: 'Reset your Auctus Studio password',
        text: `We received a request to reset your Auctus Studio password.\n\nReset your password: ${resetUrl}\n\nIf you did not request this, you can ignore this email.`
      });
    }

    return successResponse(res, 200, {
      message: 'If an account exists for that email, a reset link has been sent.'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return errorResponse(res, 500, 'Failed to send reset email');
  }
};
