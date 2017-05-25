<template>
    <div class="addPost">
      <header class="con-header">
        <el-form class="head-input">
          <el-input  v-model="postData.title" class="input-title" placeholder="请输入标题"></el-input>
          <div class="head-bar">
            <div class="head-bar-input">
              <el-select v-model="postData.cid" placeholder="请选择分类" class="input-cate">
                <el-option
                  v-for="item in categorites"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="postData.tag" multiple placeholder="请选择标签" class="input-tag">
                <el-option
                  v-for="item in tagsList"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="head-btn">
              <el-button type="primary" @click="publish(1)"><i class="fa fa-edit" aria-hidden="true"></i>发布</el-button>
              <el-button type="primary" @click="publish(0)"><i class="fa fa-folder-o" aria-hidden="true"></i>保存草稿</el-button>
            </div>
          </div>
        </el-form>
      </header>
      <section class="con-middle">
        <section class="con-left">
          <textarea id="markdown-input"></textarea>
        </section>
      </section>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import SimpleMDE from 'simplemde';
  export default {
    name: 'addPost',
    components: {},
    data(){
      return {
        tagsList:[],
        categorites:[],
        postData:{
          title:'',
          marktext:'',
          publish:0,
          cid:'',
          tag:[],
          publishtime:''
        }
      }
    },
    computed:mapState({
      postDetail : state => state.postDetail
    }),
    watch:{
      postDetail:'clean'
    },
    mounted(){
      axios.get('/api/tagList')
        .then((res) => {
          this.tagsList = res.data.data
        })
      axios.get('/api/categoriteList')
        .then((res) => {
          this.categorites = res.data.data
        })
      this.simplemde = new SimpleMDE({
        element: document.getElementById("markdown-input"),
        renderingConfig: {
          singleLineBreaks: false,
          codeSyntaxHighlighting: true,
        }
      });
      let obj = this.json(this.postDetail)
      if(this.isEdit()){
        for(let key in this.postData){
          this.postData[key] = key == 'tag' ? (obj[key].length ? obj[key].split(',') : []) : obj[key]
        }
        this.simplemde.value(obj['marktext']);
      }
    },
    methods:{
        isEdit(){
          return !!this.postDetail;
        },
        json(obj){
          return JSON.parse(JSON.stringify(obj))
        },
        publish(type){
          this.postData.marktext = this.simplemde.value();
          if(!this.postData.title || !this.postData.marktext){
            this.$message.error('标题和内容不能为空');
            return;
          }
          this.postData.publish = type;
          this.postData.content = this.simplemde.markdown(this.simplemde.value());
          this.postData.publishtime = new Date(new Date()).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
          let data = this.json(this.postData);
          let url = 'api/addPost'
          if(this.isEdit()){
              data.id = this.postDetail.id;
              url = 'api/updatePost'
          }
          data.tag = this.postData.tag.join(',')
          axios.post(url,data)
            .then((res)=>{
              if(res.data.success){
                this.$message.success('成功');
              }else{
                this.$message.error('失败');
              }
          })
        },
      clean(){
        for(let key in this.postData){
          this.postData[key] = '';
        }
        this.simplemde.value('')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  $font : Consolas, "Liberation Mono", Menlo, Courier, monospace;
.addPost{
  font-family:$font;
  display: flex;
  flex:1 0 0;
  flex-direction: column;
  .con-header{
    display: flex;
    justify-content: space-between;
    border-bottom:1px solid #dfe1e3;
    .input-title{
      width: 100%;
      font-size: 2rem;
      height: 46px;
      font-size: 18px;
      line-height: 1.33;
      border-radius: 3px;
    }
    .input-cate{
      min-width: 15%;
      input{
        height: 36px;
      }
    }
    .input-tag{
      width: 40%;
    }
    .head-bar{
      display: flex;
      flex: 1;
      .head-bar-input{
        width: 80%;
      }
    }
    .head-btn{
      display: flex;
      align-items: center;
      margin-right: 35px;
      .icon-setting{
        margin-right: 15px;
        color:#ccc;
        cursor: pointer;
        font-size: 1.5rem;
      }
    }
    .head-input{
      padding: 10px;
      flex: 1;
      flex-direction: column;
    }
  }
  .con-middle {
    display: flex;
    flex: 1 0 0;
    padding: 10px;
  }
  .con-left{
    width: 100%;
    display: flex;
    flex-direction: column;
    textarea{
      height: 100%;
      width: 100%;
      resize: none;
      padding: 20px;
      position: absolute;
      left:0;
      top:0;
      color: rgb(61, 64, 67);
      font-size: 1.6rem;
    }
  }
  input,textarea{
    box-sizing: border-box;
    outline: 0;
  }
}

</style>
