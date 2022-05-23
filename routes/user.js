const express = require('express')
const router = express.Router()
const userservice = require('../services/user')

router.get('/',async(req,res)=>{
    const users =await userservice.findAllUsers()
   res.send(JSON.parse(JSON.stringify(users))).status(201)
})
router.get('/:id',async(req,res)=>{
    const id = req.params.id
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
        gender:req.body.gender
    }
    const newUser = await userservice.addUser(user)
    res.send(JSON.parse(JSON.stringify(newUser))).status(201)
})
router.put('/update/:id',async(req,res)=>{
const user = {
    username:req.body.username,
    password:req.body.password,
    lastname:req.body.lastname,
    firstname:req.body.firstname
}
const UpdateUser = await userservice.UpdateUser(req.params.id,user)
res.send(JSON.parse(JSON.stringify(UpdateUser))).status(201)
})
router.delete('/delete/:id',async(req,res)=>{
    const user = await userservice.DeleteUser(req.params.id)
    res.send(JSON.parse(JSON.stringify(user))).status(201)
})
module.exports =router