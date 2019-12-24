const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',                       
  database: 'nvest'

});


connection.connect((err) => {
  if (err) throw err;
  console.log('database Connected!');
});

module.exports =connection
