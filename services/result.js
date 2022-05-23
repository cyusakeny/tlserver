const model = require('../models/models')
module.exports.AddResult=async(matchId,UserId,score)=>{
    model.result.Create({
        matchId:matchId,
        userId:UserId,
        score:score
    })
}
module.exports.RemoveResult=async(id)=>{
model.result.destroy({where:{
    id:id
}})
}
module.exports.UpdateResult=async(id,score)=>{
    model.result.update({
        score:score
    },{
        where:{
            id:id
        }
    })
}
module.exports.getAllUserResults=async(userid)=>{
    model.result.findAll({
        where:{
            userId:userid
        }
    }).then(user=>{
        return user
    }).catch(error=>{
        console.log(error)
    })
}
module.exports.getAllMatchResults=async(matchId)=>{
    model.result.findAll({
        where:{
            matchId:matchId
        }
    })
}