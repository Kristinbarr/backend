const db = require('../../data/dbConfig')

module.exports = {
  findByUsername,
  findById,
  add,
  remove
}
// NOTES
//add an update function for changing pass?

function findByUsername(username) {
  return db('users')
  .select('id', 'username', 'password')
  .where('username', username)
  .first()
}

function findById(id) {
  return db('users')
  .where('id', id)
  .first()
}

function add(newUser) {
  return db('users')
  .insert(newUser, 'id').then(ids => {{id: ids[0]}})
}

function remove(id) {
  return db('users')
  .where('id', id)
  .del()
}