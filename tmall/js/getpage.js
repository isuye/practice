function newpage(){
    for(var i in page3Data){
        var page = document.createElement('div');
        page.className = 'page-2';

        var ulTag='';
        var ulImg='';
        for(let j of page3Data[i].tag){
            ulTag+='<li>'+j+'</li>';
        }
        for(let j of page3Data[i].img){
            ulImg+='<li><img src="'+j+'"></li>';
        }
        var text='<div class="page-titel"><ul><li>'+page3Data[i].title+'</li><ul>'+ulTag
        +' </ul></ul></div> <div class="page-img"><ul>'+ulImg
        +'</ul></div></div>';
        page.innerHTML = text;
        document.getElementsByTagName('main')[0].appendChild(page);
    }
}
function newBrand(){
    var ul='<ul><li>';
    for(var i = 1; i <= 30; i++){
        ul+='<img src="img/b4-1 ('+i+').png" alt="">';
        if(i==10||i==20){
            ul+='</li><li>';
        }
        
    }
    document.getElementById('brand').innerHTML=ul;
}
newpage();   
newBrand();
//商品分类 女王节
var li = document.getElementById('nav-title').children
li[0].addEventListener("mouseover",function(e){
    
    e.target.style.background="white";
    li[0].children[0].style.background = "white";
    li[0].children[0].style.color = "red";

    li[1].style.background = "red";
    li[1].children[0].style.color = "yellow";
    document.getElementById('nav-list').style.display = 'block';
    document.getElementById('nav-list2').style.display = 'none';
})
li[1].addEventListener("mouseover",function(){
    li[1].style.background = "black";
    li[1].children[0].style.color = "white";

    li[0].style.backgroundColor = "red";
    li[0].children[0].style.color = "white";
    li[0].children[0].style.backgroundColor = "red";
    document.getElementById('nav-list').style.display = 'none';
    document.getElementById('nav-list2').style.display = 'block';
})
var div = document.createElement('div');
div.id='searchData';
div.style.display='none';
document.addEventListener('mouseover',function(e){
    if(e.target.className=='nav-list-tag'){
       e.target.appendChild(div);
    //    e.target.style.background = "white";
    //    e.target.style.color = "red";
        
        div.innerHTML='';
        var text = '';
        for(var i in nav[e.target.innerText]){
            text+='<p>'+i+'<span>></span></p><ul>';
            var x=nav[e.target.innerText][i];
            for(var j of nav[e.target.innerText][i]){
                text+='<li>'+j+'</li>';
            }
            text+='</ul>';
        }
        div.innerHTML=text;
    }
})

  //左侧导航,制订搜索框  
  var index = 1;    
function indexImg(){
      var pic = document.getElementById('img-nav-index');
      var tag = document.getElementById('img-nav-imgtag');
      if(index>4){
          index=1
      }
      for(let i of tag.children){
       i.style.background = "rgba(14, 13, 13, 0.534)";
      }
      tag.children[index-1].style.background = "white";
      
      pic.attributes.src.value = 'img/b1 ('+ index +').png';
      index++;
      

      time=setTimeout(indexImg,2000);
  }  
  indexImg(); 
  document.getElementById('img-nav').addEventListener('mousemove',function(e){
      clearTimeout(time);
      if(e.target.tagName=="LI"){
        var pic = document.getElementById('img-nav-index');
          index = e.target.tabIndex;
          for(let i of e.target.parentNode.children){
            i.style.background = "rgba(14, 13, 13, 0.534)";
           }        
          pic.attributes.src.value = 'img/b1 ('+ index +').png';
      }

  })  
  document.getElementById('img-nav').addEventListener('mouseout',function(){
    indexImg();

})                
                                         
                       
                                
                        
                            
                               
                            