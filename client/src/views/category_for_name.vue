<template>
  <section id="posts" class="posts-collapse">
    <div class="collection-title">
      <h2>
        {{this.list.name}}
        <small>分类</small>
      </h2>
    </div>
    <article class="post post-type-normal" v-for="item in this.list.data">
      <header class="post-header">
        <h1 class="post-title">
          <a class="post-title-link" href="javascript:;" @click="redirectArticle(item.id)">
            <span>{{item.title}}</span>
          </a>
        </h1>
        <div class="post-meta">
          <time class="post-time">
            {{item.publishtime | format}}
          </time>
        </div>
      </header>
    </article>
  </section>
</template>
<script>
  export default {
    name:'CategoryForName',
    data(){
      return {
        list : []
      }
    },
    mounted(){
      this.getlist()
    },
    methods:{
      getlist(){
        var name = this.$route.params.name
        axios.get('/api/category/'+name)
          .then((res)=>{
            this.list = res.data
          })
      },
      redirectArticle(id){
        this.$router.push('/article/'+id)
      }
    }
  }
</script>
<style scoped>
  .posts-collapse {
    position: relative;
    z-index: 1010;
    margin-left: 0;
  }
  .posts-collapse .collection-title {
    position: relative;
    margin: 60px 0;
  }
  .posts-collapse .collection-title::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 50%;
    margin-left: -4px;
    margin-top: -4px;
    width: 8px;
    height: 8px;
    background: #bbb;
    border-radius: 50%;
  }
  .posts-collapse .collection-title h2 {
    margin-left: 20px;
  }
  .posts-collapse .collection-title small {
    color: #bbb;
  }
  .posts-collapse .post {
    margin: 30px 0;
  }
  .posts-collapse .post-header {
    position: relative;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
    transition-property: border;
    border-bottom: 1px dashed #ccc;
  }
  .posts-collapse .post-header::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 12px;
    width: 6px;
    height: 6px;
    margin-left: -4px;
    background: #bbb;
    border-radius: 50%;
    border: 1px solid #fff;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
    transition-property: background;
  }
  .posts-collapse .post-header:hover {
    border-bottom-color: #666;
  }
  .posts-collapse .post-header:hover::before {
    background: #222;
  }
  .posts-collapse .post-title {
    margin-left: 105px;
    font-size: 16px;
    font-weight: normal;
    line-height: inherit;
  }
  .posts-collapse .post-title a {
    color: #666;
    border-bottom: none;
  }
  .posts-collapse .post-title a {
    color: #666;
    border-bottom: none;
  }
  .posts-collapse .post-meta {
    position: absolute;
    font-size: 12px;
    left: 20px;
    top: 5px;
  }
  .posts-collapse::after {
    content: " ";
    position: absolute;
    top: 20px;
    left: 0;
    margin-left: -2px;
    width: 4px;
    height: 100%;
    background: #f5f5f5;
    z-index: -1;
  }
</style>
