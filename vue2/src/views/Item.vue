<template>
  <div class="item">
    <itemcontainer father-component="item"></itemcontainer>
  </div>
</template>

<script>
// @ is an alias to /src
import itemcontainer from '../components/itemcontainer.vue'

export default {
  name: 'item',
  components: {
    itemcontainer
  }
}
</script>

<style lang="less">
.item {
   width: 100%;
  height: 100%;
}
</style>

