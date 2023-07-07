const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const authRouter = require('./routes/authentication')
const recipeRouter = require('./routes/recipes')
const groceryListRouter = require('./routes/groceryLists')

const PORT = process.env.PORT || 3001

const db = require('./db')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', authRouter)
app.use('/recipe', recipeRouter)

app.use('/', (req, res) => {
  res.send(`Connected!`)
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
