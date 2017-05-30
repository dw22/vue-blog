<template>
  <section class="archives">
    <div class="archives-item" v-for="(item,index) in list">
      <h2>{{index}}</h2>
      <ul class="archives-list">
        <li v-for="article in item">
          <time class="post-time">{{article.publishtime | format}}</time>
          <a class="post-title-link" href="javascript:;" @click="redirectArticle(article.id)">{{article.title}}</a>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
  export default {
    name:'Archives',
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
        axios.get('/api/archivesList')
          .then((res)=>{
            let data = res.data.data
            let arr={};
            for(let i=0,len=data.length;i<len;i++){
              let key = data[i].publishtime.split('-')[0]
              if(arr[key] == undefined){
                  let list = [];
                  list.push(data[i]);
                  arr[key] = list;
              }else{
                  arr[key].push(data[i]);
              }
            }
            this.list = arr
          })
      },
      redirectArticle(id){
        this.$router.push('/article/'+id)
      }
    }
  }
</script>
<style scoped>
  .archives {
    position: relative;
    z-index: 1010;
    margin-left: 0;
  }
  .archives .archives-item h2{
    font-weight: 700;
  }
  .archives .archives-list {
    padding-left: 30px;
  }
  .archives .archives-list a{
    color:#6E7173;
    margin-left: 10px;
  }
  .archives ul li{
    list-style: disc;
    line-height: 2;
  }
  .archives .archives-item{
    max-width: 700px;
    margin: 20px auto 0;
    padding: 0 50px;
  }
</style>
ß