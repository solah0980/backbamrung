const db = require("../config/config");
var monthNamesThai = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤษจิกายน", "ธันวาคม"];
var dayNames = ["วันอาทิตย์ที่", "วันจันทร์ที่", "วันอังคารที่", "วันพุทธที่", "วันพฤหัสบดีที่", "วันศุกร์ที่", "วันเสาร์ที่"];
var d = new Date();
module.exports = {
    create(req, res) {
        let {
            title,
            content,
            pictures,
            status,
            date
        } = req.body
        date = dayNames[d.getDay()] + " " + d.getDate() + " " + monthNamesThai[d.getMonth()] + " " + d.getFullYear()
        db.run(`INSERT INTO news(title,content,pictures,status,date) 
        VALUES('${title}','${content}','${pictures}','${status}','${date}')`, function (err) {
            if (err) {
                return console.log(err)
            }
            res.send('บันทึกข่าวสารสำเร็จ')
        })
    },
    showNews(req, res) {
        let id = req.params.id
        db.get(`SELECT * FROM news WHERE newsID = ${id}`, function (err, result) {
            if (err) {
                return console.log(err.message)
            }
            res.send(result)
        })
    },
    editNews(req, res) {
        console.log(req.body)
        let {
            id,
            title,
            content,
            pictures,
            status,
            date
        } = req.body
        console.log(req.body)
        if(req.body.set){
            db.run(`UPDATE news SET status='${req.body.status}'
            WHERE newsID = ${req.params.id}`, function (err) {
            if (err) {
                return console.log(err.message)
            }
            res.send('บันทึกสำเร็จ')
        })
        }else{
            db.run(`UPDATE news SET title = '${title}', content='${content}', pictures='${pictures}', status='${status}', date='${date}'
            WHERE newsID = ${req.params.id}`, function (err) {
                if (err) {
                    return console.log(err.message)
                }
                res.send('บันทึกสำเร็จ')
            })
    }
    },
    showAll(req, res) {
        console.log(req.params.name)
        if (req.params.name == 'admin') {
            db.all(`SELECT * FROM news`, function (err, result) {
                if (err) {
                    return console.log(err)
                }
                res.send(result)
            })
        }else{
            db.all(`SELECT newsID,title FROM news WHERE status='true' ORDER BY newsID DESC`, function (err, result) {
                if (err) {
                    return console.log(err)
                }
                res.send(result)
            })
        }

    }
}