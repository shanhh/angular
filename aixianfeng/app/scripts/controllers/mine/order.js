define(["app"],function(e){return["$scope","$stateParams","$rootScope","$css",function(e,n,c,o){function r(){angular.element(t).css("display","none").eq(e.currentIndex).css("display","block")}o.bind({href:"scripts/css/mine/order.css"},e),console.log(n);var t=document.querySelectorAll(".orderContent>div");e.currentIndex=n.index||0,r(),e.back=function(){history.back(),c.footerFlag=!0},e.change=function(n){e.currentIndex=n,r()}}]});