define(["app"], function(app){
	return ["$scope", "$http", "DataService", "$state", "$stateParams", "$css", function($scope, $http, DataService, $state, $stateParams, $css){
		// 加载css文件
		$css.bind({
            href: 'scripts/css/market/market.css'
        }, $scope);

		$http({
				method: "GET",
				url:"json/data.js"
			}).then(function(res){
				$scope.data = res.data;
				// console.log(res);
				console.log($scope.data.data.categories)
				//让前面的黄色竖条也跟着动
				$scope.data.data.categories.map(function(item, index){
					if($stateParams.id != undefined){
						if(item.id == $stateParams.id){
							$scope.currentIndex = index;
						}
					}else{
						$scope.currentIndex = 0;
					}
				})
				//得到热销榜的id
				//当第一页面点击跳转后 页面跳过来之后
				$scope.hotID = $stateParams.id || $scope.data.data.categories[0].id;
				console.log($scope.data.data.categories[0].id);
				//初始化第一个出来的商品
				$scope.dateGoods = $scope.data.data.products[$scope.hotID];

				//当第一页面点击跳转后 页面跳过来之后
				// console.log($stateParams.id);
			
				// $scope.dateGoods = $scope.data.data.products[$stateParams.id];
				
				//执行一下函数
				local();
			},function(){
				console.log("失败了");
			});
		
			//点击菜单 添加动态样式
			//初始化第一个下标有样式

			// $scope.currentIndex = 0;
			//点击那个让他的下标付给当前
			$scope.chose =function(index){
				$scope.currentIndex = index;
				//得到id数据
				// console.log(this.value.id);
				//用id得到商品数据
				$scope.dateGoods = $scope.data.data.products[this.value.id];
				// console.log($scope.dateGoods);
				//执行函数 实现数据储存
				local();
			}
			
				//遍历如果商品的id和service的商品一样就让count用service
				//封装起来多次调用
				function local(){
					for(var i in $scope.dateGoods){
						//如果没有count的属性 则添加进行初始化
						if(!$scope.dateGoods[i].count){
							$scope.dateGoods[i].count = 0;
						}
						for(var n in DataService.getAllGoods()){
							//当有和service中的id中的count一样的时候就换掉count的值
							if($scope.dateGoods[i].id == DataService.getAllGoods()[n].id){

								$scope.dateGoods[i].count = DataService.getAllGoods()[n].count;
							}
						}
					}

					// console.log($scope.dateGoods)
				}

			//点击增加按钮; 数字跟着增加
			//默认值为0
			//这是不显示的逻辑 如果用商品中自带的属性 页面的也会变就不能这样写
			/*$scope.count = 0;
			$scope.add = function(){
				console.log(this.value);
				//把商品信息添加到service中去
				DataService.addGoods(this.value);
				this.count = DataService.getAllGoods()[this.$index].count;
				console.log(DataService.getAllGoods()[this.$index].count);
				// this.count++;
			}
			//点击减的时候
			$scope.reduce = function(){
				// this.count--;
				//调用服务中的方法 完成数据的绑带，绑定count
				DataService.reduceConmon(this.value);
				//赋值给当前 以便使用
				this.count = DataService.getAllGoods()[this.$index].count;
			}*/
			
			//点击增加按钮
			$scope.add = function(){
				DataService.addGoods(this.value);
				// this.value.count++;
				local();
			}
			//点击增加按钮
			$scope.reduce = function(){
				DataService.reduceConmon(this.value);
				// this.value.count--;
				
				local();
			}



			//排序 按销量 
			$scope.sortArr = ["综合排序", "销量最高", "价格最低", "价格最高"];
			//点击事件发生的时候
			//默认第一个 sortIndex = 0;
			$scope.sortIndex = 0;
			//默认第一个选中的是"综合排序"
			$scope.sortText = $scope.sortArr[0];
			$scope.sortYellow = function(index){
				$scope.sortIndex = index;
				//选中之后 上面的sortText也跟着动
				$scope.sortText = this.value;

				console.log(this.value);
				switch(this.value){
					case "价格最低":
						$scope.fun = function(obj){
							return parseFloat(obj["price"]);
						};
						console.log($scope.dateGoods)
						break;
					case "价格最高":
						$scope.fun =function(obj){
							return -parseFloat(obj["price"]);
						};
						break;
					case "综合排序":
						$scope.fun =function(obj){
							return parseFloat(obj[""]);
						};
						break;
					case "销量最高":
						$scope.fun =function(obj){
							return parseFloat(obj["sort"]);
						};
						break;
				}
			};
			//点击过后消失sort排序
			//立标志
			$scope.flag1 = false;
			//点击祖父级别的消失
			$scope.hideSort = function(){
				$scope.flag1 = false;
			}
			//点击排序的那个li的时候出现
			$scope.showSort = function(){
				$scope.flag1 = true;
			}
			//页面跳转到详情页面
			$scope.goDetail = function(){
				//获取当前数据
				console.log(this.value);
				//使用$state进行路由的跳转，并传递数据
				$state.go("goodDetail", {
					id: JSON.stringify(this.value)
				});
			}
	}]


})