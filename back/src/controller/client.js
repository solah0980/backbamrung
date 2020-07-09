const db = require("../config/config");

module.exports = {
  showClientSuject(req, res) {
    let name = req.params.name
    db.get(`SELECT * FROM gSubject WHERE title  = '${name}'`,function(err,result){
        if(err){
            return console.log(err)
        }
        res.send(result)
    });
  },
  showTeacherClient(req,res){
    let a = null
    let i = 1
    let data = []
    let id = req.params.id
    db.all(`SELECT * FROM teasub WHERE gsubjectID = ${id} `,function(err,result){
        if(err){
            return console.log(err)
        }
        a=result.length
        if(a==0)return res.send({data:'ไม่มีข้อมูลคุณครู'})
        else{
        result.forEach((r)=>{
            db.get(`SELECT * FROM teacher WHERE teacherID = ${r.teacherID}`,function(err,result){
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
      }
    })
},
};
