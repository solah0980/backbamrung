const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const dbPath = path.resolve(__dirname, 'DbBamrung.sqlite')

let db = new sqlite3.Database(dbPath , sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected database success.');
})

module.exports = db