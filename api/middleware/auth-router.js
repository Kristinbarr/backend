const jwt = require('jsonwebtoken')

function authUser() {
  return async(req, res, next) => {
    try{
      
      const token = req.cookies.token

      if(!token) {
        return res.status(401).json({msg: "You FOOL! You're not logged in!"})
      }

      jwt.verify(token, "cake")
      next()
    }
    catch(err) {next(err)}
  }
}

module.exports = authUser