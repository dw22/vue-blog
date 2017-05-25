<template>
  <div class="postList">
    <header class="header">
      <section class="head-title">文章列表</section>
      <div  class="head-btn">
        <el-button type="primary" @click="editPost"><i class="fa fa-edit"></i>编辑</el-button>
        <el-button type="danger" @click="delPost"><i class="el-icon-delete"></i>删除</el-button>
      </div>
    </header>
    <div class="container">
      <section class="list">
        <ul>
          <li class="list-item" :class="{'current':currentId === item.id}" v-for="item in postList" @click="getInfo(item.id)">
              <h4>{{item.title}}</h4>
              <div class="post-time">发表时间：<span>{{item.publishtime}}</span></div>
          </li>
        </ul>
      </section>
      <section class="content" v-html="content"></section>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'postList',
    components: {},
    data(){
      return {
        postList:[],
        content:'',
        currentId:'',
        postDetail:{}
      }
    },
    mounted(){
      this.getList();
    },
    methods:{
        getList() {
          axios.get('/api/postList')
            .then((res) => {
              this.postList = res.data.data;
              this.content = this.postList.length !== 0 ? this.postList[0].content : '';
              this.currentId = this.postList.length !== 0 ? this.postList[0].id : '';
              this.postDetail = this.postList.length !== 0 ? this.postList[0] : '';
            })
        },
        getInfo(id){
            this.currentId = id;
            for(let key in this.postList){
                if(id === this.postList[key].id){
                    this.content = this.postList[key].content;
                    this.postDetail = this.postList[key]
                }
            }
        },
        delPost() {
          this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.post('/api/delPost',{id:this.currentId})
              .then((res) => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getList();
              })
          })
        },
        editPost(){
          this.$store.dispatch('POST_DETAIL',this.postDetail)
          this.$router.push('editPost')
        }
    }
  }
</script>
<style lang="sass" scoped>
  $boderColor:#dfe1e3;
  .postList{
    display: flex;
    flex:1;
    flex-direction:column;
    .header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 65px;
      line-height: 65px;
      padding:0 20px ;
      border-bottom:1px solid $boderColor;
      flex-direction:row;
      .head-title{
        display: flex;
        font-size: 1.5rem;
        justify-content: flex-start;
      }
      .head-btn{
        align-items: center;
      }
      i{
        margin-right: 10px;
      }
    }
   .container{
     display: flex;
     flex:1;
     .list{
        border-right:1px solid $boderColor;
        width:300px;
        overflow-y:auto;
       .list-item{
         cursor: pointer;
         padding:10px;
         border-bottom:1px solid $boderColor;
         .post-time{
           margin-top: 5px;
           font-size: 12px;
           color:#999;
         }
         h3{
            width: 100%;
            white-space:nowrap;
            overflow: hidden;
         }
       }
     }
     .content{
       flex:1 0 0;
       padding: 20px;
       overflow-y: auto;
     }
     .item-active{
       border-left: 3px solid #5ba4e5;
     }
   }
  .current{
    border-left: #5BA4E6 3px solid
  }
  }
</style>
