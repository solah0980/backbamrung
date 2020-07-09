let passport = require('passport')

module.exports=function(req,res,next){
    passport.authenticate('jwt',function(err,user){
      if(err||!user){
        return res.send('not access')
      }
      req.user=user
      next()
    })(req,res,next)
}