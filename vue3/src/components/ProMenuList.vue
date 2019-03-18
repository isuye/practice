<template>
  <div class="promenulist">
    
    <img v-bind:src="images" v-bind:alt="list.name">
    <div >
       
          <p>{{list.name}}</p>
          <p>赞{{list.recommends_count}}</p>
          <p>¥{{list.price}}</p>
       
       

        <div class="control" >
          <span v-on:click="substracToCar" v-if="num>0" class="cyclo">-</span>
          <span v-if="num>0" class="number">{{num}}</span>
          <span v-on:click="addToCar" class="cyclo">+</span>
        </div>
    </div>
    
  </div>
</template>

<script>

export default {
  name: "promenulist",
  props: ['list','carlist'],
  data() {
      return {
          images:this.list.images,
            price: this.list.price,
            name: this.list.name,
            num:0 ,
            totalprice: 0       
      }
  },
  methods: {
    addToCar:function(){
      
      this.num+=1;
      this.totalprice = ((this.num*100) * (this.list.price*100))/10000; 
    },
    substracToCar:function(){
      
      this.num-=1;
      this.totalprice = ((this.num*100) * (this.list.price*100))/10000; 
    },
  },
  computed: {
    getNum: function() {
      return this.$store.state.allprice;
    }
  },
  watch: {
    num:function(nval, oval) {
      this.$store.commit('addProCar', {
        name:this.name,
        num: this.num ,
        price: this.price,    
        totalprice: this.totalprice
      })
    },
    getNum: function() {
      
      if(this.$store.state.proCar[this.name]){
        this.num=this.$store.state.proCar[this.name].num
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
.promenulist {
  
  width: 100%;
  height: 100%;
  display:flex;
 
  img{
      width: 65px;
      height:65px;
      padding-right: 5px;

  }
  .control {
    position: absolute;
    right: 0;
  }
  .cyclo {
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
  .number{
    display:inline-block;
    margin: 0 10px;
    height:22px;
  }
 
 
}
</style>
