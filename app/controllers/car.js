var carApp = angular.module('carApp', ['CarModel', 'hmTouchevents']);


// Index: http://localhost/views/car/index.html

carApp.controller('IndexCtrl', function ($scope, CarRestangular) {
  // showView = new steroids.views.WebView({location: "/views/car/show.html", id: "showView"});
  // showView.preload();
  // This will be populated with Restangular
  $scope.cars = [
  {id: "1", name: "Car One"},
  {id: "2", name: "Car Two"},
  {id: "3", name: "Car Three"},
  {id: "4", name: "Car Four"},
  {id: "5", name: "Car Five"}
  ]

  // Helper function for opening new webviews
  $scope.open = function(id) {
    //webView = new steroids.views.WebView("/views/car/show.html?id="+id);
    //steroids.layers.push(showView);
  };

  // Helper function for loading car data with spinner
  $scope.loadCars = function() {
    $scope.loading = true;

    cars.getList().then(function(data) {
      $scope.cars = data;
      $scope.loading = false;
    });

  };

  // Fetch all objects from the backend (see app/models/car.js)
  //var cars = CarRestangular.all('car');
  //$scope.loadCars();


  // Get notified when an another webview modifies the data and reload
  window.addEventListener("message", function(event) {
    // reload data on message with reload status
    if (event.data.status === "reload") {
      $scope.loadCars();
    };
  });


  // -- Native navigation

  // Set navigation bar..
  steroids.view.navigationBar.show("Car index");


});


// Show: http://localhost/views/car/show.html?id=<id>

carApp.controller('ShowCtrl', function ($scope, CarRestangular) {

  // Helper function for loading car data with spinner
  $scope.loadCar = function() {
    $scope.loading = true;

     car.get().then(function(data) {
       $scope.car = data;
       $scope.loading = false;
    });

  };

  // Save current car id to localStorage (edit.html gets it from there)
  localStorage.setItem("currentCarId", steroids.view.params.id);

  var car = CarRestangular.one("car", steroids.view.params.id);
  $scope.loadCar()

  // When the data is modified in the edit.html, get notified and update (edit is on top of this view)
  window.addEventListener("message", function(event) {
    if (event.data.status === "reload") {
      $scope.loadCar()
    };
  });

  // -- Native navigation
  steroids.view.navigationBar.show("Car: " + steroids.view.params.id );

  var editButton = new steroids.buttons.NavigationBarButton();
  editButton.title = "Edit";

  editButton.onTap = function() {
    webView = new steroids.views.WebView("/views/car/edit.html");
    steroids.modal.show(webView);
  }

  steroids.view.navigationBar.setButtons({
    right: [editButton]
  });


});


// New: http://localhost/views/car/new.html

carApp.controller('NewCtrl', function ($scope, CarRestangular) {

  $scope.close = function() {
    steroids.modal.hide();
  };

  $scope.create = function(car) {
    $scope.loading = true;

    CarRestangular.all('car').post(car).then(function() {

      // Notify the index.html to reload
      var msg = { status: 'reload' };
      window.postMessage(msg, "*");

      $scope.close();
      $scope.loading = false;

    }, function() {
      $scope.loading = false;

      alert("Error when creating the object, is Restangular configured correctly, are the permissions set correctly?");

    });

  }

  $scope.car = {};

});


// Edit: http://localhost/views/car/edit.html

carApp.controller('EditCtrl', function ($scope, CarRestangular) {

  var id  = localStorage.getItem("currentCarId"),
      car = CarRestangular.one("car", id);

  $scope.close = function() {
    steroids.modal.hide();
  };

  $scope.update = function(car) {
    $scope.loading = true;

    car.put().then(function() {

      // Notify the show.html to reload data
      var msg = { status: "reload" };
      window.postMessage(msg, "*");

      $scope.close();
      $scope.loading = false;
    }, function() {
      $scope.loading = false;

      alert("Error when editing the object, is Restangular configured correctly, are the permissions set correctly?");
    });

  };

  // Helper function for loading car data with spinner
  $scope.loadCar = function() {
    $scope.loading = true;

    // Fetch a single object from the backend (see app/models/car.js)
    car.get().then(function(data) {
      $scope.car = data;
      $scope.loading = false;
    });
  };

  $scope.loadCar();

});