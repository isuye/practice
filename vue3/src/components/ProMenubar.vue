<template>
  <div class="menubar scroll-list-wrap">
    <cube-scroll ref="scroll1">
      <ul class="cube-scroll-list">
        <li class="cube-scroll-item" 
        v-for="(item, index) in items" 
        :key="index"
        v-bind:class='{active:index===clickIndex}'
        v-on:click="choseLi(index,item)"
        >{{item}} <span v-if="children[index]>0"> {{children[index]}}  </span> </li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script>
//import  VueResource  from 'vue-resource'
import store from "../store.js";
export default {
  name: "menubar",
  store,
  props: ["menubarList"],
  data() {
    return {
      items: this.menubarList,
      itemIndex: this.menubarList.length,
      clickIndex:0,
      children:[],
    };
  },
  computed: {
    options() {
      return {
        scrollbar: false,
        startY: 0
      };
    },
    choseBar() {
      return this.$store.state.activeindex;
    },
    getPrice: function() {
      return this.$store.state.allprice;
    }
    
  },
  methods: {
    choseLi(index,item) {
      this.clickIndex=index;
      this.$store.commit('getChoseLi',[item,index])
    },
    haomanychose(){

    }
  },
  watch: {
    choseBar:function(nval,oval){
      this.clickIndex=nval;
    },
    getPrice: function() {
      
      this.children=[];
      for(var i in this.$store.state.proCar){
       var index = this.$store.state.proCar[i].parentIndex;
        
        if(this.children[index]){
          this.children[index]++
        }else{
          this.children[index]=1
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
.menubar {
  height: 100%;
  width: 7em;
  background: rgb(226, 226, 226);
  font-size: 12px;
  
  .active {
    background: rgb(255, 255, 255);
  }
}
.cube-scroll-list {
  padding-bottom: 50px;
  display: flex;

  flex-direction: column;

  justify-content: center;
 
}
.cube-scroll-item {
  position: relative;
  font-size: 12px;
  line-height: 15px;
  padding: 10px 9px;
   
  span {
    display:inline-block;
    border-radius: 100%;
    width: 15px;
    height:15px;
    line-height: 15px;
    padding: 0;
    text-align: center;
    //font-size: 25px; 
    background: rgb(187, 187, 84);
    position: absolute;
    top:2px;
    right: 2px;

  }

}
</style>






