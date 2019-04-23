"use strict";
var app = angular.module("app-sauna", ['slick']);

app.factory('tablesheet', function(){
    return {
        get: function() {

        }
    }
});



app.directive("datatime", function() {
    return {
        restrict: 'E',
        link: function($scope, element, attrs) {
            $scope.toMonth = function(intMonth){
              var arMonthName = [
                  "Январь", "Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"
              ];
              return arMonthName[intMonth];
            };

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

            $scope.current_year = new Date().getFullYear();
            $scope.current_month = new Date().getMonth();

            $scope.month = function(direction) {
                $scope.current_month = $scope.current_month + direction;
                if($scope.current_month > 11) {
                    $scope.current_year++;
                    $scope.current_month = 0;
                }
                if($scope.current_month < 0) {
                    $scope.current_year--;
                    $scope.current_month = 11;
                }
                $scope.getDays($scope.current_year, $scope.current_month );
                $scope.pickerDateTime.y = $scope.current_year;
                $scope.pickerDateTime.m = $scope.current_month + 1;
            };

            $scope.getDays = function(y, m) {
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

            $scope.getDays( $scope.current_year, $scope.current_month );

        },
        template: '<div class="date-picker">\n' +
            '            <div class="date">\n' +
            '                <div class="control">\n' +
            '                    <img src="images/svg/arrow-blue-right.svg" class="arrow deg180" ng-click="month(-1)">\n' +
            '                    <div class="now">{{ toMonth(current_month) }} {{ current_year }}</div>\n' +
            '                    <img src="images/svg/arrow-blue-right.svg" class="arrow" ng-click="month(1)">\n' +
            '                </div>\n' +
            '\n' +
            '                <div class="dates">\n' +
            '                    <div class="table">\n' +
            '                        <div class="weeks">\n' +
            '                            <span>пн</span>\n' +
            '                            <span>вт</span>\n' +
            '                            <span>ср</span>\n' +
            '                            <span>чт</span>\n' +
            '                            <span>пт</span>\n' +
            '                            <span class="red">сб</span>\n' +
            '                            <span class="red">вс</span>\n' +
            '                            <span class="day {{ (day.weekend)?\'red\':\'\' }}" ng-repeat="day in pickerDateTime.month">{{day.num}}</span>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="time">\n' +
            '\n' +
            '            </div>\n' +
            '        </div>'
    }
})


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