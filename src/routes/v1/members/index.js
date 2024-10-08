const express = require('express')
const router = express.Router()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const DB_MEMBERS = './db/members.json'
var members = []

function getMembers() {
    if (!fs.existsSync(DB_MEMBERS)) {
        fs.mkdirSync(DB_MEMBERS.split('/').slice(0, -1).join('/'), { recursive: true })
        fs.writeFileSync(DB_MEMBERS, JSON.stringify([]))
    }

    return JSON.parse(fs.readFileSync(DB_MEMBERS))
}

function saveMembers() {
    fs.writeFileSync(DB_MEMBERS, JSON.stringify(members))
}

router.use((req, res, next) => {
    members = getMembers()
    next()
})

router.get('/', (req, res) => {
    return res.status(200).json({ success: true, data: members, message: "Found members." })
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const member = members.find(member => member.id === id)

    if (!member) return res.status(404).json({ success: false, data: null, message: "Member not found." })
    return res.status(200).json({ success: true, data: member, message: "Found member." })
})

router.post('/', (req, res) => {
    const { name, email, role, pfp } = req.body
    if (!name || !email || !role) return res.status(400).json({ success: false, data: null, message: "Missing fields." })

    const member = { id: uuidv4(), name: name, email: email, role: role, pfp: pfp }
    members.push(member)

    saveMembers()
    return res.status(201).json({ success: true, data: member, message: "Member created." })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const { name, email, role, pfp } = req.body
    if (!name || !email || !role) return res.status(400).json({ success: false, data: null, message: "Missing fields." })

    const member = members.find(member => member.id === id)

    if (!member) return res.status(404).json({ success: false, data: null, message: "Member not found." })

    member.name = name
    member.email = email
    member.role = role
    member.pfp = pfp

    saveMembers()
    return res.status(200).json({ success: true, data: member, message: "Member updated." })
})

router.patch('/:id', (req, res) => {
    const id = req.params.id
    const { name, email, role, pfp } = req.body

    const member = members.find(member => member.id === id)

    if (!member) return res.status(404).json({ success: false, data: null, message: "Member not found." })

    if (name) member.name = name
    if (email) member.email = email
    if (role) member.role = role
    if (pfp) member.pfp = pfp

    saveMembers()
    return res.status(200).json({ success: true, data: member, message: "Member updated." })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const member = members.find(member => member.id === id)

    if (!member) return res.status(404).json({ success: false, data: null, message: "Member not found." })

    members = members.filter(member => member.id !== id)
    saveMembers()
    return res.status(200).json({ success: true, data: member, message: "Member deleted." })
})

module.exports = router