const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
dotenv.config({path:'./config/config.env'})
const app = express()
const path = require('path')
const db  = require('./database')

if (process.env.NODE_ENV==='development') {
    app.use(morgan('dev'))
}

  db.authenticate().then(()=>{console.log('Db connected')}).catch((error)=>{
      console.error('error',error)
  })
  app.use('/users',require('./routes/user'))
const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`Server running on port ${PORT}`))