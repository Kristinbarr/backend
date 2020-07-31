const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
// const session = require('express-session')
// const KnexSessionStore = require('connect-session-knex')(session)

// const dbConfig = require('./data/dbConfig')

const server = express()

// import routers
const welcomeRouter = require('./routers/welcome-router')
const userRouter = require('./routers/users/users-router')
const projectRouter = require('./routers/projects/projects-router')
const valueRouter = require('./routers/values/values-router')
const goalRouter = require('./routers/goals/goals-router')

server.use(express.json())
server.use(cors())
server.use(cookieParser())
// server.use(session({
//   resave: false,
//   saveUninitialized: false,
//   secret: 'cake',
//   store: new KnexSessionStore({
//     knex: dbConfig,
//     createtable: true
//   })
// }))

// err mw
server.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({err: 'Something went wrong...'})
  next()
})

server.get('/', (req, res) => {
	res.status(200).json({
		message: 'The API is running!'
	})
})

// init routers
server.use('/api', welcomeRouter)
server.use('/api/auth',userRouter )
server.use('/api/projects',projectRouter )
server.use('/api/values',valueRouter )
server.use('/api/goals',goalRouter )


module.exports = server 