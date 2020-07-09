const db = require("../config/config");

module.exports={
    edit(req,res){
        let {id,title,content,pictures,teacher}=req.body
        db.run(`UPDATE gSubject SET title = '${title}',content = '${content}',pictures='${pictures}',teacher='${teacher}' 
        WHERE gsubjectID = ${id}`,function(err){
            if(err){
                return console.log(err)
            }
            res.send('แก้ไขข้อมูลสำเร็จ')
        })
    },
    show(req,res){
        let id = req.params.id
        db.get(`SELECT * FROM gSubject WHERE gsubjectID = ${id}`,function(err,result){
            if(err){
                return console.log(err)
            }
            res.send(result)
        })
    },
    showAll(req,res){
        db.all(`SELECT gSubjectID,title FROM gSubject ORDER BY gsubjectID`,function(err,result){
            if(err){
                return console.log(err)
            }
            res.send(result)
        })
    },
    showTeacher(req,res){
        let a = null
        let i = 1
        let data = []
        let id = req.params.id
        db.all(`SELECT * FROM teasub WHERE gsubjectID = ${id} `,function(err,result){
            if(err){
                return console.log(err)
            }
            a=result.length
            result.forEach((r)=>{
                db.get(`SELECT teacherID,name,lastname FROM teacher WHERE teacherID = ${r.teacherID}`,function(err,result){
                    if(err){
                        return console.log(err)
                    }
                    result.teasubID=r.teasubID
                    data.push(result)
                    if(i-a==0){
                        return res.send(data)
                    }
                    i++
                })
            })
        })
    },
    
    addTeacher(req,res){
        let {teacherID,gsubjectID}=req.body
        db.run(`INSERT INTO teasub(teacherID,gsubjectID) VALUES(${teacherID},${gsubjectID})`, function(err) {
            if (err) {
              return console.log(err.message);
            }
            // get the last insert id
            res.send(`Add teacher success`);
          });
    },
    deleteTeacher(req,res){
        console.log(req.body)
        db.run(`DELETE FROM teasub WHERE teasubID=${req.body.ID}`, function(err) {
            if (err) {
              return console.error(err.message);
            }
            res.send(`delete success`);
          })
    }
}
