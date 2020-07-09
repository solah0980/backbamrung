const express = require('express')
const app = express()
const bodyPaser = require('body-parser')
let cors = require('cors')
const port = 8081 || process.env.PORT

app.use(bodyPaser.json())
app.use(bodyPaser.urlencoded({extended:false}))

app.use(cors())
app.use('/assets', express.static('public'))

require('./passport')
require('./config/config')
require('./route')(app)


app.listen(port,()=>{
    console.log(`server online on port ${port}`)
})