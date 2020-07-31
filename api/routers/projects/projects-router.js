const express = require('express')

const db = require('./projects-model')
const auth = require('../../middleware/auth-router')

const project = express.Router()

// GET all of user's projects
project.get('/:userId', auth(), async(req, res, next) => {
  try {
    const projects = await db.allUsersProjects(req.params.userId)
    res.json(projects)
  }
  catch(err) {next(err)}
})

// GET specific project of user
project.get('/:userId/:id', auth(), async(req, res, next) => {
  try {
    const userProject = await db.specificProject(req.params.userId, req.params.id)

    res.json(userProject)
  }
  catch(err) {next(err)}
})

// CREATE
project.post('/:userId', auth(), async(req, res, next) => {
  try {
    const newProject = await db.add({...req.body, user_id: req.params.userId})

    res.json({msg: 'new project added'})
  }
  catch(err) {next(err)}
})

// DELETE
project.delete('/:userId/:id', auth(), async(req, res, next) => {
  try{
    db.remove(req.params.userId, req.params.id)
    res.status(204).json({msg: 'project deleted'})
  }
  catch(err) {next(err)}
})

module.exports = project

// goals
// title date id (delete, fetch, put, update)

// values has true/false