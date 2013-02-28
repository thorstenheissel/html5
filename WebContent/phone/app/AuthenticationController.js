define(function () {
  function AuthenticationController($scope, backendService, $navigate) {

    $scope.login = function () {
      return backendService.login($scope.username, $scope.password).then(function () {
        $navigate('#conversations');
      }, function (errorMessage) {
        $scope.errorMessage = errorMessage;
      });
    };

    
    $scope.gotoLogin = function () {      
          $navigate('#login');
      };
    
    $scope.loginPossible = function () {
      return $scope.username && $scope.password;
    };
    
    
    
    $scope.logout = function () {
      backendService.logout();
    };

    $scope.customer = function () {
        return backendService.authenticatedCustomer();
      };
      
    $scope.setLastLogin = function () {
          $scope.username = "thorsten.heissel@entarena.com";
        };


  }

  AuthenticationController.$inject = ['$scope', 'backendService', '$navigate'];

  return AuthenticationController;
});