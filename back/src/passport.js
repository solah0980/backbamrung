const passport = require('passport')

const Extract = require('passport-jwt').ExtractJwt
const Strategy = require('passport-jwt').Strategy

let db = require('./config/config')

passport.use(new Strategy({
    jwtFromRequest: Extract.fromAuthHeaderAsBearerToken(),
    secretOrKey:'solah'
}, function(jwtPlayload,done){
    try{
        db.get(`SELECT * FROM admin WHERE username = '${jwtPlayload.username}'`,function(err,result){
            if(!result){
                return done(null,false)
            }
            done(null,result)
        })
    }catch(err){
        done(Error,false)
    }
}))

module.exports = null