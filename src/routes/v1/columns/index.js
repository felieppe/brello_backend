const express = require('express')
const router = express.Router()

const DB_COLUMNS = './db/columns.json'
var columns = []

function getColumns() {
    if (!fs.existsSync(DB_COLUMNS)) {
        fs.mkdirSync(DB_COLUMNS.split('/').slice(0, -1).join('/'), { recursive: true })
        fs.writeFileSync(DB_COLUMNS, JSON.stringify([]))
    }

    return JSON.parse(fs.readFileSync(DB_COLUMNS))
}

function saveColumns() {
    fs.writeFileSync(DB_COLUMNS, JSON.stringify(columns))
}

router.use((req, res, next) => {
    columns = getColumns()
    next()
})

router.get('/', (req, res) => {
    return res.status(200).json({ success: true, data: columns, message: "Found columns"})
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const column = columns.find(column => column.id === id)

    if (!column) return res.status(404).json({ success: false, data: null, message: "Column not found." })
    return res.status(200).json({ success: true, data: column, message: "Found column." })
})

router.post('/', (req, res) => {
    const { name } = req.body
    if (!name) return res.status(400).json({ success: false, data: null, message: "Missing fields." })

    const column = { id: uuidv4(), name: name }
    columns.push(column)

    saveColumns()
    return res.status(201).json({ success: true, data: column, message: "Column created." })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const { name } = req.body
    if (!name) return res.status(400).json({ success: false, data: null, message: "Missing fields." })

    const column = columns.find(column => column.id === id)

    if (!column) return res.status(404).json({ success: false, data: null, message: "Column not found." })

    column.name = name

    saveColumns()
    return res.status(200).json({ success: true, data: column, message: "Column updated." })
})

router.patch('/:id', (req, res) => {
    const id = req.params.id
    const { name } = req.body

    const column = columns.find(column => column.id === id)

    if (!column) return res.status(404).json({ success: false, data: null, message: "Column not found." })

    column.name = name || column.name

    saveColumns()
    return res.status(200).json({ success: true, data: column, message: "Column updated." })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const column = columns.find(column => column.id === id)

    if (!column) return res.status(404).json({ success: false, data: null, message: "Column not found." })

    columns = columns.filter(column => column.id !== id)

    saveColumns()
    return res.status(200).json({ success: true, data: column, message: "Column deleted." })
})

module.exports = router