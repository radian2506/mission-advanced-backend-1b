const express = require('express');
const router  = express.Router();
const userCtrl = require('../controllers/user.controller');
const { genreCtrl, paketCtrl, seriesFilmCtrl, episodeCtrl, orderCtrl, pembayaranCtrl, daftarSayaCtrl } = require('../controllers/index.controller');

router.get   ('/users',                           userCtrl.getAll);
router.get   ('/users/:id',                       userCtrl.getById);
router.post  ('/users',                           userCtrl.create);
router.patch ('/users/:id',                       userCtrl.update);
router.delete('/users/:id',                       userCtrl.remove);

router.get   ('/genres',                          genreCtrl.getAll);
router.get   ('/genres/:id',                      genreCtrl.getById);
router.post  ('/genres',                          genreCtrl.create);
router.patch ('/genres/:id',                      genreCtrl.update);
router.delete('/genres/:id',                      genreCtrl.remove);

router.get   ('/paket',                           paketCtrl.getAll);
router.get   ('/paket/:id',                       paketCtrl.getById);
router.post  ('/paket',                           paketCtrl.create);
router.patch ('/paket/:id',                       paketCtrl.update);
router.delete('/paket/:id',                       paketCtrl.remove);

router.get   ('/series-film',                     seriesFilmCtrl.getAll);
router.get   ('/series-film/:id',                 seriesFilmCtrl.getById);
router.post  ('/series-film',                     seriesFilmCtrl.create);
router.patch ('/series-film/:id',                 seriesFilmCtrl.update);
router.delete('/series-film/:id',                 seriesFilmCtrl.remove);

router.get   ('/episodes',                        episodeCtrl.getAll);
router.get   ('/episodes/:id',                    episodeCtrl.getById);
router.get   ('/series-film/:seriesId/episodes',  episodeCtrl.getBySeriesId);
router.post  ('/episodes',                        episodeCtrl.create);
router.patch ('/episodes/:id',                    episodeCtrl.update);
router.delete('/episodes/:id',                    episodeCtrl.remove);

router.get   ('/orders',                          orderCtrl.getAll);
router.get   ('/orders/:id',                      orderCtrl.getById);
router.post  ('/orders',                          orderCtrl.create);
router.patch ('/orders/:id',                      orderCtrl.update);
router.delete('/orders/:id',                      orderCtrl.remove);

router.get   ('/pembayaran',                      pembayaranCtrl.getAll);
router.get   ('/pembayaran/:id',                  pembayaranCtrl.getById);
router.post  ('/pembayaran',                      pembayaranCtrl.create);
router.patch ('/pembayaran/:id',                  pembayaranCtrl.update);
router.delete('/pembayaran/:id',                  pembayaranCtrl.remove);

router.get   ('/daftar-saya',                     daftarSayaCtrl.getAll);
router.get   ('/daftar-saya/:id',                 daftarSayaCtrl.getById);
router.get   ('/users/:userId/daftar-saya',       daftarSayaCtrl.getByUserId);
router.post  ('/daftar-saya',                     daftarSayaCtrl.create);
router.patch ('/daftar-saya/:id',                 daftarSayaCtrl.update);
router.delete('/daftar-saya/:id',                 daftarSayaCtrl.remove);

module.exports = router;
