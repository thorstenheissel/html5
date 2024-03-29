define(["angular", "app/utilsService"
        , "app/backendService" //, "app/rentalService"
        ],
  function (angular, utilsServiceFactory, backendServiceFactory, rentalServiceFactory) {

  function configureHttp($httpProvider) {
    $httpProvider.defaults.headers.post = {'Content-Type':'application/json'};
  }
  configureHttp.$inject = ["$httpProvider"];

  var module = angular.module("entarena-services", []);
  module.config(configureHttp);
  module.factory("utilsService", utilsServiceFactory);
  module.factory("backendService", backendServiceFactory);
//  module.factory("rentalService", rentalServiceFactory);

});
