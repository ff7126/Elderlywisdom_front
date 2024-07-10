<template>
  <div>
    <div class="filter-section">
      <el-input v-model="filter.name" placeholder="输入姓名搜索"></el-input>
      <el-select v-model="filter.emotionType" placeholder="选择情绪类型">
        <el-option label="Happy" value="happy"></el-option>
        <el-option label="Sad" value="sad"></el-option>
      </el-select>
      <el-button type="primary" @click="getData">搜索</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="person_name" label="姓名" align="center" width="220"></el-table-column>
      <el-table-column prop="emotion" label="情绪" align="center" width="220"></el-table-column>
      <el-table-column prop="score" label="情绪强度" align="center" width="220"></el-table-column>
      <el-table-column prop="timestamp" label="时间" align="center" width="220"></el-table-column>
      <el-table-column label="图像" align="center" width="220">
        <template slot-scope="scope">
          <img :src="scope.row.image_url" alt="情绪图像" style="width: 100px; height: 100px;">
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.totalItems"
        style="margin-top: 20px;">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      filter: {
        name: '',
        emotionType: ''
      },
      pagination: {
        currentPage: 1,
        pageSize: 5,
        totalItems: 0
      }
    }
  },
  methods: {
    getData() {
      let url = 'http://192.168.205.26:5001/api/statistic/emotions';
      const params = new URLSearchParams();

      // Adding filters
      if (this.filter.name) params.append('name', this.filter.name);
      if (this.filter.emotionType) params.append('emotionType', this.filter.emotionType);

      // Adding pagination parameters
      params.append('page', this.pagination.currentPage);
      params.append('pageSize', this.pagination.pageSize);

      url += `?${params.toString()}`;

      this.$axios.get(url)
          .then(res => {
            if (res.data.code === 0 && res.data.data) {
              this.tableData = res.data.data;
              this.pagination.totalItems = res.data.data.total;  // Adjust according to your API response
            } else {
              this.$message.error(res.data.message || 'Failed to fetch data');
            }
          })
          .catch(error => {
            console.error("Error fetching data: ", error);
            this.$message.error("服务器错误，请稍后再试！");
          });
    },
    handleSizeChange(newSize) {
      this.pagination.pageSize = newSize;
      this.getData();
    },
    handleCurrentChange(newPage) {
      this.pagination.currentPage = newPage;
      this.getData();
    }
  },
  mounted() {
    this.getData();  // Initial data fetch when the component is mounted
  }
}
</script>

<style scoped>
.filter-section {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>
