const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const db = require('./users-model')

const user = express.Router()

const authError = {err: 'Invalid Credentials'}


// REGISTER
user.post('/register', checkForNames(), validateUserInfo(), async(req, res, next) => {
  try {

    // check for first & last name
    
    const {username, password} = req.body

    const existingUser = await db.findByUsername(username).first()

    if(existingUser) {return res.status(409).json({err: 'This username is taken'})}

    const newUser = await db.add({...req.body, password: await bcrypt.hash(password, 10)})

    res.status(201).json({msg: 'user created'})
  }
  catch(err) {next(err)}
})

// LOGIN
user.post('/login', validateUserInfo(), async(req, res, next) => {
  try{
    const {username, password} = req.body

    const user = await db.findByUsername(username)
  
    if(!user) {res.status(401).json(authError)}
  
    const checkPassword = await bcrypt.compare(password, user.password)
  
    if (!checkPassword) {res.status(401).json(authError)}
    
    const payload = {
      user_id: user.id,
      username: username,
    }

    const options = {
      expiresIn: '1d'
    }

    res.cookie('token', await jwt.sign(payload, "cake", options))

    res.json({msg: `Welcome ${user.username}`})
  }
  catch(err) {next(err)}
})

user.get('/logout', async(req, res, next) => {
  try {
    res.clearCookie('token').json({msg: 'you have been logged out'})
  }
  catch(err) {next(err)}
})

function validateUserInfo() {
  return (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({err: 'username AND password are required'})
    }
    else {next()}
  }
}

function checkForNames() {
  return (req, res, next) => {
    if (!req.body.firstName || !req.body.lastName) {
      return res.status(400).json({err: 'first name, last name, username and password are required'})
    }
    next()
  }
}
module.exports = user