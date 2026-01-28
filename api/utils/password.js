const bcrypt = require('bcryptjs');

// Hash password (salt rounds = 10)
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

// Compare password with hash
async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = {
  hashPassword,
  verifyPassword,
};
