"use strict";
var app = angular.module("app-sauna", ['slick']);

app.factory('tablesheet', function(){
    return {
        get: function() {
            
        }
    }
});


app.factory('services', function(){
    return {
        get: function() {
            return [
                {
                    name: "Банщик",
                    services: [
                        {
                            name: "Парение классическое",
                            time: "30 мин",
                            price: 4499
                        },{
                            name: "Парение",
                            time: "45 мин",
                            price: 1499
                        }
                    ]
                },{
                    name: "Массажист",
                    services: [
                        {
                            name: "Парение классическое",
                            time: "30 мин",
                            price: 4499
                        },{
                            name: "Парение",
                            time: "45 мин",
                            price: 1499
                        }
                    ]
                }
            ];
        }
    }
});

app.controller("pageController", function($scope) {
    $scope.view_page = "";
    $scope.view_content = true;
    $scope.view_pages = false;

    $scope.order = {
        sauna: {
            object: "sauna-n-1",
            datetime:"дата и время аренды",
            guest:1,
        },
        service: [
            {
                id: "service1"
            }
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


    $scope.pickdate = function(data) {
        console.log("pickDate", data);
    };


    $scope.orderProcess = function() {

    };
});