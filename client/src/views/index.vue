<template>
  <div class="fun-post">
    <section>
      <article class="fun-post-item" v-for="article in articleList">
        <header>
          <h1 class="fun-post-item-title">
            <a href="javascript:;" @click="redirectArtice(article.id)">{{article.title}}</a>
          </h1>
          <div class="fun-post-item-tags">
            <span class="fun-meta">发表于</span>
            <span class="fun-meta">{{article.publishtime | format}}</span>
            <span class="fun-meta" v-if="article.category">类别</span>
            <span class="fun-meta" @click="redirectCategory(article.category)" v-if="article.category">{{article.category}}</span>
          </div>
        </header>
        <div class="fun-post-desc" v-html="article.description"></div>
        <footer class="fun-post-more-link">
          <span class="fun-post-more" @click="redirectArtice(article.id)">阅读全文</span>
        </footer>
      </article>
    </section>
  </div>
</template>
<script>
  export default {
    name:'index',
    data(){
      return {
        articleList:[],
      }
    },
    mounted(){
      this.getArticleList().then((res) =>{
        this.articleList = res.data.data;
      });
      $(window).scroll(this.handleScroll);
    },
    methods:{
      getArticleList(){
        let url = '/api/postList',route = this.$route;
        if(route.path.indexOf('/tag')!= -1 && !!route.params.name){
            url = '/api/tag/' + route.params.name
        }
        return axios.get(url)
      },
      redirectArtice(id){
        this.$router.push('/article/' + id)
      },
      redirectCategory(id){
        this.$router.push('category')
      },
      handleScroll(){
        let w_height = parseInt($(window).height());
        let d_height = parseInt($(document).height());
        let s_height = parseInt($(window).scrollTop());
        if(w_height + s_height > d_height - 30){
          //请求接口
        }
      }
    }
  }
</script>
<style scoped>
  .fun-post{
    max-width: 700px;
    margin: 0 auto;
    padding: 20px 0 62px;
  }
  .fun-post .fun-post-item{
    padding: 10px 35px 35px 35px;
    background: #ffffff;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
  }
  .fun-post .fun-post-item-title{
    font-size: 26px;
    margin-bottom: 10px;
  }
  .fun-post .fun-post-item-title a{
    color:#555
  }
  .fun-post .fun-post-desc{
    margin:20px 0
  }
  .fun-post .fun-meta{
    color:#999
  }
  .fun-post .fun-post-more {
    display: block;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    background: #e67e22;
    border: 1px solid #e67e22;
    cursor: pointer;
  }
</style>
