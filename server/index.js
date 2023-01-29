require('dotenv').config()
const express = require('express')
const sequelize = require('./db')

const cors = require('cors')
const fileUpload = require('express-fileupload')

const models = require('./models/models')
const router = require('./routes/index')

const errorHandler = require('./middleware/errorHandlingMiddleware')

const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())

// static and file uploader
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload())

app.use('/api', router)

// middlewares
app.use(errorHandler)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'working' })
})

const start = async () => {
  try {

    // connect to database and sync with data schema
    await sequelize.authenticate()
    await sequelize.sync()

    // connect to port
    app.listen(PORT, () => console.log(`server started on port ${PORT}`))

  } catch (e) {
    console.log(e)
  }
}

start()