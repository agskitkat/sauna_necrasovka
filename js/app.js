"use strict";
var app = angular.module("app-sauna", ['slick']);

app.factory('tablesheet', function(){
    return {
        get: function() {

        }
    }
});

app.factory('$saunalist', function(){
    return {
        get: function() {
            return [
                {
                    choose:true,
                    id: "1",
                    name: "Сауна №1",
                    price: 1499,
                    min_h: 3,
                    max_guest:2,
                    guest_overprice:100,
                    options: [
                        "Простыня","Полотенце","Тапочки","Джакузи","Душ","Купель: 5х5 м",
                        "Парная: 15 кв.м","Зона отдыха: 30 кв.м","Комната отдыха","TV"
                    ],
                    images:[
                      "images/slides/slide-1.png","images/slides/slide-2.png","images/slides/slide-3.png"
                    ],
                },{
                    id: "2",
                    name: "Сауна №2",
                    price: 3500,
                    min_h: 2,
                    max_guest:3,
                    guest_overprice:150,
                    options: [
                        "Простыня","Полотенце",
                        "Парная: 15 кв.м","Зона отдыха: 30 кв.м","Комната отдыха","TV"
                    ],
                    images:[
                        "images/slides/slide-1.png","images/slides/slide-2.png","images/slides/slide-3.png"
                    ],
                },{
                    id: "3",
                    name: "Сауна №3",
                    price: 1000,
                    min_h: 2,
                    max_guest:5,
                    guest_overprice:100,
                    options: [
                        "Простыня","Полотенце","Тапочки","Джакузи","Душ","Купель: 5х5 м",
                        "Парная: 15 кв.м"
                    ],
                    images:[
                        "images/slides/slide-1.png","images/slides/slide-2.png","images/slides/slide-3.png"
                    ],
                },{
                    id: "4",
                    vip: true,
                    name: "Сауна №4",
                    price: 1590,
                    min_h: 4,
                    max_guest:6,
                    guest_overprice:300,
                    options: [
                        "Простыня","Полотенце","Тапочки","Джакузи","Душ","Купель: 5х5 м",
                        "Парная: 15 кв.м","Зона отдыха: 30 кв.м"
                    ],
                    images:[
                        "images/slides/slide-1.png","images/slides/slide-2.png","images/slides/slide-3.png"
                    ],
                },{
                    id: "5",
                    vip: true,
                    name: "Сауна №5",
                    price: 8900,
                    min_h: 4,
                    max_guest:9,
                    guest_overprice:200,
                    options: [
                        "Простыня","Полотенце","Тапочки","Джакузи","Душ","Купель: 5х5 м",
                        "Парная: 15 кв.м","Зона отдыха: 30 кв.м","Комната отдыха","TV"
                    ],
                    images:[
                        "images/slides/slide-1.png","images/slides/slide-3.png"
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

    $scope.sliderOn = true;

    $scope.sauna_list = $saunalist.get();
    $scope.sauna_choose = $scope.sauna_list[0];

    $scope.order = {
        sauna: {
            id: 1,
            datetime:{
                start:0,
                stop:0
            },
            guest:1,
            price:0
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

    $scope.free_sapace_today = [

    ];


    $scope.calcOrderSum = function() {
        // Calc sauna
    };


    // SAUNA
    $scope.viewTime = function(dt){
        var start = dt.start;
        var stop = dt.stop;

        if(!start) {
            return "Дату и время визита";
        }

        if(start <= stop) {
            return "Некорректная дата";
        }
    };

    $scope.booleanChooseSauna = false;
    $scope.showChooseSauna = function () {
        $scope.booleanChooseSauna = true;
    };
    $scope.chooseSauna = function (sauna) {
        $scope.sliderOn = false;
        angular.forEach($scope.sauna_list, function(value, key) {
            value.choose = false;
        });
        sauna.choose = true;
        $scope.sauna_choose = sauna;
        $scope.booleanChooseSauna = false;

        setTimeout(function(){
            $scope.sliderOn = true;
            $scope.$apply();
        },0);


    };
    $scope.closeChooseSauna = function(){
        $scope.booleanChooseSauna = false;
    };


    // SAUNA PICK DATE
    $scope.booleanChooseDATE = false;
    $scope.showChooseDATE = function () {
        $scope.booleanChooseDATE = true;
    };
    $scope.chooseDATE = function () {
        $scope.booleanChooseDATE = false;
    };
    $scope.closeChooseDATE = function(){
        $scope.booleanChooseDATE = false;
    };
    $scope.closemodal = function() {
        $scope.booleanChooseDATE = false;
    };
    $scope.pickdate = function(data) {
        console.log("pickDate", data);
    };

    // ORDER SAUNA CONTROL
    $scope.saunaMansCount = function(derection) {
        if( ($scope.order.sauna.guest + derection)  >= 1) {
            $scope.order.sauna.guest += derection;
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

        $scope.booleanChooseSauna = false;

        switch(view_page) {
            case "":

            break;
        }
    };

    $scope.viewMainPage = function(view_page) {
        $scope.view_page = "";
        $scope.view_content = true;
        $scope.view_pages =  false;
    };




    $scope.orderProcess = function() {

    };


    $scope.currency = function(price) {
        if(!price) {
            return "";
        }
        return price + " руб.";
    };
});