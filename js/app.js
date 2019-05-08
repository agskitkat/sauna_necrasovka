"use strict";
var url_api = "http://localhost/sauna_api/api.php";
var app = angular.module("app-sauna", ['slick']);

app.factory('$tablesheet', function($http){
    return {
        get: function(sauna_id, date) {
            return $http({url: url_api, method: "POST", data: {
                    action : 'schedule',
                    method  : 'listOfDate',
                    sauna_id : sauna_id,
                    timestamp_start : date.start,
                    timestamp_end: date.end
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }
    }
});

app.factory('$saunalist', function($http){
    return {
        get: function() {
            return $http({url: url_api, method: "POST", data: {
                    action : 'sauna',
                    method  : 'getListSauna'
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
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

app.controller("pageController", function($scope, $saunalist, $tablesheet) {
    $scope.view_page = "";
    $scope.view_content = true;
    $scope.view_pages = false;

    $scope.sliderOn = true;

    $scope.sauna_list = [];
    $saunalist.get().then(function (response) {
        angular.forEach(response.data, function(value, key) {
            var sauna = JSON.parse(value.sauna);
            sauna.id = value.id;
            $scope.sauna_list.push(sauna);
        });
        $scope.sauna_list[0].choose = true;
        $scope.sauna_choose = $scope.sauna_list[0];

    });

    $scope.order = {
        sauna: {
            id: 0,
            datetime:{
                start:0,
                stop:0
            },
            guest:0
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

        var strat = data.y + "-" + (data.m+1) + "-" + data.d + " " + data.start_hour.t + ":00";
        var end = data.y + "-" + (data.m+1) + "-" + data.d + " " + data.end_hour.t + ":00";

        console.log(strat, end);

        $scope.order.sauna.id = $scope.sauna_choose.id;
        $scope.order.sauna.datetime = {
            start:strat,
            end:end
        };
    };

    $scope.getOrderTimeOfDateSauna = function(date) {
        console.log(date);
        var d =  date.y + "-" +(date.m + 1)+ "-" + date.d;
        return $tablesheet.get( $scope.sauna_choose.id, {start: d + " 00:00:00", end: d+" 23:59:59"});
    };

    $scope.orderDate = function(mode) {
        var start = new Date($scope.order.sauna.datetime.start);

        if(mode === "date") {
            return $scope.toReadebleHour(start.getDate()) + "." +$scope.toReadebleHour(start.getMonth()) +"." +start.getFullYear();
        }

        if(mode === "starttime") {
            return $scope.toReadebleHour(start.getHours()) + ":" + $scope.toReadebleHour(start.getMinutes());
        }

        if(mode === "endtime") {
            var end = new Date($scope.order.sauna.datetime.end);
            return $scope.toReadebleHour(end.getHours()) + ":" + $scope.toReadebleHour(end.getMinutes());
        }
    };

    // ORDER SAUNA CONTROL
    $scope.saunaMansCount = function(derection) {
        if( ($scope.order.sauna.guest + derection)  >= 1) {
            $scope.order.sauna.guest += derection;
        }
    };
    $scope.buttonOrderSauna = function(sauna_choose) {

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

    $scope.toReadebleHour = function(i) {
        if(i < 10) {
            i = "0"+i
        }
        return i;
    }
});