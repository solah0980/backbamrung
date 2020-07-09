const db = require("../config/config");

module.exports = {
    show(req,res){
        let id = req.params.id
        db.get(`SELECT * FROM teacher WHERE teacherID = ${id}`,function(err,result){
            if(err){
                return console.log(err)
            }
            res.send(result)
        })
    },
    edit(req,res){
      /*   console.log(req.body) */
        let {id,name,lastname,tell,email,profile,sex}=req.body
        db.run(`UPDATE teacher SET name = '${name}',lastname = '${lastname}',tell='${tell}',email='${email}',profile='${profile}',sex='${sex}' 
        WHERE teacherID = ${id}`,function(err){
            if(err){
                return console.log(err)
            }
            res.send('แก้ไขข้อมูลสำเร็จ')
        })
    },
    showAll(req,res){
        db.all(`SELECT teacherID,name,lastname,profile,sex FROM teacher ORDER BY teacherID`,function(err,result){
            if(err){
                return console.log(err)
            }
            res.send(result)
        })
    },
    create(req,res){
        let {name,lastname,email,tell,profile,sex}=req.body
        db.run(`INSERT INTO teacher(name,lastname,email,tell,profile,sex)
                VALUES('${name}','${lastname}','${email}','${tell}','${profile}','${sex}')`,function(err){
                    if(err){
                        return console.log(err)
                    }
                    res.send('ลงทำเบียนสำเร็จ')
                })
    },
    delete(req,res){
        console.log(req.params.id)
        db.run(`DELETE FROM teacher WHERE teacherID=${req.params.id}`, function(err) {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Row(s) deleted ${this.changes}`);
          });

    }
}