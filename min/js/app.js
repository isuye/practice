function $(id) {
	return document.getElementById(id);
}

newChecnkBox($("region-radio-wrapper"), checkBox1);
newChecnkBox($("product-radio-wrapper"), checkBox2);


window.addEventListener("load",getHash);
window.addEventListener("load",newTable);
window.addEventListener("load",function(){svgBar()});
window.addEventListener("load",function(){line()});

$("checkBox").addEventListener("change",newTable);
$("checkBox").addEventListener("change",setHash);
$("checkBox").addEventListener("change",getHash);
$("checkBox").addEventListener("change",function(){svgBar()});//柱状图bar,用svg画
$("checkBox").addEventListener("change",function(){line()});//折线图bar,用canvas画
$("tableBox").addEventListener("click",update);//编辑数据

// 表格添加鼠标滑动事件;

$("tableBox").addEventListener("mouseover",function(event){
	if(event.target.tagName == "TD") {
		var target = event.target.parentNode;
		var text = target.children[0].innerText;
		var td = document.getElementsByTagName('td');
		for(var i of td){
			if(i.innerText == text){
				i.style.backgroundColor = "#FFE4E1";
			}
		}
		line(target);
		svgBar(target);		
	}	
});
$("tableBox").addEventListener("mouseout",function(event){
	if(event.target.tagName == "TD") {
		var td = document.getElementsByTagName('td');
		for(var i of td){
			if(i.style.backgroundColor == "rgb(255, 228, 225)"){
				i.style.backgroundColor = "";
			}
		}
		line();
		svgBar();		
	}	
});




