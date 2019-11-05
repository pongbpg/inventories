
const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '11223344',
  connectionLimit: 5,
  database: 'inventories'
});

module.exports = (req, res, next) => {
  pool.getConnection()
    .then(conn => {
      console.log("connected db success! connection id is " + conn.threadId);
      req._sql = conn;
      conn.end(); //release to pool
      next();
    })
    .catch(err => {
      console.log("not connected due to error: " + err);
    });
}