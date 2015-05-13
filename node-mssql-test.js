var sql = require('mssql'); 

var config = {
    user: 'sa',
    password: '5@wSNN5IBHSTd%sD5qefAVGR',
    server: 'ec2-54-66-138-36.ap-southeast-2.compute.amazonaws.com', // You can use 'localhost\\instance' to connect to named instance
    database: 'test',

    options: {
    //    encrypt: true // Use this if you're on Windows Azure
    }
}

var connection = new sql.Connection(config, function(err) {
    if(err){
      console.log(err);
    }

    // Query

    var request = new sql.Request(connection); // or: var request = connection.request();
    request.query('select 1 as number', function(err, recordset) {
        // ... error checks

        console.dir(recordset);
    });

    request = new sql.Request(connection); // or: var request = connection.request();
    request.query('SELECT count(*) FROM TestTableSize', function(err, recordset) {
        // ... error checks

        console.dir(recordset);
    });

    request = new sql.Request(connection); // or: var request = connection.request();
    request.query('SELECT TOP 100 * FROM TestTableSize', function(err, recordset) {
        // ... error checks

        console.dir(recordset);
    });

    

    // Stored Procedure

    var request = new sql.Request(connection);
    request.input('Param1', sql.VarChar(50));
    //request.output('output_parameter', sql.VarChar(50));
    request.execute('proc1', function(err, recordsets, returnValue) {
        if(err){
          console.log(err);
        }

        console.dir(recordsets);
    });

});