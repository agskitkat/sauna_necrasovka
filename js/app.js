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
        offset:0,
        month: [
              
        ]
    };

    function getDays(y, m) {
        var days = [];
        var days_in_month = 32 - new Date(y, m, 32).getDate();
        var date = new Date(y, m,1);
        var day = date.getDay();
        if (day === 0) { // день 0 становится 7
            day = 7;
        }

        day = day -2;

        for(var i = 0;i <= (day + days_in_month); i++) {

            if(i <= day ) {
                days[i] = {
                    weekend:false
                };
            } else {
                var md = (i - day);
                var wd = new Date(y, m, md).getDay();
                if (wd === 0) { // день 0 становится 7
                    wd = 7;
                }
                days[i] = {
                    num: md,
                    weekend: (wd <= 5) ? false:true
                };
            }

        }

        console.log(days);
        $scope.pickerDateTime.month = days;
    }

    getDays(2019, 3);

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