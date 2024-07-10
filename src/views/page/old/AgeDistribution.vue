<template>
  <div class="container">
    <h2 class="title">老年人年龄段分布</h2>
    <div class="age-info" v-if="ageDistribution">
      <span v-for="(count, ageRange) in ageDistribution" :key="ageRange">
        {{ ageRange }}: {{ count }}人
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
  name: 'AgeDistribution',
  data() {
    return {
      elderList: [],
      ageDistribution: null,
    };
  },
  mounted() {
    this.fetchElderData();
  },
  methods: {
    fetchElderData() {
      axios.get('http://192.168.205.26:5001/api/oldperson/')
          .then(response => {
            if (response.data.code === 0 && Array.isArray(response.data.data)) {
              this.elderList = response.data.data;
              this.calculateAgeDistribution();
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
    calculateAgeDistribution() {
      const ageCounts = { '60-69': 0, '70-79': 0, '80-89': 0, '90+': 0 };
      this.elderList.forEach(elder => {
        const age = this.calculateAge(elder.birthday);
        if (age >= 60 && age < 70) ageCounts['60-69']++;
        else if (age >= 70 && age < 80) ageCounts['70-79']++;
        else if (age >= 80 && age < 90) ageCounts['80-89']++;
        else if (age >= 90) ageCounts['90+']++;
      });
      this.ageDistribution = ageCounts;
    },
    calculateAge(birthday) {
      const today = new Date();
      const birthDate = new Date(birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    renderPieChart() {
      const ctx = this.$refs.pieChart.getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(this.ageDistribution),
          datasets: [{
            data: Object.values(this.ageDistribution),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
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
              text: '年龄段人数分布 - 饼图',
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
          labels: Object.keys(this.ageDistribution),
          datasets: [{
            label: '人数',
            data: Object.values(this.ageDistribution),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
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
              text: '年龄段人数分布 - 条形图',
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

.age-info {
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
