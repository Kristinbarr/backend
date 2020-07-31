const db = require('../../data/dbConfig')

module.exports = {
  find,
  add
}

function find(userId) {
  return db('goals')
  .where('user_id', userId)
}

function add(newGoal) {
  return db('goals')
  .insert(newGoal)
}