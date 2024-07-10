<template>
  <div class="all">
    <div style=" margin-top:5px;margin-bottom:15px">
      <H2 style="float:left;padding-top: 10px;color: #676060; margin-left: 10px">日程表</H2>
      <!--    第一行的图标和增加日程的按钮    -->
      <div style="margin-top:10px;margin-left:1080px;display: inline">
        <!--    以下四个为日程的位置    -->
        <div style="float:left;margin-left:520px">
          <div class="green-cycle" style="float: left;"></div>
          <div style=" font-size:15px;letter-spacing:1px;float:right;margin-left: 10px;color: #676060">
            老人
          </div>
        </div>
        <div style="float:left;margin-left:50px">
          <div class="orange-cycle" style="float: left;"></div>
          <div style=" font-size:15px;letter-spacing:1px;float: right;margin-left: 10px;color: #676060">
            护工
          </div>
        </div>
        <div style="float:left;margin-left:50px">
          <div class="blue-cycle" style="float: left;"></div>
          <div style=" font-size:15px;letter-spacing:1px;float: right;margin-left: 10px;color: #676060">
            维修人员
          </div>
        </div>
        <div style="float:left;margin-left:50px">
          <div class="pink-cycle" style="float: left;"></div>
          <div style=" font-size:15px;letter-spacing:1px;float: right;margin-left: 10px;color: #676060">
            探望
          </div>
        </div>
        <!--        -->
        <div class="part2">
          <div class="button" style="margin-left:1100px;">
            <el-button  style ="float:right; margin-right: 20px;margin-top: -10px;border-color:#f88901;background-color: #F3CEAE;" type="primary" icon="el-icon-edit"  @click="dialogFormVisible = true">增加日程</el-button>
            <el-dialog title="增加日程" :visible.sync="dialogFormVisible" width='600px' style="padding-bottom: 0px;padding-top: 10px;">
              <el-form :model="form">

                <el-form-item label="请选择日程日期" prop="date">
                  <el-col span='11'>
                    <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" v-model="form.date" style="width: 100%;"></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="请输入完成人选" prop="type">
                  <el-col span='11'>
                    <el-select v-model="form.type" placeholder="请选择人选">
                      <el-option label="老人" value="1"></el-option>
                      <el-option label="护工" value="2"></el-option>
                      <el-option label="维修人员" value="3"></el-option>
                      <el-option label="探望" value="4"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item label="请输入日程内容" >
                  <el-col span='17'>
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                  </el-col>
                </el-form-item>

              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add()" style="border-color:#f88901;background-color: #F3CEAE">确 定</el-button>
              </div>
            </el-dialog>

          </div>
        </div>
      </div>
    </div>

    <div style="height: 10px"></div>
    <!--   calendar主体部分     -->
    <div class="calendar">
      <div>
        <el-calendar :ShowNextPrevMonth = "false">
          <template slot="dateCell" slot-scope="{data}" >
            <div style="font-size:20px">
              {{ data.day.split('-')[2]}}
            </div>
            <div style="width:100%;" v-for="item in scheduleData" :key="item">
              <div style="margin: 0 10px;width:120px" v-if="item.type=='1' &&data.day.split('-')[1]==7&&(item.day).indexOf(data.day.split('-').slice(2).join('-'))!=-1">

                <div class="green-cycle" style="float: left;"></div>
                <div style=" font-size:13px;letter-spacing:2px">
                  {{item.title}}
<!--                  <el-button icon="el-icon-delete-solid" type="text" class="delete-button"></el-button>-->
                </div>
                <div class="delete-button-container" v-if="item.type=='1' && data.day.split('-')[1]==7 && (item.day).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                  <el-button icon="el-icon-delete-solid" type="text" class="delete-button"  @click="delete_c()"></el-button>
                </div>
              </div>
              <div style="margin: 0 10px;width:120px" v-if="item.type=='2' &&data.day.split('-')[1]==7&&(item.day).indexOf(data.day.split('-').slice(2).join('-'))!=-1">

                <div class="orange-cycle" style="float: left;"></div>
                <div style=" font-size:13px;letter-spacing:2px">
                  {{item.title}}
                </div>
                <div class="delete-button-container" v-if="item.type=='2' && data.day.split('-')[1]==7 && (item.day).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                  <el-button icon="el-icon-delete-solid" type="text" class="delete-button"  @click="delete_c()"></el-button>
                </div>
              </div>
              <div style="margin: 0 10px;width:120px" v-if="item.type=='3' &&data.day.split('-')[1]==7&&(item.day).indexOf(data.day.split('-').slice(2).join('-'))!=-1">

                <div class="blue-cycle" style="float: left;"></div>
                <div style="font-size:13px;letter-spacing:2px">
                  {{item.title}}
                </div>
                <div class="delete-button-container" v-if="item.type=='3' && data.day.split('-')[1]==7 && (item.day).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                  <el-button icon="el-icon-delete-solid" type="text" class="delete-button"  @click="delete_c()"></el-button>
                </div>
              </div>
              <div style="margin: 0 10px;width:120px" v-if="item.type=='4' &&data.day.split('-')[1]==7&&(item.day).indexOf(data.day.split('-').slice(2).join('-'))!=-1">

                <div class="pink-cycle" style="float: left;"></div>
                <div style="font-size:13px;letter-spacing:2px">
                  {{item.title}}
                </div>
                <div class="delete-button-container" v-if="item.type=='4' && data.day.split('-')[1]==7 && (item.day).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                  <el-button icon="el-icon-delete-solid" type="text" class="delete-button"  @click="delete_c()"></el-button>
                </div>
              </div>
            </div>
          </template>
        </el-calendar>
      </div>
    </div>



  </div>

</template>

<script>
import {addSchedule, getScheduleAll} from "@/api/schedule";

export default {

  name: "PatrolSchedule",
  components: {},
  mounted() {
    this.getData();
    this.$nextTick(() => {
      // 点击前一个月
      let prevBtn = document.querySelector(
          ".el-calendar__button-group .el-button-group>button:nth-child(1)"
      );
      prevBtn.addEventListener("click", () => {
        this.judgeDate();
      });
      let dayBtn = document.querySelector(
          ".el-calendar__button-group .el-button-group>button:nth-child(2)"
      );
      dayBtn.addEventListener("click", () => {
        this.judgeDate();
      });
      let nextBtn = document.querySelector(
          ".el-calendar__button-group .el-button-group>button:nth-child(3)"
      );
      nextBtn.addEventListener("click", () => {
        this.judgeDate();
      });
    });
  },
  data() {
    // var schedule = JSON.parse(localStorage.getItem('calendar')||'[]')
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      value: new Date(),
      selectMonth:'07',
      // scheduleData: [],
      scheduleData:[
          // {
          //     date: "02",
          //     name: "张三老人特别关注",
          //     type:1
          // },
          // {
          //     date: "03",
          //     name:  "护工去往李四老人家",
          //     type:2
          // },
          // {
          //     date: "04",
          //     name:  "维修工去往王五家修设备",
          //     type:3
          // },
          // {
          //     date: "05",
          //     name:  "探望爱心活动去往刘六",
          //     type:4
          // },
          // {
          //     date: "06",
          //     name:  "李四老人特别关注",
          //     type:1
          // },
          // {
          //     date: "07",
          //     name:  "张三老人特别关注",
          //     type:1
          // },
      ],
      form: {
        date:'',
        type:'',
        title:'',
      },

    };

  },
  created(){
    this.getData()
  },
  methods: {
    getData(){
      getScheduleAll(this.selectMonth).then(res => {
        this.$message.success("获取成功")
        this.scheduleData=res.data
      }).catch(error => {
        console.log(error)
      })
    },
    judgeDate(){
      let d = new Date(this.value);
      if (this.year != d.getFullYear()) {
        this.year = d.getFullYear();
        this.selectMonth = d.getMonth();

      }
      this.getData()
    },
    click(){
      console.log(this.scheduleData)
    },
    handleClick(row) {
      console.log(row);
    },
    add(){
      addSchedule(this.form).then(res => {
        this.$message.success("添加成功")

      }).catch(error => {
        console.log(error)
      })
      //添加成功后，执行这一步
      this.dialogFormVisible=false
    },
    delete_c(){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>


<style scoped>
.el-calendar-day {
  box-sizing: border-box;
  padding: 5px;
  height: 80px;
}
i#icon{
  font-size:xx-large;
  float:right;
  margin-top: 10px;
  margin-right:5px;
}

</style>
<style>
.el-dialog__body {
  padding: 10px 30px 0px 30px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
.el-calendar-table .el-calendar-day{
  height: 130px;
}
.green-cycle{
  margin-top:7px;
  margin-right:5px;
  width: 7px;
  height: 7px;
  display: inline-block;
  background-color: #73d13d;
  border-radius: 50%;
}
.orange-cycle{
  margin-top:7px;
  margin-right:5px;
  width: 7px;
  height: 7px;
  display: inline-block;
  background-color: #ff8f00;
  border-radius: 50%;
}
.blue-cycle{
  margin-top:7px;
  margin-right:5px;
  width: 7px;
  height: 7px;
  display: inline-block;
  background-color: #03a9f4;
  border-radius: 50%;
}
.pink-cycle{
  margin-top:7px;
  margin-right:5px;
  width: 7px;
  height: 7px;
  display: inline-block;
  background-color: #ff85c0;
  border-radius: 50%;
}

.delete-button {
  padding: 0; /* 可选：根据需要设置按钮的内边距 */
  background-color: transparent; /* 可选：设置按钮的背景颜色为透明 */
  border: none; /* 可选：去除按钮的边框 */
  color: #e7af86;
  font-size: 15px; /* 根据需要设置图标的大小 */
  float:right;
}

.delete-button-container {
  position: relative;
  bottom: 0;
  right: 0;
  padding: 10px;
}
</style>



