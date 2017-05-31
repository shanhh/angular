# AngularAMD



###  按需加载

使用AngularJS开发SPA的时候，使用`angular-ui-router`进行内容的切换。

但是在router的使用情景里，需要将每个state所使用的controller进行预先加载之后，才能正常切换内容。

也就意味着，必须在启动的当下，先将整个SPA所用到的Controller都预先加载到浏览器之中。

预先加载所有的Controller备用的动作，在大型项目上很容易造成浏览器效能上的负担，进行影响用户的体验。

>   进入哪个页面，才加载哪个页面对应的资源



### 下载文件，放入libs中

>   angularAMD.js



### 使用流程

1.  主模块中进行配置

    ```javascript
    requirejs.config({
        baseUrl: './scripts',
        paths: {
    	    // ....
            angularAMD: 'libs/angularAMD',
        },
        shim: {
            // ...
            angularAMD: { // 对angular进行依赖
                deps: ['angular']
            },
        }
    });
    ```

2. 在`appRouter.js`中依赖

    ```javascript
    define(['app', 'angularAMD'], function (app, angularAMD) {
      
    });
    ```

3. 更改路由代码

    ```javascript
    // old code
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'scripts/views/home/home.html',
        controller: 'HomeCtrl'
    })
    ```

    ```javascript
    // new code
    $stateProvider
    .state('home', angularAMD.route({
        url: '/home',
        templateUrl: 'scripts/views/home/home.html',
        controllerUrl: 'scripts/controllers/home/home.js'
    }))
    ```

4. 更改Controller代码

    ```javascript
    // old code
    define(['app'], function (app) {
    	app.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {
    		// ...
        }]);
    });
    ```

    ```javascript
    // new code
    // 直接返回控制器对应的函数即可
    define(['app'], function (app) {
        return ['$scope', '$http', function ($scope, $http) {
    		// ...
        }];
    });
    ```

5. 刷新页面，查看效果
    点击每个页面的时候，才会加载相对应的文件
    ​