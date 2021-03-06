const model = require('../models/models')
module.exports.AddMatch=async(match)=>{
return model.match.create({
    compId:match.compId,
    date:match.date,
    status:"UPCOMING",
    time:match.time,
         }).then((match)=>{return match}).catch((err)=>{console.error(err)})

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
    const match = await model.match.findByPk(id,{
        include: [
          {
            model: model.user,
          },
        ]});
    if (match === null) {
        return null
    }
    else{
        return match;
    }
}
module.exports.getAllMatches=async(compId)=>{
    const match = await  model.match.findAll({
        where:{
            compId:compId
        }
    })
    if (match === null) {
        return null
    }
    else{
        return match;
    }
    
}
module.exports.getAllByStatus = async(status)=>{
    const match = await model.match.findAll({
        where:{
            status:status
        },
        include:{
            model:model.competition,
            as:'competition'
        }
    })
    if(match===null) return null
    else return match;
}