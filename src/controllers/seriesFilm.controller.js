const svc = require('../services/seriesFilm.service');
const { successResponse, errorResponse } = require('../middleware/response');

const getAll = async (req, res) => {
  try {
    const { search, sort, order, tipe, status_tayang, eksklusif } = req.query;
    const data = await svc.getAllSeriesFilm({
      search,
      sort,
      order,
      filter: { tipe, status_tayang, eksklusif }
    });
    return successResponse(res, data, 'Berhasil mengambil semua series/film');
  } catch (err) { return errorResponse(res, err.message); }
};

const getById = async (req, res) => {
  try {
    const data = await svc.getSeriesFilmById(req.params.id);
    if (!data) return errorResponse(res, 'Series/film tidak ditemukan', 404);
    return successResponse(res, data);
  } catch (err) { return errorResponse(res, err.message); }
};

const create = async (req, res) => {
  try {
    const { judul, tipe } = req.body;
    if (!judul || !tipe) return errorResponse(res, 'judul dan tipe wajib diisi', 400);
    const data = await svc.createSeriesFilm(req.body);
    return successResponse(res, data, 'Series/film berhasil ditambahkan', 201);
  } catch (err) { return errorResponse(res, err.message); }
};

const update = async (req, res) => {
  try {
    const data = await svc.updateSeriesFilm(req.params.id, req.body);
    if (!data) return errorResponse(res, 'Series/film tidak ditemukan', 404);
    return successResponse(res, data, 'Series/film berhasil diperbarui');
  } catch (err) { return errorResponse(res, err.message); }
};

const remove = async (req, res) => {
  try {
    const data = await svc.deleteSeriesFilm(req.params.id);
    if (!data) return errorResponse(res, 'Series/film tidak ditemukan', 404);
    return successResponse(res, data, 'Series/film berhasil dihapus');
  } catch (err) { return errorResponse(res, err.message); }
};

module.exports = { getAll, getById, create, update, remove };
