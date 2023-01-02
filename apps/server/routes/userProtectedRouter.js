const express = require('express');
const router = express.Router();
const userProtectedController = require('../controllers/userProtectedController');

router.get('/logout', userProtectedController.logout)

module.exports = router