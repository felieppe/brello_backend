const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(compression())

const v1 = require('./routes/v1')
app.use('/v1', v1)

const port = process.env.PORT || 3005
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})