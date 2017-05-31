define(["app"], function(app){
	app.service("DataService",  function(){
		var arr = [];
		//外部添加商品push到数组中
		this.addGoods = function(newItem){
			var flag = false;
			arr.map(function(item){
				//用item加加 数组里面的不往数组里面push了
				if(item.id == newItem.id){
					flag = true;
					item.count++
				} 
			})
			if(flag == false){
				newItem.count = 1;
				arr.push(newItem)
			}

		};
		//购物车页面的减减
		this.reduce = function(index){
			var item = arr[index];
			//如果到1的时候 把当前商品从数组中删除
			if(item.count == 1){
				arr.splice(index, 1);
			} else {
				item.count--;
			}
		};
		//其他类别的减减 不是购物车页面的
		this.reduceConmon = function(newItem){
			arr.map(function(item, index){
				// var indexOf = arr.indexOf(item);
				if(item.id == newItem.id){
					item.count--;
					//当减到0的时候 找到该商品的下标 删除
					if(item.count <= 0){
						arr.splice(index, 1);
						//处理减到1 页面上还出现1的bug;
						newItem.count = 0;
					}
					
				}
			});
			console.log(arr);
		}
		 this.getAllGoods = function () {
	        return arr;
	    };
	    
	})
})