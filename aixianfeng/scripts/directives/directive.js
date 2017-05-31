define(["app"], function(app){
	app.directive("mySwiper", function(){
				return{
					restrict:"EC",
					replace:true,//注释的时候才用
					template:'<div class="swiper-container"><div class="swiper-wrapper"><div class="swiper-slide" ng-repeat = "url in swiper"><img ng-src = "{{url}}" alt=""/></div></div><!-- 如果需要分页器 --><div class="swiper-pagination"></div></div>'
				}
			})
})