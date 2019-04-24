"use strict";
var app = angular.module("app-sauna", ['slick']);

app.factory('tablesheet', function(){
    return {
        get: function() {
            {

            }
        }
    }
});

app.factory('$saunalist', function(){
    return {
        get: function() {
            return [
                {
                    id: "1",
                    name: "Сауна №1",
                    price: 1499,
                    min_h: 3,
                    max_guest:4,
                    guest_overprice:100,
                    options: [
                        "Простыня","Полотенце","Тапочки","Джакузи","Душ","Купель: 5х5 м",
                        "Парная: 15 кв.м","Зона отдыха: 30 кв.м","Комната отдыха","TV"
                    ],
                }
            ]
        }
    }
});

app.factory('$services', function(){
    return {
        get: function() {
            return [
                {
                    id: "1",
                    name: "Банщик",
                    services: [
                        {
                            id: "1",
                            name: "Парение классическое",
                            time: "30 мин",
                            price: 4499
                        },{
                            id: "2",
                            name: "Парение",
                            time: "45 мин",
                            price: 1499
                        }
                    ]
                },{
                    id: "2",
                    name: "Массажист",
                    services: [
                        {
                            id: "1",
                            name: "Парение классическое",
                            time: "30 мин",
                            price: 4499
                        },{
                            id: "2",
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

app.controller("pageController", function($scope, $saunalist) {
    $scope.view_page = "";
    $scope.view_content = true;
    $scope.view_pages = false;

    $scope.sauna_list = $saunalist;

    $scope.current_sauna = {
        id: 1,
        datetime:{
            start:0,
            stop:0
        },
        guest:1,
        price:0
    };



    $scope.order = {
        sauna: {

        },
        service: [
            {
                id: 1,
                price:2499,
                services: [
                    {
                        id: 1,
                        price: 2499
                    },{
                        id: 2,
                        price: 2499
                    }
                ]
            }
        ],
        store: [{
                id: 1,
                count: 3,
                price: 2499
            },{
                id: 2,
                count: 2,
                price: 2499
            },{
                id: 3,
                count: 1,
                price: 2499
        }],
        sum: 100500
    };


    
    $scope.calcOrderSum = function() {
        // Calc sauna
    };

    // SAUNA
    $scope.showChooseSauna = function () {

    };
    $scope.chooseSauna = function () {

    };
    $scope.showDatePicker = function () {

    };
    $scope.saunaMansCount = function(derection) {
        if( ($scope.order.sauna.guest + derection)  >= 1) {

        }
    };
    $scope.buttonOrderSauna = function() {

    };


    // SERVICE
    $scope.getServiceName = function(id){

    };


    // PAGES
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