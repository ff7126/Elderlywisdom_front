<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-left: 300px">
    <el-form style="height: 5px;"></el-form>
    <el-form style="height: 20px; margin-left: 100px; margin-top:80px;font-size: 25px; font-weight: bold;color: #000000">修改密码:</el-form>
    <el-form-item label="新密码" prop="pass" style="margin-left:100px; margin-top:30px">
      <el-col :span="8">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass" style="margin-left:100px; margin-top:30px">
      <el-col :span="8">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item style="margin-left:280px; margin-top:30px">
      <el-button type="primary" @click="submitForm('ruleForm')" style="border-color:#f39bbd;background-color: #f3aecd">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    var validatePass = (rules, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
        callback(new Error('密码至少8个字符，包含字母和数字'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rules, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ]
      }
    };
  },
  mounted() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      this.ruleForm.username = userInfo.username;
      this.ruleForm.id = userInfo.id; // 假设用户信息中包含id
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const updateData = {
            id: parseInt(this.ruleForm.id, 10),  // 从ruleForm中获取id
            new_password: this.ruleForm.pass
          };
          axios.put('http://192.168.205.26:5001/api/admin/update_password', updateData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
              .then(res => {
                if (res.data.code === 0) {
                  this.$message.success('密码修改成功');
                } else {
                  this.$message.error('密码修改失败：' + res.data.message);
                }
              })
              .catch(error => {
                console.error(error);
                this.$message.error('密码修改失败');
              });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
