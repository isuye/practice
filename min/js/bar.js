function svgBar(data){
	var width = Number(1000);
	var height = Number(480);
	//数据最大值
	var td;
	var tr;
	if(data!=undefined){
		td = data.children;
		tr = [0,data];
	}else {
		td = document.getElementsByTagName('td');
	   tr = document.getElementsByTagName('tr');
	}
	var max = 0;
	for(var i of td){
		if( Number(i.innerText) > max  ){
			max = Number(i.innerText);
		}
	}

	$("svg").style.height = height+30+"px";
	$("svg").style.width = width+"px";

	var realW=width-60;
	var realH=height-90;
	var text = "";

	var lineX = ' <line x1=30 y1='+(30+realH)+' x2='+(30+realW)+' y2='+(30+realH)+' style="stroke:black;"/>';
	var lineY = ' <line x1=30 y1=30 x2=30 y2='+(30+realH)+' style="stroke:black;"/>';
	text+=lineX;
	text+=lineY;
	//月份
	for(let i = 1; i<=12; i++){
		var line = '<line x1='+(realW/12*(i)+30)+' y1='+(realH+20)+' x2='+(realW/12*(i)+30)+' y2='+(realH+30)+' style="stroke:black;"/>';
		var months = '<text x='+(realW/12*(i-1)+53)+' y='+(realH+50)+' fill="black">'+i+'月</text>';
		text+=months;
		text+=line;
	}
	//y轴数据
	for(let i = 0, j = 5; i<=5, j>= 0 ; i++, j--){
		var line = ' <line x1=30 y1='+(realH/5*i+30)+' y2='+(realH/5*i+30)+' x2='+(realW+30)+' style="stroke:black;"/>';
		var number = '<text y='+(realH/5*j+37)+' x=0  fill="black">'+max/5*(i)+'</text>';
		text+=line;
		text+=number;
	}

	
	//设置颜色, 手机蓝色,笔记本黄色, 音箱红色
	var blue = ["#0000CD", "#00BFFF", "#AFEEEE"],
	    yellow = ["#DAA520", "#FFFF00", "#F0E68C"],
	    red = [ "#EE0000", "#FF6347", "#FFDAB9"];
	for(let i = 1; i < tr.length; i++ ){
		let x=((realW/tr.length)*i+10);
		let color;
		
		let name = '<text x='+x+' y='+(height-5)+' fill="black">';
		

		if(tr[i].children[0].innerText == "手机" || tr[i].children[1].innerText == "手机"){
			color = blue.shift()
			name += '手机 ';			
		}else if(tr[i].children[0].innerText == "笔记本" || tr[i].children[1].innerText == "笔记本"){
			color = yellow.shift()
			name +='笔记本 ';			
		}else if(tr[i].children[0].innerText == "智能音箱" || tr[i].children[1].innerText == "智能音箱"){
			color = red.shift()
			name += '音箱 ';
		}
		if(tr[i].children[0].innerText == "手机"||
		   tr[i].children[0].innerText == "笔记本"||
		   tr[i].children[0].innerText == "智能音箱"){
			name+=tr[i].children[1].innerText+'</text>';
		}else{
			name+=tr[i].children[0].innerText+'</text>';
		}

		let tag = '<rect x='+(realW/tr.length)*i+' y='+(height-15)+' width=10 height=10 style="fill:'+color+';"/>';
		//柱状图
		var barWidth = realW/12/(tr.length-1);
		for(let j = 2; j < tr[i].children.length; j++ ){
			var barheight = realH/max*tr[i].children[j].innerText
			var bar = '<rect x='+(((j-2)*realW/12)+30+barWidth*0.3*(tr.length-1)/tr.length*i+barWidth*0.7*(i-1))+
			' y='+(30+realH-barheight)+' width='+(barWidth*0.7)+' height='+barheight+
			' style="stroke:black;fill:'+color+';"/>';
			text+=bar;
		}
		text+=tag;
		text+=name;
	}
	


	$("svg").innerHTML = text;
}