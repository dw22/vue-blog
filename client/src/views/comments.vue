<template>
    <div id="cloud-tie-wrapper" class="cloud-tie-wrapper"></div>
</template>
<script>
  export default {
    name:'comments',
    props:['sourceId'],
    data(){
      return {

      }
    },
    mounted(){
      this.initJs()
    },
    methods:{
      initJs(){
        let _this = this
        $.getScript('https://img1.cache.netease.com/f2e/tie/yun/sdk/loader.js',function(){
          window.cloudTieConfig = {
            url: '', 
            sourceId: _this.sourceId,
            productKey: APPKEY || '',
            target: "cloud-tie-wrapper"
          };
          var yunManualLoad = true;
          Tie.loader("aHR0cHM6Ly9hcGkuZ2VudGllLjE2My5jb20vcGMvbGl2ZXNjcmlwdC5odG1s", true);
        })
      }
    }
  }
</script>

