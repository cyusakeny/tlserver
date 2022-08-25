const express = require('express')
const router = express.Router()
const userservice = require('../services/user')
const util = require('../utils/token')
const upload = require('../utils/upload')
router.get('/',util.authenticateToken,async(req,res)=>{
    const users =await userservice.findAllUsers()
   res.send(JSON.parse(JSON.stringify(users))).status(201)
})
router.get('/user',util.authenticateToken,async(req,res)=>{
    const id = req.user.id
    console.log('Our id',id)
    const user= await userservice.findUser(id)
    res.send(JSON.parse(JSON.stringify(user))).status(201)
})
router.post('/add',async(req,res)=>{
    const user = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        password:req.body.password,
        username:req.body.username,
        email:req.body.email,
        gender:req.body.gender,
        image:null
    }
    const newUser = await userservice.addUser(user)
    if(newUser){
        res.send(JSON.parse(JSON.stringify(newUser))).status(201)
    }
    else{
        res.send('User not created').status(401)
    }
})
router.post('/update',[util.authenticateToken,upload.upload],async(req,res)=>{
    let image = ''

    if(req.file){
    image = req.file.path
    }
    else{
        let myUser = await userservice.findUser(req.user.id)
        image = JSON.parse(JSON.stringify(myUser)).image
    }
const user = {
    username:req.body.username,
    image:image
}
const UpdateUser = await userservice.UpdateUser(req.user.id,user);
res.send(JSON.parse(JSON.stringify(UpdateUser))).status(201);
}
)
router.delete('/delete/:id',async(req,res)=>{
    const user = await userservice.DeleteUser(req.params.id)
    res.send(JSON.parse(JSON.stringify(user))).status(201)
})
router.post('/login',async(req,res)=>{
    const email = req.body.email
  const password = req.body.password

const user = await userservice.Login(email,password)
if (user===null) {
    console.log("User not found")
    res.send("User not found").status(400)
}
else{
    const userEmail = JSON.parse(JSON.stringify(user)).email
    const userId = JSON.parse(JSON.stringify(user)).id
    const token = util.generateToken(userEmail,userId)
    res.json(token).status(201)
}
})
module.exports =router