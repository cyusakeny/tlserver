const model = require('../models/models')
module.exports.AddCompetition = async(userId,competition)=>{
    return model.competition.create({
   name:competition.name,
   begindate:competition.begindate,
   enddate:competition.enddate,
   prize:competition.prize,
   requirements:competition.requirements,
   userId:userId
    }).then((competition)=>{return competition}).catch((err)=>{console.log(err)})
}
module.exports.RemoveCompetition = async(compId)=>{
    return model.competition.destroy({
        where:{
            id:compId
        }
    })
}
module.exports.UpdateCompetition = async(compId,compData)=>{
    return model.competition.update({
        name:compData.name,
        requirements:compData.requirements,
        prize:compData.prize,
        enddate:compData.enddate
    },{
        where:{
            id:compId
        }
    }).then(async()=>{
        return this.getComp(compId)
    }).catch(error=>{
        console.log('error',error)
    })
}
module.exports.getComp=async(id)=>{
    const comp = await model.competition.findByPk(id);
    if (comp === null) {
        return null
    }
    else{
        return comp;
    }
}
module.exports.getAllComp=async(userId)=>{
    return model.competition.findAll({
        where:{
            userId:userId
        }
    })
}