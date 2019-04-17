"use strict";
var app = angular.module("app-sauna", ['slick']);

app.factory('tablesheet', function(){
    return {
        get: function() {

        }
    }
});

app.controller("pageController", function($scope) {
    $scope.view_page = "";
    $scope.view_content = true;
    $scope.view_pages = false;

    $scope.pickerDateTime = {
        y:0,
        m:0,
        d:0,
        hs:0,
        he:0,
        mounth: [
              
        ]
    };

    $scope.order = {
        sauna: {
            object: "sauna-n-1",
            datetime:"дата и время аренды",
            guest:1,
        },
        service: [
            "service-1", "service-2"
        ],
        store: [
            {id: 1, count: 3},
            {id: 2, count: 2},
            {id: 3, count: 1}
        ],
        sum: 100500
    };

    $scope.viewPage = function(view_page) {
        $scope.view_page = view_page;
        $scope.view_content = false;
        $scope.view_pages =  true;
    };

    $scope.viewMainPage = function(view_page) {
        $scope.view_page = "";
        $scope.view_content = true;
        $scope.view_pages =  false;
    };

    $scope.orderProcess = function() {

    }

});