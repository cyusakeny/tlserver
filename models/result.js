const Sequelize = require('sequelize')
const db = require('../database')
const Result = db.define('result',{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 ,
        unique: true,
        primaryKey:true,
    },
    score:{
   type:Sequelize.NUMBER,
   allowNull:false,
   validate:{
    isNumeric: true,
   }
    }
})
module.exports = Result;