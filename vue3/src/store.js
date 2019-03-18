import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    choseLi: null, //菜单栏选择的名字
    choseLiIndex: 0, // 菜单栏选择的序列号
    activeindex: 0, //选择菜品时传递过来的菜单号
    proCar: {},
    delivery_start_price: null,
    deliver_fee: null,
    allprice: 0
  },
  mutations: {
    getChoseLi(state, data) {
      state.choseLi = data[0];
      state.choseLiIndex = ".ul" + data[1];
    },
    getname(state, data) {
      state.choseLi = data;
    },
    getactiveindex(state, data) {
      state.activeindex = data;
    },
    addProCar: function(state, data) {
      state.proCar[data.name] = {
        num: null,
        price: null,
        totalprice: 0,
        parentIndex: null
      };
      state.proCar[data.name].num = data.num;
      state.proCar[data.name].price = data.price;
      state.proCar[data.name].price = data.price;
      state.proCar[data.name].parentIndex = data.parentIndex;

      state.proCar[data.name].totalprice =
        (data.num * (data.price * 100)) / 100;
      if (data.num == 0) {
        delete state.proCar[data.name];
      }
      var price = 0;
      for (var i in state.proCar) {
        price += state.proCar[i].totalprice * 100;
      }
      state.allprice = price / 100;
    },
    getmsg: function(state, data) {
      state.delivery_start_price = data[0];
      state.deliver_fee = data[1];
    },
    changeNum: function(state, data) {
      state.proCar[data.name].num = data.num;

      state.proCar[data.name].totalprice =
        (data.num * (state.proCar[data.name].price * 100)) / 100;

      var price = 0;
      for (var i in state.proCar) {
        price += state.proCar[i].totalprice * 100;
      }
      
      state.allprice = price / 100;
    },
    clearProCar: function(state) {
      state.proCar = {};
      state.allprice = 0;
    }
  },
  actions: {}
});
