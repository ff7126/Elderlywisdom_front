<template>
  <div style="width:500px;margin-left:270px;">
    <el-form style="height: 5px;"></el-form>
    <el-form style="height: 20px; margin-left: -200px; font-size: 25px; font-weight: bold;color: #676060">查看/修改工作人员信息:</el-form>
    <el-form ref="form" :model="form" :rules="rules" label-width="140px">
      <el-form-item label="工号">
        <el-input v-model="form.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="form.gender" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="position">
        <el-input v-model="form.position"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
<!--      <el-form-item label="身份证号" prop="ID">-->
<!--        <el-input v-model="form.id" :disabled="true"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="生日">
        <el-input v-model="form.birthday"></el-input>
      </el-form-item>
      <el-form-item label="入职日期">
        <el-input v-model="form.hire_date"></el-input>
      </el-form-item>

      <el-form-item label="头像">
        <div>
          <el-upload
              v-model="fileList"
              list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="form.dialogVisible">
            <img width="100%" :src="form.dialogImageUrl" alt="" />
          </el-dialog>
        </div>
      </el-form-item>

      <el-form-item  style="width:100%;">
        <el-button type="primary" @click="modify"  style="width:50%;margin-left:80px;margin-top:10px;border-color:#f88901;background-color: #F3CEAE">更改工作人员信息</el-button>
        <el-button type="primary" @click="back"  style="width:50%;margin-left:80px;margin-top:10px;border-color:#f88901;background-color: #F3CEAE">返回工作人员列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from "axios";
  export default {
    data() {
      // alert(worker.image)
      let validatePhone =(rule,value,callback)=>{
        if(!value){
          callback(new Error('手机号不能为空'));
        }
        if (!/^1[3456789]\d{9}$/.test(value)){
          callback(new Error('手机号不正确！'));
        }
      };
      let validateID =(rule,value,callback)=>{
        if(!value){
          callback(new Error('身份证号不能为空'));
        }
        if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(([0-2][1-9])|10|20|30|31)\d{3}(\d|X|x)$/.test(value)){
          callback(new Error('身份证号不正确！'));
        }
      };
      return {
        fileList: '',
        uploadDisabled:'disabled',
        form:{
          dialogImageUrl: "",
          dialogVisible: false,

          id:'',
          username: '',
          gender :'',
          phone :'',
          ID:'',
          birthday:'',
          hire_date:'',
          resign_date:'',
          position:'',
          createTime:'',
          createName:'',
          fileParam: "",
        },
        rules:{
          ID: [{validator:validateID ,  trigger: 'blur'}],
          phone: [{validator:validatePhone, trigger: 'blur'}],
        }
      }
    },
    methods: {
      modify(){
        //修改工作人员信息
        this.$router.push('/workers');
      },
      back(){
        //返回工作人员列表
        this.$router.push('/workers');
      }
    }
  }

</script>
<style>
  .disabled .el-upload--picture-card{
  display: none;
  }
</style>