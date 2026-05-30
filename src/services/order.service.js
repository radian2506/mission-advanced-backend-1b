const pool = require('../config/database');

const getAllOrders = async () => {
  const { rows } = await pool.query(`
    SELECT o.*, u.nama AS nama_user, u.email AS email_user, p.nama_paket, p.kualitas_stream
    FROM "order" o
    JOIN "user" u ON o.user_id = u.id
    JOIN paket p ON o.paket_id = p.id
    ORDER BY o.created_at DESC
  `);
  return rows;
};

const getOrderById = async (id) => {
  const { rows } = await pool.query(`
    SELECT o.*, u.nama AS nama_user, u.email AS email_user, p.nama_paket, p.kualitas_stream
    FROM "order" o
    JOIN "user" u ON o.user_id = u.id
    JOIN paket p ON o.paket_id = p.id
    WHERE o.id = $1
  `, [id]);
  return rows[0] || null;
};

const createOrder = async ({ user_id, paket_id, total_harga, tanggal_mulai, tanggal_selesai }) => {
  const { rows } = await pool.query(
    `INSERT INTO "order" (user_id,paket_id,total_harga,tanggal_mulai,tanggal_selesai) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [user_id, paket_id, total_harga, tanggal_mulai, tanggal_selesai]
  );
  return rows[0];
};

const updateOrder = async (id, { status_order, tanggal_mulai, tanggal_selesai }) => {
  const { rows } = await pool.query(
    `UPDATE "order" SET status_order=COALESCE($1,status_order), tanggal_mulai=COALESCE($2,tanggal_mulai), tanggal_selesai=COALESCE($3,tanggal_selesai) WHERE id=$4 RETURNING *`,
    [status_order, tanggal_mulai, tanggal_selesai, id]
  );
  return rows[0] || null;
};

const deleteOrder = async (id) => {
  const { rows } = await pool.query(`DELETE FROM "order" WHERE id=$1 RETURNING id`, [id]);
  return rows[0] || null;
};

module.exports = { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder };
