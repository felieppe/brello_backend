const express = require('express')
const router = express.Router()

const members = [
    {
        id: 1,
        name: "Felipe Cabrera",
        pfp: "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg",
        email: "me@felieppe.com"
    }
]

router.get('/', (req, res) => {
    return res.status(200).json({ success: true, data: members, message: "Found members." })
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const member = members.find(member => member.id === id)

    if (!member) return res.status(404).json({ success: false, data: null, message: "Member not found." })
    return res.status(200).json({ success: true, data: member, message: "Found member." })
})