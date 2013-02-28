function PhoneListCtrl($scope, $http) {
  $http({method: 'GET', 
	  url: '/json', 
	  params: {payload: {
		  "service": "com.entarena.comm.conversation/load-conversations", 
		  "payload": [{"special": "all"}],
		  "email": "thorsten.heissel@entarena.com", 
		  "passwd": "12" 
			  }} }).success(function(data) {
    $scope.phones = data;
  });

  $scope.orderProp = 'id';
}

//PhoneListCtrl.$inject = ['$scope', '$http'];

//http://localhost:8080/json?payload={"service": "com.entarena.comm.lookup/groups", "email": "thorsten.heissel@entarena.com", "passwd": "12" }