angular.module('controllers', ['ionic', 'services', 'firebase'])

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.controller('PersonalController', function($scope, $rootScope, $firebase, Camera, Device) {

  $scope.pairs = [];
 
  // makeIt specific to this scope
  $scope.makeIt = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log("Fresh Image: ", imageURI);
      $scope.pairs.push({photo1: imageURI});
    }, function(err) {
      console.err("Camera Error: ", err);
    });
  }

})




// stateParams????
.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
});
