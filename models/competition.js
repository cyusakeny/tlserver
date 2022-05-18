const Sequelize = require('sequelize')
const db = require('../database')
const User = require('./user')
const Match = require('./match')
const Competition = db.define('competition',{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 ,
        unique: true,
        primaryKey:true,
    },
    begindate:{
    type:Sequelize.DataTypes.DATE,
    allowNull: false,
    validate:{
        isDate: true, 
    }
    },
    enddate:{
        type:Sequelize.DATE,
        allowNull: false,
        validate:{
            isDate: true, 
        },
        },
    prize:{
        type:Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        validate:{
            is: /^[a-z]+$/i,
            max:6
        }
    },
    requirements:{
        type:Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        validate:{
            is: /^[a-z]+$/i,
            max:8
        }
    }
})
Competition.belongsTo(User,{ 
    foreignKey:"userId",
    as: "Creater" })
Competition.hasMany(Match,{as:'matches'})
module.exports = Competition