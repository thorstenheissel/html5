define(function () {
  function AuthenticationController($scope, backendService, $navigate) {

    $scope.login = function () {
      return backendService.login($scope.username, $scope.password).then(function () {
        $navigate('#welcomePage');
      }, function (errorMessage) {
        $scope.errorMessage = errorMessage;
      });
    };

    $scope.loginPossible = function () {
      return $scope.username && $scope.password;
    };
    
    $scope.loadProfile = function () {
    	$scope.name = "Thorsten Heissel";
    		
    	var res = backendService.loadProfilebyId($scope.customer().profile._id);
        res.then(function (data) {
          $scope.profile = data;
        }, function (errorMessage) {
          $scope.headertext = errorMessage;
        });
    }
    
    
    $scope.loadBanks = function () {
    	$scope.name = "Entarena Bank";
    		
    	var res = backendService.loadBanks();
        res.then(function (data) {
          $scope.banks = data;
        }, function (errorMessage) {
          $scope.headertext = errorMessage;
        });
    }

    $scope.showBankDetails = function (_bank_id) {
//    	$scope.bank=_bank_id;
//    	
    	var res = backendService.loadBankDetails(_bank_id);
       res.then(function (data) {
        $scope.bank = data;
        $scope.bankdetail = new Object();
        for (var i = 0; i < data.length; ++i) {      	
 	      	eval("$scope.bankdetail._"+ data[i].name+"='" +data[i].dataFields+"'");
        }

        }, function (errorMessage) {
          $scope.headertext = errorMessage;
        });
    	
    	
    	$navigate('#bankOverview');
    	return res;
      };
    
    $scope.logout = function () {
      backendService.logout();
    };

    $scope.customer = function () {
      return backendService.authenticatedCustomer();
    };

  }

  AuthenticationController.$inject = ['$scope', 'backendService', '$navigate'];

  return AuthenticationController;
});