const jwt = require("jsonwebtoken");
const db = require("../config/config");
const bcrypt = require("bcrypt");

function signJWT(result) {
  let dataJWT = jwt.sign(
    {
      username: result.username,
      name: result.name,
      lastname: result.lastname,
      email: result.email,
    },
    "solah",
    { expiresIn: "1h" }
  );

  return dataJWT;
}
module.exports = {
  adminLogin(req, res) {
    try {
      let { username, password } = req.body;
      db.get(
        `SELECT * FROM admin WHERE username='${username}'`,
        (error, result) => {
          if (error) {
            return console.log(error);
          }
          if (result == undefined) {
            return res.send({ error: "Not found User" });
          }

          let resultPass = bcrypt.compareSync(password, result.password);
          if (resultPass == true) {
            let jwt = signJWT(result);
            let data = {
              user:{
                username:result.username,
                name:result.name,
                lastname:result.lastname,
                email:result.email
              },
              token:jwt
            }
            res.send(data);
          } else {
            res.send({ error: "password wrong" });
          }
        }
      );
    }catch(err){
      res.status(403).send({error:'error 403'})
    }
  },
  createAdmin(req, res) {
    let { username, password, name, lastname, email, status } = req.body;
    let hashPass = bcrypt.hashSync(password, 10);
    db.run(
      `INSERT INTO admin(username, password, name, lastname, email, status) VALUES('${username}','${hashPass}','${name}','${lastname}','${email}','${status}')`,
      (err) => {
        if (err) {
          return res.send({ error: "email หรือ username ซ้ำ" });
        }
        res.send("create success!");
      }
    );
  },
};
