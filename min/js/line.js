function line(data) {
	var canvas = $("canvas");
	var ctx = canvas.getContext("2d");
	var realW=1000-60;
	var realH=480-90;
	ctx.strokeStyle="black";
	ctx.fillStyle = "black";
	ctx.clearRect(0,0,1000,480);

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
	//x轴y轴
	ctx.font = "12px sans-serif";
	ctx.beginPath();
	ctx.moveTo(30, 30);
	ctx.lineTo(30, realH+30);
	ctx.lineTo(realW+30, realH+30);
	ctx.stroke();
	//x坐标
	for(let i = 1; i <= 12; i++){
		ctx.beginPath();
		ctx.moveTo(30+(realW/12*i), realH+10);
		ctx.lineTo(30+(realW/12*i), realH+30);
		ctx.stroke();

		ctx.fillText(i+"月",realW/12*i-20, realH+45);	
	}
	//y坐标
	for(let i = 0, j = 5; i < 5, j>0 ; i++, j--){
		ctx.beginPath();
		ctx.moveTo(30, realH/5*i+30);
		ctx.lineTo(30+realW, realH/5*i+30);
		ctx.stroke();
		ctx.fillText(max/5*j, 5, realH/5*i+40);	
	}
	//设置颜色, 手机蓝色,笔记本黄色, 音箱红色
	var blue = ["#0000CD", "#00BFFF", "#AFEEEE"],
	    yellow = ["#DAA520", "#FFFF00", "#F0E68C"],
	    red = [ "#EE0000", "#FF6347", "#FFDAB9"];
	for(let i = 1; i < tr.length; i++ ){
		//let x=((realW/tr.length)*i+10);
		let color;
		let name;
		if(tr[i].children[0].innerText == "手机" || tr[i].children[1].innerText == "手机"){
			color = blue.shift();
			name = "手机 ";		
		}else if(tr[i].children[0].innerText == "笔记本" || tr[i].children[1].innerText == "笔记本"){
			color = yellow.shift();
			name = "笔记本 ";		
		}else if(tr[i].children[0].innerText == "智能音箱" || tr[i].children[1].innerText == "智能音箱"){
			color = red.shift();
			name = "音箱 ";
		}
		if(tr[i].children[0].innerText == "手机"||
		   tr[i].children[0].innerText == "笔记本"||
		   tr[i].children[0].innerText == "智能音箱"){
			name+=tr[i].children[1].innerText;
		}else{
			name+=tr[i].children[0].innerText;
		}
	//标签
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.fillRect(realW/tr.length*i, 60+realH, 10, 10);
		ctx.fillStyle = "black";
		ctx.fillText(name, realW/tr.length*i+12, 70+realH);

		//折线图
		var beginX, beginY;
		
		for(let j = 2; j < tr[i].children.length; j++ ){
			var barheight = realH/max*tr[i].children[j].innerText;	

			//原点
			beginX = beginX || ((j-2)*realW/12)+30+realW/12/2;
		   	beginY = beginY || 30+realH-barheight;
		   	//圆圈
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.strokeStyle="black";	
						
		    ctx.arc(((j-2)*realW/12)+30+realW/12/2, 30+realH-barheight, 5, 0, Math.PI*2, false);
		   	ctx.fill();
		   	ctx.stroke();
		   	ctx.closePath();
		   	//折线
		   	
		   	ctx.beginPath();
		   	ctx.moveTo(beginX, beginY);
		   	beginX = ((j-2)*realW/12)+30+realW/12/2;
		   	beginY = 30+realH-barheight;
		   	ctx.lineTo(((j-2)*realW/12)+30+realW/12/2, 30+realH-barheight);
		   	ctx.strokeStyle=color;
		   	ctx.stroke();

		}
		beginX="", beginY="";

		
		
    }

	

}