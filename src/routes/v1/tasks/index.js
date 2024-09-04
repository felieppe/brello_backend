const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')

var tasks = [
    {
        id: "40d4eb3d-41c9-4c51-9a31-002c8b1b421a",
        title: "Task 1",
        description: "This is the first task.",
        assigned: [1],
        priority: 3,
        state: 3,
        limit: undefined
    }
]

router.get('/', (req, res) => {
    return res.status(200).json({ success: true, data: tasks, message: "Found tasks." })
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const task = tasks.find(task => task.id === id)

    if (!task) return res.status(404).json({ success: false, data: null, message: "Task not found." })
    return res.status(200).json({ success: true, data: task, message: "Found task." })
})

router.post('/', (req, res) => {
    const { title, description, assigned, priority, state, limit } = req.body
    if (!title || !description || !limit) return res.status(400).json({ success: false, data: null, message: "Missing fields." })

    const task = { id: uuidv4(), title: title, description: description, assigned: [parseInt(assigned)], priority: priority ? priority : 0  , state: state, limit: limit }
    tasks.push(task)

    return res.status(201).json({ success: true, data: task, message: "Task created." })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const { title, description, assigned, priority, state, limit } = req.body
    if (!title || !description || !assigned || !priority || !state || !limit) return res.status(400).json({ success: false, data: null, message: "Missing fields." })

    const task = tasks.find(task => task.id === id)

    if (!task) return res.status(404).json({ success: false, data: null, message: "Task not found." })

    task.title = title
    task.description = description
    task.assigned = [parseInt(assigned)]
    task.priority = priority
    task.state = state
    task.limit = limit

    return res.status(200).json({ success: true, data: task, message: "Task updated." })
})

router.patch('/:id', (req, res) => {
    const id = req.params.id
    const { title, description, assigned, priority, state, limit } = req.body
    const task = tasks.find(task => task.id === id)

    if (!task) return res.status(404).json({ success: false, data: null, message: "Task not found." })

    if (title) task.title = title
    if (description) task.description = description
    if (assigned) task.assigned = [parseInt(assigned)]
    if (priority) task.priority = priority
    if (state) task.state = state
    if (limit) task.limit = limit

    return res.status(200).json({ success: true, data: task, message: "Task updated." })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    tasks = tasks.filter(task => task.id !== id)

    return res.status(200).json({ success: true, data: {}, message: "Task deleted." })
})

module.exports = router