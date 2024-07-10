<template>
  <div style="width:500px;margin-left:270px;">
    <el-form style="height: 5px;"></el-form>
    <el-form style="height: 20px; margin-left: 250px; margin-top: 20px; font-size: 25px; font-weight: bold;color: #000000">个人中心</el-form>
    <el-form ref="form" :model="form" :rules="rules" label-width="140px" class="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="real_name">
        <el-input v-model="form.real_name" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-input :value="form.gender === '0' ? '女' : '男'" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone" ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" ></el-input>
      </el-form-item>

      <el-form-item  style="width:100%;">
        <el-button type="primary" @click="submitForm('form')"  style="width:50%;margin-left:80px;margin-top:10px;border-color:#f39bbd;background-color: #f3aecd">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
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
      username: '',
      form: {
        id: null,
        dialogImageUrl: "",
        dialogVisible: false,
        fileParam: "",
        username:'',
        real_name:'',
        gender:'',
        email:'',
        phone:'',
        des:'',
        description:''
      },
      rules: {
        email: [{ validator: validateEmail, trigger: 'blur' }],
        phone: [{ validator: validatePhone, trigger: 'blur' }]
      }
    };
  },
  mounted() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      this.username = userInfo.username;
      this.getAdminInfo(userInfo.username);
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.modify();
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },
    modify() {
      axios.put('http://192.168.205.26:5001/api/admin/update_info', this.form, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.data.code === 0) {
          this.$message.success("修改成功");
        } else {
          this.$message.error("修改失败：" + res.data.message);
        }
      }).catch(error => {
        console.error(error);

        this.$message.error("修改失败:用户名已存在");
        this.clearRegisterForm(); // 清空表单
      });
    },
    clearRegisterForm() {

      this.form.username = '';

    },
    getAdminInfo(username) {
      axios.get(`http://192.168.205.26:5001/api/admin/${username}`)
          .then(res => {
            if (res.data.code === 0) {
              this.form = res.data.data;
              this.dialogVisible = true;
            } else {
              this.$message.error('获取管理员信息失败');
            }
          })
          .catch(error => {
            console.error(error);
            this.$message.error('获取管理员信息失败，请稍后再试');
          });
    }
  }
}
</script>

<style scoped>
.page{
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 600px;
  height: 596px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  margin-left: 238px;
  box-shadow: 0 0 25px #cac6c6;
}

.form{
  margin-top: 36px;
}

.disabled .el-upload--picture-card{
  display: none;
}
</style>
