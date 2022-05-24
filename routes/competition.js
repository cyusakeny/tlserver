const express = require('express')
const router = express.Router()
const competitionService = require('../services/competition')
router.post('/add/:id',async(req,res)=>{
    const competition = {
        name:req.body.name,
        begindate:req.body.begindate,
        enddate:req.body.enddate,
        prize:req.body.prize,
        requirements:req.body.requirements
    }
    const newcompetition = await competitionService.AddCompetition(req.params.id,competition)
    res.send(JSON.parse(JSON.stringify(newcompetition))).status(201)
})
router.get('/:id',async(req,res)=>{
    const competition = await competitionService.getComp(req.params.id)
    res.send(JSON.parse(JSON.stringify(competition))).status(201)
})
router.get('/all/:id',async(req,res)=>{
    const competitions = await competitionService.getAllComp(req.params.id)
    res.send(JSON.parse(JSON.stringify(competitions))).status(201)
})
router.delete('/delete/:id',async(req,res)=>{
const competition = await competitionService.RemoveCompetition(req.params.id)
res.send('Competition deleted').status(201)
})
router.put('/update/:id',async(req,res)=>{
    const competition = {
        name:req.body.competition,
        requirements:req.body.requirements,
        prize:req.body.prize,
        enddate:req.body.enddate
    }
    const updateCompetition = await competitionService.UpdateCompetition(req.params.id,competition)
    res.send(JSON.parse(JSON.stringify(updateCompetition))).status(201)
})
module.exports = router