define(["app"], function(app){
	return ["$scope", "$stateParams", "$css", function($scope, $stateParams, $css){
		$css.bind({
			href:"scripts/css/common/goodDetail.css"
		}, $scope)
		$scope.goodsId = JSON.parse($stateParams.id);
		console.log($scope.goodsId);
	}]
})