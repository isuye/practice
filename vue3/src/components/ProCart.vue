<template>
  <div class="cart">
    

    <div class="chose" v-on:click="shouList">
      <p v-if="$store.state.allprice>0">¥{{$store.state.allprice}}</p>
      <p>另需配送费{{$store.state.deliver_fee}}</p>
    </div>
    <div v-if="$store.state.allprice==0" class="payMoney">{{$store.state.delivery_start_price+'元起送'}}</div>
    <div v-else class="payMoney pay">去结算</div>

    <div class="listback" v-if="isshow && $store.state.allprice >0 " v-on:click.self="shouList">

      <div class="carlist scroll-list-wrap" >
        <div class="carnav">
          <p>包装费2元</p>
          <p>清空购物车</p>
        </div>
        
        <cube-scroll ref="scroll1" class="scroll-list-outer-wrap"  >
        <ul>
          <li v-for="(item,index) in $store.state.proCar" v-bind:key="index">
            {{index}} {{item.totalprice}}
            <div class="listcontrol">
              <span  class="cyclo"  v-on:click="addToCar(index,(--item.num))"  >-</span>
              <span  class="number">{{item.num}}</span>
              <span  class="cyclo" v-on:click="addToCar(index,(++item.num))">+</span>
            </div>
          </li>
        </ul>
        </cube-scroll>
       
        
      </div>
    </div>
  </div>
</template>

<script>
import ProMenuList from "../components/ProMenuList";
export default {
  name: "cart",
  data() {
    return {
      msg: null,
      price: 0,
      isshow: false
    };
  },
  components: {
    ProMenuList
  },
  computed: {
    getproCar: function() {
      return (this.msg = this.$store.state.proCar);
    },
    getPrice: function() {
      return this.$store.state.allprice;
    }
  },
  methods: {
    shouList: function(index) {
      this.isshow = !this.isshow;
    },
     addToCar:function(index,nums){
      
      this.$store.commit('changeNum',{
        name:index,
        num:nums
      })
    },
    substracToCar:function(){
      this.num--;
    },
  },
  watch: {
    getPrice(nval, oval) {
      this.price = nval;
      // this.msg = this.getproCar();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
.cart {
  color: white;
  width: 100%;
  height: 70px;
  background: rgb(29, 29, 29);
  bottom: 0;
  display: flex;

  //justify-content: space-between;
  img {
    width: 50px;
  }
  ul {
    padding-top: -50px;
  }
  li {
    height: 35px;
    line-height: 35px;
    position: relative;
    padding:0 10px;
    border-bottom: 1px solid rgb(88, 88, 88);
  }
  .listcontrol {
    position: absolute;
    top: 0;
    right: 10px;
    

  }
  .cyclo{
    display:inline-block;
    border-radius: 100%;
    width: 22px;
    height:22px;
    line-height: 19px;
    padding: 0;
    text-align: center;
    font-size: 25px; 
    background: rgb(187, 187, 84);
  }
  .number {
    display:inline-block;
    margin: 0 10px;
    height:22px;
  }
  .scroll-list-outer-wrap{
    max-height: 130px;
  }
}
.chose {
  flex: 1;
  height: 100%;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  p:nth-child(1) {
    font-size: 16px;
  }
}
.payMoney {
  height: 100%;
  width: 100px;

  line-height: 45px;
  text-align: center;
  font-size: 15px;
  background: rgb(48, 48, 45);
}
.pay {
  background: rgb(228, 228, 95);
  color: black;
}
.listback {
  position: absolute;
  top: -130px;
  bottom: 45px;
  width: 100%;
  background: rgba(105, 101, 101, 0.507);
  color: black;
  z-index: 14;
}
.carlist {
  position: absolute;
  background: rgb(248, 248, 248);
  bottom: 0;
  width: 100%;
  z-index: 20;
  max-height: 180px;
}
.carnav {
  height: 25px;
  line-height: 25px;
  background: rgb(211, 207, 207);
  display: flex;
  padding: 0 5px;
  justify-content: space-between;
}
</style>
