const adminController = require('./controller/adminController')
const subject = require('./controller/subject')
const teacher = require('./controller/teacher')
const client = require('./controller/client')
const activity = require('./controller/activity')
const news = require('./controller/news')
const authen = require('./authen/authen')
let fs = require('fs')
let multer = require('multer')
module.exports = (app)=>{
    app.get('/',(req,res)=>{
        console.log('hello world')
    })
    //Api Admin Login & Logout
    app.post('/admin/login',adminController.adminLogin)
    app.post('/admin/create',adminController.createAdmin)

    //Api Client
    app.get('/subject/view/:name',client.showClientSuject)
    app.get('/subject/view/teachers/:id',client.showTeacherClient)


   //Api Subject&Personal Admin
   app.get('/admin/subject',subject.showAll)
   app.get('/admin/subject/edit/:id',subject.show)
   app.put('/admin/subject/edit/:id',subject.edit)
   app.get('/admin/subject/teacher/:id',subject.showTeacher)
   app.put('/admin/subject/teacher/delete',subject.deleteTeacher)
   app.post('/admin/subject/teacher/add',subject.addTeacher)
   
   //Api Teacher Admin
   app.post('/admin/teacher/create',teacher.create)
   app.get('/admin/teacher',teacher.showAll)
   app.get('/admin/teacher/edit/:id',teacher.show)
   app.put('/admin/teacher/edit/:id',teacher.edit)
   app.delete('/admin/techer/delete/:id',teacher.delete)

   //Api Activity Admin
   app.get('/admin/activity/show/:id',activity.show)
   app.get('/admin/activitys/:name',activity.showAll)
   app.post('/admin/activity/create',activity.createActivity)
   app.put('/admin/activity/edit/:id',activity.editActivity)

   //Api News Admin
   app.post('/admin/news/create',news.create)
   app.get('/admin/news/show/:id',news.showNews)
   app.put('/admin/news/edit/:id',news.editNews)
   app.get('/admin/news/:name',news.showAll)

    //Api Upload Photo and Delete Photo
    app.post('/upload',function(req,res){
        upload(req,res,function(err){
            if(err){
                return res.end('Error upload picture')
            }
            res.end("upload picture success")
        })
    })
    app.post('/delete',(req,res)=>{
         fs.unlink(__dirname+'/public/uploads/'+req.body.name,function(err){
             if(err){
                 console.log(err)
             }
             res.send('delete success')
         })
         
     })
    let storage = multer.diskStorage({
        destination:function(req,file,callback){
            callback(null,"public/uploads")
        },
        filename:function(req,file,callback){
            callback(null, file.originalname)
        }
    })
    let upload = multer({storage:storage}).array("userPhoto",10)
}