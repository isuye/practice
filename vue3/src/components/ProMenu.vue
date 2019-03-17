<template>
  <div class="menus">
    <div class="menusNav">{{$store.state.choseLi?$store.state.choseLi :menubarList[0].category}}</div>
    <cube-scroll ref="scroll1" class="scroll-list-outer-wrap"  >
      <ul class="menusList" v-for="(item, index) in items1" :key="index" v-bind:class="'ul'+index">
        {{item.category  }}
        <li v-for="(item, index) in item.product" :key="index" @touchmove="getscorllY">
          <ProMenuList v-bind:list="item"></ProMenuList>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script>
import store from "../store.js";
import ProMenuList from "../components/ProMenuList";
export default {
  name: "menus",
  store,
  props: ["menubarList"],
  components: {
    ProMenuList
  },
  data() {
    return {
      items1: this.menubarList,
      choseIndex: null,
      allUlHeight: [],
      scorllY: null,
      allUlIndex:null,
    };
  },
  methods: {
    scrollToElement: function() {
      this.$refs.scroll1.scrollToElement(
        store.state.choseLiIndex,
        1000,
        false,
        false,
        "swipe"
      );
    },
    getHeight() {
      //this.$store.commit('getname',this.menubarList[0].category)
      //计算ul的高度
      var ul = document.getElementsByClassName("menusList");
      for (var i of ul) {
        this.allUlHeight.push(i.clientHeight);
      }
    },
    getscorllY: function() {
      var div = document.getElementsByClassName("cube-scroll-content")[1];
      var y =div.style.transform.substr(15);
      var x = y.indexOf('p');
      this.scorllY = y =Number(y.slice(0,x)) ;
      for(var i=0;i<this.allUlHeight.length;i++){
        if(-y>this.allUlHeight[i]){
          y+=this.allUlHeight[i]
        }else{
            this.allUlIndex=i;
            this.$store.commit('getactiveindex',i)
            return this.$store.commit('getname',this.menubarList[i].category)
        }
      }
    }
  },
  computed: {
    choseBar() {
      if(this.$store.state.choseLiIndex){
        return this.$store.state.choseLiIndex;
      }
      
    }
  },
  mounted() {
    this.getHeight();
  },
  watch: {
    choseBar: function(n, o) {
      this.scrollToElement();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.menus {
  height: 100%;
  width: 100%;
  position: relative;
  padding: 0 10px;
  // display: flex;
  // flex-direction: column;
  .menusNav {
    position: absolute;
    top:0px;
    left: -1px;
    padding:5px 10px;
    width: 100%;
    z-index: 10; 
    background: white;
  }
  li {
    height: 100px;
  }
}
</style>
