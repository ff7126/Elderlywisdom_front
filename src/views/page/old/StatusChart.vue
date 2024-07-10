<template>
  <div>
    <h2>老年人状态统计</h2>
    <canvas id="statusChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'StatusChart',
  mounted() {
    const data = {
      labels: ['健康', '长期疾病', '需护理'],
      datasets: [{
        data: [300, 120, 80],
        backgroundColor: [
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ]
      }]
    };

    const ctx = this.$refs.statusChart.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    });
  }
};
</script>
