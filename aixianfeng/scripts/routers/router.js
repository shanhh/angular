define(['app', "angularAMD"], function(app, angularAMD){
	app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider,$urlRouterProvider) {
	
		//默认路由
		$urlRouterProvider.when("","/home");

		//路由规则
		$stateProvider
		.state("home", angularAMD.route({
			url: "/home",
			templateUrl: "scripts/views/home/home.html",
			controllerUrl:"scripts/controllers/home/home.js"
		}))
		.state("market", angularAMD.route({
			url: "/market",
			templateUrl: "scripts/views/market/market.html",
			controllerUrl: "scripts/controllers/market/market.js"
		}))
		.state("car", angularAMD.route({
			url: "/car",
			templateUrl: "scripts/views/car/car.html",
			controllerUrl: "scripts/controllers/car/car.js"
		}))
		.state("mine", angularAMD.route({
			url: "/mine",
			templateUrl: "scripts/views/mine/mine.html",
			controllerUrl: "scripts/controllers/mine/mine.js"
		}))
		//跳转产品详情页面
		.state("goodDetail", angularAMD.route({
			url: "/goodDetail:id",
			templateUrl: "scripts/views/common/goodDetail.html",
			controllerUrl: "scripts/controllers/common/goodDetailCtrl.js"
		}))
		//跳转订单页面
		.state("orderby", angularAMD.route({
			url:"/orderby:index",
			templateUrl:"scripts/views/mine/order.html",
			controllerUrl:"scripts/controllers/mine/order.js"
		}))
		//首页点击更多跳转
		.state("gomarket", angularAMD.route({
			url:"/gomarket:id",
			templateUrl:"scripts/views/market/market.html",
			controllerUrl: "scripts/controllers/market/market.js"
		}))
	}])
	
})