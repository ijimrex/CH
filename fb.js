/**
 * Created by leijin on 3/31/17.
 */
// window.onload(function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.watchPosition(showPosition);
//
//     } else {
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }
// })
var app = angular.module('myApp', []);
app.controller('fbController', function($scope,$http) {
    navigator.geolocation.getCurrentPosition(function(position) {
        $scope.lat=position.coords.latitude;
        $scope.long=position.coords.longitude;;
    });

    $scope.keyword ="";
    $scope.urls='fb.php?keyword='+$scope.keyword+'&lat='+$scope.lat+'&long='+$scope.long;
    $scope.reset=function (){
        $scope.keyword =""
    }
    $scope.search=function () {
        console.log("in")
        $http({
            method: 'GET',
            url: 'fb.php?keyword='+$scope.keyword
        }).then(function successCallback(response) {
            console.log(response)
        }, function errorCallback(response) {
            console.log('http error')
        });
    }


});