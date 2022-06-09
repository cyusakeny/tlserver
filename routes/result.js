const express = require('express')
const router = express.Router()
const resultService = require('../services/result')
const util = require('../utils/token')
router.get('/userresults/:id',util.authenticateToken,async(req,res)=>{
    const results = await resultService.getAllUserResults(req.params.id)
    res.send(JSON.parse(JSON.stringify(results))).status(201)
})
router.get('/matchresults/:id',util.authenticateToken,async(req,res)=>{
    const results = await resultService.getAllMatchResults(req.params.id)
    res.send(JSON.parse(JSON.stringify(results))).status(201)
})
router.post('/add/:match',util.authenticateToken,async(req,res)=>{
    const newresult = await resultService.AddResult(req.params.match,req.user.id,req.body.score)
    res.send(JSON.parse(JSON.stringify(newresult))).status(201)
})
router.post('/update/:match',util.authenticateToken,async(req,res)=>{
    const updateResult = await resultService.UpdateResult(req.params.match,req.user.id,req.body.score)
    console.log('update:',updateResult)
    res.send('User saved').status(201)
})
module.exports = router