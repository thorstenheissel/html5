'use strict';

/* Controllers */

//function PhoneListCtrl($scope, Phone) {
 // $scope.phones = Phone.query();
var user;
	
function ApplicationController($scope, $location) {
    $scope.username = "";
    $scope.password = "";

    $scope.login = function() {
      user = {
        username: $scope.username,
        password: $scope.password
      };
      

      $location.path("/phones");
    };

    $scope.loginPossible = function() {
      return $scope.username && $scope.password;
    };

}

//ApplicationController.$inject = ["$scope", "$navigate"];

function PhoneListCtrl($scope, $http) {
	  $http({method: 'GET', 
		  url: '/json', 
		  params: {payload: {
			  "service": "com.entarena.comm.conversation/load-conversations-json", 
			  "payload": [{"special": "all"}],
			  "email": "thorsten.heissel@entarena.com", 
			  "passwd": user.password 
				  }} }).success(function(data) {
	    $scope.phones = data;
	  });
	
	
	
  $scope.orderProp = 'age';
}

//PhoneListCtrl.$inject = ['$scope', 'Phone'];



function PhoneDetailCtrl($scope, $http, $routeParams) {
 // $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
 //   $scope.mainImageUrl = phone.images[0];
 // });
	
	
	 $http({method: 'GET', 
		  url: '/json', 
		  params: {payload: {
			  "service": "com.entarena.comm.conversation/load-conversation-json", 
			  "payload": [$routeParams.phoneId],
			  "email": "thorsten.heissel@entarena.com", 
			  "passwd": "12" 
				  }} }).success(function(data) {
	    $scope.phone = data;
	  });
	
	
//	$scope.phone.name = $routeParams.phoneId;

//  $scope.setImage = function(imageUrl) {
//    $scope.mainImageUrl = imageUrl;
//  };
}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams'];
