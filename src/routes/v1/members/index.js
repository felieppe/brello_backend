const express = require('express')
const router = express.Router()

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

module.exports = router