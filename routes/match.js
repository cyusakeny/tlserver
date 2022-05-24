const express = require('express')
const router = express.Router()
const matchservice = require('../services/match')
router.post('/add',async(req,res)=>{
    const match = {
        compid:req.body.competition,
        status:req.body.status,
        date:req.body.date
    }
    const newmatch= await matchservice.AddMatch(match)
    res.send(JSON.parse(JSON.stringify(newmatch))).status(200)
})
router.get('/:id',async(req,res)=>{
const match = await matchservice.getMatch(req.params.id)
res.send(JSON.parse(JSON.stringify(match))).status(201)
})
router.get('/all/:id',async(req,res)=>{
    const matches = await matchservice.getAllMatches(req.params.id)
    res.send(JSON.parse(JSON.stringify(matches))).status(201)
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