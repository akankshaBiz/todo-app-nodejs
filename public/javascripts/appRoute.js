/**
 * Created by LEGEND on 16-01-2017.
 */
var app = angular.module('myApp',[]);
app.controller('myCtrl',function ($scope, $http) {
    $scope.formdata={};
    $scope.errortext;
    $scope.todo='';
    $http.get('/api/todos').success(function (data) {
        $scope.todo = data;
        console.log("data recv: "+data);
    })
        .error(function (data) {
            console.log(data);
            $scope.errortext = data;
        });
    $scope.addItem=function() {
        console.log($scope.formdata);
        $http.post('/api/add', $scope.formdata).success(function (data) {
            $scope.formdata = {};
            $scope.todo = data;
            console.log(data);
        })
            .error(function (data) {
                $scope.errortext = data;
                console.log(data);
            });
    }
    $scope.removeItem = function (id) {
        $http.delete('/api/delete/'+id).success(function (data) {
            $scope.todo = data;
            console.log(data);
        })
            .error(function (data) {
                $scope.errortext = data;
                console.log(data);
            })
    }


})