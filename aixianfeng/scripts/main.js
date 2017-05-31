requirejs.config({
	baseUrl: "scripts",
	paths: {
		angular: "libs/angular",
		"angular-ui-router": "libs/angular-ui-router",
		swiper: "libs/swiper",
		domReady: "libs/domReady",
		"angular-css": "libs/angular-css",
		angularAMD: "libs/angularAMD",

		app: "controllers/app",
		indexCtrl: "controllers/index",
		homeCtrl: "controllers/home/home",
		marketCtrl:"controllers/market/market",
		mineCtrl:"controllers/mine/mine",
		carCtrl:"controllers/car/car",
		orderCtrl:"controllers/mine/order",
		goodDetailCtrl:"controllers/common/goodDetailCtrl",

		router: "routers/router",

		dataService:"services/service",
		factory:"factories/factories",
		directives:"directives/directive",

		swiper:"libs/swiper"


	},
	shim: {
		angular:{
			exports: "angular"
		},
		'angular-ui-router': {
            deps: ['angular']
        },
        'angular-css': {
            deps: ['angular']
        },
        "angularAMD":{
        	deps:["angular"]
        }
	}
})

//引入主模块， 对应各自的文件
requirejs(["angular", "domReady", "angular-css", "angular-ui-router",

	'indexCtrl', 
	"directives",
	
	"router", "dataService", "factory"
], function(angular, domReady){
	//页面加载完成
	domReady(function () {
        // 动态添加ng-app指令，对应的值为axfApp,这个值要和app.js中的值一样
        angular.bootstrap(document, ['axfApp']);
    });
})