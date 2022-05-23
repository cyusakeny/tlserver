const express = require('express')
const router = express.Router()
const progressService = require('../services/progress')

router.get('/:id',async(req,res)=>{
    const progress = await progressService.getProgress(req.params.id)
    res.send(JSON.parse(JSON.stringify(progress))).status(201)
})
router.post('/add/:id',async(req,res)=>{
    const level = req.body.level
    const progress = await progressService.Addprogress(level,req.params.id)
    res.send(JSON.parse(JSON.stringify(progress))).status(201)
})
router.delete('/delet/:id',async(req,res)=>{
    const deleteprogress = await progressService.RemoveProgress(req.params.id)
    res.send('Progress removed').status(201)
})
router.put('/update/:id',async(req,res)=>{
    const level = req.body.level
    const updateProgress = await progressService.UpdateProgress(req.params.id,level)
    res.send(JSON.parse(JSON.stringify(updateProgress))).status(201)
})