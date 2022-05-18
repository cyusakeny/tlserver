const Sequelize = require('sequelize')
const db = require('../database')
const Competition = require('./competition')
const Result = require('./result')
const Match = require('./match')
const User = db.define('user',{
    username:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate:{
            is: /^[a-z]+$/i, 
        }
        
    },
    email:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true,            
        }
    },
    password:{
        type:Sequelize.STRING,
        allowNull: false
    },
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 ,
        unique: true,
        primaryKey:true,

    },
    firstname:{
        type:Sequelize.STRING,
        allowNull: false,
        validate:{
            is: /^[a-z]+$/i, 
        }
    },
    lastname:{
        type:Sequelize.STRING,
        allowNull: false,
        validate:{
            is: /^[a-z]+$/i, 
        }
    },
    gender:{
        type:Sequelize.ENUM('FEMALE','MALE'),
        allowNull:false
    }
})
User.hasMany(Competition,{as:"competitions"})
User.belongsToMany(Match, { through: Result });
module.exports = User