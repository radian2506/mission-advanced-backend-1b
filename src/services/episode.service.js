const pool = require('../config/database');

const getAllEpisodes = async () => {
  const { rows } = await pool.query(`
    SELECT em.*, sf.judul AS judul_series, sf.tipe
    FROM episode_movie em
    JOIN series_film sf ON em.series_film_id = sf.id
    ORDER BY em.series_film_id, em.nomor_musim, em.nomor_episode
  `);
  return rows;
};

const getEpisodeById = async (id) => {
  const { rows } = await pool.query(`
    SELECT em.*, sf.judul AS judul_series, sf.tipe
    FROM episode_movie em
    JOIN series_film sf ON em.series_film_id = sf.id
    WHERE em.id = $1
  `, [id]);
  return rows[0] || null;
};

const getEpisodesBySeriesId = async (series_film_id) => {
  const { rows } = await pool.query(`SELECT * FROM episode_movie WHERE series_film_id=$1 ORDER BY nomor_musim, nomor_episode`, [series_film_id]);
  return rows;
};

const createEpisode = async ({ series_film_id, nomor_episode, nomor_musim, judul_episode, deskripsi, video_url, thumbnail_url, durasi_detik, tanggal_tayang }) => {
  const { rows } = await pool.query(
    `INSERT INTO episode_movie (series_film_id,nomor_episode,nomor_musim,judul_episode,deskripsi,video_url,thumbnail_url,durasi_detik,tanggal_tayang) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [series_film_id, nomor_episode, nomor_musim, judul_episode, deskripsi, video_url, thumbnail_url, durasi_detik, tanggal_tayang]
  );
  return rows[0];
};

const updateEpisode = async (id, { nomor_episode, nomor_musim, judul_episode, deskripsi, video_url, thumbnail_url, durasi_detik, tanggal_tayang }) => {
  const { rows } = await pool.query(
    `UPDATE episode_movie SET nomor_episode=COALESCE($1,nomor_episode), nomor_musim=COALESCE($2,nomor_musim), judul_episode=COALESCE($3,judul_episode), deskripsi=COALESCE($4,deskripsi), video_url=COALESCE($5,video_url), thumbnail_url=COALESCE($6,thumbnail_url), durasi_detik=COALESCE($7,durasi_detik), tanggal_tayang=COALESCE($8,tanggal_tayang) WHERE id=$9 RETURNING *`,
    [nomor_episode, nomor_musim, judul_episode, deskripsi, video_url, thumbnail_url, durasi_detik, tanggal_tayang, id]
  );
  return rows[0] || null;
};

const deleteEpisode = async (id) => {
  const { rows } = await pool.query(`DELETE FROM episode_movie WHERE id=$1 RETURNING id, judul_episode`, [id]);
  return rows[0] || null;
};

module.exports = { getAllEpisodes, getEpisodeById, getEpisodesBySeriesId, createEpisode, updateEpisode, deleteEpisode };
