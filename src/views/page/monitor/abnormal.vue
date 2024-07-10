<template>
  <div class="container">
    <h1>监控视频 - 异常检测</h1>
    <div id="response">{{ responseMessage }}</div>

    <div class="video-container">
      <img id="video" />
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'VideoMonitor',
  data() {
    return {
      socket: null,
      responseMessage: '',
      selectedRoom: '',
    };
  },
  mounted() {
    this.initializeSocket();
  },
  methods: {
    initializeSocket() {
      this.socket = io('http://192.168.205.26:5001/liveVideo', {
        transports: ['websocket', 'polling'],
        withCredentials: true,
      });

      this.socket.on('connect', () => {
        console.log('Connected to server');
        this.startRecognition();  // Automatically start recognition on connect
      });

      this.socket.on('video_frame', (data) => {
        console.log('Received video frame:', data);
        this.displayVideoFrame(data);
      });
    },
    displayVideoFrame(data) {
      const img = document.getElementById('video');
      const arrayBufferView = new Uint8Array(data.data);
      const blob = new Blob([arrayBufferView], {type: 'image/jpeg'});
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(blob);
      img.src = imageUrl;
    },
    startRecognition() {
      const apiUrl = `http://192.168.205.26:5001/api/liveVideo/switch-mode`;
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'  // 确保后端能正确解析发送的内容
        },
        body: JSON.stringify({mode: 'abnormalEvent_detection'})  // 发送JSON字符串
      })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
          })
          .then(data => {
            this.responseMessage = data.message;
            console.log(data.message);
          })
          .catch(error => {
            console.error('Error:', error);
            this.responseMessage = 'Error starting: ' + error.message;
          });
    },
    stopRecognition() {
      const apiUrl = `http://192.168.109.26:5001/api/liveVideo/stop-recognition`;
      fetch(apiUrl, {
        method: 'POST',
      })
          .then(response => response.json())
          .then(data => {
            this.responseMessage = data.message;
            console.log(data.message);
          })
          .catch(error => {
            console.error('Error:', error);
            this.responseMessage = 'Error stopping';
          });
    },
    handleChangeRoom() {
      if (this.selectedRoom) {
        this.stopRecognition();
        this.socket.disconnect();
        this.initializeSocket();
      }
    },
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
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

.selector {
  margin: 20px 0;
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
  border: 2px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

img#video {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  border: 5px solid red; /* 红色边框 */
}
</style>

