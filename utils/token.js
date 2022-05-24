const jwt = require('jsonwebtoken')
module.exports.generateToken = (email,id)=>{
    return jwt.sign({"email":email,"id":id}, process.env.ACCESS_TOKEN, {expiresIn: '24h'})
}
module.exports.authenticateToken = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      console.log("user",user.email)
      next()
    })
}