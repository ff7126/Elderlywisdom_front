<template>
  <div class="content_login">
    <div id="app" class="container">
      <img src="@/assets/111.png" alt="logo image">
      <div class="panel">
        <div class="welcome-title">欢迎登录智慧养老系统</div>
        <div class="form" v-if="active.login">
          <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-width="100px">
            <el-form-item label="真实姓名：" prop="real_name" class="input">
              <el-input placeholder="请输入真实姓名" size="medium" prefix-icon="el-icon-user" v-model="registerForm.real_name"></el-input>
            </el-form-item>
            <el-form-item label="用户名：" prop="username" class="input">
              <el-input placeholder="请输入用户名" size="medium" prefix-icon="el-icon-user" v-model="registerForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password" class="input">
              <el-input placeholder="请输入密码" size="medium" prefix-icon="el-icon-aim" show-password v-model="registerForm.password"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="gender" class="input">
              <el-select v-model="registerForm.gender" placeholder="请选择性别" size="medium">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号码：" prop="phone" class="input">
              <el-input placeholder="请输入手机号码" size="medium" prefix-icon="el-icon-phone" v-model="registerForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email" class="input">
              <el-input placeholder="请输入邮箱" size="medium" prefix-icon="el-icon-mail" v-model="registerForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit('registerForm')" class="registerbutton">注册</el-button>
            </el-form-item>
            <div class="login-link" @click="go()">返回登录</div>
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
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'));
      }
      if (value.length < 8 || value.length > 16 || !/^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/.test(value)) {
        return callback(new Error('密码需为8-16位，包含数字和字母'));
      }
      callback();
    };
    const validateEmail = (rule, value, callback) => {
      const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!emailPattern.test(value)) {
        return callback(new Error('请输入有效的邮箱地址'));
      }
      callback();
    };
    const validatePhone = (rule, value, callback) => {
      if (!value || value.length !== 11 || !/^\d{11}$/.test(value)) {
        return callback(new Error('手机号需为11位数字'));
      }
      callback();
    };

    return {
      active: {
        login: true,
        register: false
      },
      showPassword: false,
      showPassword1: false,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        real_name: '',
        username: '',
        password: '',
        gender: '',
        phone: '',
        email: ''
      },
      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      registerRules: {
        real_name: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        phone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
        email: [{ required: true, validator: validateEmail, trigger: 'blur' }]
      }
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    go() {
      this.$router.push('/login');
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          fetch('http://192.168.205.26:5001/api/admin/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: this.registerForm.username,
              password: this.registerForm.password,
              real_name: this.registerForm.real_name,
              gender: this.registerForm.gender,
              email: this.registerForm.email,
              phone: this.registerForm.phone
            })
          })
              .then(response => response.json())
              .then(data => {
                if (data.code === 0) {
                  this.go('login');
                } else {
                  console.log(data);
                  this.$message.error('当前用户名已被使用');
                  this.clearRegisterForm(); // 清空表单
                }
              })
              .catch(error => {
                console.error(error);
                this.$message.error('注册失败，请稍后再试');
                this.clearRegisterForm(); // 清空表单
              });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    clearRegisterForm() {

      this.registerForm.username = '';

    }
  }
}
</script>

<style scoped>
.welcome-title {

  margin-bottom: 6rem;
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
  margin-top: 1000px; /* 调整这个值来改变下移的距离 */
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


