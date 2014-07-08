// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'firebase'])

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
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

.controller('MainCtrl', function($scope, $firebase, Camera, Device) {

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

})
