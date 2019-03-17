<template>
  <div class="cart">
    <img src alt>

    <div class="chose" v-on:click="shouList">
      <p v-if="price>0">¥{{price}}</p>
      <p>另需配送费{{$store.state.deliver_fee}}</p>
    </div>
    <div v-if="price==0" class="payMoney">{{$store.state.delivery_start_price+'元起送'}}</div>
    <div v-else class="payMoney pay">去结算</div>

    <div class="listback" v-if="isshow" v-on:click="shouList">
      <div class="carlist">
        <div class="carnav">
          <p>包装费2元</p>
          <p>清空购物车</p>
        </div>
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
      return this.$store.state.totalPrice;
    }
  },
  methods: {
    shouList: function() {
      this.isshow = !this.isshow;
    }
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
  height: 50px;
  background: rgb(29, 29, 29);
  bottom: 0;
  display: flex;

  //justify-content: space-between;
  img {
    width: 50px;
  }
  li {
    height: 30px;
    line-height: 30px;
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
