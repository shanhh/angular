define(["app"], function(app){
	return ["$scope", "DataService", "UtilFactory", "$css", function($scope, DataService, UtilFactory, $css){
		$css.bind({
			href:"scripts/css/car/car.css"
		},$scope)

		//获取service中的数组数据
		$scope.carGoods = DataService.getAllGoods();
		//给所有商品添加自定义属性 以便以后的计算全选全不选
		$scope.carGoods.map(function(item){
			item.carFlag = true; 
		})
		console.log($scope.carGoods);
		//当点击加按钮的时候
		$scope.add = function(){
			//$index指的是下标，可以打印this找到，这样能得到点击的商品
			var a = $scope.carGoods[this.$index];
			//count的值加加
			a.count++;
			//地址引用都会发生改变
			// console.log(DataService.getAllGoods()[this.$index].count)
			$scope.allPrice = UtilFactory.money();
		}
		//当点击减减的时候
		$scope.reduce = function(){
			//service中的reduce方法
			DataService.reduce(this.$index);
			$scope.allPrice = UtilFactory.money();
		}
		//计算总价格
		$scope.allPrice = UtilFactory.money();
		//当点击每一个不选按钮的时候
		//只要有一个按钮不选就不会全选
		$scope.flagAllCheck = true;
		$scope.check = function(){
			this.value.carFlag = !this.value.carFlag;
			//先让$scope.flagAllCheck = true 解决点击完之后其他的不出的bug
			$scope.flagAllCheck = true;
			//遍历数组查看有没有 Carflag的属性为false;有的话$scope.flagAllCheck为false;
			$scope.carGoods.map(function(item){
				if(item.carFlag == false){
					$scope.flagAllCheck = false;
				}
			})
			//计算总价格
			$scope.allPrice = UtilFactory.money();
		}
		//当点击全选按钮的时候 注意只要有一个按钮不选就不会全选
		$scope.checkAll = function(){
			//点击全选 此时的$scope.flagAllCheck = true
			// $scope.flagAllCheck = true;
			$scope.flagAllCheck = !$scope.flagAllCheck;
			if($scope.flagAllCheck){
				$scope.carGoods.map(function(item){
					item.carFlag = true;
				});	
			}
			if($scope.flagAllCheck == false){
				$scope.carGoods.map(function(item){
					item.carFlag = false;
				});	
			}
			//计算总价格
			$scope.allPrice = UtilFactory.money();
		};


	}]

})
