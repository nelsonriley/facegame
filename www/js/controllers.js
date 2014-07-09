angular.module('controllers', ['ionic', 'services', 'firebase'])

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.controller('PersonalController', function($scope, $rootScope, $location, $ionicViewService, $firebase, Camera, Device) {

  $scope.pairs = [];
 
  // makeIt specific to this scope
  $scope.makeIt = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log("Fresh Image: ", imageURI);
      var now = new Date();
      var timestamp = now.toISOString();
      $scope.pairs.push({photo1: imageURI, createdAt: timestamp});
    }, function(err) {
      console.err("Camera Error: ", err);
    });
  };

  // tap a photo to play or pass
  $scope.playOrPass = function(id) {
    // use ionicViewService to show the back button on next view
    $ionicViewService.nextViewOptions({
      disableBack: false
    });
    $location.path('/playorpass');
  };

  // test new features easily
  $scope.testIt = function() {
    var now = new Date();
    var timestamp = now.toISOString();
    $scope.pairs.push({photo1: 'none', createdAt: timestamp});
  };

})


.controller('PlayPassController', function($scope, $rootScope, $ionicNavBarDelegate) {
 
  // play (makeIt) specific to this scope
  $scope.playIt = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log("Fresh Image: ", imageURI);
      var now = new Date();
      var timestamp = now.toISOString();
      $scope.pairs.push({photo1: imageURI, createdAt: timestamp});
    }, function(err) {
      console.err("Camera Error: ", err);
    });
  };

  // pass it
  $scope.passIt = function() {
    console.log("Passing");
  };

  // cancel
  $scope.cancel = function() {
    // can also use NavBarDelegate to change title of a view
    $ionicNavBarDelegate.back();
  };

})




// stateParams????
.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
});
