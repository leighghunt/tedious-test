'use strict';

angular.module('devApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('icp', {
        url: '/icp',
        templateUrl: 'app/icp/icp.html',
        controller: 'IcpCtrl'
      });
  });