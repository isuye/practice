<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
// @ is an alias to /src
import store from "@/store.js";

export default {
    name:'app',
    store,
    watch: {
        '$route.name': function(nval,oval) {
            if(nval!=="score"){
                store.commit('clear')
            }
        }
    },
};
</script>


<style lang="less">
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
html,
#app {
  width: 100%;
  height: 100%;
}
body {
  width: 100%;
  height: 100%;
  background: url(./imgs/1-1.jpg) no-repeat;
  -webkit-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  background-size: 100% 100%;
}
</style>
