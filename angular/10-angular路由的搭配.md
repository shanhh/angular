#### angular路由的配搭 没有require的引入

```javascript
1: 首先引入angular.js 和 angular-ui-router.js
2: 建立好各自的文件夹home home.html js home.js
3: 使用ui-sref="home" ui-view 变化页数
4: var app = angular.module("APP", ["ui.router"]);
5: 分别引入js
6: 在各自的js 写 app.controller("HomeCtrl", ["$scope", function($scope){}]);
7: 配置路由规则
8: app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
  	//默认路由
  	$urlRouterProvider.when("", "/home");
  	//定于路由规则
  	$stateProvider
    .state("home", {
      url:"/home",
      templateUrl:"home/home.index",
      controller:"HomeCtrl"
    })
}])
```