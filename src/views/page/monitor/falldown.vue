<template>
  <div class="container">
    <h1>监控视频 - 摔倒检测</h1>
    <div id="response">{{ responseMessage }}</div>
    <div class="video-container">
      <!-- 视频播放器 -->
      <video id="video" controls autoplay>
        <!-- 条件渲染: 只有在有视频源时才渲染 source 标签 -->
        <source v-if="videoSource" :src="videoSource" type="video/mp4">
        浏览器不支持 video 标签。
      </video>

    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoMonitor',
  data() {
    return {

      videoSource: null, // 初始化为空，将在mounted中设置
    };
  },
  mounted() {
    // 设置视频源为后端提供的URL
    this.videoSource = 'http://fan.v1.idcfengye.com/api/event/video/lx.mp4';

  },
  methods: {
    // 处理文件选择操作
    handleFileChange(event) {
      const file = event.target.files[0]; // 获取选中的第一个文件
      if (file) {
        this.videoSource = URL.createObjectURL(file); // 创建一个指向选中文件的URL
        this.responseMessage = '视频加载完成'; // 更新提示信息
      }
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  margin-top: 50px;
}
h1 {
  font-size: 2em;
  color: #333;
}
#response {
  margin: 20px 0;
  font-size: 1.2em;
  color: #666;
}
.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  margin-left: 130px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 800px;
}
video#video {
  width: 100%;
  height: auto;
  border-radius: 10px;
}
input[type="file"] {
  margin-top: 20px;
}
</style>
