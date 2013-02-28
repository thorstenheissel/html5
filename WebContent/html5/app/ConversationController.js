define(function () {
  function ConversationController($scope, rentalService, backendService, $navigate) {

    $scope.searchRentals = function (e,daten) {
      var res = backendService.rentalsByCustomerId(backendService.authenticatedCustomer().id);
      res.then(function (data) {
        $scope.rentals = data;
//        $scope.headertext = "e";
      }, function (errorMessage) {
        $scope.errorMessage = errorMessage;
      });
      return res;
    };
    
 $scope.bc = function () {
    	
	 $scope.headertext = "yeahh";
      };
    
    $scope.showDetails = function () {
    	
    	$navigate('#conversation');
      };

    $scope.totalPrice = function (rental) {
      return rentalService.totalPrice(
        rental.car.price, rental.hireStartDate, rental.hireEndDate);
    };

    $scope.infoMessage = function () {
      if ($scope.rentals && $scope.rentals.length === 0) {
        return "Keine Daten gefunden.";
      } else {
        return null;
      }
    };

  }

  ConversationController.$inject = ['$scope', 'rentalService', 'backendService', '$navigate'];

  return ConversationController;
});