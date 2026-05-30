const { successResponse, errorResponse } = require('../middleware/response');
const genreSvc = require('../services/genre.service');
const paketSvc = require('../services/paket.service');
const sfSvc = require('../services/seriesFilm.service');
const epSvc = require('../services/episode.service');
const orderSvc = require('../services/order.service');
const pbSvc = require('../services/pembayaran.service');
const dsSvc = require('../services/daftarSaya.service');

const genreCtrl = {
  getAll:   async (req, res) => { try { return successResponse(res, await genreSvc.getAllGenres(), 'Berhasil mengambil semua genre'); } catch (e) { return errorResponse(res, e.message); } },
  getById:  async (req, res) => { try { const d = await genreSvc.getGenreById(req.params.id); if (!d) return errorResponse(res, 'Genre tidak ditemukan', 404); return successResponse(res, d); } catch (e) { return errorResponse(res, e.message); } },
  create:   async (req, res) => { try { const { nama_genre, slug } = req.body; if (!nama_genre || !slug) return errorResponse(res, 'nama_genre dan slug wajib diisi', 400); return successResponse(res, await genreSvc.createGenre(req.body), 'Genre berhasil ditambahkan', 201); } catch (e) { if (e.code==='23505') return errorResponse(res,'Slug sudah digunakan',409); return errorResponse(res, e.message); } },
  update:   async (req, res) => { try { const d = await genreSvc.updateGenre(req.params.id, req.body); if (!d) return errorResponse(res, 'Genre tidak ditemukan', 404); return successResponse(res, d, 'Genre berhasil diperbarui'); } catch (e) { return errorResponse(res, e.message); } },
  remove:   async (req, res) => { try { const d = await genreSvc.deleteGenre(req.params.id); if (!d) return errorResponse(res, 'Genre tidak ditemukan', 404); return successResponse(res, d, 'Genre berhasil dihapus'); } catch (e) { return errorResponse(res, e.message); } },
};

const paketCtrl = {
  getAll:   async (req, res) => { try { return successResponse(res, await paketSvc.getAllPaket(), 'Berhasil mengambil semua paket'); } catch (e) { return errorResponse(res, e.message); } },
  getById:  async (req, res) => { try { const d = await paketSvc.getPaketById(req.params.id); if (!d) return errorResponse(res, 'Paket tidak ditemukan', 404); return successResponse(res, d); } catch (e) { return errorResponse(res, e.message); } },
  create:   async (req, res) => { try { const { nama_paket, harga_bulanan, harga_tahunan } = req.body; if (!nama_paket||!harga_bulanan||!harga_tahunan) return errorResponse(res,'nama_paket, harga_bulanan, harga_tahunan wajib diisi',400); return successResponse(res, await paketSvc.createPaket(req.body), 'Paket berhasil ditambahkan', 201); } catch (e) { return errorResponse(res, e.message); } },
  update:   async (req, res) => { try { const d = await paketSvc.updatePaket(req.params.id, req.body); if (!d) return errorResponse(res, 'Paket tidak ditemukan', 404); return successResponse(res, d, 'Paket berhasil diperbarui'); } catch (e) { return errorResponse(res, e.message); } },
  remove:   async (req, res) => { try { const d = await paketSvc.deletePaket(req.params.id); if (!d) return errorResponse(res, 'Paket tidak ditemukan', 404); return successResponse(res, d, 'Paket berhasil dihapus'); } catch (e) { return errorResponse(res, e.message); } },
};

const seriesFilmCtrl = {
  getAll:   async (req, res) => { try { return successResponse(res, await sfSvc.getAllSeriesFilm(), 'Berhasil mengambil semua series/film'); } catch (e) { return errorResponse(res, e.message); } },
  getById:  async (req, res) => { try { const d = await sfSvc.getSeriesFilmById(req.params.id); if (!d) return errorResponse(res, 'Series/film tidak ditemukan', 404); return successResponse(res, d); } catch (e) { return errorResponse(res, e.message); } },
  create:   async (req, res) => { try { const { judul, tipe } = req.body; if (!judul||!tipe) return errorResponse(res,'judul dan tipe wajib diisi',400); return successResponse(res, await sfSvc.createSeriesFilm(req.body), 'Series/film berhasil ditambahkan', 201); } catch (e) { return errorResponse(res, e.message); } },
  update:   async (req, res) => { try { const d = await sfSvc.updateSeriesFilm(req.params.id, req.body); if (!d) return errorResponse(res, 'Series/film tidak ditemukan', 404); return successResponse(res, d, 'Series/film berhasil diperbarui'); } catch (e) { return errorResponse(res, e.message); } },
  remove:   async (req, res) => { try { const d = await sfSvc.deleteSeriesFilm(req.params.id); if (!d) return errorResponse(res, 'Series/film tidak ditemukan', 404); return successResponse(res, d, 'Series/film berhasil dihapus'); } catch (e) { return errorResponse(res, e.message); } },
};

const episodeCtrl = {
  getAll:        async (req, res) => { try { return successResponse(res, await epSvc.getAllEpisodes(), 'Berhasil mengambil semua episode'); } catch (e) { return errorResponse(res, e.message); } },
  getById:       async (req, res) => { try { const d = await epSvc.getEpisodeById(req.params.id); if (!d) return errorResponse(res, 'Episode tidak ditemukan', 404); return successResponse(res, d); } catch (e) { return errorResponse(res, e.message); } },
  getBySeriesId: async (req, res) => { try { return successResponse(res, await epSvc.getEpisodesBySeriesId(req.params.seriesId)); } catch (e) { return errorResponse(res, e.message); } },
  create:        async (req, res) => { try { if (!req.body.series_film_id) return errorResponse(res,'series_film_id wajib diisi',400); return successResponse(res, await epSvc.createEpisode(req.body), 'Episode berhasil ditambahkan', 201); } catch (e) { return errorResponse(res, e.message); } },
  update:        async (req, res) => { try { const d = await epSvc.updateEpisode(req.params.id, req.body); if (!d) return errorResponse(res, 'Episode tidak ditemukan', 404); return successResponse(res, d, 'Episode berhasil diperbarui'); } catch (e) { return errorResponse(res, e.message); } },
  remove:        async (req, res) => { try { const d = await epSvc.deleteEpisode(req.params.id); if (!d) return errorResponse(res, 'Episode tidak ditemukan', 404); return successResponse(res, d, 'Episode berhasil dihapus'); } catch (e) { return errorResponse(res, e.message); } },
};

const orderCtrl = {
  getAll:  async (req, res) => { try { return successResponse(res, await orderSvc.getAllOrders(), 'Berhasil mengambil semua order'); } catch (e) { return errorResponse(res, e.message); } },
  getById: async (req, res) => { try { const d = await orderSvc.getOrderById(req.params.id); if (!d) return errorResponse(res, 'Order tidak ditemukan', 404); return successResponse(res, d); } catch (e) { return errorResponse(res, e.message); } },
  create:  async (req, res) => { try { const { user_id, paket_id, total_harga } = req.body; if (!user_id||!paket_id||!total_harga) return errorResponse(res,'user_id, paket_id, total_harga wajib diisi',400); return successResponse(res, await orderSvc.createOrder(req.body), 'Order berhasil dibuat', 201); } catch (e) { return errorResponse(res, e.message); } },
  update:  async (req, res) => { try { const d = await orderSvc.updateOrder(req.params.id, req.body); if (!d) return errorResponse(res, 'Order tidak ditemukan', 404); return successResponse(res, d, 'Order berhasil diperbarui'); } catch (e) { return errorResponse(res, e.message); } },
  remove:  async (req, res) => { try { const d = await orderSvc.deleteOrder(req.params.id); if (!d) return errorResponse(res, 'Order tidak ditemukan', 404); return successResponse(res, d, 'Order berhasil dihapus'); } catch (e) { return errorResponse(res, e.message); } },
};

const pembayaranCtrl = {
  getAll:  async (req, res) => { try { return successResponse(res, await pbSvc.getAllPembayaran(), 'Berhasil mengambil semua pembayaran'); } catch (e) { return errorResponse(res, e.message); } },
  getById: async (req, res) => { try { const d = await pbSvc.getPembayaranById(req.params.id); if (!d) return errorResponse(res, 'Pembayaran tidak ditemukan', 404); return successResponse(res, d); } catch (e) { return errorResponse(res, e.message); } },
  create:  async (req, res) => { try { const { order_id, metode_pembayaran, jumlah_bayar } = req.body; if (!order_id||!metode_pembayaran||!jumlah_bayar) return errorResponse(res,'order_id, metode_pembayaran, jumlah_bayar wajib diisi',400); return successResponse(res, await pbSvc.createPembayaran(req.body), 'Pembayaran berhasil dicatat', 201); } catch (e) { return errorResponse(res, e.message); } },
  update:  async (req, res) => { try { const d = await pbSvc.updatePembayaran(req.params.id, req.body); if (!d) return errorResponse(res, 'Pembayaran tidak ditemukan', 404); return successResponse(res, d, 'Pembayaran berhasil diperbarui'); } catch (e) { return errorResponse(res, e.message); } },
  remove:  async (req, res) => { try { const d = await pbSvc.deletePembayaran(req.params.id); if (!d) return errorResponse(res, 'Pembayaran tidak ditemukan', 404); return successResponse(res, d, 'Pembayaran berhasil dihapus'); } catch (e) { return errorResponse(res, e.message); } },
};

const daftarSayaCtrl = {
  getAll:      async (req, res) => { try { return successResponse(res, await dsSvc.getAllDaftarSaya(), 'Berhasil mengambil semua daftar saya'); } catch (e) { return errorResponse(res, e.message); } },
  getById:     async (req, res) => { try { const d = await dsSvc.getDaftarSayaById(req.params.id); if (!d) return errorResponse(res, 'Item tidak ditemukan', 404); return successResponse(res, d); } catch (e) { return errorResponse(res, e.message); } },
  getByUserId: async (req, res) => { try { return successResponse(res, await dsSvc.getDaftarSayaByUserId(req.params.userId)); } catch (e) { return errorResponse(res, e.message); } },
  create:      async (req, res) => { try { const { user_id, series_film_id } = req.body; if (!user_id||!series_film_id) return errorResponse(res,'user_id dan series_film_id wajib diisi',400); const d = await dsSvc.createDaftarSaya({ user_id, series_film_id }); if (!d) return errorResponse(res,'Konten sudah ada di daftar saya',409); return successResponse(res, d, 'Berhasil ditambahkan ke daftar saya', 201); } catch (e) { return errorResponse(res, e.message); } },
  update:      async (req, res) => { try { const d = await dsSvc.updateDaftarSaya(req.params.id, req.body); if (!d) return errorResponse(res, 'Item tidak ditemukan', 404); return successResponse(res, d, 'Daftar saya berhasil diperbarui'); } catch (e) { return errorResponse(res, e.message); } },
  remove:      async (req, res) => { try { const d = await dsSvc.deleteDaftarSaya(req.params.id); if (!d) return errorResponse(res, 'Item tidak ditemukan', 404); return successResponse(res, d, 'Item berhasil dihapus'); } catch (e) { return errorResponse(res, e.message); } },
};

module.exports = { genreCtrl, paketCtrl, seriesFilmCtrl, episodeCtrl, orderCtrl, pembayaranCtrl, daftarSayaCtrl };
