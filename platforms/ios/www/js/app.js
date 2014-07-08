// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'services', 'firebase'])

.config(function($compileProvider, $stateProvider, $urlRouterProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppController'
    })

    .state('app.test', {
      url: "/test",
      views: {
        'menuContent' :{
          templateUrl: "templates/test.html",
          controller: 'TestController'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/test');
})

.run(function($ionicPlatform, Device) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    Device.set(ionic.Platform.device());
  });
})

.controller('AppController', function($scope, $ionicModal, $timeout) {

  // 
  // var FB = new Firebase("https://facegame.firebaseio.com/");
  

  // Form data for the login modal
  $scope.loginData = {};

  // // Prepare the modal
  $ionicModal.fromTemplateUrl('templates/newuser.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Hide login modal
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Show login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

})

.controller('TestController', function($scope, $firebase, Camera, Device) {

  $scope.user = {};
  // var ref = new Firebase("https://facegame.firebaseio.com/");
  var ref = new Firebase("https://gdwjjyuzekg.firebaseio-demo.com/");
  $scope.messages = $firebase(ref);
  // $scope.messages = [{from: "george", body: "work please"}];

  // photo model: uri, createdAt
  $scope.photos = [];

  $scope.addMessage = function() {
    $scope.user.uuid = Device.get('uuid');
    $scope.messages.$add({from: Math.floor(Math.random()*100), body: 'firebased'})
    .then(function(ref) {
      console.log("New Firebase Reference Name: ", ref.name()); // key
    });
  };
  $scope.removeMessage = function(key) {
    $scope.messages.$remove(key); //'-JRINR32u2LSaPF1ATXP'
  };
  // if using any type of sorting filter with ng-repeat, use $id as described here:
  // http://stackoverflow.com/questions/20982617/angularjs-with-angularfire-0-5-0-remove-item-doesnt-work?rq=1

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log("Image URI ", imageURI);
      // $scope.lastPhoto = imageURI; // single photo
      $scope.photos.push({uri: imageURI, createdAt: 11});
    }, function(err) {
      console.err(err);
    }, {
      quality: 75,
      targetWidth: 320, // 320
      targetHeight: 320, // 320
      saveToPhotoAlbum: false
    });
  };

});
