const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const fs = require('fs')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(compression())
app.use(cors({ origin: '*', methods: 'GET,POST,PUT,DELETE' }))

const v1 = require('./routes/v1')
app.use('/v1', v1)

const DB = ['./db/tasks.json', './db/members.json', './db/columns.json', './db/boards.json']
DB.map((path) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path.split('/').slice(0, -1).join('/'), { recursive: true })
        fs.writeFileSync(path, JSON.stringify([]))
    }
})

const port = process.env.PORT || 3005
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})