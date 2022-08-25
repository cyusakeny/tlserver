const { use } = require('passport');
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
module.exports.findUserByEmail = async(email)=>{
  const user = await model.user.findOne({
    where:{
      email:email
    }
  })
  if(user===null){
    return null
  }
  else{
    return user
  }
}
module.exports.addUser = async(user)=>{
return model.user.create({
username:user.username,
email:user.email,
firstname:user.firstname,
lastname:user.lastname,
password:user.password,
gender:user.gender,
image:user.image
}).then((user)=>{
    return user
}).catch((error)=>{
    return error;
})
}
module.exports.UpdateUser = async(id,UserData)=>{
return  model.user.update({ 
  username: UserData.username,
  image:UserData.image
}, 
{
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
module.exports.Login = async(email,password)=>{
  return model.user.findOne({where:{email:email,password:password}}).then(user=>{
    return user
  }).catch(error=>{
    console.log(error)
  })
}
