define(function () {
  function RentalHistoryController($scope, rentalService, backendService, $navigate) {

    $scope.searchRentals = function () {
      var res = backendService.loadConversations();
      res.then(function (data) {
        $scope.rentals = data;
      }, function (errorMessage) {
        $scope.errorMessage = errorMessage;
      });
      return res;
    };
    
    $scope.showDetails = function (_id) {
    	$scope.headertext=_id;
    	
    	var res = backendService.loadConversationbyId(_id);
        res.then(function (data) {
          $scope.conversation = data;
        }, function (errorMessage) {
          $scope.headertext = errorMessage;
        });
    	
    	
    	$navigate('#conversation');
    	return res;
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

  RentalHistoryController.$inject = ['$scope', 'rentalService', 'backendService', '$navigate'];

  return RentalHistoryController;
});