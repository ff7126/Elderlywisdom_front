<template>
  <div class="header">
    <img src="../../assets/logo.png" alt="Logo" style="float: left; width: 60px; height: 60px;">
    <span style="float: left; margin-left: 10px; font-size: 20px; font-weight: bold;">智慧养老系统</span>
    <el-dropdown>
      <span style="margin-right: 20px; font-size: 20px; margin-top: 20px; align-items: center;">
        {{ username }}
        <i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item @click.native="view_manager()">个人信息</el-dropdown-item>
        <el-dropdown-item @click.native="change_pwd()">修改密码</el-dropdown-item>
        <el-dropdown-item @click.native="go_login()">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: ''
    }
  },
  mounted() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      this.username = userInfo.username;
    }
  },
  methods: {
    view_manager(){
      this.$router.push('/managerInfo');
    },
    go_login(){
      localStorage.removeItem('userInfo'); // 清除用户信息
      this.$router.push('/login');
    },
    change_pwd(){
      this.$router.push('/changePwd');
    },
  }
}
</script>

<style scoped>
.header {
  background-color: #E3BBD1;

  color: #53424C;
  line-height: 60px;
  text-align: right;
  width: 98.5vw;
  margin-top: 0;
  position: relative;
}
</style>
