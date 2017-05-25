<template>
    <div class="slider">
      <div class="menu">
        <el-tooltip class="item" effect="dark" :content="item.label" placement="right" v-for="item in tabs">
          <div class="menu-list" @click="select(item.path)"><i :class="item.class"></i></div>
        </el-tooltip>
      </div>
    </div>
</template>

<script>
export default {
  name: 'slider',
  data(){
    return{
      active:'addPost',
      tabs:[
        {
          label:'写文章',
          path:'addPost',
          class:'fa fa-plus'
        },
        {
          label:'文章列表',
          path:'postList',
          class:'fa fa-file-text'
        },
        {
          label:'分类',
          path:'categorites',
          class:'fa fa-book'
        },
        {
          label:'标签',
          path:'tags',
          class:'fa fa-tags'
        }
      ]
    }
  },
  mounted(){
    this.active = this.$route.path.substring(1);
  },
  methods:{
    select(index){
        this.active = index
        if('addPost' === index && !!this.$store.state.postDetail){
            this.$store.dispatch('DEL_POST_DETAIL')
        }
        this.$router.push(index)
    }
  }
}
</script>

<style lang="sass" scoped>
  .slider{
    width: 100px;
    display: flex;
    border-right:1px solid #dfe1e3;
    .menu{
      display: flex;
      flex: 1;
      background: #f7f7f7;
      align-items: center;
      flex-direction: column;
      .menu-list{
        text-align: center;
        height: 40px;
        width: 40px;
        text-align: center;
        border-radius: 50%;
        border: 1px solid #2dbe60;
        color: #2dbe60;
        line-height: 40px;
        position: relative;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        margin-top: 20px;
      }
      .menu-list:hover,.active{
        background: #2dbe60;
        color: #fff;
      }
    }
  }
</style>
