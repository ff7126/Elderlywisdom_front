<template>
  <div class="sidebar">
    <el-menu :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-user-solid"></i>老人信息管理</template>
        <el-menu-item-group>
          <el-menu-item index="1-1"class="el-icon-tickets" @click="old_mes()"> 老人列表</el-menu-item>
          <el-menu-item index="1-2"class="el-icon-data-line" @click="old_age()"> 老人年龄段统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-video-camera-solid"></i>实时监控</template>
        <el-menu-item-group>
          <el-menu-item index="2-1" @click="room_monitor0()" class="el-icon-video-camera"> 多摄像头监控</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="2-2" @click="room_monitor()" class="el-icon-video-camera"> 情绪与交互识别</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="2-3" @click="room_monitor1()" class="el-icon-video-camera"> 摔倒检测</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="2-4" @click="room_monitor2()" class="el-icon-video-camera"> 异常行为检测</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="2-5" @click="room_monitor3()" class="el-icon-video-camera"> 禁区入侵检测</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-tickets"></i>实时报表</template>
        <el-menu-item-group>
          <el-menu-item index="3-1" @click="record_interactions()" class="el-icon-tickets"> 交互信息记录</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="3-2" @click="record_abnormal()" class="el-icon-tickets"> 异常信息记录</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="3-3" @click="record_emotion()" class="el-icon-tickets"> 情感信息记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title"><i class="el-icon-user-solid"></i>工作人员信息管理</template>
        <el-menu-item-group>
          <el-menu-item index="4-1" class="el-icon-tickets" @click="worker_mes()"> 工作人员列表</el-menu-item>
          <el-menu-item index="4-2"class="el-icon-data-line" @click="work_age()"> 工作人员性别统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-user-solid"></i> 个人信息管理</template>
        <el-menu-item-group>
          <el-menu-item index="5-1" @click="view_manager()" class="el-icon-tickets"> 查看个人信息</el-menu-item>
          <el-menu-item index="5-2" @click="change_pwd()" class="el-icon-tickets"> 修改密码</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  methods: {

    old_mes(){
      //后端传老人信息
      this.$router.push('/oldMan');
    },
    old_age(){
      this.$router.push('/oldMenage');
    },
    work_age(){
      this.$router.push('/workMenage');
    },
    view_manager(){
      this.$router.push('/managerInfo');
    },
    change_pwd(){
      //更改密码
      this.$router.push('/changePwd');
    },
    room_monitor0(){
      this.$router.push('/monitor');
    },
    room_monitor(){
      //查看房间监控
      this.$router.push('/emotion');
    },
    room_monitor1(){
      this.$router.push('/falldown');
    },
    room_monitor2(){
      this.$router.push('/abnormal');
    },
    room_monitor3(){
      this.$router.push('/intrusion');
    },
    worker_mes(){
      //后端传入工作人员信息
      this.$router.push('/workers');
    },

    record_interactions(){
      this.$router.push('/interactions');
    },
    record_abnormal(){
      this.$router.push('/abnormal1');
    },
    record_emotion(){
      this.$router.push('/emotion1');
    },
  }
}
</script>

<style scoped>
.sidebar {
  width: 230px;
  overflow-y: auto; /* 允许垂直方向上滚动 */
  overflow-x: hidden;
  height: calc(100vh - 65px); /* 计算视口高度减去头部高度，保持固定 */
  background-color: #FFF5FE;
  display: block;
  position: absolute;
  left: 0;
  top: 65px; /* 假设头部高度为65px */
}
.el-aside{
  background-color: #FFF5FE;
}

.el-menu-item{
  width:250px;
  background-color: #FFF5FE;
}

.el-menu{
  background-color: #FFF5FE;
}

.el-submenu{

  background-color: #FFF5FE;
}

.el-menu-item-group{
  background-color: #FFF5FE;
}

/* 颜色改变在选中时 */
.el-menu-item.is-active,
.el-menu-item:not(.is-disabled):active,
.el-menu-item:focus,
.el-submenu__title.is-active,
.el-submenu__title:focus {
  background-color: #E3BBD1 !important;
  color: #53424C !important; /* 更改文字颜色 */
}

/* 鼠标悬停时的样式，可以根据需要添加 */
.el-menu-item:hover,
.el-submenu__title:hover {
  background-color: #E3BBD1 !important; /* 鼠标悬停颜色，淡灰色 */
  color: #53424C !important; /* 更改文字颜色 */
}
</style>