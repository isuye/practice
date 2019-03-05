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
newBrand()

                                      
                                         
                       
                                
                        
                            
                               
                            