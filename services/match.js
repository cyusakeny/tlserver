const model = require('../models/models')
module.exports.AddMatch=async(match)=>{
return model.match.create({
    compid:match.compid,
    date:match.date,
    status:match.status
         }).then((match)=>{return match}).catch((err)=>{return err})

}
module.exports.RemoveMatch = async(matchid)=>{
    return model.match.destroy({
        where:{
            id:matchid
        }
    })
}
module.exports.UpdateMatch = async(matchid,matchData)=>{
    return model.match.update({
        date:matchData.date,
        status:matchData.status
    },{
        where:{
            id:matchid
        }
    }).then(async()=>{
        return this.getMatch(matchid)
    })
}
module.exports.getMatch = async(id)=>{
    const match = await model.match.findByPk(id);
    if (match === null) {
        return null
    }
    else{
        return match;
    }
}
module.exports.getAllMatches=async(compId)=>{
    return model.match.findAll({
        where:{
            compId:compId
        }
    })

}