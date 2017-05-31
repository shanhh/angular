define(["app","swiper"], function(app){
	return ["$scope", "$http", "DataService", "$state", "$rootScope", "$css", function($scope, $http, DataService, $state, $rootScope,$css){
		console.log($scope);

		// 加载css文件
		$css.bind({
            href: 'scripts/css/home/home.css'
        }, $scope);


        
		$http({
			method: "GET",
			url: "json/home.json"
		}).then(function(res){
			console.log(res)
			$scope.swiper = [];
			$scope.swiperArr = res.data.data.act_info[0].act_rows;
			//遍历轮播图的对象，把轮播链接push到数组中
			for(var n in $scope.swiperArr){
				$scope.swiper.push($scope.swiperArr[n].activity.topimg)
			}
			/*console.log($scope.swiperArr);
			console.log($scope.swiper);*/
			//nav 中的数据
			$scope.nav = res.data.data.act_info[1].act_rows;
			console.log($scope.nav)
			//pic数据
			$scope.pic = res.data.data.act_info[3].act_rows; 
			console.log($scope.pic)
			// picList数据
			$scope.picList = res.data.data.act_info[4].act_rows;
			console.log($scope.picList)
			$scope.floor = res.data.data.act_info[5].act_rows;
			console.log($scope.floor)

		})
		//在控制器中初始化mySwiper
		var mySwiper = new Swiper('.swiper-container', {
					        pagination: '.swiper-pagination',
					        slidesPerView: 1,
					        paginationClickable: true,
					        // loop: true,
					        speed: 1000,
					        autoplay: 3000,
					        autoplayDisableOnInteraction:false,
					        observer:true
					    });
		//当点击增加按钮的时候,并把得到的goods信息储存到service中
		$scope.add = function(){
			// console.log(this.item);
			DataService.addGoods(this.item);
			console.log(DataService.getAllGoods())
		}
		//跳转商品详情页面
		$scope.goDetail = function(){
			$state.go("goodDetail", {
				id:JSON.stringify(this.item)
			})
		}
		//点击more的时候
		$scope.goMore = function(){
			//打印它的id
			console.log(this.value.category_detail.category_id);
			$rootScope.indexCurrentIndex = 1;
		}
	}]
})