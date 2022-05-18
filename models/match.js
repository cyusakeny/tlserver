const Sequelize = require('sequelize')
const db = require('../database')
const Competition = require('./competition')
const Result = require('./result')
const User = require('./user')
const Match= db.define('match',{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 ,
        unique: true,
        primaryKey:true,
    },
    date:{
        type:Sequelize.DataTypes.DATE,
        allowNull: false,
        validate:{
            isDate: true, 
        }
        },
    status:{
        type:Sequelize.ENUM('ONGOING','LIVE','DONE'),
        allowNull:false
        }
})
Match.belongsTo(Competition,{foreignKey:'compid',
as:'competition'
})
User.belongsToMany(User, { through: Result });
module.exports = Match