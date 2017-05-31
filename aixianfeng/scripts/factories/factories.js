define(["app"], function(app){
	app.factory('UtilFactory', ['DataService', function(DataService){
		return{
			money: function(){
				var money = 0;
				DataService.getAllGoods().map(function(item){
					// money += (item.count * item.price);
					//选择计算(点击全选全不选的时候)价格的时候 计算item.carFlag == true的钱，其余的不做计算
					if(item.carFlag == true){
						money += (item.count * item.price);
					}
				});
				return money;
			}
		};
	}])
})