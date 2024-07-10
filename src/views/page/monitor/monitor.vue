<template>
  <div id="app">
    <h2>实时监控</h2>
    <div class="filter-section">
      <el-checkbox-group v-model="selectedRooms">
        <el-checkbox label="101">房间101</el-checkbox>
        <el-checkbox label="102">房间102</el-checkbox>
        <el-checkbox label="103">房间103</el-checkbox>
        <el-checkbox label="104">大厅</el-checkbox>
        <el-checkbox label="105">禁区</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="video-container">
      <img :src="videoSrc" alt="Video Stream from Server" />
      <video ref="localVideo" autoplay playsinline muted></video>
    </div>
  </div>
</template>


<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      videoSrc: '',
      selectedRooms: []
    };
  },
  mounted() {
    // 连接到服务器获取远程视频流
    const socket = io('http://fan.v1.idcfengye.com');
    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('start_video');
    });

    socket.on('video_frame', (data) => {
      this.videoSrc = 'data:image/jpeg;base64,' + data.frame;
    });

    // 获取本地视频流
    this.getLocalVideo();
  },
  methods: {
    getLocalVideo() {
      navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            this.$refs.localVideo.srcObject = stream;
          })
          .catch((error) => {
            console.error('Error accessing the local camera', error);
          });
    }
  }
};
</script>



<style scoped>
#app {
  text-align: center;
}

h2{
  margin-top: 20px;
}
.filter-section {
  margin: 20px 0;
}

.video-container {
  display: flex;
  justify-content: space-around;
}

img, video {
  width: 49%; /* 让每个视频占用一半宽度 */
  height: auto;
}
</style>


