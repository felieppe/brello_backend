const express = require('express')
const router = express.Router()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const DB_BOARDS = './db/boards.json'
var boards = []

function getBoards() {
    if (!fs.existsSync(DB_BOARDS)) {
        fs.mkdirSync(DB_BOARDS.split('/').slice(0, -1).join('/'), { recursive: true })
        fs.writeFileSync(DB_BOARDS, JSON.stringify([]))
    }

    return JSON.parse(fs.readFileSync(DB_BOARDS))
}

function saveBoards() {
    fs.writeFileSync(DB_BOARDS, JSON.stringify(boards))
}

router.use((req, res, next) => {
    boards = getBoards()
    next()
})

router.get('/', (req, res) => {
    return res.status(200).json({ success: true, data: boards, message: "Found boards"})
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const board = boards.find(board => board.id === id)

    if (!board) return res.status(404).json({ success: false, data: null, message: "Board not found." })
    return res.status(200).json({ success: true, data: board, message: "Found board." })
})

router.post('/', (req, res) => {
    const { name } = req.body
    if (!name) return res.status(400).json({ success: false, data: null, message: "Missing fields." })

    const board = { id: uuidv4(), name: name }
    boards.push(board)

    saveBoards()
    return res.status(201).json({ success: true, data: board, message: "Board created." })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const { name } = req.body
    if (!name) return res.status(400).json({ success: false, data: null, message: "Missing fields." })

    const board = boards.find(board => board.id === id)

    if (!board) return res.status(404).json({ success: false, data: null, message: "Board not found." })

    board.name = name

    saveBoards()
    return res.status(200).json({ success: true, data: board, message: "Board updated." })
})

router.patch('/:id', (req, res) => {
    const id = req.params.id
    const { name } = req.body

    const board = boards.find(board => board.id === id)

    if (!board) return res.status(404).json({ success: false, data: null, message: "Board not found." })

    board.name = name

    saveBoards()
    return res.status(200).json({ success: true, data: board, message: "Board updated." })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const board = boards.find(board => board.id === id)

    if (!board) return res.status(404).json({ success: false, data: null, message: "Board not found." })

    boards = boards.filter(board => board.id !== id)

    saveBoards()
    return res.status(200).json({ success: true, data: board, message: "Board deleted." })
})

module.exports = router