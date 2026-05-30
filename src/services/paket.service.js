const pool = require('../config/database');

const getAllPaket = async () => {
  const { rows } = await pool.query(`SELECT * FROM paket ORDER BY harga_bulanan ASC`);
  return rows;
};

const getPaketById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM paket WHERE id=$1`, [id]);
  return rows[0] || null;
};

const createPaket = async ({ nama_paket, deskripsi, harga_bulanan, harga_tahunan, max_perangkat, kualitas_stream, ada_download, ada_konten_eksklusif }) => {
  const { rows } = await pool.query(
    `INSERT INTO paket (nama_paket, deskripsi, harga_bulanan, harga_tahunan, max_perangkat, kualitas_stream, ada_download, ada_konten_eksklusif) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [nama_paket, deskripsi, harga_bulanan, harga_tahunan, max_perangkat, kualitas_stream, ada_download, ada_konten_eksklusif]
  );
  return rows[0];
};

const updatePaket = async (id, { nama_paket, deskripsi, harga_bulanan, harga_tahunan, max_perangkat, kualitas_stream, ada_download, ada_konten_eksklusif }) => {
  const { rows } = await pool.query(
    `UPDATE paket SET nama_paket=COALESCE($1,nama_paket), deskripsi=COALESCE($2,deskripsi), harga_bulanan=COALESCE($3,harga_bulanan), harga_tahunan=COALESCE($4,harga_tahunan), max_perangkat=COALESCE($5,max_perangkat), kualitas_stream=COALESCE($6,kualitas_stream), ada_download=COALESCE($7,ada_download), ada_konten_eksklusif=COALESCE($8,ada_konten_eksklusif) WHERE id=$9 RETURNING *`,
    [nama_paket, deskripsi, harga_bulanan, harga_tahunan, max_perangkat, kualitas_stream, ada_download, ada_konten_eksklusif, id]
  );
  return rows[0] || null;
};

const deletePaket = async (id) => {
  const { rows } = await pool.query(`DELETE FROM paket WHERE id=$1 RETURNING *`, [id]);
  return rows[0] || null;
};

module.exports = { getAllPaket, getPaketById, createPaket, updatePaket, deletePaket };
