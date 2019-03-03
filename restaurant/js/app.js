
function $(id){
	return document.getElementById(id);
}

//随机生成菜单************************************************************
function random(max) {
	return Math.floor(Math.random()*max);
};
function orderList(){
	var list = [];
	var number = random(overall.menu.length);
	//console.log(number);
	for(let i = 0; i <= number; i++){
		var x = random(overall.menu.length);
		list.push(overall.menu[x]);
	};
	list = [...new Set(list)];//去除重复
	return list;
}

//点击开门时,迎接客人
$("rest-open").addEventListener("click",openDoor);
//点击关门,不再来客
$("rest-close").addEventListener("click",closeDoor);
function closeDoor() {
	 clearTimeout(openTime);
}
//雇佣厨师
$("newCook").addEventListener("click",function(){
	
	staff = new Cook("nana", 9500);
	overall.ifeRestaurant.hire(staff);
	//process.add(staff)

});


//雇佣服务台
$("newWaiter").addEventListener("click",function(){
	
	staff = new Waiter("lulu", 6000);
	overall.ifeRestaurant.hire(staff);
	//process.add(staff)
});

//初始化餐厅************************************************************
var overall={
	ifeRestaurant:(function(){
						var ifeRestaurant = new Restaurant({
						    cash: 50000,
						    seats: 3,
						    staffs: []
						});
						$("rest-cash").innerText = "现金: " + ifeRestaurant.cash;
						$("rest-seats").innerText = "座位: " + ifeRestaurant.seats;
						
						
						for(var i = 0 ; i < ifeRestaurant.seats; i++) {
							var div = document.createElement("div");
							div.className = 'resSeat';
							$("setarea").appendChild(div);
						}						
						return ifeRestaurant;
					})(),
	menu:(function() {
				var menu = [
					new list('炖猪蹄',18,28,5),
					new list('红烧排骨',20,35,5),
					new list('麻辣土豆',5,15,3),
					new list('干锅肥肠',20,38,5),
					new list('炒时蔬',5,10,3)
				]
				return menu;
			})(),
	hire:function(name, wages, title){
					var staff;
					if(title=="waiter") {
						staff = new Waiter(name, wages);
					}else if(title=="cooker"){
						staff = new Cook(name, wages);										
					}
					overall.ifeRestaurant.hire(staff);				
				},
	cusLine:[]
}

//初始化流程
function Process(){
	this.staffs ;
	this.seats = [];

	this.customer = [];
	this.menu = [];
}
Process.prototype = {
	set: function(data){
		if(Array.isArray(data)) {
			this.staffs = data;
		}else{
			for(var i = 0; i < data; i++) {
				this.seats.push({
					id: i,
					mode: 0
				});
			}
		}
	},
	add: function(data) {
		this.staffs.push(data);
	},
	getStaff: function(title){
		for(var worker of this.staffs) {
			if(worker.title==title&&worker.mode==0) {
				worker.mode = 1;
				return worker;
			}
		}
	},
	getSeat: function() {
		for(var set of this.seats) {
			if(set.mode==0) {
				set.mode = 1;
				return set;
			}
		}
	},
	doNestWork: function(id) {
		$(id).children[1].innerText = "休息";
		for(var worker of this.staffs) {
			if(worker.id == id&&worker.mode == 1) {
				worker.mode = 0;
				$(worker.id).children[1].innerHTML='休息';
				if(worker.title=="waiter") {
					if(this.customer.length>0){
						//客人
						for(var cus of this.customer) {// 0等待入座 1等待点餐 2等待送菜 3正在吃菜 4等待结账
							if(cus.mode == 1){
								Cus_order(cus);
								return;
							}
							if(cus.mode==4){
								var cus1 = cus;
								//cus1.mode=5;
								cus_eat_pay(cus1);
							}
							
						}
					}
					if(this.menu.length>0) {
						for(var list of this.menu) {
							if(list.mode == 2){
								waiter_send(list);
							}						
						}						
					}
				}else if(worker.title=="cooker") {
					if(this.menu.length>0){
						//厨师工作
						Cook_doWork();
					}
				}
			}
		}
	},
	wait: function(type, data) {//1:待服务客人;2:待做菜单
		if(type==1) {
			this.customer.push(data);
		}
		if(type==2) {
			this.menu.push(data);
		}
	},
	getNextSet:function(id){
		for(var set of this.seats){
			if(set.id==id){
				set.mode=0;
				var customer = this.customer.find((item)=>{return item.mode==0})
				Cus_to_seat(customer)
			}
		}
	}
}
overall.hire("sam", 9000, "cooker");
overall.hire("tony", 6000, "waiter");
console.log(overall.ifeRestaurant);
console.log(overall.menu);
console.log(overall.cusLine);


var process = new Process();
process.set(overall.ifeRestaurant.staffs);
process.set(overall.ifeRestaurant.seats);
console.log(process);
// 信息传递

//顾客随机到
function customerCome(){
	var number = random(2);
	var time = random(3);

	openTime =  setTimeout(customerCome,time*1000);
	for(var i = 0; i < number; i++){
		var customer = new Customer();	
		var div = document.createElement("div");
		div.id = customer.id;
		div.innerHTML = '<p>'+customer.id+'</p><p class="staffNews">等待</p><img src="img/customer.png">'; 
		div.className = "toWait";
		$("part3").appendChild(div);
		if(overall.cusLine.length<=4) {
			overall.cusLine.push(customer);
			div.tabIndex = 0;					
			Cus_to_seat(customer);
			process.wait(1, customer);
		}
	};
		
}

//多余客人离开
function customerLeave() {
	setTimeout(customerLeave,1000);	
	var line = $("part3").children;	

		for( var i =0; i < line.length; i++) {
			var customer = line[i];
				if(customer.tabIndex == -1) {
					customer.tabIndex = 2;					
					(function(customer){
						var cus = customer;
						setTimeout(function(){
							cus.className = "toLeave";
							//cus.removeChild(cus.children[1]);
						},3000);
						setTimeout(function(){
							cus.parentNode.removeChild(cus);
						},5000);
					})(customer);
				}
		}
	
}


function openDoor(){
	customerCome();
	customerLeave();
}
//客人入座
function Cus_to_seat(customer) {
	var seat = process.getSeat();
	if(seat) {
		overall.cusLine.shift();
		customer.seat = seat;
		$(customer.id).className = 'toSeat';
		$(customer.id).style.top = seat.id*130+150+"px";
		Cus_order(customer);
	}else{
		//process.wait(1, customer)
	}
}
//等待点餐*******客人状态   0等待入座 1等待点餐 2等待送菜 3正在吃菜 4等待结账
function Cus_order(customer) {
	var waiter = process.getStaff("waiter");
	if(waiter) {
		customer.mode = 2;
		waiter.order(waiter, customer.seat)
		.then((waiter)=>{			
			return customer.order(waiter, customer)
		})
		.then((menu)=>{
			//process.wait(1, customer);
			
			for(var i of menu){				
				
				var list = {};
				Object.assign(list, i);
				i.customer = customer;
				i.show = 0;
				process.wait(2, i)
			};
			waiter.doWork(menu, waiter, customer)
			.then(Cook_doWork);
			
		})
	}else {
		customer.mode = 1;
		//process.wait(1, customer)
	}
}

//厨师做菜.改变mode  //*******菜品状态   0等待炒 1正在炒 2等待送 3等待吃掉 show 1,已显示
function Cook_doWork(){
	//if(process.menu.length>0){
		
		for(var list of process.menu){
			if(list.mode == 0) {
				list.aaa="aaa";
				var cooker = process.getStaff("cooker");
				if(cooker) {
					list.mode =1;
					cooker.doWork(list, cooker)					
					.then(waiter_send)
					break;				
				}
			}
		}
		
	//}
}

function waiter_send(){

	for(var i of process.menu){
		if (i.mode==2) {
			var waiter = process.getStaff("waiter");
			if(waiter) {
				i.mode = 3;
				waiter.doWork(i, waiter, i.customer)
				.then(cus_eat_pay)
				break;
			}			
		}
	}
}

function cus_eat_pay(customer) {
	if(customer.mode==2){
		
		if(customer.list.length>0){
			for(var i of customer.list){
				if(i.mode==3){
					i.mode=4;
					customer.mode=3;
					customer.eat(i, customer)
					.then(cus_eat_pay)
					break;
				}
			}
					
		}
	}
	if(customer.list.length==0){
		
		var waiter = process.getStaff("waiter");
		if(waiter) {
			customer.mode=5;
			waiter.getMoney(waiter, customer)
			.then((money)=>{
				customer.pay(customer, money, waiter)
				.then((customer)=>{

					for(var i =0;i<process.customer.length;i++){
						if(process.customer[i].id==customer.id){
							process.customer.splice(i,1);
						}
					}			
					$(customer.id).parentNode.removeChild($(customer.id));
					//
					if(process.customer.length>2){
						process.getNextSet(customer.seat.id);
					}else if(process.customer.length==0){
						alert("今天营业结束啦");
					}
					
				})
			})
		}
	}	
}
//显示待做菜单
function showMenu(menu) {//show 1,已显示 2在做 3已传菜
	var ul = document.createElement("ul");
	ul.id = menu[0].customer.id+" cus"
	
	var text = "";
	for(var i of menu) {
		if(i.show==0){
			i.show=1;
			text+="<li>"+i.name;
		}	
	}
	ul.innerHTML=text;
	$('menuList').appendChild(ul);
	
}
//已做/吃菜单变色
function doMenu(menu,name){
	var div;
	var li;
	if(name=="cooker"){
		div = document.getElementById('menuList');
		li = div.getElementsByTagName("li");
	}else if(name=="cus") {
		div = document.getElementById(menu.customer.id);
		li = div.getElementsByTagName("li");
	}

	for(var i of li) {
		if(i.innerText==menu.name&&i.parentNode.id.includes(menu.customer.id)==true ) {
			i.style.color = "blue";
		}
	}
}
//删除展示菜单
function delMenu(menu){
	var div = document.getElementById('menuList');
	var li = div.getElementsByTagName("li");
	for(var i of li) {
		if(i.innerText==menu.name&&i.parentNode.id.includes(menu.customer.id)==true ) {
			var parent = i.parentNode;
			$(i.parentNode.id).removeChild(i);
			if(parent.children.length==0) {
				div.removeChild(parent);
			}
		}
	}
}

