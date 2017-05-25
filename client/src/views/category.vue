<template>
  <div class="category-all-page">
    <div class="category-all-title" v-if="categoryList.length">
      目前共计 {{categoryList.length}} 个分类
    </div>
    <div class="category-all-title" v-else>
      暂无分类
    </div>
    <div class="category-all">
      <ul class="category-list">
        <li class="category-list-item" v-for="item in categoryList">
          <a class="category-list-link" href="javascript:;" @click="redirectCategory(item.name)">{{item.name}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name:'category',
    data(){
      return {
        categoryList : []
      }
    },
    mounted(){
      this.getCatetoryList()
    },
    methods:{
      getCatetoryList(){
        axios.get('/api/categoriteList')
          .then((res)=>{
            this.categoryList = res.data.data
          })
      },
      redirectCategory(name){
        this.$router.push('/category/' + name)
      }
    }
  }
</script>
<style scoped>
  .category-all-page{
    max-width: 700px;
    margin: 20px auto 82px;
    padding: 10px 20px 22px;
    background: #fff;
  }
  .category-all-page .category-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .category-all-page .category-all-title {
    text-align: center;
  }
  .category-all-page .category-list-item {
    margin: 5px 10px;
  }
  .category-list-item a,.fun-post-item-tags a {
    border-bottom: 1px solid #ccc;
  }
</style>
