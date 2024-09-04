const express = require('express')
const router = express.Router()

const tasks = require('./tasks/')
const members = require('./members/')
const columns = require('./columns/')
const boards = require('./boards/')

router.use('/tasks/', tasks)
router.use('/members/', members)
router.use('/columns/', columns)
router.use('/boards/', boards)

module.exports = router