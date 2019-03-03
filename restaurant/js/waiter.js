
// 服务员类，继承自职员
// 完成一次工作：如果参数是个数组，则记录客人点菜，如果参数不是数组则是上菜行为
function Waiter(name, wages) {
	//var result;
	Staff.call(this, name, wages);
	this.title = 'waiter';
	result = this;
	// Waiter = function() {
	// 	return result;
	// }
}
Waiter.prototype = Object.create(Staff.prototype);

Waiter.prototype.order = function(waiter,seats){
	return new Promise((resolve)=>{
		setTimeout(()=>{
			$(waiter.id).className = "toCustomer";
			$(waiter.id).style.top=seats.id*130+150+"px";
			$(waiter.id).children[1].innerText ="欢迎光临";
			resolve(waiter);
		},1000)
	})
}
Waiter.prototype.doWork = function(menu,item,customer) {
	return new Promise(function(resolve) {		
		if(Array.isArray(menu)){
			var name="";
			
			for(var i of menu){
				name += i.name + "<br>";
			}
			$(item.id).className="toCooker";
			$(item.id).style.top=customer.seat.id*130+150+"px";	
			$(item.id).children[1].innerHTML = '客人点了:<br>' + name;					
			//console.log('服务员:客人点了 ' + name);				
			setTimeout(function(){				
				
				
				resolve(menu);
				showMenu(menu);
				//释放服务员
				process.doNestWork(item.id);
			},1000)
		}else {
			//console.log('服务员:上菜啦 ' + menu.name);				
			(function (){
				var staff = item;
				var list = menu;
				var cus = customer;
				setTimeout(function(){
					var x = $(staff.id);
					x.className = "toCustomer";
					x.style.top = cus.seat.id*130+150+"px";
					x.children[1].innerText = '客人的 ' + list.name+"来了";
					resolve(cus);
					delMenu(menu);					
				},1000)
				setTimeout(function(){
					//释放服务员
					process.doNestWork(item.id);
					$(staff.id).className="toCooker";
					$(staff.id).style.top=cus.seat.id*130+150+"px";
					$(staff.id).children[1].innerHTML="休息";
				},1500);
			})();			
		}
	})
}
Waiter.prototype.getMoney = function(waiter,customer) {
	return new Promise(function(resolve){
		(function (){
			var staff = waiter;
			var cus = customer;

		setTimeout(function(){
			$(staff.id).style.top = cus.seat.id*130+150+"px";
			$(staff.id).className = "toCustomer";
			$(staff.id).children[1].innerText = '客人你好,一共 ' + cus.payMoney;
			resolve(cus.payMoney);
			
		},1000)
		setTimeout(function(){
			$(staff.id).className = "toCooker";
			$(staff.id).children[0].innerHTML=staff.name;
		},1500);


		})()
			
	})		
}