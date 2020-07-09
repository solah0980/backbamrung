const db = require("../config/config");

module.exports={
    createActivity(req,res){
        let {title,thumbnail,content,pictures,status}=req.body
        console.log(req.body)
        db.run(`INSERT INTO activity(title,thumbnail,content,pictures,status) VALUES('${title}','${thumbnail}','${content}','${pictures}','${status}')`, function(err) {
            if (err) {
              return console.log(err.message);
            }
            res.send('บันทึกกิจกรรมสำเร็จ')
          });

    },
    showAll(req,res){
      if(req.params.name=='admin'){
        db.all('SELECT * from activity', function (err, result) {
          if (err) {
            return console.log(err.message)
          }
          res.send(result)
        })
      }else if(req.params.name=='client'){
        db.all('SELECT * from activity WHERE status="true"', function (err, result) {
          if (err) {
            return console.log(err.message)
          }
          res.send(result)
        })
      }else{
        db.all('SELECT * from activity WHERE status="true" ORDER BY activityID DESC', function (err, result) {
          if (err) {
            return console.log(err.message)
          }
          res.send(result.slice(0,6))
        })
      }
    },
    editActivity(req,res){
      if(req.body.set){
        db.run(`UPDATE activity SET status = '${req.body.status}' WHERE activityID = ${req.body.activityID}`,
        function(err){
          if(err){
            return console.log(err.message)
          }
        })
      }else{
        let {activityID,title,thumbnail,content,pictures,status} = req.body
        db.run(`UPDATE activity SET title = '${title}',thumbnail='${thumbnail}',
        content='${content}',pictures='${pictures}',status='${status}' WHERE activityID = ${activityID}`,
        function(err){
          if(err){
            return console.log(err.message)
          }
          res.send('แก้ไขสำเร็จ')
        })
      }
      
    },
    show(req,res){
      let id =req.params.id
      db.get(`SELECT * from activity WHERE activityID = ${id}`,function(err,result){
        if(err){
          return console.log(err.message)
        }
        res.send(result)
      })
    }
}