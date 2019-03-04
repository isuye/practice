function setHash(){
	var region = [];
	var product = [];
	for(var i of $("region-radio-wrapper").children){
		if(i.checked==true) {
			region.push(i.value)
		}
	}
	for(var i of $("product-radio-wrapper").children){
		if(i.checked==true) {
			product.push(i.value)
		}
	}

	var hash;

	hash=product.join();
	hash+="&"+region.join();
	location.hash=hash;
	return{product,region};
	
}
function getHash() {
	var hash=decodeURIComponent(location.hash);
	if(hash==""){
		return;
	}
	var x= hash.indexOf("&");
	var product = hash.slice(1,x);
	product=product.split(",");
	var region = hash.slice(x+1);
	region=region.split(",");

	for(var i of $("product-radio-wrapper").children){

		i.checked=false;
		for(var j of product){
			
			if(i.value == j){
				i.checked=true;
			}
		}
	}
	for(var i of $("region-radio-wrapper").children){
		i.checked=false;
		for(var j of region){		
			if(i.value == j){
				i.checked=true;
			}
		}
	}	

}



//获取数据
function getData(){
	//如本地有数据就从本地获取
	var data;
	if(localStorage.MINData){
	 	data =JSON.parse(localStorage.MINData); 
	}else{
		data = sourceData;
	}
	
	var list = [];
	var region = [];
	var product = [];
	for(var i of $("region-radio-wrapper").children){
		if(i.checked==true&&i.value!="全选") {
			region.push(i.value)
		}
	}
	for(var i of $("product-radio-wrapper").children){
		if(i.checked==true&&i.value!="全选") {
			product.push(i.value)
		}
	}

	for(var i of product) {
		for(var j of region) {
			for(var x of data) {
				if(x.region==j&&x.product==i) {
					list.push(x);
				}
			}
		}
	}
	return {list, region, product}
}