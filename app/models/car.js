// The contents of individual model .js files will be concatenated into dist/models.js

(function() {

// Protects views where angular is not loaded from errors
if ( typeof angular == 'undefined' ) {
	return;
};


var module = angular.module('CarModel', ['restangular']);

module.factory('CarRestangular', function(Restangular) {

  

  return Restangular.withConfig(function(RestangularConfigurer) {

// -- Stackmob REST API configuration

//    RestangularConfigurer.setBaseUrl('http://api.stackmob.com');
//    RestangularConfigurer.setRestangularFields({
//      id: "car_id"
//    });

//    RestangularConfigurer.setDefaultHeaders({
//      'Accept': 'application/vnd.stackmob+json; version=0',
//      'X-StackMob-API-Key-<YOUR-API-KEY-HERE>': '1'
//    });

  });

});


})();
