<template>
  <div class="__echarts">
    <e-charts :options="opt" />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/line';
import soetResponse from '../plugins/soetResponse';

export default {
  components: {
    ECharts,
  },
  data() {
    return {
      opt: {
        xAxis: {
          // type: 'time',
          // type: 'value',
          data: soetResponse.timeSeries,
          axisLabel: {
            formatter(value) {
              return dayjs.unix(value).format('HH:mm');
            },
            interval: 9,
          },
        },
        yAxis: {},
        series: soetResponse.valueSeries,
        itemStyle: {
          opacity: 0,
        },
      },
    };
  },
};
</script>

<style>
.__echarts{
  width: 1200px;
  height: 400px;
}
.echarts{
  width: 100%;
  height: 100%;
}
</style>
