const { query } = require('../../utils/db');
const { authenticateToken } = require('../../middleware/auth');
const { corsMiddleware, errorResponse, successResponse } = require('../../middleware/response');

module.exports = async (req, res) => {
  // Handle CORS
  if (corsMiddleware(req, res)) return;

  // Only allow GET
  if (req.method !== 'GET') {
    return errorResponse(res, 405, 'Method not allowed');
  }

  try {
    // Authenticate the request
    authenticateToken(req, res, async () => {
      try {
        const userId = req.user.id;

        // Get user details
        const result = await query(
          'SELECT id, email, username, created_at, is_active, email_verified FROM users WHERE id = $1',
          [userId]
        );

        if (!result.rows[0]) {
          return errorResponse(res, 404, 'User not found');
        }

        const user = result.rows[0];

        successResponse(res, 200, {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            createdAt: user.created_at,
            isActive: user.is_active,
            emailVerified: user.email_verified,
          },
        });
      } catch (error) {
        console.error('Get user error:', error);
        errorResponse(res, 500, 'Failed to get user profile');
      }
    });
  } catch (error) {
    console.error('Auth error:', error);
    errorResponse(res, 401, 'Unauthorized');
  }
};
