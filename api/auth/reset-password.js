const crypto = require('crypto');
const { query } = require('../utils/db');
const { hashPassword } = require('../utils/password');
const { corsMiddleware, errorResponse, successResponse } = require('../middleware/response');

module.exports = async (req, res) => {
  if (corsMiddleware(req, res)) return;

  if (req.method !== 'POST') {
    return errorResponse(res, 405, 'Method not allowed');
  }

  const { token, password, confirmPassword } = req.body || {};

  if (!token) {
    return errorResponse(res, 400, 'Reset token is required');
  }

  if (!password || !confirmPassword) {
    return errorResponse(res, 400, 'Password and confirmation are required');
  }

  if (password !== confirmPassword) {
    return errorResponse(res, 400, 'Passwords do not match');
  }

  if (password.length < 8) {
    return errorResponse(res, 400, 'Password must be at least 8 characters');
  }

  try {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const resetResult = await query(
      'SELECT id, user_id, expires_at, used_at FROM password_resets WHERE token_hash = $1',
      [tokenHash]
    );

    const resetRequest = resetResult.rows[0];
    if (!resetRequest) {
      return errorResponse(res, 400, 'Invalid or expired reset token');
    }

    if (resetRequest.used_at) {
      return errorResponse(res, 400, 'Reset token has already been used');
    }

    if (new Date(resetRequest.expires_at) < new Date()) {
      return errorResponse(res, 400, 'Reset token has expired');
    }

    const hashedPassword = await hashPassword(password);

    await query(
      'UPDATE users SET password_hash = $1, updated_at = NOW(), failed_login_attempts = 0, locked_until = NULL WHERE id = $2',
      [hashedPassword, resetRequest.user_id]
    );

    await query(
      'UPDATE password_resets SET used_at = NOW() WHERE id = $1',
      [resetRequest.id]
    );

    return successResponse(res, 200, {
      message: 'Password updated successfully.'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return errorResponse(res, 500, 'Failed to reset password');
  }
};
