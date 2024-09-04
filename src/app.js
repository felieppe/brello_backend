const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const fs = require('fs')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(compression())

const v1 = require('./routes/v1')
app.use('/v1', v1)

const DB_TASKS = './db/tasks.json'
if (!fs.existsSync(DB_TASKS)) {
    fs.mkdirSync(DB_TASKS.split('/').slice(0, -1).join('/'), { recursive: true })
    fs.writeFileSync(DB_TASKS, JSON.stringify([]))
}

const port = process.env.PORT || 3005
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})