const express = require('express')
const router = express.Router()
const resultService = require('../services/result')
router.get('/userresults/:id',async(req,res)=>{
    const results = await resultService.getAllUserResults(req.params.id)
    res.send(JSON.parse(JSON.stringify(results))).status(201)
})
router.get('/matchresults/:id',async(req,res)=>{
    const results = await resultService.getAllMatchResults(req.params.id)
    res.send(JSON.parse(JSON.stringify(results))).status(201)
})
router.post('/add/:user/:match',async(req,res)=>{
    const newresult = await resultService.AddResult(req.params.match,req.params.user,req.body.score)
    res.send(JSON.parse(JSON.stringify(newresult))).status(201)
})