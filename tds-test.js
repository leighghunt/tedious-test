var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = {
  server: 'localhost',
  userName: 'sa',
  password: 'sa'
  /*
  ,options: {
    debug: {
      packet: true,
      data: true,
      payload: true,
      token: false,
      log: true
    },
    database: 'DBName',
    encrypt: true // for Azure users
  }
  */
};


console.log("creating connection...");
var connection = new Connection(config);
console.log("connection created.");
  
connection.on('connect', function(err) {
    console.log("connection on connect())");
  
    if(err){
      console.log(err);
    }

    // If no error, then good to go...
    executeStatement();
  }
);

connection.on('debug', function(text) {
    console.log("connection on debug())");
    console.log(text);
  }
);

function executeStatement() {
  console.log("executeStatement()...");
  request = new Request("select 42, 'hello world'", function(err, rowCount) {
    if (err) {
      console.log(err);
    } else {
      console.log(rowCount + ' rows');
    }

    connection.close();
  });

  request.on('row', function(columns) {
    columns.forEach(function(column) {
      if (column.value === null) {
        console.log('NULL');
      } else {
        console.log(column.value);
      }
    });
  });

  request.on('done', function(rowCount, more) {
    console.log(rowCount + ' rows returned');
  });

  // In SQL Server 2000 you may need: connection.execSqlBatch(request);
  connection.execSql(request);
}