app.directive("datatime", function() {
    return {
        restrict: 'E',
        scope: {
            //коллбэк добавления нового элемента
            pickDateController: '=',
            closeDateModal: "=",
            minOrderHours: "=",
            saunaId: "="
        },
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

            $scope.current ={
                d : new Date().getDate(),
                m : new Date().getMonth(),
                y : new Date().getFullYear()
            };

            $scope.month = function(direction) {

                var todayDate = new Date();
                var today_day = todayDate.getMonth();
                var today_year = todayDate.getFullYear();

                // Логика меньше текущего месяца незя.
                // console.log(today_day, $scope.current_month);
                // console.log(today_year, $scope.current_year);
                if( today_year < $scope.current_year) {
                    return false;
                }
                if( today_year ===  $scope.current_year){
                    if(today_day > $scope.current_month + direction)  {
                        return false;
                    }
                }

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

                    // Метка селекта
                    if($scope.current.d === days[i].num
                        && $scope.current.m === $scope.current_month
                        && $scope.current.y === $scope.current_year ) {
                        days[i].selected = true;
                    } else {
                        days[i].selected = false;
                    }

                    // Сегодня, и прошлое
                    var todayDate = new Date();
                    var today_month = todayDate.getMonth();
                    var today_year = todayDate.getFullYear();
                    var today_date = todayDate.getDate();

                    if(today_year === $scope.current_year &&  today_month === $scope.current_month) {
                        if(today_date ===  days[i].num) {
                            days[i].istoday = true;
                        }
                        if(today_date > days[i].num) {
                            days[i].ispast = true;
                        }
                    }

                }
                //console.log(days);
                $scope.pickerDateTime.month = days;
            }

            $scope.getDays( $scope.current_year, $scope.current_month );

            $scope.selectDate = function(day) {
                if(!day.ispast) {
                    $scope.current = {
                        d: day.num,
                        m: $scope.current_month,
                        y: $scope.current_year
                    };
                    $scope.getDays($scope.current_year, $scope.current_month);
                    $scope.pickDateController(  $scope.current );
                };
            };

            $scope.hours = function() {
                var hours = [];

                return hours;
            }

        },
        template: '<div class="date-picker">\n' +
            '            <div class="date">\n' +
            '                <div class="control">\n' +
            '                    <div class="close" ng-click="closeDateModal()"><img src="images/svg/close.svg"></div>\n'+
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
            '                            <span class="day {{ (day.weekend)?\'red\':\'\' }} {{ (day.ispast)?\'past\':\'\' }} {{ day.istoday?\'now\':\'\' }} {{ day.selected?\'selected\':\'\' }}" ng-click="selectDate(day)" ng-repeat="day in pickerDateTime.month">{{day.num}}</span>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="time">\n' +
            '                <div class="header">' +
            '                       Свободное время ' +
            '                   <div class="info">минимальный заказ: {{ minOrderHours }} часа</div>' +
            '                </div>          \n' +
            '                <div class="hours" ng-repeat="hour in hours">' +
            '                   <div class="hour">{{}}</div>   ' +
            '                </div>'+
            '            </div>\n' +
            '            <span class="today" ng-click="todayView()">Сегодня</span>\n' +
            '        </div>'
    }
});
