const { password } = require('pg/lib/defaults')
const Sequelize = require('sequelize')
const db = require('../database')
const User = db.define('user',{
    name:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    },
    id:{
        type:Sequelize.UUID
    }
})
module.exports = User