angular.module('controllers', ['ionic', 'services', 'firebase'])

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.controller('PersonalController', function($scope, $rootScope, $firebase, Camera, Device) {

  $scope.pairs = [];

  // move this
  $scope.makeIt = function() {
    console.log('Getting camera');
    Camera.getPicture().then(function(imageURI) {
      console.log("Fresh Image: ", imageURI);
      $scope.pairs.push({photo1: imageURI});
    }, function(err) {
      console.err(err);
    }, {
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    });
    /*
    navigator.camera.getPicture(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
    }, { 
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL
    });
    */
  }
})




// stateParams????
.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
});
