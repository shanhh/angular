define(["app"], function(app){
	return ["$scope", "$stateParams", "$rootScope", "$css", function($scope, $stateParams, $rootScope, $css){
		
		$css.bind({
			href: "scripts/css/mine/order.css"
		}, $scope)


		console.log($stateParams);
		//选中所有的table菜单的元素
		var divs = document.querySelectorAll(".orderContent>div");
		//初始化为0
		$scope.currentIndex = $stateParams.index || 0;

		table()
		//当点击返回按钮的时候
		$scope.back = function(){
			history.back();
			$rootScope.footerFlag = true;
		}
		//点击的时候赋值为点击元素所在的下标
		$scope.change = function(index){
			$scope.currentIndex = index;
			table()
		};
		
		//封装table菜单切换的函数
		function table(){
			angular.element(divs).css("display", "none").eq($scope.currentIndex).css("display", "block");
		}
	}]
})