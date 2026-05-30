const pool = require('../config/database');

const getAllGenres = async () => {
  const { rows } = await pool.query(`SELECT * FROM genre ORDER BY nama_genre ASC`);
  return rows;
};

const getGenreById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM genre WHERE id=$1`, [id]);
  return rows[0] || null;
};

const createGenre = async ({ nama_genre, slug, deskripsi, ikon_url }) => {
  const { rows } = await pool.query(
    `INSERT INTO genre (nama_genre, slug, deskripsi, ikon_url) VALUES ($1,$2,$3,$4) RETURNING *`,
    [nama_genre, slug, deskripsi, ikon_url]
  );
  return rows[0];
};

const updateGenre = async (id, { nama_genre, slug, deskripsi, ikon_url }) => {
  const { rows } = await pool.query(
    `UPDATE genre SET nama_genre=COALESCE($1,nama_genre), slug=COALESCE($2,slug), deskripsi=COALESCE($3,deskripsi), ikon_url=COALESCE($4,ikon_url) WHERE id=$5 RETURNING *`,
    [nama_genre, slug, deskripsi, ikon_url, id]
  );
  return rows[0] || null;
};

const deleteGenre = async (id) => {
  const { rows } = await pool.query(`DELETE FROM genre WHERE id=$1 RETURNING *`, [id]);
  return rows[0] || null;
};

module.exports = { getAllGenres, getGenreById, createGenre, updateGenre, deleteGenre };
