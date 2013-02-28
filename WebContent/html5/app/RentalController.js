define(function () {
  function RentalController($scope, rentalService, backendService, $navigate) {
    var SUCCESS_MESSAGE = "Conversation created successfully";

    $scope.clearMessages = function () {
      $scope.successMessage = null;
      $scope.errorMessage = null;
    };

    $scope.prefetchMasterData = function () {
 //     backendService.carTypesBackground();
 //     backendService.citiesBackground();
    };

    $scope.initRental = function () {
      $scope.errorMessage = null;
      $scope.successMessage = null;
 
      $navigate('#rental1Page');
    };


    $scope.totalPrice = function () {
      if ($scope.car) {
        return rentalService.totalPrice($scope.car.price, $scope.startDate, $scope.endDate);
      } else {
        return 0;
      }
    };

    $scope.selectCar = function (car) {
      $scope.car = car;
      $navigate('#rental3Page');
    };
    

    $scope.announce = function () {
      return backendService.announce($scope.announceSubject, $scope.announceText).then(
        function (rental) {
           $scope.successMessage = SUCCESS_MESSAGE;
          $navigate('back:#welcomePage');
        }, function (errorMessage) {
          $scope.errorMessage = errorMessage;
          $navigate('back:#welcomePage');
        });
    };
  }

  RentalController.$inject = ['$scope', 'rentalService', 'backendService', '$navigate'];

  return RentalController;
});