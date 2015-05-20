'use strict';

describe('Controller: IcpCtrl', function () {

  // load the controller's module
  beforeEach(module('devApp'));

  var IcpCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IcpCtrl = $controller('IcpCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
