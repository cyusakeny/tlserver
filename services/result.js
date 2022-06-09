const model = require('../models/models')
module.exports.AddResult=async(matchId,UserId,score)=>{
   return model.result.create({
        matchId:matchId,
        userId:UserId,
        score:score
    }).then((response)=>{
        return response;
    }).catch(err=>console.error(err))
}
module.exports.RemoveResult=async(id)=>{
return model.result.destroy({where:{
    id:id
}})
}
module.exports.UpdateResult=async(matchId,userId,score)=>{
    return model.result.update({
        score:score
    },{
        where:{
            matchId:matchId,
            userId:userId
        }
    })
}
module.exports.getAllUserResults=async(userid)=>{
    return model.result.findAll({
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
    return model.result.findAll({
        where:{
            matchId:matchId
        }
    })
}