const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const cors = require('cors')
const app = express()
const port = process.env || 3000

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

connectDB()

app.use('/product', require('./routes/api/product'))
app.use('/auth', require('./routes/api/auth'))
app.use('/user', require('./routes/api/user'))

app.listen(port, () => console.log("Connected"))