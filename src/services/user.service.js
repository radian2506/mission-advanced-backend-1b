const pool = require('../config/database');

const getAllUsers = async () => {
  const { rows } = await pool.query(`SELECT id, nama, email, no_telpon, avatar_url, status, created_at FROM "user" ORDER BY created_at DESC`);
  return rows;
};

const getUserById = async (id) => {
  const { rows } = await pool.query(`SELECT id, nama, email, no_telpon, avatar_url, status, created_at FROM "user" WHERE id = $1`, [id]);
  return rows[0] || null;
};

const createUser = async ({ nama, email, password_hash, no_telpon, avatar_url }) => {
  const { rows } = await pool.query(
    `INSERT INTO "user" (nama, email, password_hash, no_telpon, avatar_url) VALUES ($1,$2,$3,$4,$5) RETURNING id, nama, email, no_telpon, status, created_at`,
    [nama, email, password_hash, no_telpon, avatar_url]
  );
  return rows[0];
};

const updateUser = async (id, { nama, email, no_telpon, avatar_url, status }) => {
  const { rows } = await pool.query(
    `UPDATE "user" SET nama=COALESCE($1,nama), email=COALESCE($2,email), no_telpon=COALESCE($3,no_telpon), avatar_url=COALESCE($4,avatar_url), status=COALESCE($5,status), updated_at=NOW() WHERE id=$6 RETURNING id, nama, email, no_telpon, status, updated_at`,
    [nama, email, no_telpon, avatar_url, status, id]
  );
  return rows[0] || null;
};

const deleteUser = async (id) => {
  const { rows } = await pool.query(`DELETE FROM "user" WHERE id=$1 RETURNING id, nama, email`, [id]);
  return rows[0] || null;
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
