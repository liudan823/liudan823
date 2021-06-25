<template>
  <div class="login">
    <el-card class="login-card">
      <div slot="header">
        <h3>欢迎登陆</h3>
      </div>
      <el-form
        size="small"
        class="demo-ruleForm"
        :model="loginFormObj"
        :rules="rules"
        ref="loginForm"
        status-icon
      >
        <el-form-item prop="username" ref="elInput">
          <el-input v-model="loginFormObj.username">
            <template slot="prepend">
              <i class="el-icon-user-solid"></i>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input type="password" v-model="loginFormObj.password">
            <template slot="prepend">
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%"
          @click="handleLogin"
            >提交</el-button
          >
        </el-form-item>
        <el-form-item>
        <el-button native-type="reset" @click="handelReset">重置</el-button>
      </el-form-item>
      </el-form>
      
    </el-card>
  </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
export default {
  data() {
   var handleName = (function (rule, value, callback){
      console.log(rule)
      if(value==''){
        callback(new Error('用户名不能为空'))
      }else {
        if(this.loginFormObj.password === ''){
          this.$refs.loginForm.validateField('password')
        }
        callback()  
      }
    }).bind(this)
    return {
      loginFormObj: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            min: 3, max: 10, message: "请输入3-10位字符", trigger: 'blur'
          },
          { validator: handleName,trigger: 'blur'}
        ],
        password: [
          {required: true, message:'请输入密码', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    handelReset(){
      this.$refs.elInput.clearValidate()
    },
    handleLogin(){
      this.$refs.loginForm.validate()
      .then(() => {
        this.$apis.login(this.loginFormObj, this.$message)
      })
      
    }  
  },
  mounted(){
    // let url = window.location.href;
    // let str = url.split('?')[1]
    // console.log(qs.parse(str))
    var url = new URL(window.location.href);
    var c = url.searchParams.get("name");
    // console.log(c);
  }
};
</script>
<style lang='scss' scoped>
.login {
  height: 100vh;
  width: 100vw;
  background-image: url(https://file.iviewui.com/admin-dist/img/login-bg.0899ffa6.jpg);
  background-size: cover;
  background-position: center center;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .login-card {
    width: 300px;
    margin-right: 200px;
  }

}
</style>