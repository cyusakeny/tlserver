const Sequelize = require('sequelize')
const db = require('../database')
const User = require('./user')
const Progress = db.define('progress',{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 ,
        unique: true,
        primaryKey:true,
    },
    lastPlayed:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW
    },
    level:{
        type:Sequelize.ENUM('JUNIOR','PROFFESSOR','EXPERT'),
        allowNull:false
    }
})
Progress.hasOne(User,{as:'user'})
module.exports = User