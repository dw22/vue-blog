<template>
  <div class="login-page">
    <div class="login">
      <form>
        <input type="text" v-model="username" placeholder="用户名">
        <input type="password" v-model="password" placeholder="密码" >
        <button type="button" @click="submit">登录</button>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name:'login',
    data(){
      return {
        username:'',
        password:''
      }
    },
    mounted(){},
    methods:{
      submit(){
        if(this.username != 'onfuns' && this.password !='123456'){
          this.$message({
            type: 'error',
            message: '信息认证失败!'
          })
          return;
        }
        document.cookie = 'o-token='+ Math.random(10000);
        this.$router.push('addPost')
      }
    }
  }
</script>
<style lang="sass">
  .login-page{
    position: relative;
    background: url("../assets/images/login.jpg") no-repeat;
    background-size:cover;
    width: 100%;
    height: 100%;
  }
  .login {
    position: absolute;
    margin: auto;
    height: 220px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    form {
      position: relative;
      width: 305px;
      margin: 15px auto 0 auto;
      text-align: center;
    }
    input {
      width: 270px;
      height: 42px;
      margin-top: 25px;
      padding: 0 15px;
      background: rgba(45,45,45,.15);
      -moz-border-radius: 6px;
      -webkit-border-radius: 6px;
      border-radius: 6px;
      border: 1px solid rgba(255,255,255,.15);
      -moz-box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
      -webkit-box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
      box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
      font-family: 'PT Sans', Helvetica, Arial, sans-serif;
      font-size: 14px;
      color: #fff;
      text-shadow: 0 1px 2px rgba(0,0,0,.1);
      -o-transition: all .2s;
      -moz-transition: all .2s;
      -webkit-transition: all .2s;
      -ms-transition: all .2s;
    }
    input:-moz-placeholder { color: #fff; }
    input:-ms-input-placeholder { color: #fff; }
    input::-webkit-input-placeholder { color: #fff; }
    input:focus {
      outline: none;
      -moz-box-shadow:
        0 2px 3px 0 rgba(0,0,0,.1) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
      -webkit-box-shadow:
        0 2px 3px 0 rgba(0,0,0,.1) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
      box-shadow:
        0 2px 3px 0 rgba(0,0,0,.1) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    }
    button {
      cursor: pointer;
      width: 270px;
      height: 44px;
      margin-top: 25px;
      padding: 0;
      background: #ef4300;
      border-radius: 6px;
      border: 1px solid #ff730e;
      -moz-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.25) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
      -webkit-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.25) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
      box-shadow:
        0 15px 30px 0 rgba(255,255,255,.25) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
      font-family: 'PT Sans', Helvetica, Arial, sans-serif;
      font-size: 14px;
      font-weight: 700;
      color: #fff;
      text-shadow: 0 1px 2px rgba(0,0,0,.1);
      -o-transition: all .2s;
      -moz-transition: all .2s;
      -webkit-transition: all .2s;
      -ms-transition: all .2s;
    }
    button:hover {
      -moz-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
      -webkit-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
      box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    }
  }
</style>
