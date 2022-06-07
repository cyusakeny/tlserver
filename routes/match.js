const express = require('express')
const router = express.Router()
const matchservice = require('../services/match')
const userservice = require('../services/user')
const resultservice = require('../services/result')
router.post('/add',async(req,res)=>{
    console.log(req.body.status)
    const match = {
        compId:req.body.competition,
        status:req.body.status,
        date:req.body.date,
        time:req.body.time
    }
    const newmatch= await matchservice.AddMatch(match)
    const jsonnewmatch =  JSON.parse(JSON.stringify(newmatch))
    const users = req.body.users
    if(users.length!==0){
        users.map(async(users)=>{
          const player = await userservice.findUserByEmail(users)
          const jsonplayer = JSON.parse(JSON.stringify(player))
          const result = await resultservice.AddResult(jsonnewmatch.id,jsonplayer.id,'0')
        })
    }
    res.send(jsonnewmatch).status(200)
})
router.get('/match/:id',async(req,res)=>{
const match = await matchservice.getMatch(req.params.id)
if(match!==null){
    res.send(JSON.parse(JSON.stringify(match))).status(201)
}
else{
    res.send('Empty').status(200)
}
})
router.get('/all/:id',async(req,res)=>{
    const matches = await matchservice.getAllMatches(req.params.id)
    console.log('Our id:',req.params.id)
    if(matches!==null){
        res.send(JSON.parse(JSON.stringify(matches))).status(201)
    }
    else{
        res.send('Empty').status(200)
    }
})
router.put('/update/:id',async(req,res)=>{
    const match = {
        status:req.body.status,
        date:req.body.status
    } 
    const updatematch = await matchservice.UpdateMatch(req.params.id,match)
    res.send(JSON.parse(JSON.stringify(updatematch))).status(201)
})
router.delete('/delete/:id',async(req,res)=>{
    const deleteuser = await matchservice.RemoveMatch(req.params.id)
    res.send('User deleted').status(201)
})
module.exports = router