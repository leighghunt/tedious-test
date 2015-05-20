'use strict';

angular.module('devApp')
  .controller('IcpCtrl', function ($scope, $http) {
    $scope.icpMatches = [];
    $scope.criteria = {
				ICP: null,
				SupplyID: null,
				FlatSuiteAprtmnt: null,
				HouseNumLow: null,
				HouseNumHigh: null,
				StreetID: null,
				PremiseName: null,
				EndUser: null,
				TownName: null,
				TLAName: null,
				RegionName: null,
    };

    $scope.updateCriteria = function(){
    	console.log("updateCriteria()");
    	if($scope.criteria.ICP.length>0){
		    $http.get('/api/icps/searchByICP/' + $scope.criteria.ICP).success(function(icpMatches) {
		      $scope.icpMatches = icpMatches;
		    });
		  } else
		  {
		  		$scope.icpMatches = [];
		  }
   };
  });
