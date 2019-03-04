
//生成选择框
function newChecnkBox(box, arr){
	var checkBox = "<input type='checkbox' checkbox-type = 'all' value='全选'>全选";
	for(var i of arr) {
		checkBox +="<input type='checkbox' checkbox-type = 'son' value="+i.text+">"+i.text;
	}
	box.innerHTML = checkBox;
	for(var i of box.children) {
			i.checked=true;
		};
	box.onclick = function(event) {
		if(event.target.tagName=="INPUT"){
			if(event.target.getAttribute("checkbox-type")=="all"){
				for(var i of box.children) {
					i.checked=true;
				}				
			}else{
				var x = 0;
				for(var i of box.children) {
					if(i.checked==true&&i.getAttribute("checkbox-type")=="son"){
						x++;
					}
				};
				if(x==3){
					box.children[0].checked=true;
				}else if(x==0){
					event.target.checked=true;
				}else{
					box.children[0].checked=false;
				}
			}
		}
	}
}

