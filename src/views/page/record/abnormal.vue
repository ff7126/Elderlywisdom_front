<template>
  <div>
    <el-table :data="videos.slice((pagination.currentPage - 1) * pagination.pageSize, pagination.currentPage * pagination.pageSize)" border style="width: 100%">

      <el-table-column prop="event_time" label="时间" width="270"></el-table-column>
      <el-table-column prop="event_type" label="事件类型" width="270"></el-table-column>
      <el-table-column prop="picture_url" label="截图" width="270">
        <template slot-scope="scope">
          <img :src="scope.row.picture_url" alt="Event Image" style="width: 150px; height: 150px;">
        </template>
      </el-table-column>
      <el-table-column prop="video_url" label="视频" width="300">
        <template slot-scope="scope">
          <video controls style="width: 270px; height: 150px;">
            <source :src="scope.row.video_url" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[5, 10, 20, 50, 100]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="videos.length"
        style="margin-top: 20px;">
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      videos: [],
      pagination: {
        currentPage: 1,
        pageSize: 5,
        totalItems: 0
      }
    };
  },
  methods: {
    fetchVideos() {
      axios.get('http://fan.v1.idcfengye.com/api/event/videos')
          .then(response => {
            // 假设每个视频对象都有一个 'event_time' 属性
            this.videos = response.data.sort((a, b) => {
              return new Date(b.event_time) - new Date(a.event_time); // 降序排序
            });
            console.log('Sorted videos:', this.videos);
          })
          .catch(error => {
            console.error('There was an error fetching the videos!', error);
            this.$message.error("服务器错误，请稍后再试！");
          });
    },
    handleSizeChange(newSize) {
      this.pagination.pageSize = newSize;
      this.pagination.currentPage = 1;
      this.fetchVideos();
    },
    handleCurrentChange(newPage) {
      this.pagination.currentPage = newPage;
      this.fetchVideos();
    }
  },
  mounted() {
    this.fetchVideos();
  }
}
</script>

<style scoped>
.select {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.select {
  flex-grow: 1;
}
</style>
