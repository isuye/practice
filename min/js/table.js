function newTable() {
	var list = getData().list;
	var region = getData().region;
	var product = getData().product;

	var months = "";
	for(var i = 1; i <= 12; i++){
		months +="<th>" + i + "月</th>";
	}
	var table = "";
	

	if(region.length==1&&product.length>1){
		
		for(var i of list){
			var sale = "";
			for(var j of i.sale) {
				sale += "<td class='number'>"+j+"<img src='img/edit.png'></td>";
			}
			table+="<tr class='tr'><td>"+i.region+"</td><td>"+i.product+" </td>"+sale+"</tr>";
		}

		$("tableBox").innerHTML = "<table><tr><th>地区</th><th>产品</th>" + months+"</tr>" + table+"</table>";
	}else{
		for(var i of list){
			var sale = "";
			for(var j of i.sale) {
				sale += "<td class='number'>"+j+"<img src='img/edit.png'></td>";
			}			
			table+="<tr><td>"+i.product+"</td><td>"+i.region+" </td>"+sale+"</tr>";
		}

		$("tableBox").innerHTML = "<table><tr><th>产品</th><th>地区</th>" + months+"</tr>" + table+"</table>";
	}
	mergeTable();

}
//合并相同单元格
function mergeTable(){
	var tr = document.getElementsByTagName("tr");
	for(var i = 1; i <tr.length;i++){
		var x=0
		for(var j = i+1; j <tr.length; j++){
			if(tr[i].children[0].innerHTML==tr[j].children[0].innerHTML){
				tr[i].children[0].rowSpan+=1;
				tr[j].children[0].style.display = "none";
				x++
			}
		}
		i+=x;
	}	
}
//改变数据
function update(event){
  var target = event.target;
  if(target.tagName=="IMG"){
    var value = target.parentNode.innerText;
    target.parentNode.innerHTML=
    "<input tpye='text' id='inputvalue' value="+value+
    "><button>确认<button><button>取消<button>";
  };
  if(target.innerText=="确认"){
    var value = $("inputvalue").value;
    var product = target.parentNode.parentNode.children[0].innerText;
    var region = target.parentNode.parentNode.children[1].innerText;
    var months =  target.parentNode.cellIndex-2;
    //获取原本数据
    if(localStorage.MINData){
	 	data =JSON.parse(localStorage.MINData); 
	}else{
		data = sourceData;
	}
	//修改数据并且保存
	for(var i = 0; i < data.length; i++){
		if(data[i].product == product || data[i].product == region){
			if(data[i].region == region || data[i].region == product){
				data[i].sale[months] = Number(value);
			}
		}
	}
	localStorage.MINData = JSON.stringify(data);
    target.parentNode.innerHTML = value + "<img src='img/edit.png'>";

  };
 if(target.innerText=="取消"){
   var value = $("inputvalue").value;
   target.parentNode.innerHTML = value + "<img src='img/edit.png'>";
  };
}



