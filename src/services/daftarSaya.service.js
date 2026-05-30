const pool = require('../config/database');

const getAllDaftarSaya = async () => {
  const { rows } = await pool.query(`
    SELECT ds.*, u.nama AS nama_user, sf.judul, sf.thumbnail_url, sf.tipe
    FROM daftar_saya ds
    JOIN "user" u ON ds.user_id = u.id
    JOIN series_film sf ON ds.series_film_id = sf.id
    ORDER BY ds.ditambahkan_pada DESC
  `);
  return rows;
};

const getDaftarSayaById = async (id) => {
  const { rows } = await pool.query(`
    SELECT ds.*, u.nama AS nama_user, sf.judul, sf.thumbnail_url, sf.tipe
    FROM daftar_saya ds
    JOIN "user" u ON ds.user_id = u.id
    JOIN series_film sf ON ds.series_film_id = sf.id
    WHERE ds.id = $1
  `, [id]);
  return rows[0] || null;
};

const getDaftarSayaByUserId = async (user_id) => {
  const { rows } = await pool.query(`
    SELECT ds.*, sf.judul, sf.thumbnail_url, sf.tipe, sf.rating_usia, sf.imdb_score
    FROM daftar_saya ds
    JOIN series_film sf ON ds.series_film_id = sf.id
    WHERE ds.user_id = $1
    ORDER BY ds.ditambahkan_pada DESC
  `, [user_id]);
  return rows;
};

const createDaftarSaya = async ({ user_id, series_film_id }) => {
  const { rows } = await pool.query(
    `INSERT INTO daftar_saya (user_id,series_film_id) VALUES ($1,$2) ON CONFLICT (user_id,series_film_id) DO NOTHING RETURNING *`,
    [user_id, series_film_id]
  );
  return rows[0] || null;
};

const updateDaftarSaya = async (id, { sudah_ditonton, progress_persen }) => {
  const { rows } = await pool.query(
    `UPDATE daftar_saya SET sudah_ditonton=COALESCE($1,sudah_ditonton), progress_persen=COALESCE($2,progress_persen) WHERE id=$3 RETURNING *`,
    [sudah_ditonton, progress_persen, id]
  );
  return rows[0] || null;
};

const deleteDaftarSaya = async (id) => {
  const { rows } = await pool.query(`DELETE FROM daftar_saya WHERE id=$1 RETURNING id`, [id]);
  return rows[0] || null;
};

module.exports = { getAllDaftarSaya, getDaftarSayaById, getDaftarSayaByUserId, createDaftarSaya, updateDaftarSaya, deleteDaftarSaya };
