const model = require('../models/models')
module.exports.findAllUsers = async()=>{
return model.user.findAll();
}
module.exports.findUser = async(id)=>{
    const user = await model.user.findByPk(id);
    if (user === null) {
        return null
    }
    else{
        return user;
    }
}
module.exports.addUser = async(user)=>{
return model.user.create({
username:user.username,
email:user.email,
firstname:user.firstname,
lastname:user.lastname,
password:user.password,
gender:user.gender
}).then((user)=>{
    return user
}).catch((error)=>{
    return error;
})
}
module.exports.UpdateUser = async(id,UserData)=>{
return  model.user.update({ 
  lastname: UserData.lastName,
  firstname:UserData.firstname,
  password:UserData.password,
  username: UserData.username}, {
      where: {
        id:id
      }
    }).then(async()=>{
      return  this.findUser(id)
    })
}
module.exports.DeleteUser =  async(id)=>{
  const user = await this.findUser(id)
    await model.user.destroy({
        where: {
          id:id
        }
      })
      return user;
}
