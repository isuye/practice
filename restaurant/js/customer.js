// 顾客类
// 方法：点菜，吃
function Customer() {
	this.id = 'C' + Cindex();
	this.mode = 0;
}

Customer.prototype.seatDown = function(customer,seat){
	$(customer.id).className = "seat1";
	$(customer.id).style.top = seat.id*120+120+"px";
}

Customer.prototype.order = function(waiter,customer) {

	//console.log("客人点菜了");	
	return new Promise(function (resolve){			
		var x = 3;
		var time = setInterval(function(){			
			$(customer.id).children[1].innerText="正在点餐"+x;
			x--;
			if(x<0){
				$(customer.id).children[1].innerText="点完啦";
				var list = orderList();
				
				var menu = [];
				for(var i=0;i<list.length;i++){
					var zz={};
					Object.assign(zz,list[i])
					menu[i]=zz;
					menu[i].id=customer.id;
				}
				list.b="b";
				customer.list =menu;
				resolve(menu);
				clearInterval(time);
				customer.payMoney=0;
				var text = "<ul id="+customer.id+"cus>";				
				for(var i of list){
					text +=" <li>" + i.name + "</li>";
					customer.payMoney+=i.price;
				}
				$(customer.id).children[1].innerHTML=text;
			}
		},1000)
	});	
}
Customer.prototype.eat = function(menu,customer) {
	
	return new Promise(function(resolve){
		var x = 3;

		var time = setInterval(function(){			
			$(customer.id).children[0].innerText=customer.id+"吃"+ menu.name +":"+x;
			x--;
			doMenu(menu,"cus");
			if(x<0){
				$(customer.id).children[0].innerText=customer.id
				resolve(customer);
				customer.mode=2;
				clearInterval(time);
				for(var i=0;i< customer.list.length;i++ ){
					if(customer.list[i].name == menu.name){
						customer.list.splice(i,1);
					}
				};
				if(customer.list.length==0){
					customer.mode=4;
				}
			}
		},1000)

	})
}
Customer.prototype.pay = function(customer,money,waiter) {
	//console.log("客人付款啦"+money);	
	$(customer.id).children[1].innerText=customer.id+"付款"+money+"元";
	overall.ifeRestaurant.cash+=money;
	$("rest-cash").innerText = "现金: " + overall.ifeRestaurant.cash;
	//释放服务员
	process.doNestWork(waiter.id);
   
   // 释放位置
   return new Promise((resolve)=>{
		setTimeout(resolve,500,customer)
	})
		
}
