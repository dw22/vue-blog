<template>
  <div id="app">
    <NavBar></NavBar>
    <div class="fun-main">
      <router-view></router-view>
    </div>
    <FootBar></FootBar>
  </div>
</template>

<script>
  import NavBar from './views/header'
  import FootBar from './views/footer'
  export default {
    name: 'app',
    components: {
      NavBar,
      FootBar
    },
    mounted(){
      
    }
  }
</script>
