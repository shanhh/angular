define(["app"],function(n){n.factory("UtilFactory",["DataService",function(n){return{money:function(){var t=0;return n.getAllGoods().map(function(n){1==n.carFlag&&(t+=n.count*n.price)}),t}}}])});