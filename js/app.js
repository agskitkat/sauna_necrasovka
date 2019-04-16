"use strict";
window.addEventListener('load', function () {
    var app = new Vue({
        el: '#app-sauna',
        data: {
            view_content: true,
            view_pages: false,
            view_page:""
        },
        methods: {
            viewPage: function (p) {
                this.view_content = false;
                this.view_pages = true;
                this.view_page = p;
                console.log(p);
                window.scrollTo(0,0);
            },
            viewMainPage: function () {
                this.view_content = true;
                this.view_pages = false;
                window.scrollTo(0,0);
            },
            orderProcess: function(){

            }
        }
    });
});