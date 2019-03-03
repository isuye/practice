// 餐厅类
// 属性：金钱，座位数量、职员列表
// 方法：招聘职员，解雇职员
function Restaurant(obj) {
	this.cash = obj.cash;
	this.seats = obj.seats;
	this.staffs = obj.staffs;
}
Restaurant.prototype.hire = function(staff) {
	this.staffs.push(staff)

	var tr = document.createElement("tr");
	tr.innerHTML = '<td>' + staff.name + '<td>' + staff.wages + '<td><button>删除';

	var div = document.createElement("div");
		div.id = staff.id
		div.className = 'employ';
		div.innerHTML = '<p>'+staff.name+'</p><p class="staffNews">休息</p><img src="img/'+staff.title +'.png">';	

	if(staff.title == "cooker") {		
		$("rest-cook").children[1].appendChild(tr);
		$("part1").appendChild(div);

	}else{
		$("rest-waiter").children[1].appendChild(tr);
		$("part2").appendChild(div);
	}
}
Restaurant.prototype.fire = function(staff) {
	
	for(var item of this.staffs){
		if(item.id === staff.id){
			let x = this.staffs.indexOf(item);
			this.staffs.splice(x,1);
		}
	}
}
// 职员类
// 属性：ID，姓名，工资
// 方法：完成一次工作

function Staff(name, wages) {
	this.id ='EM' + index();
	this.mode =0;//0空闲,1忙碌
	this.name = name;
	this.wages = wages;
}
Staff.prototype.doWork = function() {
	console.log('finish work');
}

// 菜品类
// 属性：名字、烹饪成本、价格
function list(name, cost, price, time) {
	this.name = name;
	this.cost = cost;
	this.price = price;
	this.time = time;
	this.mode = 0;
}

function id() {
	var id = -1;
	return function(){
		return id+=1;
	}
}
var index = id();
var Cindex = id();