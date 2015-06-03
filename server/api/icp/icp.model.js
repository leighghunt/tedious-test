var app = require('../../app');
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


function ICP(){
	this.ICP = 0;
	this.InstallationDate = 0;
	this.ANZSICID = 0;
	this.SupplyID = 0;
	this.NetworkOwnerID = 0;
	this.Inside = 0;
	this.LocationDetail = 0;
	this.FlatSuiteAprtmnt = 0;
	this.PremiseName = 0;
	this.HouseNumLow = 0;
	this.HouseNumHigh = 0;
	this.HouseNumSuffix = 0;
	this.StreetID = 0;
	this.Suburb = 0;
	this.PostCode = 0;
	this.EndUser = 0;
	this.NoAddressFlag = 0;
	this.SubDivNumber = 0;
	this.LotNumber = 0;
	this.ValveTypeID = 0;
	this.ValveInstallDate = 0;
	this.RegulatorTypeID = 0;
	this.RegulatorInstallDate = 0;
	this.GateSupplyPressureID = 0;
	this.Altitude = 0;
	this.Pressure = 0;
	this.LoadShedCategoryID = 0;
	this.MaintenanceCategoryID = 0;
	this.RestorationCategoryID = 0;
	this.Notes = 0;
	this.Deleted = 0;
	this.Modstamp = 0;
	this.DependantSites = 0;
	this.MaximumHourlyQuantity = 0;
}

module.exports = ICP;

module.exports.find = function(criteria, callback) {
	console.log("icp.find()");

	criteria = typeof criteria !== 'undefined' && criteria != null ? criteria : {};

	sql.connect(config, function(err) {
	    if(err){
	      console.log(err);
	      return;
	    }
	    console.log(criteria);

	    var request = new sql.Request();

      console.time("ICP Search");
      request.input('ICP', sql.VarChar(15), criteria.ICP);
	   	request.query("SELECT TOP 10 ICP FROM ICP WHERE ICP LIKE '%' + @ICP + '%'", function(err, recordsets, returnValue) {
	        if(err){
	          console.log(err);
        		callback(err);
	        }

	        console.log(recordsets);
	        if(recordsets!=null)
	        {
		        console.log(recordsets.length);
		        console.timeEnd("ICP Search");

	      		callback(null, recordsets);
	      	}
      });

/*
	    console.time("spICPSearch");
	    console.log(criteria);

	    var request = new sql.Request();

	    request.input('ICP', sql.VarChar(15), criteria.ICP);
			request.input('SupplyID', sql.VarChar(15), criteria.SupplyID);
			request.input('FlatSuiteAprtmnt', sql.VarChar(50), criteria.FlatSuiteAprtmnt);
			request.input('HouseNumLow', sql.Int, criteria.HouseNumLow);
			request.input('HouseNumHigh', sql.Int, criteria.HouseNumHigh);
			request.input('StreetID', sql.Int, criteria.StreetID);
			request.input('PremiseName', sql.VarChar(100), criteria.PremiseName);
			request.input('EndUser', sql.VarChar(150), criteria.EndUser);
			request.input('TownName', sql.VarChar(50), criteria.TownName);
			request.input('TLAName', sql.VarChar(100), criteria.TLAName);
			request.input('RegionName', sql.VarChar(50), criteria.RegionName);

	   	request.execute('spICPSearch', function(err, recordsets, returnValue) {
	        if(err){
	          console.log(err);
        		callback(err);
	        }

	        console.log(recordsets);
	        console.log(recordsets[0].length);
	        console.timeEnd("spICPSearch");

      		callback(null, recordsets);
      });
  */
});
}

module.exports.findById = function(id, callback){
	console.log("icp.findById()");
	console.log("id: >" + id + "<");
	sql.connect(config, function(err) {
	    if(err){
	      console.log(err);
	    }


	console.log("id: " + id);
	    console.time("spICPSelect");
	    var request = new sql.Request();
	    request.input('ICP', sql.VarChar(20), id);
	    request.execute('spICPSelect', function(err, recordsets, returnValue) {
	        if(err){
	          console.log(err);
        		callback(err);
	        }

	        console.dir(recordsets);
	        console.timeEnd("spICPSelect");

	        if(recordsets.length == 1 && recordsets[0].length == 1)
	        {
        		callback(null, recordsets);
	        } else
	        {
        		callback("Record not found");
	        }
      });
  });
}