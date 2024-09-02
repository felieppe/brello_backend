const express = require('express')
const router = express.Router()

const tasks = require('./tasks/')
const members = require('./members/')

router.use('/tasks/', tasks)
router.use('/members/', members)

module.exports = router