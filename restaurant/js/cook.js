// 厨师类，继承自职员
// 完成一次工作：烹饪出菜品
function Cook(name, wages) {
	//var result ;
	Staff.call(this, name, wages);
	this.title = 'cooker';
	result = this;
	// Cook = function() {
	// 	return result;
	// }

}
Cook.prototype = Object.create(Staff.prototype);
Cook.prototype.doWork = function(menu,cook) {
		
		var x = menu.time;
		var name = menu.name;		
		$("menuList").innerHTML=$("menuList").innerHTML.replace(new RegExp(name, 'g'), '<a>'+name+'</a>');		
			
		return new Promise((resolve)=>{
			
			var time=setInterval(function dish(){
				doMenu(menu,"cooker");
				$(cook.id).children[1].innerHTML=name+'还有'+x+'秒做好';				
				x--;			
				if(x<0){			
					//console.log("厨师:做好啦 "+menu.name);
					resolve(menu);
					clearInterval(time);

					//释放厨师
			        process.doNestWork(cook.id);
			        menu.mode = 2;
					$(cook.id).children[1].innerHTML=name+' 完成';									
				}	
			},1000);
			
		})	
		
}

