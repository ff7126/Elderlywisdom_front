<template>
  <div>

    <el-table :data="workerList.slice((listForm.page - 1) * listForm.size, listForm.page * listForm.size)" border style="width: 100%">

      <el-table-column
          prop="username"
          label="姓名"
          width="130"
          align="center">
      </el-table-column>
      <el-table-column label="照片" width="120" align="center">
        <template slot-scope="scope">
          <div @click="scope.row.isCollected ? null : captureFace(scope.row)" style="cursor: pointer; text-align: center;">
            <img
                :src="scope.row.imgset_dir"
                alt="照片"
                style="width: 100px; height: 100px;"
                :class="{'disabled-image': scope.row.isCollected}">
            <span v-if="!scope.row.isCollected" style="display: block; color: blue;">点击上传</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          prop="gender"
          label="性别"
          width="130"
          align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.gender === '0'">女</template>
          <template v-if="scope.row.gender === '1'">男</template>
        </template>
      </el-table-column>
      <el-table-column
          prop="phone"
          label="电话"
          width="130"
          align="center">
      </el-table-column>
      <el-table-column
          prop="hire_date"
          label="入职日期"
          width="270"
          align="center">
        <template slot-scope="scope">
          <span>{{ formatDate(scope.row.hire_date) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          float="right"
          label="操作"
          width="280"
          align="center">
        <template slot-scope="scope">
          <el-button  type="text" size="small" @click.native.prevent="queryWorker(scope.row)">查看</el-button>
          <el-button  type="text" size="small" @click.native.prevent="updateWorker(scope.row)">修改</el-button>
          <el-button type="text" size="small" :disabled="scope.row.isCollected" @click="captureFace(scope.row)">人脸采集</el-button>
          <el-button type="text" size="small" @click.native.prevent="confirmDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :page-sizes="[4, 10, 20, 50, 100, 500, 1000]"
        :current-page="listForm.page"
        :page-size="listForm.size"
        :pagerCount="listForm.pagerCount"
        :total="listForm.total"
        layout="total, sizes, prev, pager, next, jumper"
        style=" margin: auto">
    </el-pagination>
    <el-button class="add-button" type="primary" icon="el-icon-plus" @click="add()">添加</el-button>

    <!--  详细信息  -->
    <el-dialog title="工作人员信息详情" :visible.sync="workerMesVisible" width="900px">
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item label="工号">
          <el-input v-model="form.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input :value="form.gender === '0' ? '女' : '男'" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="入职日期" prop="phone">
          <el-input v-model="form.hire_date" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="phone">
          <el-input v-model="form.description" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--  修改信息  -->
    <el-dialog title="修改工作人员信息" :visible.sync="workerMesVisible1" width="900px">
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item label="工号">
          <el-input v-model="form.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input :value="form.gender === '0' ? '女' : '男'" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="phone" :rules="rules.phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="入职日期" prop="hire_date">
          <el-input v-model="form.hire_date" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" @click="submitUpdateForm('form')" style="width:50%;margin-left:80px;margin-top:10px;border-color:#f3aecd;background-color: #f3aecd">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <!--  添加信息  -->
    <el-dialog title="添加工作人员" :visible.sync="addWorkerVisible" width="900px">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="140px">
        <el-form-item label="工作人员姓名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="addForm.gender" placeholder="请选择您的性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="入职日期" prop="hire_date">
          <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="addForm.hire_date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="addForm.description"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" @click="submitAddForm('addForm')" style="width:50%;margin-left:80px;margin-top:10px;border-color: #f3aecd;background-color: #f3aecd">添加工作人员</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <el-dialog :visible.sync="dialogVisible" width="36%" height="36%" :modal="false" :show-close="false" :before-close="handleClose">
      <div class="face-recognition-container">
        <video id="videoElement" autoplay style="width: 100%;"></video>
        <div class="overlay">
          <p class="instructions">{{ instructionsText }}</p>
          <div class="scan-animation"></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { MessageBox } from "element-ui";
import axios from "axios";

export default {
  data() {
    return {
      instructionsText: '信息采集中...',
      dialogVisible: false, // 控制对话框显示的变量
      rules: {
        username: [
          { required: true, message: '请输入工作人员姓名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { min: 11, max: 11, message: '电话号码必须是11位长度', trigger: 'blur' },
          { pattern: /^\d{11}$/, message: '电话号码必须是11位数字', trigger: 'blur' }
        ],
        hire_date: [
          { required: true, message: '请选择入职日期', trigger: 'change' },
          { validator: this.validateDate, trigger: 'change' }
        ]
      },
      listForm: {
        page: 1,
        size: 4,
        total: 0,
        pagerCount: 5,
      },
      workerList: [],
      addWorkerVisible: false,
      addWorkerTitle: '添加工作人员',
      workerMesVisible: false,
      workerMesVisible1: false,

      workerMesTitle: '查看信息',
      form: {
        dialogImageUrl: "",
        dialogVisible: false,
        fileParam: "",
        id: null,
        username: "",
        gender: "",
        phone: "",
        id_card: "",
        birthday: "",
        hire_date: "",
        resign_date: "",
        imgset_dir: "",
        CREATED: "",
        UPDATED: "",
        remove: "",
        updated: "",
        created: "",
        createby: "",
        updateby: "",
        isactive: "",
        client_ID: "",
        org_ID: " ",
        avatarPath: "",
        position: ""
      },
      addForm: {
        username: "",
        gender: "",
        phone: "",
        position: "",
        birthday: ""
      }
    }
  },
  mounted() {
    this.getWorkerList();
  },
  methods: {
    submitAddForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addWorker();
        } else {
          console.log('表单验证失败!');
          return false;
        }
      });
    },
    addWorker() {
      const requestBody = {
        username: this.addForm.username,
        gender: this.addForm.gender,
        phone: this.addForm.phone,
        hire_date: this.addForm.hire_date,
        imgset_dir: "",  // 添加 imgset_dir 字段，值为空字符串
        description: this.addForm.description
      };
      axios.post("http://192.168.147.26:5001/api/employee/add", requestBody)
          .then(res => {
            if (res.data.code === 0) {
              this.$message.success("添加成功");
              this.getWorkerList();
            } else {
              this.$message.error("添加失败：" + res.data.message);
            }
          })
          .catch(error => {
            console.error(error);
            this.$message.error("添加失败");
          });
      this.addWorkerVisible = false;
    },
    add() {
      const today = new Date().toISOString().split('T')[0];
      this.addForm = {
        username: "",
        gender: "",
        phone: "",
        hire_date: today,
        description: ""
      };
      this.addWorkerVisible = true;
    },
    validateDate(rule, value, callback) {
      if (new Date(value).getTime() > new Date().getTime()) {
        callback(new Error('日期不能在当前日期之后'));
      } else {
        callback();
      }
    },
    captureFace(row) {
      this.dialogVisible = true;
      this.instructionsText = '信息采集中...';
      // 在4秒后改变文本
      setTimeout(() => {
        this.instructionsText = '请正对摄像头';
      }, 4000);

      // 请求访问用户的摄像头
      navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            const videoElement = document.getElementById('videoElement');
            videoElement.srcObject = stream;

            const chunks = [];
            const recorder = new MediaRecorder(stream);

            recorder.ondataavailable = event => {
              chunks.push(event.data);
            };

            recorder.start(5000);

            setTimeout(() => {
              recorder.stop();
              stream.getVideoTracks()[0].stop();
            }, 5000);

            recorder.onstop = () => {

              const formData = new FormData();
              formData.append('file', new Blob(chunks, { type: 'video/mp4' }), 'video.mp4');

              formData.append('username', row.username);
              formData.append('id', row.id);
              formData.append('label', 1);
              this.instructionsText = '上传人脸信息...';

              axios.post('http://fan.v1.idcfengye.com/upload_video', formData)
                  .then(response => {

                    console.log('Video upload successful:', response.data);
                  })
                  .catch(error => {
                    alert("上传失败，未检测到有效人脸");
                    console.error('Error uploading video:', error);

                  })
                  .finally(() => {
                    this.dialogVisible = false;
                    this.getWorkerList();
                  });
            };
          })
          .catch(error => {
            console.error('Error accessing camera:', error);

            this.dialogVisible = false;
          });
    },


    handleClose(done) {
      done();
    },

    getWorkerList() {
      axios.get("http://192.168.205.26:5001/api/employee/all")
          .then(res => {
            this.workerList = res.data.data;
            this.listForm.total = res.data.data.length;
          }).catch(error => {
        console.log(error);
      });
    },
    queryWorker(item) {
      this.workerMesTitle = '查看信息';

      axios.get(`http://192.168.205.26:5001/api/employee/search`, { params: { id: item.id } })
          .then(res => {
            this.form = res.data.data[0];
            this.workerMesVisible = true;
          }).catch(error => {
        console.log(error);
      });
    },
    confirmDelete(item) {
      MessageBox.confirm('确定要删除该员工信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(() => {
            this.delWorker(item);
          })
          .catch(() => {

          });
    },
    delWorker(item) {
      const id = parseInt(item.id, 10); // 确保 id 是整数格式

      axios.delete('http://192.168.205.26:5001/api/employee/delete', {
        data: { id: id }
      })
          .then(res => {
            this.$message.success('删除成功');
            this.getWorkerList();
          })
          .catch(error => {
            console.error(error);
            this.$message.error('删除失败');
          });
    },

    formatDate(date) {
      const d = new Date(date);
      const month = `${d.getMonth() + 1}`.padStart(2, '0');
      const day = `${d.getDate()}`.padStart(2, '0');
      const year = d.getFullYear();
      return [year, month, day].join('-');
    },
    updateWorker(item) {
      this.workerMesTitle = '修改信息';

      axios.get(`http://192.168.205.26:5001/api/employee/search`, { params: { id: item.id } })
          .then(res => {
            this.form = res.data.data[0];
            this.workerMesVisible1 = true;
          }).catch(error => {
        console.log(error);
      });
    },
    submitUpdateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateWorkerInfo();
        } else {
          console.log('表单验证失败!');
          return false;
        }
      });
    },
    updateWorkerInfo() {
      const requestBody = {
        id: this.form.id,
        gender: this.form.gender,
        phone: this.form.phone,
        hire_date: this.formatDate(this.form.hire_date),
        description: this.form.description,
      };

      axios.put('http://192.168.205.26:5001/api/employee/update', requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(res => {
            if (res.data.code === 0) {
              this.$message.success('信息修改成功');
              this.getWorkerList();
            } else {
              this.$message.error('信息修改失败：' + res.data.message);
            }
          })
          .catch(error => {
            console.error(error);
            this.$message.error('信息修改失败');
          });

      this.workerMesVisible1 = false;
    },
    adda() {
      this.addWorkerTitle = '新增工作人员信息';
      this.addWorkerVisible = true;
      this.addForm = {
        username: "",
        gender: "",
        phone: "",
        position: "",
        birthday: ""
      };
    },

    handleSizeChange(value) {
      this.listForm.size = value;
      this.listForm.page = 1;  // 重置当前页为第一页
      this.getWorkerList();
    },
    handlePageChange(value) {
      this.listForm.page = value;
      this.getWorkerList();
    },
  }
}
</script>

<style scoped>
i#icon {
  font-size: xx-large;
  float: right;
  margin-top: 10px;
  margin-right: 5px;
}

.face-recognition-container {
  position: relative;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.add-button {
  margin-left: 70vw;
  font-weight: bold;
  background-color: #f3aecd;
  border-color: #f3aecd;
}

.instructions {
  color: white;
  font-size: 24px;
  margin-top: 5px;
}
</style>
