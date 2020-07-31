const express = require('express')

const db = require('./goals-model')
const auth = require('../../middleware/auth-router')

const goal = express.Router()

// get the goals of a user
goal.get('/:userId', auth(), async(req, res, next) => {
  try {
    const goals = await db.find(req.params.userId)
    
    res.json(goals)
  }
  catch(err) {next(err)}
})

// add a goal
goal.post('/:userId', auth(), async(req, res, next) => {
  try {
    const newGoal = await db.add({...req.body, user_id: req.params.userId})

    res.status(201).json({msg: 'goal added'})
  }
  catch(err) {next()}
})

module.exports = goal