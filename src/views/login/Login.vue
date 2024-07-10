<template>
  <div class="content_login">
    <div id="app" class="container">
      <img src="@/assets/111.png" alt="logo image">
      <div class="panel">
        <div class="welcome-title">欢迎登录智慧养老系统</div>
        <!-- 登录表单 -->
        <div class="form" v-if="active.login">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="100px">
            <el-form-item label="用户名：" prop="username" class="input">
              <el-input placeholder="请输入用户名" size="medium" prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password" class="input">
              <el-input placeholder="请输入密码" size="medium" prefix-icon="el-icon-aim" show-password v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit('loginForm')" class="loginbutton">登录</el-button>
            </el-form-item>
            <div class="register-prompt">
              <div>还没有账号？</div>
              <div class="register-link" @click="go()">点击注册</div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "LoginComponent",
  data() {

    return {
      active: {
        login: true,
        register: false
      },
      showPassword: false,

      loginForm: {
        username: '',
        password: ''
      },

      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },

    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    go() {
      this.$router.push('/register');
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          fetch('http://192.168.205.26:5001/api/admin/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: this.loginForm.username,
              password: this.loginForm.password
            })
          })
              .then(response => response.json())
              .then(data => {
                if (data.code === 0) {
                  // 假设 data 中包含用户信息
                  localStorage.setItem('userInfo', JSON.stringify(data.user));
                  this.$router.push('/oldMan');
                } else {
                  console.log(data);
                  this.$message.error('登录失败，请检查用户名或密码');
                }
              })
              .catch(error => {
                console.error(error);
                this.$message.error('登录失败，请稍后再试');
              });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }

  }
}
</script>


<style scoped>
.welcome-title {
  margin-bottom: 2rem;
  font-size: 3rem;
  font-weight: bold;
  color: #810485;
}

.container {
  position: relative;
  width: 70rem;
  height: 100vh;
}

.container img {
  width: 100%;
}

.form{
  width: 350px;
  position: absolute;
  margin-top: 2000px; /* 调整这个值来改变下移的距离 */
}


.input {
  margin-top: 20px;
}

.toggle-password {
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 10px;
}

.register-prompt {
  display: flex; /* 启用Flexbox布局 */
  align-items: center; /* 垂直居中子元素 */
  justify-content: center; /* 水平居中子元素 */
  font-size: 1rem; /* 设置合适的字体大小 */
}

.register-link {
  margin-left: 10px;
  color: blue;
  cursor: pointer;
}

.login-link {
  margin-top: 20px;
  color: blue;
  cursor: pointer;
  text-align: center;
}

* {
  margin: 0;
  padding: 0;
}

.content_login {
  /* 100%的窗口高度 */
  height: 100vh;
  /* 弹性布局 水平 + 垂直居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 渐变背景 */
  background: linear-gradient(45deg, rgb(250, 229, 247), rgb(246, 195, 229)) fixed;
  overflow: hidden; /* 隐藏溢出的内容 */
}

.container {
  /* 相对定位 */
  position: relative;
  margin-top: 130px;
  width: 70rem;
}

.container img {
  width: 70rem;
}

.panel {
  width: 44%;
  margin: 2rem -2rem 0;
  position: absolute;
  margin-left: 300px;
  top: 0;
  display: flex;
  justify-content: center;
}

.switch span {
  color: #ccc;
  font-size: 1.4rem;
  cursor: pointer;
}

.switch span.active {
  color: rgb(222, 18, 181);
}

.form {
  width: 20rem;
  margin: 4rem -10rem 0;
}

.form .input {
  position: relative;
  opacity: 1;
  height: 2rem;
  width: 100%;
  margin: 2rem 0;
  transition: 0.4s;
  z-index: 100;
}

.form input {
  outline: none;
  width: 100%;
  border: none;
  border-bottom: .1rem solid rgb(194, 52, 191);
  z-index: 100;
  line-height: 35px;
  background-color: transparent;
}

.form span {
  display: block;
  color: rgb(3, 39, 76);
  font-size: 0.8rem;
  cursor: pointer;
}

.form button {
  border: none;
  outline: none;
  width: 100%;
  height: 3rem;
  border-radius: 3rem;
  background: linear-gradient(45deg, rgb(166, 111, 182), rgb(248, 127, 241));
  box-shadow: 0 0 8px rgb(177, 98, 183);
  cursor: pointer;
  color: white;
  font-size: medium;
  margin: 0 -2rem;
}


</style>


