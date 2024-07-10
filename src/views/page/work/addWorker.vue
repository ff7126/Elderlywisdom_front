<template>
  <div style="width:500px;margin-left:270px;">
    <el-form style="height: 5px;"></el-form>
    <el-form style="height: 20px; margin-left: -200px; font-size: 25px; font-weight: bold;color: #676060">增加工作人员信息:</el-form>
    <el-form ref="form" :model="form"  :rules="rules" label-width="140px">
      <el-form-item label="工作人员姓名" prop="name">
        <el-input v-model="form.workerName"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-select v-model="form.sex" placeholder="请选择您的性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" v-model="form.birthday" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="职位"  prop="des">
        <el-select v-model="form.des" placeholder="请选择您的职位">
          <el-option label="护工" value="护工"></el-option>
          <el-option label="维修工" value="维修工"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="工作人员电话"  prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>

      <el-form-item label="工作人员身份证号" prop="ID">
        <el-input v-model="form.ID"></el-input>
      </el-form-item>

      <el-form-item label="设置工作人员头像">
        <div>
          <el-upload
              v-model="form.fileList"
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
        <el-button type="primary" @click="addWorker"  style="width:50%;margin-left:80px;margin-top:10px;border-color:#f88901;background-color: #F3CEAE">添加工作人员</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
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
      fileParam: "",
      uploadDisabled:'',
      form: {
        workerName:'',
        sex:'',
        phone:'',
        ID:'',
        birthday:'',
        hire_date:'',
        des:'',
        fileList: [],
        dialogImageUrl: "",
        dialogVisible: false,
      },
      rules:{
        name: [{required: true, message: 'please enter your name', trigger: 'blur'}],
        sex: [{required: true, message: 'please enter your sex', trigger: 'blur'}],
        des: [{required: true, message: 'please enter your position', trigger: 'blur'}],
        birthday: [{required: true, message: 'please enter your birthday', trigger: 'blur'}],
        ID: [{required: true,validator:validateID ,  trigger: 'blur'}],
        phone: [{required: true,validator:validatePhone, trigger: 'blur'}],
      }
    }
  },
  methods: {
    addWorker(){
        this.$router.push('/workers');
    }
  }
}
</script>
<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>

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
</style>
