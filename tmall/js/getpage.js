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
li[0].addEventListener("mouseover",function(){
    li[0].style.background = "white";
    li[0].children[0].style.color = "red";

    li[1].style.background = "red";
    li[1].children[0].style.color = "yellow";
    document.getElementById('nav-list').style.display = 'block';
    document.getElementById('nav-list2').style.display = 'none';
})
li[1].addEventListener("mouseover",function(){
    li[1].style.background = "black";
    li[1].children[0].style.color = "white";

    li[0].style.background = "red";
    li[0].children[0].style.color = "white";
    document.getElementById('nav-list').style.display = 'none';
    document.getElementById('nav-list2').style.display = 'block';
})
var div = document.createElement('div');
div.id='searchData';
div.style.display='none';
document.getElementById('nav-center').appendChild(div);
document.addEventListener('mouseover',function(e){
    if(e.target.parentNode.id=='nav-list'){
       
        div.style.display="block";
        div.innerHTML=e.target.innerHTML;
    }
})
document.addEventListener('mouseout',function(e){
    if(e.target.parentNode.id=='nav-list'){
       
        div.style.display="none";
        //div.innerHTML=e.target.innerHTML;
    }
})
                                      
                                         
                       
                                
                        
                            
                               
                            