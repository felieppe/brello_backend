const express = require('express')
const router = express.Router()

const tasks = require('./tasks/')
const members = require('./members/')
const columns = require('./columns/')

router.use('/tasks/', tasks)
router.use('/members/', members)
router.use('/columns', columns)

module.exports = router