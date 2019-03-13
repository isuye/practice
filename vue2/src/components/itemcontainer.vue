<template>
  <div class="itemcontainer">
      <header class="tip">
          <span  v-if="fatherComponent=='home'">第一周</span>
          <span  v-if="fatherComponent=='item'">题目{{index+1}}</span>
      </header>

      <div class="homeLog" v-if="fatherComponent=='home'">
          <router-link class="star button_style" to="item"></router-link>
      </div>

      <div class="itemLog" v-if="fatherComponent=='item'">
        <div class="topicList" v-if="index<topicList.length">
          <span>{{topicList[index].topic_name}}</span>
          <ul >
            <li v-for="(item, index) in topicList[index].topin_answer"
                v-bind:key="index" 
                v-on:click="getTopic(index,item)"
                v-bind:class="{active:choose==index}">  
                {{index+1}}.{{item.answer_name}}  
            </li>        
          </ul>
          
        </div>
        <button v-on:click='nextTopic' v-bind:class="calssObject" class="button_style" type="buttoon"></button> 
    </div>
  </div>
  
</template>

<script>
import store from '../store.js'
export default {
  name: 'itemcontainer',
  store,
  props:['fatherComponent'],
  data: function() {
      return {
        index:0,
        calssObject: {
          next: true,
          submit:false
        },
        choose:-1,
        answer:''
        
      }
  },
  computed: {
    topicList: function(){
      return store.state.data
    }
  },
  methods: {
    nextTopic:function() {        
        if(this.choose===-1){
          alert('请选择答案');
          return;
        }else{
          this.index +=1;
          this.choose=-1;
                    
        }
        store.commit('addAnswer',this.answer)
        if(this.calssObject.submit===true){
          this.$router.push('/score')
        }
        if(this.index==this.topicList.length-1){
          this.index=this.topicList.length-1;
          this.calssObject.next=false;
          this.calssObject.submit=true;       
        }   

    },
    getTopic:function(index, item) {
      this.choose=index;
      this.answer=item.answer_right;  
    }
  },
}
</script>
<style lang="less">

.active {
  border: 1px solid white;
}
.itemcontainer{
  color: aliceblue;
  width: 100%;
  height:100%;
}
.tip {
  position: absolute;
  right: 5%;
  width: 20%;
  height: 25%;
  background: url(../imgs/WechatIMG2.png)  no-repeat;
  background-size: 100% 100%;
  display:flex;
  justify-content:center;
  align-items:flex-end;
  span{
    margin-bottom: 25%;
  }
}
.homeLog {
  width: 100%;
  height:100%;
  background: url(../imgs/1-2.png)  no-repeat;
  background-size: 80% 50%;
  background-position: center 30%;

}
.star {
  background: url(../imgs/1-4.png)  no-repeat; 
}
.next{
   background: url(../imgs/2-2.png)  no-repeat;
}
.submit {
   background: url(../imgs/3-1.png)  no-repeat;
}
.button_style{
  height: 7%;
  width: 33%;
  background-size: 100% 100%;
  display: block;
  position: absolute;
  bottom: 30%;
  left:35%;
  border:none;
}
.itemLog{
  width: 100%;
  height:100%;
  background: url(../imgs/2-1.png)  no-repeat;
  background-size: 80% 50%;
  background-position: center 30%;
}
.topicList{
  position: relative;
  top:25%;
  height: 50%;
  width: 50%;
  margin: 0 auto;
  li {
    margin :7px 0;
  }
  
}

</style>

