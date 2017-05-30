<template>
  <div v-cloak class="fun-post-detail">
    <section>
      <article class="fun-post-item">
        <header>
          <h1 class="fun-post-item-title">
            {{article.title}}
          </h1>
          <div class="fun-post-item-tags">
            <span class="fun-meta">发表于</span>
            <span class="fun-meta">{{article.publishtime  | format}}</span>
            <span class="fun-meta" v-if="article.category">分类于</span>
            <a href="javascript:;" @click="redirectCategory(article.category)"  v-if="article.category"><span>{{article.category}}</span></a>
          </div>
        </header>
        <div class="fun-post-body" v-html="article.content"></div>
      </article>
    </section>
    <Comments :sourceId="sourceId"></Comments>
  </div>
</template>
<script>
  import Comments from './comments'
  export default{
    name:'article',
    components:{
      Comments
    },
    data(){
      return {
        article : {},
        sourceId:''
      }
    },
    mounted(){
      this.getArticle()
    },
    methods:{
      getArticle(){
        let id = this.$route.params.id
        this.sourceId = id
        axios.get('/api/article/'+id)
          .then((res)=>{
            this.article = res.data.data;
          })
      },
      redirectCategory(id){
        this.$router.push('/category/' + id)
      }
    }
  }
</script>
<style scoped>
  .fun-post-detail{
    max-width: 700px;
    margin: 20px auto 82px;
    padding: 10px 20px 22px;
    background: #fff;
  }
  .fun-post-detail .fun-meta{
    font-size: 12px;
    color: #999;
  }
  .fun-post-detail .fun-post-item-title,
  .fun-post-detail .fun-post-item-tags{
    text-align: center;
  }
  .fun-post-detail .fun-post-item-tags{
    margin-bottom: 35px;
    margin-top: 10px;
  }
</style>
