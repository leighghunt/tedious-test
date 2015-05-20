console.time("TEST A");
console.time("TEST B");

var sql = require('mssql'); 

var config = {
    user: 'sa',
    password: '5@wSNN5IBHSTd%sD5qefAVGR',
    server: 'dev-gasnet.venari.co.nz', // You can use 'localhost\\instance' to connect to named instance
    database: 'midas',

    options: {
        requestTimeout: 60000
    //    encrypt: true // Use this if you're on Windows Azure
    }
}

sql.connect(config, function(err) {
    if(err){
      console.log(err);
    }

    // Query

    var request = new sql.Request(); // or: var request = .request();
    request.query('select 1 as number', function(err, recordset) {
        // ... error checks

        console.dir(recordset);
    });

    request = new sql.Request(); // or: var request = .request();
    request.query('SELECT count(*) FROM ICP', function(err, recordset) {
        // ... error checks

        console.dir(recordset);
    });

    console.time("SELECT TOP 100 * FROM ICP");

    request = new sql.Request(); // or: var request = .request();
    request.query('SELECT TOP 100 * FROM ICP', function(err, recordset) {
        // ... error checks
        console.timeEnd("SELECT TOP 100 * FROM ICP");
        console.dir(recordset.length);
    });

    // Stored Procedure

    console.time("spICPSelect");
    var request = new sql.Request();
    request.input('ICP', sql.VarChar(20), '0000011111GN400');
    request.execute('spICPSelect', function(err, recordsets, returnValue) {
        if(err){
          console.log(err);
        }

        console.log(recordsets)
        //console.dir(recordsets);
        console.timeEnd("spICPSelect");
    });

    console.time("spInvoiceSelectAllOneGo");
    var spInvoiceSelectAllOneGo = new sql.Request();
    spInvoiceSelectAllOneGo.stream = false;
    spInvoiceSelectAllOneGo.execute('spInvoiceSelectAll', function(err, recordsets, returnValue) {
        if(err){
          console.log(err);
        }

        console.timeEnd("spInvoiceSelectAllOneGo");
        console.log("spInvoiceSelectAllOneGo - length: " + recordsets[0].length);
    });

    var rowsspInvoiceSelectAllStream = 0;

    console.time("spInvoiceSelectAllStream");
    var spInvoiceSelectAll = new sql.Request();
    spInvoiceSelectAll.stream = true;
    spInvoiceSelectAll.execute('spInvoiceSelectAll');

    spInvoiceSelectAll.on('recordset', function(columns) {
        console.log("spInvoiceSelectAll - on recordset");
        //console.dir(columns);
        // Emitted once for each recordset in a query
    });

    spInvoiceSelectAll.on('row', function(row) {
        //console.log("spInvoiceSelectAll - on row");
        //console.dir(row);
        ++ rowsspInvoiceSelectAllStream;
    });

    spInvoiceSelectAll.on('error', function(err) {
        console.log("spInvoiceSelectAll - on error");
        console.dir(err);
    });

    spInvoiceSelectAll.on('done', function(returnValue) {
        console.log("spInvoiceSelectAll - on done");
        console.dir(returnValue);
        console.log("rows: " + rowsspInvoiceSelectAllStream)
        console.timeEnd("spInvoiceSelectAllStream");

    });

    rowsAuditTable = 0;

    console.time("SELECT * FROM AuditTable streamed");

    request = new sql.Request(); // or: var request = .request();
    request.stream = true;
    request.query('SELECT TOP 1000 * FROM AuditTable');

    // 1000 0.5s
    // 10000 1s
    // 100000 7s
    // 700875 44s from home, 26s from AWS to AWS Sydney

    request.on('recordset', function(columns) {
        console.log("spInvoiceSelectAll - on recordset");
    });

    request.on('row', function(row) {
        ++ rowsAuditTable;
    });

    request.on('error', function(err) {
        console.dir(err);
    });

    request.on('done', function(returnValue) {
        console.log("rows: " + rowsAuditTable)
        console.timeEnd("SELECT * FROM AuditTable streamed");

    });


});

console.timeEnd("TEST A");
