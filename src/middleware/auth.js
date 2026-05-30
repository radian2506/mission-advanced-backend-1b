const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'chill_secret_key';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Token tidak ditemukan', data: null });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ status: 'error', message: 'Token tidak valid atau kadaluarsa', data: null });
  }
};

module.exports = { verifyToken };
