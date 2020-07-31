const express = require('express')

const db = require('./values-model')
const auth = require('../../middleware/auth-router')

const value = express.Router()

value.get('/', async(req, res, next) => {
  try {
    const values = await db.find()
    res.json(values)
  }
  catch(err) {next(err)}
})

// value.post('/:user_id', async(req, res, next) => {
//   try {
//     const trut
//   }
//   catch(err) {next(err)}
// })


module.exports = value