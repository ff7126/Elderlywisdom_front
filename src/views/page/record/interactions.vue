<template>
  <div>
    <el-table :data="tableData.slice((pagination.currentPage - 1) * pagination.pageSize, pagination.currentPage * pagination.pageSize)" border style="width: 100%">
      <el-table-column prop="person1" align="center" label="义工" width="180"></el-table-column>
      <el-table-column prop="person2" align="center" label="老人" width="180"></el-table-column>
      <el-table-column prop="emotion_person1" align="center" label="义工情绪" width="190"></el-table-column>
      <el-table-column prop="emotion_person2" align="center" label="老人情绪" width="190"></el-table-column>
      <el-table-column prop="image_url" align="center" label="交互截图" width="190">
        <template slot-scope="scope">
          <img :src="scope.row.image_url" alt="交互截图" style="width: 100px; height: 100px;">
        </template>
      </el-table-column>
      <el-table-column prop="start_time" align="center" label="时间" width="190"></el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[3, 5, 10, 20, 50]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.totalItems"
        style="margin-top: 20px;"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      let month = '' + (date.getMonth() + 1),
          day = '' + date.getDate(),
          year = date.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [year, month, day].join('-');
    },
    stripPrefix(name) {
      // Remove specific prefixes from the name strings
      return name.replace(/^Em:/, '').replace(/^older:/, '');
    },
    getData() {
      this.$axios.get("http://192.168.205.26:5001/api/statistic/interactions")
          .then(res => {
            if (res.data && Array.isArray(res.data.data)) {
              // Map and format data first
              let formattedData = res.data.data.map(record => ({
                person1: this.stripPrefix(record.person1) || '无',
                person2: this.stripPrefix(record.person2) || '无',
                emotion_person1: record.emotion_person1 || '无',
                emotion_person2: record.emotion_person2 || '无',
                image_url: record.image_url,
                start_time: this.formatDate(record.start_time)  // Format date here
              }));

              // Sort data by start_time, newest first
              formattedData.sort((a, b) => new Date(b.start_time) - new Date(a.start_time));

              this.tableData = formattedData;
              this.pagination.totalItems = this.tableData.length;
            } else {
              console.error("Received data is not in expected format:", res.data);
              this.$message.error("接收到的数据格式不正确！");
            }
          })
          .catch(error => {
            console.error("Error fetching data: ", error);
            this.$message.error("数据加载失败！");
          });
    },
    handleSizeChange(newSize) {
      this.pagination.pageSize = newSize;
      this.pagination.currentPage = 1;  // Reset to first page
      this.getData();
    },
    handleCurrentChange(newPage) {
      this.pagination.currentPage = newPage;
      this.getData();
    }
  }
}
</script>




