<template>
  <div class="main">
    <Slider></Slider>
    <router-view></router-view>
  </div>
</template>
<script>
  import Slider from '../components/Slider'
  export default {
    components:{
      Slider
    }
  }
</script>
<style scoped>
  .main{
    color: #2c3e50;
    display: flex;
    flex: 1;
    height: 100%;
    min-width: 800px;
  }
</style>