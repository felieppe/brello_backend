const express = require('express')
const router = express.Router()

const tasks = [
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

module.exports = router