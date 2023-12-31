const express = require('express')
const controller = require('../controllers/chatGPT.controller')
const router = express.Router();

router.post('/question', controller.QuestionToGPT)

module.exports = router