const pool = require('../config/database');

const getAllPembayaran = async () => {
  const { rows } = await pool.query(`
    SELECT pb.*, o.total_harga AS total_order, o.status_order, u.nama AS nama_user
    FROM pembayaran pb
    JOIN "order" o ON pb.order_id = o.id
    JOIN "user" u ON o.user_id = u.id
    ORDER BY pb.created_at DESC
  `);
  return rows;
};

const getPembayaranById = async (id) => {
  const { rows } = await pool.query(`
    SELECT pb.*, o.total_harga AS total_order, o.status_order, u.nama AS nama_user
    FROM pembayaran pb
    JOIN "order" o ON pb.order_id = o.id
    JOIN "user" u ON o.user_id = u.id
    WHERE pb.id = $1
  `, [id]);
  return rows[0] || null;
};

const createPembayaran = async ({ order_id, metode_pembayaran, nomor_referensi, jumlah_bayar, bukti_bayar_url }) => {
  const { rows } = await pool.query(
    `INSERT INTO pembayaran (order_id,metode_pembayaran,nomor_referensi,jumlah_bayar,bukti_bayar_url) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [order_id, metode_pembayaran, nomor_referensi, jumlah_bayar, bukti_bayar_url]
  );
  return rows[0];
};

const updatePembayaran = async (id, { status_pembayaran, waktu_bayar, bukti_bayar_url }) => {
  const { rows } = await pool.query(
    `UPDATE pembayaran SET status_pembayaran=COALESCE($1,status_pembayaran), waktu_bayar=COALESCE($2,waktu_bayar), bukti_bayar_url=COALESCE($3,bukti_bayar_url) WHERE id=$4 RETURNING *`,
    [status_pembayaran, waktu_bayar, bukti_bayar_url, id]
  );
  return rows[0] || null;
};

const deletePembayaran = async (id) => {
  const { rows } = await pool.query(`DELETE FROM pembayaran WHERE id=$1 RETURNING id`, [id]);
  return rows[0] || null;
};

module.exports = { getAllPembayaran, getPembayaranById, createPembayaran, updatePembayaran, deletePembayaran };
