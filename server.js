var express = require('express')
var logger = require('morgan')
const cors = require('cors')

var indexRouter = require('./routes/index')
var authRouter = require('./routes/authentication')

const PORT = process.env.PORT || 3001

const db = require('./db')

var app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', authRouter)

app.use('/', (req, res) => {
  res.send(`Connected!`)
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
