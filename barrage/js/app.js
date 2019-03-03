var text = ['好看', '一生推', '666666','走一波','up主威武不解释','1111111']
function random(min, max){
    return Math.floor(Math.random()*(max-min+1))+min;
}
function index(){
    var i = 0;
    return function(){
        if(i==3){
            i=0;
        };
        i++;
        return i;
    }
}
var Index = index();

function massage(array, time){
    for(let i of array) {
        let d = document.createElement("p");
        let t;
        if(time==undefined){
            t = random(2,5);
        }else{
            t = time; 
        }      
        (function(){
            let div=d;
            setTimeout(function(){        
                div.innerText = i;
                div.className = "move";
                div.style.marginTop = Index()*25+"px";
                var x = 100+random(0,155);
                var y = 100+random(0,155);
                var z = 100+random(0,155);
                div.style.color = 'rgb('+x+','+y+','+z+')';
                document.getElementById('content').appendChild(div);
            },t*1000);
            setTimeout(()=>{
                if(div.parentNode){
                    div.parentNode.removeChild(div);
                }
                
            },15*1000);
        })();   
    } 
   
}
massage(text);
setInterval(function(){
    massage(text)  
},5000); 
document.getElementById('send').addEventListener('click',function(){
    var value = document.getElementsByTagName('input')[0].value;
    value = [value];
    massage(value, 0);
    document.getElementsByTagName('input')[0].value='';
})
document.getElementById('clear').addEventListener('click', function(){
    document.getElementById('content').innerHTML="";
})