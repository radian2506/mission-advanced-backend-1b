const svc = require('../services/user.service');
const { successResponse, errorResponse } = require('../middleware/response');

const getAll = async (req, res) => {
  try {
    const data = await svc.getAllUsers();
    return successResponse(res, data, 'Berhasil mengambil semua user');
  } catch (err) { return errorResponse(res, err.message); }
};

const getById = async (req, res) => {
  try {
    const data = await svc.getUserById(req.params.id);
    if (!data) return errorResponse(res, 'User tidak ditemukan', 404);
    return successResponse(res, data);
  } catch (err) { return errorResponse(res, err.message); }
};

const create = async (req, res) => {
  try {
    const { nama, email, password_hash, no_telpon, avatar_url } = req.body;
    if (!nama || !email || !password_hash) return errorResponse(res, 'nama, email, password_hash wajib diisi', 400);
    const data = await svc.createUser({ nama, email, password_hash, no_telpon, avatar_url });
    return successResponse(res, data, 'User berhasil ditambahkan', 201);
  } catch (err) {
    if (err.code === '23505') return errorResponse(res, 'Email sudah terdaftar', 409);
    return errorResponse(res, err.message);
  }
};

const update = async (req, res) => {
  try {
    const data = await svc.updateUser(req.params.id, req.body);
    if (!data) return errorResponse(res, 'User tidak ditemukan', 404);
    return successResponse(res, data, 'User berhasil diperbarui');
  } catch (err) { return errorResponse(res, err.message); }
};

const remove = async (req, res) => {
  try {
    const data = await svc.deleteUser(req.params.id);
    if (!data) return errorResponse(res, 'User tidak ditemukan', 404);
    return successResponse(res, data, 'User berhasil dihapus');
  } catch (err) { return errorResponse(res, err.message); }
};

module.exports = { getAll, getById, create, update, remove };
