const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth');
const upload  = require('../middleware/upload');

router.post('/register',          ctrl.register);
router.post('/login',             ctrl.login);
router.get ('/users',             verifyToken, ctrl.getAllUsers);
router.get ('/users/:id',         verifyToken, ctrl.getUserById);
router.post('/users/:id/avatar',  verifyToken, upload.single('avatar'), ctrl.uploadAvatar);

module.exports = router;
