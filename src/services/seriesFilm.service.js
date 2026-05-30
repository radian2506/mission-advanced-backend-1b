const pool = require('../config/database');

const getAllSeriesFilm = async () => {
  const { rows } = await pool.query(`
    SELECT sf.*, COALESCE(json_agg(json_build_object('id',g.id,'nama_genre',g.nama_genre,'slug',g.slug)) FILTER (WHERE g.id IS NOT NULL),'[]') AS genres
    FROM series_film sf
    LEFT JOIN series_genre sg ON sf.id = sg.series_film_id
    LEFT JOIN genre g ON sg.genre_id = g.id
    GROUP BY sf.id ORDER BY sf.created_at DESC
  `);
  return rows;
};

const getSeriesFilmById = async (id) => {
  const { rows } = await pool.query(`
    SELECT sf.*, COALESCE(json_agg(json_build_object('id',g.id,'nama_genre',g.nama_genre,'slug',g.slug)) FILTER (WHERE g.id IS NOT NULL),'[]') AS genres
    FROM series_film sf
    LEFT JOIN series_genre sg ON sf.id = sg.series_film_id
    LEFT JOIN genre g ON sg.genre_id = g.id
    WHERE sf.id = $1 GROUP BY sf.id
  `, [id]);
  return rows[0] || null;
};

const createSeriesFilm = async ({ judul, sinopsis, thumbnail_url, banner_url, tahun_rilis, sutradara, pemeran, tipe, rating_usia, imdb_score, status_tayang, eksklusif }) => {
  const { rows } = await pool.query(
    `INSERT INTO series_film (judul,sinopsis,thumbnail_url,banner_url,tahun_rilis,sutradara,pemeran,tipe,rating_usia,imdb_score,status_tayang,eksklusif) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
    [judul, sinopsis, thumbnail_url, banner_url, tahun_rilis, sutradara, pemeran, tipe, rating_usia, imdb_score, status_tayang, eksklusif]
  );
  return rows[0];
};

const updateSeriesFilm = async (id, { judul, sinopsis, thumbnail_url, banner_url, tahun_rilis, sutradara, pemeran, tipe, rating_usia, imdb_score, status_tayang, eksklusif }) => {
  const { rows } = await pool.query(
    `UPDATE series_film SET judul=COALESCE($1,judul), sinopsis=COALESCE($2,sinopsis), thumbnail_url=COALESCE($3,thumbnail_url), banner_url=COALESCE($4,banner_url), tahun_rilis=COALESCE($5,tahun_rilis), sutradara=COALESCE($6,sutradara), pemeran=COALESCE($7,pemeran), tipe=COALESCE($8,tipe), rating_usia=COALESCE($9,rating_usia), imdb_score=COALESCE($10,imdb_score), status_tayang=COALESCE($11,status_tayang), eksklusif=COALESCE($12,eksklusif) WHERE id=$13 RETURNING *`,
    [judul, sinopsis, thumbnail_url, banner_url, tahun_rilis, sutradara, pemeran, tipe, rating_usia, imdb_score, status_tayang, eksklusif, id]
  );
  return rows[0] || null;
};

const deleteSeriesFilm = async (id) => {
  const { rows } = await pool.query(`DELETE FROM series_film WHERE id=$1 RETURNING id, judul`, [id]);
  return rows[0] || null;
};

module.exports = { getAllSeriesFilm, getSeriesFilmById, createSeriesFilm, updateSeriesFilm, deleteSeriesFilm };
