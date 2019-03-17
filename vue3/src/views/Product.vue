<template>
  <div class="product">
   
      <div class="first">
        <ProMenubar v-if='proMenubarList.length>0'  v-bind:menubar-list='proMenubarList'></ProMenubar>

         <ProMenu v-if='proMenubarList.length>0' v-bind:menubar-list='productData'></ProMenu>
      </div>
    

    <ProCart></ProCart>

  </div>

</template>

<script>
// @ is an alias to /src
import ProMenubar from '../components/ProMenubar'
import ProMenu from '../components/ProMenu'
import ProCart from '../components/ProCart'


export default {
  name: "product",
  components: {
    ProMenubar,
    ProMenu,
    ProCart
  },
  props:['productData'],
  data() {
    return {
      proMenubarList:[]
    }
  },
  created() {
    this.getproMenubarList();
  },
  methods: {
    getproMenubarList:function() {
      for(var i of this.productData){
        var x = i.category
        console.log(x)
        if(i.category.length>8){
          x = x.substr(0,7)+'...';
        }
        this.proMenubarList.push(x)
      } 
    }
  },
};
</script>

<style lang="less">
.product {
  display: flex;
  flex-direction: column;
  position:absolute;
  border-top: 1px solid rgb(0, 0, 0);
  top:10.5em;
  bottom:0;
  width: 100%;
  .first {
    height: 100%;
    display: flex;
  }
}
</style>

