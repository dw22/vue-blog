<template>
  <header class="n-header">
  <nav class="n-navbar">
    <div class="n-title">
      <i class="n-line"></i>
      <span>onfuns博客</span>
      <i class="n-line"></i>
     </div>
    <ul class="n-navbar-nav">
      <li :class="{'current':current == item.path}" v-for="item in nav" @click="go(item.path)">
        {{item.name}}
      </li>
    </ul>
  </nav>
  </header>
</template>
<script>
  export default{
    name:'header',
    data(){
      return {
         current:'/',
         nav:[
           {'path':'/',name:'文章'},
           {'path':'/archives',name:'归档'},
         ]
      }
    },
    mounted(){
      this.current = this.$route.path;
    },
    methods:{
      go(path){
        this.current = path
        this.$router.push(path)
      }
    }
  }
</script>
<style scoped>
  .n-header{
    width: 100%;
    background: #ffffff;
    border-top: 1px solid #ebebeb;
    border-bottom: 2px solid #e1e1e1;
  }
  .n-navbar{
    width: 700px;
    margin:0 auto;
  }
  .n-navbar .n-title{
    float: left;
    font-size: 22px;
    font-weight: bolder;
    margin-top: 8px;
  }
  .n-navbar .n-line{
    position: relative;
    display: block;
    width: 80%;
    height: 2px;
    background: #222;
    margin: 0 auto;
  }
  .n-navbar-nav{
    text-align: right;
  }
  .n-navbar-nav li{
    display: inline-block;
    position: relative;
  }
  .n-navbar-nav li.current{
    border-bottom: 2px solid #e67e22;
    margin-bottom: -2px;
  }
  .n-navbar-nav li{
    color: #505050;
    line-height: 4em;
    padding: 0 21px;
    cursor: pointer;
  }
  .n-navbar-nav li:hover{
    color: #e67e22;
  }
</style>
