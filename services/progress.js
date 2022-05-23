const model = require('../models/models')
module.exports.Addprogress =async(level,userId)=>{
return model.progress.create({
    level:level,
    userId:userId
}).then((progress)=>{
    return progress;
}).catch((error)=>{
    return error;
})
}

module.exports.RemoveProgress = async(id)=>{
    return model.progress.destroy({
        where:{
            id:id
        }
    })
}
module.exports.UpdateProgress = async(progressId,level)=>{
    return model.progress.update({
        level:level,
    },{
        where:{
            id:progressId
        }
    }).then(async()=>{
return model.progress.findByPk(progressId)
    })
}
module.exports.getProgress = async(id)=>{
    const progress = await model.progress.findAll({
        where:{
            userId:id
        }
    });
    if (progress === null) {
        return null
    }
    else{
        return progress;
    }
}