<template>
  <div class="score"  >
    <div class="mark">
       <div >
        <p class="gard">{{getGard()}}</p>
        <p v-if="getGard()>=90">不错嘛,有认真学习</p>
        <p v-else-if="getGard()<90 && getGard()>=40">还可以,下次加油哦</p>
        <p v-else-if="getGard()<40">天啦 ,你是把所有都还给老师了么</p>
      </div>
    </div>
    <div class="share" v-on:click="share"></div>
    <div class="follow">
      <p>关注葡萄之家,获取答案</p>
    </div>
    <div v-bind:class="{sharebg:bg}" v-on:click="bg=false">
      <div v-bind:class="{sharepic:bg}"></div>
    </div>


  </div>
</template>

<script>
// @ is an alias to /src
import store from '../store.js'

export default {
  name: 'score',
  data:function() {
    return{  
      bg:false
    }
  },
  methods: {
    getGard:function() {
      var number = store.state.answerList.filter(value=>{return value==0}).length;
      var x = 100/store.state.answerList.length;
      return Math.floor(x * number) || 0;
    },
    share: function(){
      this.bg=true;
    }
  } 
}
</script>

<style lang="less">
.score {
   width: 100%;
  height: 100%;
  background: url(../imgs/4-1.jpg) no-repeat;
  background-size: cover;
  color:black;
}
.mark{
  //position: relative;
  width: 100%;
  height: 40%;
  background: url(../imgs/4-2.png) no-repeat;
  background-size: 70% 90%;
  background-position: center bottom;
  text-align: center;
  display: flex;
 // flex-direction: column;
  align-items:flex-end;
  //justify-content: center;
  div{
    .gard{
      color: red;
      font-size: 40px;
    }
    width: 60%;
    height: 50%;
    margin: 0 auto;
  } 
}
.share {
  //position: relative;
  width: 40%;
  height: 12%;
  background: url(../imgs/4-3.png) no-repeat;
  background-size: 100% 100%;
  margin: 5px auto;
 
}
.follow {
  width: 100%;
  height: 40%;
  background: url(../imgs/4-4.png) no-repeat;
  background-size: 40% 60%;
  background-position: center center;
  text-align: center;
  margin-top:10px; 
  
  p{
    width: 40%;
    margin: 0 auto;
  }
}
.sharebg{
  width: 100%;
  height: 100%;
  top:0;
  background: url(../imgs/5-1.png) no-repeat;
  position: absolute;
}
.sharepic{
 width: 100%;
 height: 100%;
  top:0;
  background: url(../imgs/5-2.png) no-repeat;
  background-size: 80% 50%;
  background-position: center 10px;
  position: absolute;
}
</style>

