define(["app"], function(app){
	return ["$scope", "$state", "$rootScope", "$css", function($scope, $state, $rootScope, $css){

		$css.bind({
			href: "scripts/css/mine/mine.css"
		}, $scope)


		$scope.listImg = [
			{
				img:"imgs/mine/warting.png",
				name:"待付款"
			},
			{
				img:"imgs/mine/write.png",
				name:"待收货"
			},
			{
				img:"imgs/mine/car.png",
				name:"待评价"
			},
			{
				img:"imgs/mine/ping.png",
				name:"退款售后"
			}
		];
		$scope.listPic = [
			{
				img:"imgs/mine/a1.png",
				name:"积分商城"
			},
			{
				img:"imgs/mine/a2.png",
				name:"优惠券"
			},
			{
				img:"imgs/mine/a3.png",
				name:"收货地址"
			},
			{
				img:"imgs/mine/a4.png",
				name:"客服/反馈"
			},
			{
				img:"imgs/mine/a5.png",
				name:"关于我们"
			}
		]

		$scope.goToOrder = function(){
			$state.go("orderby", {
				index: 0
			})
			$rootScope.footerFlag = false;
		}
		$scope.goOrder = function(){
			$state.go("orderby",{
				index: this.index+1
			})
			$rootScope.footerFlag = false;
		}
	}]

});