<template>
  <div class="container">
    <h2 class="title">工作人员性别分布</h2>
    <div class="gender-info" v-if="genderDistribution">
      <span v-for="(count, gender) in genderDistribution" :key="gender">
        {{ gender }}: {{ count }}人
      </span>
    </div>
    <div class="charts-container">
      <div class="chart-container pie-chart">
        <canvas ref="pieChart"></canvas>
      </div>
      <div class="chart-container bar-chart">
        <canvas ref="barChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'GenderDistribution',
  data() {
    return {
      employeeList: [],
      genderDistribution: null,
    };
  },
  mounted() {
    this.fetchEmployeeData();
  },
  methods: {
    fetchEmployeeData() {
      axios.get('http://192.168.205.26:5001/api/employee/all')
          .then(response => {
            if (response.data.code === 0 && Array.isArray(response.data.data)) {
              this.employeeList = response.data.data;
              this.calculateGenderDistribution();
              this.renderPieChart();
              this.renderBarChart();
            } else {
              throw new Error('Invalid data format or API error status');
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },
    calculateGenderDistribution() {
      // Initialize counts for each gender
      const genderCounts = { 'Male': 0, 'Female': 0 };
      this.employeeList.forEach(employee => {
        const genderKey = employee.gender === '0' ? 'Male' : 'Female';
        genderCounts[genderKey] += 1;
      });
      this.genderDistribution = genderCounts;
    },
    renderPieChart() {
      const ctx = this.$refs.pieChart.getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(this.genderDistribution),
          datasets: [{
            data: Object.values(this.genderDistribution),
            backgroundColor: [
              'rgba(54, 162, 235, 0.6)', // Blue for males
              'rgba(255, 99, 132, 0.6)', // Pink for females
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: '性别分布 - 饼图',
              font: {
                size: 16
              }
            }
          }
        }
      });
    },
    renderBarChart() {
      const ctx = this.$refs.barChart.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(this.genderDistribution),
          datasets: [{
            label: '人数',
            data: Object.values(this.genderDistribution),
            backgroundColor: [
              'rgba(54, 162, 235, 0.6)', // Blue for males
              'rgba(255, 99, 132, 0.6)', // Pink for females
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: '性别分布 - 条形图',
              font: {
                size: 16
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
};
</script>


<style scoped>
.container {
  text-align: center;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}

.title {
  margin-top: 20px;
}

.gender-info {
  margin: 20px 0;
  font-size: 16px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.charts-container {
  display: flex;
  justify-content: space-around;
}

.chart-container {
  width: 45%;
  height: 400px;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
