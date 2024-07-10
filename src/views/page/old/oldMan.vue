<template>
  <div>
    <el-table :data="elderList.slice((listForm.page - 1) * listForm.size, listForm.page * listForm.size)" border style="width: 100%">
      <el-table-column prop="username" label="姓名" width="120" align="center"></el-table-column>
      <el-table-column label="照片" width="120" align="center">
        <template slot-scope="scope">
          <div @click="scope.row.isCollected ? null : captureFace(scope.row)" style="cursor: pointer; text-align: center;">
            <img :src="scope.row.imgset_dir" alt="照片" style="width: 100px; height: 100px;" :class="{'disabled-image': scope.row.isCollected}">
            <span v-if="!scope.row.isCollected" style="display: block; color: blue;">点击上传</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ gender[scope.row.gender] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ calculateAge(scope.row.birthday) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="checkin_date" label="入院日期" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ formatDate(scope.row.checkin_date) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="room_number" label="房间号" width="120" align="center"></el-table-column>
      <el-table-column prop="health_state" label="健康状况" width="120" align="center"></el-table-column>
      <el-table-column label="操作" width="275" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="viewMan(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="updateMan(scope.row)">修改</el-button>
          <el-button type="text" size="small" :disabled="scope.row.isCollected" @click="captureFace(scope.row)">人脸采集</el-button>
          <el-button type="text" size="small" @click="confirmDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :page-sizes="[4, 5, 10, 20, 50, 100, 500]" :current-page="listForm.page" :page-size="listForm.size" :total="listForm.total" layout="total, sizes, prev, pager, next, jumper" style="margin: auto"></el-pagination>
    <el-button class="add-button" type="primary" icon="el-icon-plus" @click="add()">添加</el-button>
    <el-dialog :title="oldMesTitle" :visible.sync="oldMesVisible" width="900px">
      <el-form ref="form" :model="form" label-width="140px" class="dialog-form" :rules="rules">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="form.username" :disabled="oldMesType !== 3"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.gender" :disabled="oldMesType !== 3">
            <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" :disabled="oldMesType !== 3"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="id_card">
          <el-input v-model="form.id_card" :disabled="oldMesType !== 3"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :disabled="oldMesType !== 3" :disabled-date="disabledDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="入院日期" prop="checkin_date">
          <el-date-picker v-model="form.checkin_date" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :disabled="oldMesType !== 3" :disabled-date="disabledDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="房间号" prop="room_number">
          <el-select v-model="form.room_number" :disabled="oldMesType === 1">
            <el-option label="101" value="101"></el-option>
            <el-option label="102" value="102"></el-option>
            <el-option label="103" value="103"></el-option>
            <el-option label="104" value="104"></el-option>
            <el-option label="105" value="105"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="第一监护人姓名" prop="firstguardian_name">
          <el-input v-model="form.firstguardian_name" :disabled="oldMesType === 1"></el-input>
        </el-form-item>
        <el-form-item label="与第一监护人关系" prop="firstguardian_relationship">
          <el-input v-model="form.firstguardian_relationship" :disabled="oldMesType === 1"></el-input>
        </el-form-item>
        <el-form-item label="第一监护人电话" prop="firstguardian_phone">
          <el-input v-model="form.firstguardian_phone" :disabled="oldMesType === 1"></el-input>
        </el-form-item>
        <el-form-item label="第一监护人微信">
          <el-input v-model="form.firstguardian_wechat" :disabled="oldMesType === 1"></el-input>
        </el-form-item>
        <el-form-item label="第二监护人姓名">
          <el-input v-model="form.secondguardian_name" :disabled="oldMesType === 1"></el-input>
        </el-form-item>
        <el-form-item label="与第二监护人关系">
          <el-input v-model="form.secondguardian_relationship" :disabled="oldMesType === 1"></el-input>
        </el-form-item>
        <el-form-item label="第二监护人电话" prop="secondguardian_phone">
          <el-input v-model="form.secondguardian_phone" :disabled="oldMesType === 1"></el-input>
        </el-form-item>
        <el-form-item label="第二监护人微信">
          <el-input v-model="form.secondguardian_wechat" :disabled="oldMesType === 1"></el-input>
        </el-form-item>
        <el-form-item label="健康状态" prop="health_state">
          <el-input v-model="form.health_state" :disabled="oldMesType === 1"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;" v-if="oldMesType === 2">
          <el-button type="primary" @click="updateOld()" style="width:50%;margin-left:80px;margin-top:10px;border-color:#f3aecd;background-color: #f3aecd">更改老人信息</el-button>
        </el-form-item>
        <el-form-item style="width:100%;" v-if="oldMesType === 3">
          <el-button type="primary" @click="addOld()" style="width:50%;margin-left:80px;margin-top:10px;border-color:#f3aecd;background-color: #f3aecd">新增老人信息</el-button>
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
import axios from 'axios';
import { MessageBox } from 'element-ui';

export default {
  data() {
    return {
      instructionsText: '信息采集中...',
      dialogVisible: false,
      listForm: {
        page: 1,
        size: 4,
        total: 0,
        pagerCount: 5,
      },
      genderOptions: [
        { value: '0', label: '男' },
        { value: '1', label: '女' }
      ],
      elderList: [],
      gender: ['女', '男'],
      oldMesVisible: false,
      oldMesTitle: '查看老人信息',
      selectedOld: 0,
      oldMesType: 1,
      form: {
        dialogImageUrl: "",
        dialogVisible: false,
        fileParam: "",
        id: '',
        username: '',
        gender: '',
        phone: '',
        id_card: '',
        birthday: '',
        address: '',
        checkin_date:'',
        firstguardian_relationship:'',
        secondguardian_relationship:'',
        room_number:'',
        firstguardian_name: '',
        firstguardian_phone: '',
        firstguardian_wechat: '',
        secondguardian_name: '',
        secondguardian_phone: '',
        secondguardian_wechat: '',
        health_state: '',
        des: '',
      },
      rules: {
        username: [{ required: true, message: '请输入姓名', trigger: 'change' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { pattern: /^\d{11}$/, message: '手机号需为11位数字', trigger: 'blur' }
        ],
        id_card: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { pattern: /^\d{18}$/, message: '身份证号需为18位数字', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '请选择出生日期', trigger: 'change' },
          { validator: this.validateDate, trigger: 'change' }
        ],
        checkin_date: [
          { required: true, message: '请选择入院日期', trigger: 'change' },
          { validator: this.validateDate, trigger: 'change' }
        ],
        room_number: [{ required: true, message: '请选择房间号', trigger: 'change' }],
        firstguardian_name: [{ required: true, message: '请输入第一监护人姓名', trigger: 'change' }],
        firstguardian_relationship: [{ required: true, message: '请输入第一监护人关系', trigger: 'change' }],
        firstguardian_phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { pattern: /^\d{11}$/, message: '手机号需为11位数字', trigger: 'blur' }
        ],
        health_state: [{ required: true, message: '请输入健康状况', trigger: 'change' }],
        secondguardian_phone: [
          { pattern: /^\d{11}$/, message: '手机号需为11位数字', trigger: 'blur' }
        ],
      }
    }
  },
  mounted() {
    this.getElderList();
  },
  methods: {
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
      setTimeout(() => {
        this.instructionsText = '请正对摄像头';
      }, 4000);

      navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            const videoElement = document.getElementById('videoElement');
            videoElement.srcObject = stream;

            const chunks = [];
            const recorder = new MediaRecorder(stream);

            recorder.ondataavailable = event => {
              chunks.push(event.data);
            };

            recorder.start(5000); // 开始录制

            setTimeout(() => {
              recorder.stop(); // 停止录制
              stream.getVideoTracks()[0].stop(); // 关闭摄像头
            }, 5000);

            recorder.onstop = () => {
              // this.saveVideoToLocal(chunks); // 调用下面定义的方法来保存视频

              // 现有的上传逻辑...
              const formData = new FormData();
              formData.append('file', new Blob(chunks, { type: 'video/mp4' }), 'video.mp4');
              formData.append('username', row.username);
              formData.append('id', row.id);
              formData.append('label', 0);
              this.instructionsText = '上传人脸信息...';

              axios.post('http://192.168.205.26:5001/api/faceCollect/', formData)
                  .then(response => {
                    console.log('Video upload successful:', response.data);
                  })
                  .catch(error => {
                    alert("上传失败，未检测到有效人脸");
                    console.error('Error uploading video:', error);
                  })
                  .finally(() => {
                    this.dialogVisible = false;
                    this.getElderList();
                  });
            };
          })
          .catch(error => {
            console.error('Error accessing camera:', error);
            this.dialogVisible = false;
          });
    },

    // captureFace(row) {
    //   this.dialogVisible = true;
    //   this.instructionsText = '信息采集中...';
    //   setTimeout(() => {
    //     this.instructionsText = '请正对摄像头';
    //   }, 4000);
    //
    //   navigator.mediaDevices.getUserMedia({ video: true })
    //       .then(stream => {
    //         const videoElement = document.getElementById('videoElement');
    //         videoElement.srcObject = stream;
    //
    //         const chunks = [];
    //         const recorder = new MediaRecorder(stream);
    //
    //         recorder.ondataavailable = event => {
    //           chunks.push(event.data);
    //         };
    //
    //         recorder.start();  // You might set timeslice to handle data in chunks, e.g., recorder.start(1000);
    //
    //         setTimeout(() => {
    //           recorder.stop();  // Stops recording
    //           stream.getVideoTracks().forEach(track => track.stop());  // Stops the camera
    //         }, 5000);  // Adjust duration as needed
    //
    //         recorder.onstop = () => {
    //           this.uploadVideo(chunks, row);
    //         };
    //       })
    //       .catch(error => {
    //         console.error('Error accessing camera:', error);
    //         this.dialogVisible = false;
    //       });
    // },
    //
    // uploadVideo(chunks, row) {
    //   const blob = new Blob(chunks, { type: 'video/webm' });  // Change to 'video/mp4' if needed
    //   const formData = new FormData();
    //   formData.append('file', blob, 'capture.webm');  // Send as webm/mp4, convert server-side
    //   formData.append('username', row.username);
    //   formData.append('id', row.id);
    //   formData.append('label', 0);
    //   this.instructionsText = '上传人脸信息...';
    //
    //   axios.post('http://192.168.205.26:5001/api/faceCollect/', formData)
    //       .then(response => {
    //         console.log('Video upload successful:', response.data);
    //       })
    //       .catch(error => {
    //         alert("上传失败，未检测到有效人脸");
    //         console.error('Error uploading video:', error);
    //       })
    //       .finally(() => {
    //         this.dialogVisible = false;
    //         this.getElderList();
    //       });
    // },

    // saveVideoToLocal(chunks) {
    //   const blob = new Blob(chunks, { type: 'video/mp4' });
    //   const url = URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.style.display = 'none';
    //   a.href = url;
    //   a.download = 'recorded-video.mp4';
    //   document.body.appendChild(a);
    //   a.click();
    //   setTimeout(() => {
    //     document.body.removeChild(a);
    //     window.URL.revokeObjectURL(url);  // 清理内存
    //   }, 100);
    // },

    handleClose(done) {
      done();
    },

    calculateAge(birthday) {
      const birthDate = new Date(birthday);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },

    getElderList() {
      axios.get("http://192.168.205.26:5001/api/oldperson")
          .then(res => {
            if (res.data.code === 0) {
              this.elderList = res.data.data;
              this.listForm.total = res.data.data.length;
            } else {
              this.$message.error('获取老人信息失败');
            }
          })
          .catch(error => {
            console.error(error);
            this.$message.error('获取老人信息失败，请稍后再试');
          });
    },

    delElder(item) {
      const id = parseInt(item.id, 10);

      axios.delete('http://192.168.205.26:5001/api/oldperson/delete', {
        data: { id: id }
      })
          .then(res => {
            this.$message.success('删除成功');
            this.getElderList();
          })
          .catch(error => {
            console.error(error);
            this.$message.error('删除失败');
          });
    },

    confirmDelete(item) {
      MessageBox.confirm('确定要删除该老人信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delElder(item);
      }).catch(() => { });
    },

    add() {
      this.oldMesTitle = '新增老人信息';
      this.oldMesType = 3;
      this.oldMesVisible = true;
    },

    viewMan(item) {
      this.oldMesTitle = '查看老人信息';
      this.oldMesType = 1;
      axios.get(`http://192.168.205.26:5001/api/oldperson/search`, { params: { id: item.id } })
          .then(res => {
            this.form = res.data.data[0];
            this.oldMesVisible = true;
          }).catch(error => {
        console.log(error);
      });
    },

    updateMan(item) {
      this.oldMesTitle = '修改老人信息';
      this.oldMesType = 2;
      axios.get(`http://192.168.205.26:5001/api/oldperson/search`, { params: { id: item.id } })
          .then(res => {
            this.form = res.data.data[0];
            this.oldMesVisible = true;
          }).catch(error => {
        console.log(error);
      });
    },

    formatDate(date) {
      const d = new Date(date);
      const month = `${d.getMonth() + 1}`.padStart(2, '0');
      const day = `${d.getDate()}`.padStart(2, '0');
      const year = d.getFullYear();
      return [year, month, day].join('-');
    },

    disabledDate(time) {
      return time.getTime() > Date.now();
    },

    updateOld() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const updateData = {
            id: parseInt(this.form.id, 10),
            gender: this.form.gender,
            phone: this.form.phone,
            id_card: this.form.id_card,
            birthday: this.formatDate(this.form.birthday),
            checkin_date: this.formatDate(this.form.checkin_date),
            room_number: this.form.room_number,
            firstguardian_name: this.form.firstguardian_name,
            firstguardian_relationship: this.form.firstguardian_relationship,
            firstguardian_phone: this.form.firstguardian_phone,
            firstguardian_wechat: this.form.firstguardian_wechat,
            secondguardian_name: this.form.secondguardian_name,
            secondguardian_relationship: this.form.secondguardian_relationship,
            secondguardian_phone: this.form.secondguardian_phone,
            secondguardian_wechat: this.form.secondguardian_wechat,
            health_state: this.form.health_state
          };

          axios.put('http://192.168.205.26:5001/api/oldperson/update', updateData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
              .then(res => {
                this.getElderList();
                this.$message.success('更新成功');
              })
              .catch(error => {
                console.error(error);
                this.$message.error('更新失败');
              });

          this.oldMesVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    addOld() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const requestBody = {
            username: this.form.username,
            gender: this.form.gender,
            phone: this.form.phone,
            id_card: this.form.id_card,
            birthday: this.formatDate(this.form.birthday),
            checkin_date: this.formatDate(this.form.checkin_date),
            room_number: this.form.room_number,
            health_state: this.form.health_state,
            firstguardian_name: this.form.firstguardian_name,
            firstguardian_relationship: this.form.firstguardian_relationship,
            firstguardian_phone: this.form.firstguardian_phone,
            firstguardian_wechat: this.form.firstguardian_wechat,
            secondguardian_name: this.form.secondguardian_name,
            secondguardian_relationship: this.form.secondguardian_relationship,
            secondguardian_phone: this.form.secondguardian_phone,
            secondguardian_wechat: this.form.secondguardian_wechat,
          };

          axios.post("http://192.168.205.26:5001/api/oldperson/add", requestBody, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
              .then(res => {
                if (res.data.code === 0) {
                  this.getElderList();
                  this.$message.success('添加成功');
                } else {
                  this.$message.error('添加失败：姓名重复' );
                }
              })
              .catch(error => {
                console.error(error);
                this.$message.error('添加失败');
              });

          this.oldMesVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    handleSizeChange(value) {
      this.listForm.size = value;
      this.listForm.page = 1;
      this.getElderList();
    },

    handlePageChange(value) {
      this.listForm.page = value;
      this.getElderList();
    },
  }
}
</script>

<style scoped>
#icon {
  font-size: xx-large;
  float: right;
  margin-top: 10px;
  margin-right: 5px;
}

.add-button {
  margin-left: 70vw;
  font-weight: bold;
  background-color: #f3aecd;
  border-color: #f3aecd;
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

.instructions {
  color: white;
  font-size: 24px;
  margin-top: 5px;
}
</style>
