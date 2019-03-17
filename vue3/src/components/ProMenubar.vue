<template>
  <div class="menubar scroll-list-wrap">
    <!-- <cube-scroll ref="scroll" :data="items" :options="options"></cube-scroll> -->
    <cube-scroll ref="scroll1">
      <ul class="cube-scroll-list">
        <li class="cube-scroll-item" 
        v-for="(item, index) in items" 
        :key="index"
        v-bind:class='{active:index===clickIndex}'
        v-on:click="choseLi(index,item)"
        >{{item}}</li>
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
      clickIndex:0
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
    }
    
  },
  methods: {
    choseLi(index,item) {
      this.clickIndex=index;
      this.$store.commit('getChoseLi',[item,index])
    }
  },
  watch: {
    choseBar:function(nval,oval){
      this.clickIndex=nval;
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
  font-size: 12px;
  //height:70px;
  //height:auto;
  line-height: 15px;
  padding: 10px 9px;

  // word-break:break-all ;
  //display: inline-block;
  //line-height: 20px;
}
</style>






