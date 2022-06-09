const express = require('express')
const router = express.Router()
const progressService = require('../services/progress')
const util = require('../utils/token')

router.get('/:id',util.authenticateToken,async(req,res)=>{
    const progress = await progressService.getProgress(req.user.id)
    res.send(JSON.parse(JSON.stringify(progress))).status(201)
})
router.post('/add/',util.authenticateToken,async(req,res)=>{
    const level = req.body.level
    const user = await progressService.getProgress(req.user.id)
    if(user.length===0){
        const progress = await progressService.Addprogress(level,req.user.id)
        res.send(JSON.parse(JSON.stringify(progress))).status(201)
    }
    else{
        const progress = await progressService.UpdateProgress(req.user.id,level)
        res.send(JSON.parse(JSON.stringify(progress))).status(201)
    }
})
router.delete('/delet/:id',util.authenticateToken,async(req,res)=>{
    const deleteprogress = await progressService.RemoveProgress(req.params.id)
    res.send('Progress removed').status(201)
})
router.put('/update/:id',util.authenticateToken,async(req,res)=>{
    const level = req.body.level
    const updateProgress = await progressService.UpdateProgress(req.params.id,level)
    res.send(JSON.parse(JSON.stringify(updateProgress))).status(201)
})
module.exports = router