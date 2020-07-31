const db = require('../../data/dbConfig')

module.exports = {
  allUsersProjects,
  specificProject,
  add,
  remove
}


function allUsersProjects(userId) {
  return db('projects')
  .where('user_id', userId)
}

function specificProject(userId, id) {
  return db('projects')
  .where('user_id', userId)
  .where('id', id)
}

function add(newProject) {
  return db('projects')
  .insert(newProject, 'id').then(ids => {{id: ids[0]}})
}

function remove(id) {
  return db('projects')
  .where('id', id)
  .del()
}