<template>
  <div class="home">
      <itemcontainer father-component="home"></itemcontainer>
  </div>
</template>

<script>
// @ is an alias to /src
import itemcontainer from '../components/itemcontainer.vue'

export default {
  name: 'home',
  components: {
    itemcontainer
  }
}
</script>

<style lang="less">
.home {
   width: 100%;
  height: 100%;
}
</style>

