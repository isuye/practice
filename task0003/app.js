
//应该构造函数,创造数据,然后窗口从数据里拉出来展示,而不是把现在创造的数据展示在窗口,然后添加到页面!!!
//构造父类函数


function Parent(name) {
	this.name = name;	
	this.id = "";
	this.childs = [];	
}
Parent.prototype.addChild = function(child) {	
	var id = this.id + "-" + this.childs.length;
	child.id = id;
	this.childs.push(child);	
}
Parent.prototype.delChild = function(child) {
		var that = this;
		var id = child.id;
		function a (childs) {
			if(childs== null){
				return;
			}
			for(var i = 0; i < childs.length; i++) {
				if(childs[i].id == id) {
					childs.splice(i,1);
				}else {
					arguments.callee(childs[i].childs);
				}
			}
		}
		a(that.childs);
}
function Sons(name, time, content) {
	
	this.name = name;
	this.time = time;
	this.content = "内容";	
	this.id = "";
	this.finis="false";
}
Sons.prototype = Object.create(Parent.prototype);
Sons.prototype.constructor = Sons;
//封装$函数,获取id
function $(id) {	
	return document.getElementById(id);	
}

//初始化数据
window.onload = function() {	
	//显示数据
	initBody();

}

//选择任务
document.body.addEventListener("click",checkTask)
//选择分类
document.body.addEventListener("click",checkClass)

//增加任务
document.body.addEventListener("click",addTask)
//增加分类
document.body.addEventListener("click",addClass)
//确认修改详细信息
document.body.addEventListener("click",changeTodo)
//增加鼠标经过事件
document.body.addEventListener("mouseover",showImg)

//删除数据
document.body.addEventListener("click",delData)
document.body.addEventListener("click",finishClass)
document.body.addEventListener("click",chosefinishClass)
//********************************************************
//找到数据
function getData() {
	if(localStorage.localData==undefined){
		return initData;
	}else{
		return JSON.parse(localStorage.localData);
	}
}
//保存现有选择
function checkIndex(x) {
	var index = "0-0-0";
	return function (x){
		return index = x || index;
	}
}
var index = checkIndex();


//显示数据	
function initBody(whitch) {
	//var whitch=whitch;
	$("list-ul-1").innerHTML = "";
	var ininData = getData();
	var taskData = [],//提取数据
		classData = [];
		finisData=[];
		notFinisData=[];
	//分别找出一二级分类和3级分类	
	a(ininData);
	function a(data) {
		if(data.childs==undefined){
				return;
			}
		for(var i = 0; i <data.childs.length; i++)
			if(data.childs[i].time!==undefined){
				classData.push(data.childs[i]);	
			}else{
				taskData.push(data.childs[i]);
				a(data.childs[i]);	
			}				
	};
	//确认任务是否完成
	for(var i of classData)	{
		if(i.finis==false){
			notFinisData.push(i)
		}else{
			finisData.push(i)
		}
	}

	$("class-title-p").innerText="所有任务 (" + notFinisData.length + ")";
	//列出分类列表
	taskData.forEach(listTask);
	function listTask(item){
		var li = document.createElement("li");
		var p = document.createElement("p");
		var img = document.createElement("img");
				img.src = "img/6.png";
				img.className = "del-img2";


		li.id = item.id;
		li.className = "li-" + item.id.match(/[0-9]/g).length;
		p.innerText = item.name + "  (" + findCheckNum(item).length + ")";
		
		li.appendChild(p);
		
		$("list-ul-1").appendChild(li);
		if(li.id!=="0-0"){
			li.appendChild(img);
		}
	}
	//默认选择默认分类
	if($(index())==null){
		$("0-0-0").style.background = "#fff";
	}else{
		$(index()).style.background = "#fff";
	}	
	//根据index初始化任务列表
	if(index().match(/[0-9]/g).length==3){
		$("list-all-ul").innerHTML="";
		listClass(whitch);
	}
	//列出任务列表
	function listClass(whitch) {
		if(whitch=="false"){
			whitch=false;
		}else if(whitch=="true"){
			whitch=true;
		}
		var allchild;
		var  child=[];////////
		
			for(var i = 0; i < taskData.length; i++) {
				if(taskData[i].id==index()) {
					allchild = findNum(taskData[i]);
				}
			}
		for(var i of allchild){
				if(i.finis ==whitch){
					child.push(i);
				}
			}
		if(whitch==undefined){
			child=allchild
		}
		//给child排序,时间
		child.sort(function(a,b){
			return Date.parse(a.time.replace(/-/g,"/"))-Date.parse(b.time.replace(/-/g,"/"));
		})

		for(var i = 0; i < child.length; i++) {	
			var li = document.createElement("li");
			var p = document.createElement("p");
			var p2 = document.createElement("p");
			var img = document.createElement("img");
				img.src = "img/6.png";
				img.className = "del-img";
			var input = document.createElement("input");
			    input.id = "check-"+child[i].id;
			    input.className = "checkbox"
			    input.type="checkbox";

			

			li.id = child[i].id;
			li.className = "li-" + child[i].id.match(/[0-9]/g).length;
			p.innerText = child[i].time ;
			p.className = "list-time";
			p2.appendChild(input);
			p2.innerHTML =p2.innerHTML+ child[i].name ;
			p2.className = "list-name";

			

			

			if(i>0&&child[i].time!==child[i-1].time){
				li.appendChild(p);				
			}else if(i==0){
				li.appendChild(p);	
			}

			li.appendChild(p2);
			li.appendChild(img);

			$("list-all-ul").appendChild(li);


		}
			a(ininData)
			function a(data) {
				if(data.childs==undefined){
					return;
				}
				for(var i = 0; i <data.childs.length; i++){
					if(data.childs[i].finis==true){
						var id = "check-"+data.childs[i].id;
						if($(id)!==null){
							$(id).checked = true;
						}
						
					
					}else{
						a(data.childs[i]);	
					}				
				};
			}
	}	
	//找到所有任务总数
	function findCheckNum(parent) {
		function checked(item) {
			return item.id.startsWith(parent.id)==true;
		}

		return notFinisData.filter(checked);
	}
	function findNum(parent) {
		function checked(item) {
			return item.id.startsWith(parent.id)==true;
		}

		return classData.filter(checked);
	}
}

//选择分类
function checkTask(event){
	var target = event.target;
	var alltask = $("list-ul-1").children;
	// 判断屏幕大小
	if(target.parentNode.className=="li-3"){
		if(window.innerWidth < 600){
			$("task-class").style.display = "none";
			$("task-list").style.display = "block";
		}		
	}
	

	if(target.parentNode.className=="li-2" || target.parentNode.className=="li-3"){
		
		for(var i of alltask) {
			i.style.background = "#f2f2f2";
		}
		target.parentNode.style.background = "#fff"; 
		index(target.parentNode.id);
		initBody();
	}
}
//选择任务

function checkClass(event){
	var target = event.target;
	// console.log(target)
	
	var ininData = getData();
	var content;
	var taskData = [],//提取数据
		classData = [];
	a(ininData);
	function a(data) {
		if(data.childs==undefined){
				return;
			}
		for(var i = 0; i <data.childs.length; i++)
			if(data.childs[i].time!==undefined){
				classData.push(data.childs[i]);	
			}else{
				taskData.push(data.childs[i]);
				a(data.childs[i]);	
			}				
	};	

	var alltask = $("list-all-ul").getElementsByTagName("p");
	if(target.className !=="list-name"){
		return ;
	}
		// 判断屏幕大小
	
		if(window.innerWidth < 600){
			$("task-list").style.display = "none";
			$("task-des").style.display = "block";
		}		
	


		for(var i of alltask) {
			if(i.className=="list-name" ){
				i.style.background = "#fff";
			}	
		}
		target.style.background = "#daf5f6"; 

	for(var i of classData) {
		if( i.id ==target.parentNode.id ) {
			content=i;
		}
	}
	//生成右边界面	
	$("des-check").style.display = "block"
	$("des-title-name").innerHTML = "任务名称 <input id='input1' value=" 
									+ content.name + "></input>";
	$("des-time-name").innerHTML = "任务时间 <input type='date' id='input2' value=" 
									+ content.time + "></input>";
	$("des-text-name").innerHTML = "<textarea id='input3'>" 
									+ content.content + "</textarea>";
}
//增加分类
function addClass(event) {
	var ininData = getData();
	var target = event.target.parentNode;
	
	if(target.id=="addclass"){
		var newname = prompt("请输入名称","默认分类");		
	}
	if(newname!=null && newname!="") {
		var addTask = new Parent(newname);
		addTask.id = ininData.id + "-" + ininData.childs.length;
		ininData.childs.push(addTask);
		
		localStorage.setItem("localData",JSON.stringify(ininData));
		initBody();
	}
}
//增加任务
function addTask(event) {
	var target = event.target.parentNode;
	var ininData = getData();	
	if(target.id!=="addtask"){
		return;
	}
	var newname = prompt("请输入名称","task");
	

	var parent = index().match(/[0-9]/g).length;
	if(parent==2) {
		if(newname!==null && newname!=="") {
			a(ininData);
		}

		
			localStorage.setItem("localData",JSON.stringify(ininData));
		initBody();	
		function a(data) {
			if(data.childs==undefined){
				return;
			}
			for(var i = 0; i <data.childs.length; i++)
				if(data.childs[i].id==index()){
					
						var addTask = new Parent(newname);
						addTask.id = data.childs[i].id + "-" + data.childs[i].childs.length;

						data.childs[i].childs.push(addTask);
					
					
							
				}else{
					a(data.childs[i]);	
				}				
		};
		
	}else if(parent==3){
		a(ininData);
		localStorage.setItem("localData",JSON.stringify(ininData));
		initBody();
		function a(data) {
			if(data.childs==undefined){
				return;
			}
			for(var i = 0; i <data.childs.length; i++)
				if(data.childs[i].id==index()){

					var addTask = new Sons(newname);
					addTask.finis=false;
					addTask.id = data.childs[i].id+ "-" + data.childs[i].childs.length;
					var d = new Date();
					var m=d.getMonth()+1;
					var day=d.getDate()
					if(m<10){
						m="0"+m;
					};
					if(day<10){
						day="0"+day;
					};


					addTask.time = d.getFullYear()+"-"+m+"-"+day;
					data.childs[i].childs.push(addTask);
						
				}else{
					a(data.childs[i]);	
				}				
		};
		
	}	
}

//确认修改详细信息
function changeTodo(){
	var target = event.target;
	if(target.id=="des-check") {
		var ininData = getData();
		var parent;
		var p =$("list-all-ul").getElementsByTagName("p");
		for(var i of p) {
			if(i.style.background == "rgb(218, 245, 246)"){
				parent=i.parentNode.id;
				a(ininData);
				localStorage.setItem("localData",JSON.stringify(ininData));
				initBody();
				function a(data) {
					if(data.childs==undefined){
						return;
					}
					for(var i = 0; i <data.childs.length; i++)
						if(data.childs[i].id==parent){
							data.childs[i].name = $("input1").value;
							data.childs[i].time = $("input2").value;
							data.childs[i].content = $("input3").value;
			
						}else{
							a(data.childs[i]);	
						}				
				};
			}
		}
	}
}
//鼠标经过事件
function showImg(event) {
	var target = event.target;
	//console.log(target);
	if(target.className=="list-name"){		
		var	classLit=$("list-all-ul").getElementsByTagName("img");
		for( var i of classLit){			
				i.style.display = "none";						
		}
		target.nextElementSibling.style.display = "block";
	}	
}
//删除项目
function delData(event) {
	var target = event.target;

	if(target.className.includes("del-img")==true) {
		var x=confirm("确认删除该项目?")
		if(x==true) {
			var ininData = getData();
			var parent = target.parentNode.id;
			a(ininData)
			localStorage.setItem("localData",JSON.stringify(ininData));
			initBody();
			function a(data) {
				if(data.childs==undefined){
					return;
				}
				for(var i = 0; i <data.childs.length; i++){
					if(data.childs[i].id==parent){
					data.childs.splice(i,1);
			
					}else{
						a(data.childs[i]);	
					}				
				};
			}			
		}
	}
}

//点击完成时更新数据
function finishClass(event){
	var target=event.target;
	if(target.className =="checkbox"){
		var ininData = getData();
		var parent = target.id.substr(6);
		if(target.checked==true){
			a(ininData)
			localStorage.setItem("localData",JSON.stringify(ininData));
			initBody();
			function a(data) {
				if(data.childs==undefined){
					return;
				}
				for(var i = 0; i <data.childs.length; i++){
					if(data.childs[i].id==parent){
					data.childs[i].finis=true;
			
					}else{
						a(data.childs[i]);	
					}				
				};
			}						
		}else{
			a(ininData)
			localStorage.setItem("localData",JSON.stringify(ininData));
			initBody();
			function a(data) {
				if(data.childs==undefined){
					return;
				}
				for(var i = 0; i <data.childs.length; i++){
					if(data.childs[i].id==parent){
						data.childs[i].finis=false;
			
					}else{
						a(data.childs[i]);	
					}				
				};
			}
		}
	}
}

//是否显示所有完成任务
function chosefinishClass(event){
	var target = event.target;
	var choseFinis=$("list-title").children;


	//选择所有任务********************************
	if(target.id=="list-title-all"){

		for(var i of choseFinis){
			i.style.background="#eee";
		}
		target.style.background="#fff";
		initBody();
	}
	//选择未完成任务******************************
	if(target.id=="list-title-notfinis"){
		

		$("list-title-all").style.background="#eee";
		for(var i of choseFinis){
			i.style.background="#eee";
		}
		target.style.background="#fff";
		initBody("false")			
		
	}
	//选择已完成任务********************************
	if(target.id=="list-title-finis"){
		$("list-title-all").style.background="#eee";
		for(var i of choseFinis){
			i.style.background="#eee";
		}
		target.style.background="#fff";

		initBody("true")
		
	}
}