## AngularJS + RequireJS 进行项目架构

### 目录结构

```
project
--css
	--index.css
	--reset.css
	--swiper.css
	--...
--imgs
	-- home
	-- market
	-- cart
	-- mine
	--home_normal.png
	--home_selected.png
	--...
-- json
	--data.json
	--home.json
-- scripts
	-- libs
	-- controllers
		-- home
			--home.js
         -- market
         	--market.js
         -- cart
         	--cart.js
         -- mine
         	--mine.js
         -- common
         	--header.js
         --app.js
         --menu.js
     -- views
     	-- home
     		--home.html
     	-- market
     		--market.html
     	-- cart
     		--cart.html
     	-- mine
     		--mine.html
     		--orderForm.html
     	--swiper.html
     -- css
     	-- home
     		--home.css
     	-- market
     		--market.css
     	-- cart
     		--cart.css
     	-- mine
     		--mine.css
     	-- common
     		--header.css
     -- routes
     	--appRouter.js
     -- services
     	--dataServices.js
     -- directives
     	--swiperDirectives.js
     --main.js
--index.html
```





### 关键代码解释

#### 项目首页 index.html

主文件，引入主模块，引入重置样式表，引入对应的css文件

如果首页有tabbar区域，则写在此区域内

```html
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta charset="utf-8">
        <title></title>
        <link rel="stylesheet" href="css/reset.css">
        <link rel="stylesheet" href="css/index.css">
    </head>
    <body ng-cloak>

        <div class="menu" ng-controller="MenuCtrl" ng-show="displayMenu">
            <section ng-repeat="(i, item) in menuData" ng-click="changeMenuIndex()">
                <a ui-sref="{{ item.router }}">
                    <img ng-src="{{ (i == currentIndex) ? item.selectImg : item.normalImg }}" alt="">
                    <p>{{ item.title }}</p>
                </a>
            </section>
        </div>

        <div class="container" ui-view></div>
    </body>
    <script type="text/javascript">
        !function(n) {
           var e = n.document,
               t = e.documentElement,
               i = 720,
               d = i / 100,
               o = "orientationchange" in n ? "orientationchange" : "resize",
               a = function() {
                   var n = t.clientWidth || 375;
                   n > 720 && (n = 720), t.style.fontSize = n / d + "px"
               };
           e.addEventListener && (n.addEventListener(o, a, !1), e.addEventListener("DOMContentLoaded", a, !1))
        }(window);
    </script>
    <script src="scripts/libs/require.js" data-main="scripts/main" charset="utf-8"></script>
</html>
```



#### 主模块 main.js

`requirejs`的主模块，所有的配置都在这里

加载angularjs，并且加载所有的控制器、自定义指令、服务等等

```javascript
requirejs.config({
    baseUrl: './scripts',
    paths: {
        angular: 'libs/angular',
        'angular-ui-router': 'libs/angular-ui-router',
        swiper: 'libs/swiper',
        domReady: 'libs/domReady',


        app: 'controllers/app',
        menuCtrl: 'controllers/menu',
        homeCtrl: 'controllers/home/home',
        marketCtrl: 'controllers/market/market',
        cartCtrl: 'controllers/cart/cart',
        mineCtrl: 'controllers/mine/mine',
        orderForm: 'controllers/mine/orderForm',

        router: 'routes/appRouter',

        swiperDirective: 'directives/swiperDirective',
        dataService: 'services/dataService',
        goHome: 'services/goHome'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        'angular-ui-router': {
            deps: ['angular']
        }
    }
});


// 引入主模块，对应各自文件
requirejs([
    'angular', 'domReady', 'angular-ui-router',
    'app', 'router',
    'menuCtrl', 'homeCtrl', 'marketCtrl', 'cartCtrl', 'mineCtrl', 'orderForm',
    'swiperDirective',
    'dataService', 'goHome',
], function (angular, domReady, _, app) {

    // 页面加载完毕
    domReady(function () {
        // 动态绑定ng-app指令
        // 注意中括号中字符串需要与app.js中一致
        angular.bootstrap(document, ['axfApp']);

        location.hash = '';
    });
});
```



#### 返回App app.js

返回代表angularjs程序的app变量，为了其它文件的使用

```javascript
define(['angular'], function (angular) {
    var app = angular.module('axfApp', ['ui.router']);
    return app;
});
```



#### 路由配置 appRouter.js

路由文件，所有的路由配置都写在这里

```javascript
define(['app'], function (app) {
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        // 默认路由
        $urlRouterProvider.when('', 'home');
        // 全部路由
        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'scripts/views/home/home.html',
            controller: 'HomeCtrl'
        })
        .state('market', {
            url: '/market',
            templateUrl: 'scripts/views/market/market.html',
            controller: 'MarketCtrl'
        })
        .state('cart', {
            url: '/cart',
            templateUrl: 'scripts/views/cart/cart.html',
            controller: 'CartCtrl'
        })
        .state('mine', {
            url: '/mine',
            templateUrl: 'scripts/views/mine/mine.html',
            controller: 'MineCtrl'
        })
        .state('orderForm', {
            url: '/orderForm:index',
            templateUrl: 'scripts/views/mine/orderForm.html',
            controller: 'OrderFormCtrl'
        })
    }]);
});
```



#### 控制器示例 home.js

```javascript
define(['app'], function (app) {
    app.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {
        // 获取数据
        $http.get('json/home.json').then(function (res) {
            // 全部数据
            $scope.allData = res.data.data;

            // 轮播图
            $scope.swiper = $scope.allData.act_info[0];

            // 每次必抢 鲜货直供 新人专享 整箱购
            $scope.menu = $scope.allData.act_info[1];
            $scope.bianlidian = $scope.allData.act_info[4].act_rows;

            // 最下面的一组数据
            $scope.goods = $scope.allData.act_info[5].act_rows;
        });
    }])
});
```



#### 模板页面示例 home.html

```html
<link rel="stylesheet" href="scripts/css/home/home.css">
<div class="home">
    <div class="header" ng-include="'scripts/views/common/header.html'"></div>
    <swiper-directive ng-style="{ marginTop: '52px' }"></swiper-directive>
    <ul class="acts-category">
        <li ng-repeat="item in goods">
            <div class="top">
                <span class="title" ng-style="{ borderColor:  '{{'#' + item.category_detail.category_color }}', color: '{{'#' + item.category_detail.category_color }}' }">{{ item.category_detail.name }}</span>
                <span class="more">更多</span>
            </div>
            <div class="img">
                <img ng-src="{{ item.activity.img }}" alt="">
            </div>
            <ul class="goods-list clear">
                <li ng-repeat="good in item.category_detail.goods">
                    <div class="good-img">
                        <img ng-src="{{ good.img }}" alt="">
                    </div>
                    <p class="good-name">{{ good.name }}</p>
                    <p>
                        <span class="jingxuan">精选</span>
                        <span class="sale" ng-if="good.pm_desc">{{ good.pm_desc }}</span>
                    </p>
                    <p class="weight">{{ good.specifics }}</p>
                    <p>
                        <span class="price">￥{{ good.price }}</span>
                        <span class="market-price" ng-if="good.price != good.market_price">￥{{ good.market_price }}</span>
                    </p>
                    <div class="btn">
                        <span></span>
                    </div>
                </li>
            </ul>
        </li>
    </ul>
</div>
```



#### 样式示例 home.css

```css
.home {
    height: 100%;
    overflow-y: auto;
}
.home .acts-category {
    background-color: RGBA(239, 239, 239, 1.00);
    padding-top: 10px;
    padding-bottom: 1.0384615384615385rem;
}
...
```



#### 自定义指令 swiperDirective.js

```javascript
define(['app', 'swiper'], function (app, Swiper) {
    app.controller('SwiperCtrl', ['$scope', '$http', function ($scope, $http) {
        console.log('SwiperCtrl');
        $http.get('http://www.vrserver.applinzi.com/aixianfeng/apihome.php').then(function (res) {
            $scope.slide = res.data.data.slide;
        });
    }]);

    app.directive('swiperDirective', function () {
        return {
            restrict: "ECMA",
            replace: true,
            templateUrl: 'scripts/views/swiper.html',
            controller: 'SwiperCtrl',
            link: function (scope) {
                // 让轮播图自动滚动
                // scope.$watch('slide', function () {
                    new Swiper ('.swiper-container', {
                        loop: true,
                        autoplay: 1000,
                        observer: true,

                        // 如果需要分页器
                        pagination: '.swiper-pagination',
                    })
                // });
            }
        };
    })
});
```



#### 服务示例 dataService.js

```javascript
define(['app'], function (app) {
    app.service('dataService', function () {
        // 存放购物车的数据
        var goods = [];

        // 添加商品
        this.addGood = function (item) {
            var flag = false;
            // 判断是否存在
            goods.map(function (g) {
                if (g.id == item.id) { // 存在
                    flag = true; // 标记存在
                    return;
                }
            });
            // 不存在才会添加
            flag == false && goods.push(item);
        };

        // 数量减少
        this.reduceCount = function (item) {
            goods.map(function (g, i) {
                if (g.id == item.id) { // 找到了
                    // 数字不是1
                    if (g.count != 0) {
                        // 赋值操作
                        g = item;
                    } else {
                        // 删除元素
                        goods.splice(i, 1);
                    }
                }
            });
        };

        // 根据id，获取详情
        this.goodDetail = function (index) {
            return goods[index];
        };

        // 全部数据
        this.allGoods = function () {
            // return Object.create(goods);
            return goods;
        };
    });
});
```