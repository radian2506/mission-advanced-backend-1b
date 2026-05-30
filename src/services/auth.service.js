const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'chill_secret_key';

const register = async ({ fullname, username, email, password }) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const { rows } = await pool.query(
    `INSERT INTO users (fullname, username, email, password)
     VALUES ($1, $2, $3, $4)
     RETURNING id, fullname, username, email, created_at`,
    [fullname, username, email, hashedPassword]
  );
  return rows[0];
};

const login = async ({ username, password }) => {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE username = $1`,
    [username]
  );
  const user = rows[0];
  if (!user) throw new Error('Username tidak ditemukan');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Password salah');

  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    SECRET_KEY,
    { expiresIn: '24h' }
  );

  return {
    token,
    user: { id: user.id, fullname: user.fullname, username: user.username, email: user.email }
  };
};

const getAllUsers = async ({ search, sort, order }) => {
  let query = `SELECT id, fullname, username, email, avatar_url, created_at FROM users WHERE 1=1`;
  const params = [];

  if (search) {
    params.push(`%${search}%`);
    query += ` AND (fullname ILIKE $${params.length} OR username ILIKE $${params.length} OR email ILIKE $${params.length})`;
  }

  const allowedSort = ['fullname', 'username', 'email', 'created_at'];
  const allowedOrder = ['ASC', 'DESC'];
  const sortBy = allowedSort.includes(sort) ? sort : 'created_at';
  const orderBy = allowedOrder.includes(order?.toUpperCase()) ? order.toUpperCase() : 'DESC';

  query += ` ORDER BY ${sortBy} ${orderBy}`;

  const { rows } = await pool.query(query, params);
  return rows;
};

const getUserById = async (id) => {
  const { rows } = await pool.query(
    `SELECT id, fullname, username, email, avatar_url, created_at FROM users WHERE id = $1`,
    [id]
  );
  return rows[0] || null;
};

const updateAvatar = async (id, avatar_url) => {
  const { rows } = await pool.query(
    `UPDATE users SET avatar_url = $1, updated_at = NOW() WHERE id = $2
     RETURNING id, fullname, username, email, avatar_url`,
    [avatar_url, id]
  );
  return rows[0] || null;
};

module.exports = { register, login, getAllUsers, getUserById, updateAvatar };
