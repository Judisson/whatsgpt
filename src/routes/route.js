const express = require('express');
const router = express.Router();
const chatGPTRoutes = require('./chatGPTRoutes.route')

router.use('/chatgpt', chatGPTRoutes);

module.exports = router