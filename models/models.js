const Sequelize = require('sequelize')
const db = require('../database')
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
        type:Sequelize.ENUM('UPCOMING','LIVE','DONE'),
        allowNull:false
        },
})
const User = db.define('user',{
    username:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true,
        
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
const Competition = db.define('competition',{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 ,
        unique: true,
        primaryKey:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    }
    ,
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
    },
    requirements:{
        type:Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
    }
})
const Result = db.define('result',{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 ,
        unique: true,
        primaryKey:true,
    },
    score:{
   type:Sequelize.DOUBLE,
   allowNull:false,
   validate:{
    isNumeric: true,
   }
    }
})
const Progress = db.define('progress',{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 ,
        unique: true,
        primaryKey:true,
    },
    lastplayed:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW
    },
    level:{
        type:Sequelize.ENUM('JUNIOR','PROFFESSOR','EXPERT'),
        allowNull:false
    }
})
User.hasOne(Progress,{as:'progress',
foreignKey:{name:'userId',allowNull:false,isUUID:4}
})
Progress.belongsTo(User,{foreignKey:'userId'});
Match.belongsTo(Competition,{foreignKey:'compid',
as:'competition'
})
Match.belongsToMany(User, { through: Result });
User.hasMany(Competition,{as:"competitions",
foreignKey:{name:'userId',allowNull:false,isUUID: 4}
})
User.belongsToMany(Match, { through: Result });
Competition.belongsTo(User,{ 
    foreignKey:"userId",
    as: "Creater" })
Competition.hasMany(Match,{as:'matches'});
module.exports.user = User
module.exports.match = Match
module.exports.result = Result
module.exports.competition = Competition
module.exports.progress = Progress