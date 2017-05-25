<template>
  <div class="fun-tag-cloud">
    <div class="fun-tag-cloud-title" v-if="tagList.length">
      目前共计 <span>{{tagList.length}}</span> 个标签
    </div>
    <div class="fun-tag-cloud-title" v-else>
      暂无标签
    </div>
    <div class="fun-tag-cloud-tags">
      <a href="javascript:;" @click="redirectTag(item.name)" v-for="item in tagList"
         style="font-size: 12px; color: #ccc">{{item.name}}
      </a>
    </div>
  </div>
</template>
<script>
  export default {
    name:'tag',
    data(){
      return {
        tagList : []
      }
    },
    mounted(){
      this.getTagList()
    },
    methods:{
      getTagList(){
        axios.get('/api/tagList')
          .then((res)=>{
            this.tagList = res.data.data
          })
      },
      redirectTag(name){
        this.$router.push('/tag/' + name)
      }
    }
  }
</script>
<style scoped>
  .fun-tag-cloud{
    text-align: center;
  }
  .fun-tag-cloud-tags > a{
    display: inline-block;
    margin: 10px;
  }
</style>
