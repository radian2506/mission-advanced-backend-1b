const svc = require('../services/auth.service');
const { successResponse, errorResponse } = require('../middleware/response');

const register = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;
    if (!fullname || !username || !email || !password) {
      return errorResponse(res, 'fullname, username, email, password wajib diisi', 400);
    }
    if (password.length < 6) {
      return errorResponse(res, 'Password minimal 6 karakter', 400);
    }
    const data = await svc.register({ fullname, username, email, password });
    return successResponse(res, data, 'Registrasi berhasil', 201);
  } catch (err) {
    if (err.code === '23505') return errorResponse(res, 'Username atau email sudah digunakan', 409);
    return errorResponse(res, err.message);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return errorResponse(res, 'Username dan password wajib diisi', 400);
    }
    const data = await svc.login({ username, password });
    return successResponse(res, data, 'Login berhasil');
  } catch (err) {
    return errorResponse(res, err.message, 401);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { search, sort, order } = req.query;
    const data = await svc.getAllUsers({ search, sort, order });
    return successResponse(res, data, 'Berhasil mengambil semua user');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const data = await svc.getUserById(req.params.id);
    if (!data) return errorResponse(res, 'User tidak ditemukan', 404);
    return successResponse(res, data);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return errorResponse(res, 'File gambar wajib diupload', 400);
    const avatar_url = `/uploads/${req.file.filename}`;
    const data = await svc.updateAvatar(req.params.id, avatar_url);
    if (!data) return errorResponse(res, 'User tidak ditemukan', 404);
    return successResponse(res, data, 'Avatar berhasil diupload');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

module.exports = { register, login, getAllUsers, getUserById, uploadAvatar };
