<template>
  <div class="__echarts">
    <e-charts :options="opt" />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/line';
import soetResponse from '../data/soet-response.json';

// JSON
const res = soetResponse.data.result;

// func
// const getTime = (unixStamp) => dayjs.unix(unixStamp).format('HH:mm');

// func - get
const getTimeSeries = (responseData) => {
  const ans = [];
  // responseData[0].values.forEach((val) => { ans.push(getTime(val[0])); });
  responseData[0].values.forEach((val) => { ans.push(val[0]); });
  return ans;
};

const getValueSeries = (responseData) => {
  const ans = [];
  responseData.forEach((val) => {
    const dataSeries = [];
    val.values.forEach((dataval) => { dataSeries.push(Number.parseInt(dataval[1], 10)); });
    ans.push({
      type: 'line',
      data: dataSeries,
    });
  });
  return ans;
};

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
          data: getTimeSeries(res),
          axisLabel: {
            formatter(value) {
              return dayjs.unix(value).format('HH:mm');
            },
            interval: 9, // 10
          },
        },
        yAxis: {},
        series: getValueSeries(res),
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
