define(["app"], function(app){
	app.controller("IndexCtrl", ["$scope", "$location", "$rootScope", function($scope, $location, $rootScope){
		$scope.footerArr = [
			{
				title:"首页",
				img:"imgs/common/home.png",
				imgActive:"imgs/common/homeYellow.png",
				router:"home"
			},
			{
				title:"闪电超市",
				img:"imgs/common/market.png",
				imgActive:"imgs/common/marketYellow.png",
				router:"market"
			},
			{
				title:"购物车",
				img:"imgs/common/car.png",
				imgActive:"imgs/common/carYellow.png",
				router:"car"
			},
			{
				title:"我的",
				img:"imgs/common/mine.png",
				imgActive:"imgs/common/mineYellow.png",
				router:"mine"
			}
		];

		$rootScope.footerFlag = true;
		//初始化currentIndex的值为0；
		/*var arrUrl = ["/home", "/market", "/car", "/mine"],
			arrIndex = arrUrl.indexOf($location.$$url);
		console.log(arrIndex);
		$scope.currentIndex = arrIndex;*/
		window.location.hash = "#/home";

		//当点击首页页面更多进行跳转的时候
		console.log($location);

		$rootScope.indexCurrentIndex = 0;
		$scope.footerChose = function(index){

			$rootScope.indexCurrentIndex = index;
		}
	}])

})