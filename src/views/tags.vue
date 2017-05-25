<template>
  <div class="tags">
    <header class="header">
        <div>标签</div>
        <div><el-button type="primary" @click="addNewTag"><i class="fa fa-edit"></i>添加</el-button></div>
    </header>
    <div class="container">
        <div class="list">
          <ul>
            <li class="list-item" :class="{'current':currentId === item.id}" v-for="item in tagList" @click="getInfo(item.id)">
              <h4>{{item.name}}</h4>
              <div class="description">{{item.description}}</div>
            </li>
          </ul>
        </div>
        <el-form label-position="top" class="form"  v-if="!!tagList.length">
          <el-form-item label="名称">
            <el-input v-model="form.title" @blur="addTag"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="form.desc"  @blur="addTag"></el-input>
          </el-form-item>
          <el-button type="danger" class="del-btn" @click="delTag"><i class="el-icon-delete"></i>删除</el-button>
        </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name:'tags',
    data(){
      return {
        tagList:[],
        currentId:'',
        form:{
          title:'',
          desc:''
        }
      }
    },
    mounted(){
      this.isFirst = true; //判断是否初次加载
      this.getTagList();
    },
    methods:{
      json:function(obj){
        return JSON.parse(JSON.stringify(obj))
      },
      getTagList:function () {
        axios.get('/api/tagList')
          .then((res)=>{
            this.tagList = res.data.data;
            let len = this.tagList.length === 0 || this.isFirst ? 0 : this.tagList.length - 1;
            let id = this.currentId ? this.currentId : this.tagList[len].id;
            this.currentId = id
            this.getInfo(id)
           })
      },
      getInfo: function(id){
        this.currentId = id;
        for(let key in this.tagList){
          if(id === this.tagList[key].id){
            this.form.title = this.tagList[key].name;
            this.form.desc = this.tagList[key].description;
          }
        }
      },
      addNewTag:function(){
        this.currentId = '';
        this.form = {
          title:'',
          desc:''
        }
      },
      addTag:function(){
        if(!this.form.title) return;
        let params = {
          name:this.form.title,
          description:this.form.desc
        };
        let url = '/api/addTag';
        if(this.currentId){
          url = '/api/updateTag'
          params.id = this.currentId
        }
        axios.post(url,params)
          .then((res)=>{
            this.isFirst =  false;
            this.getTagList()
        })
      },
      delTag:function(){
        this.$confirm('确认删除此标签?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          axios.post('/api/delTag',{id:this.currentId})
          .then((res)=>{
          this.isFirst =  true;
          this.currentId = '';
          this.getTagList()
           })
        }).catch(()=>{

        })
      }
    }
  }
</script>

<style lang="sass" scoped>
  $boderColor:#dfe1e3;
.tags{
  display:flex;
  flex:1;
  flex-direction:column;
  .header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 60px;
    padding: 10px;
    align-items: center;
    border-bottom: $boderColor 1px solid;
  }
  .container{
    display: flex;
    flex: 1;
    .list{
      border-right:1px solid $boderColor;
      overflow-y:auto;
      width:65%;
      .list-item{
        cursor: pointer;
        padding:5px 10px;
        border-bottom:1px solid $boderColor;
        h3{
          width: 100%;
          white-space:nowrap;
          overflow: hidden;
        }
      }
    }
    .form{
      display: flex;
      flex: 1;
      width:35%;
      flex-direction: column;
      padding: 20px;
      .del-btn{
        width: 150px;
      }
    }
  }
  .current{
    border-left: #5BA4E6 3px solid
  }
}
</style>
