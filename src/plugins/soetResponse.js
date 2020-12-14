import dayjs from 'dayjs';
import soetResponse from '../data/soet-response.json';

const res = soetResponse.data.result;

// Echarts使用：时间序列
const getTimeSeries = (responseData) => {
  const ans = [];
  responseData[0].values.forEach((val) => { ans.push(val[0]); });
  return ans;
};

// Echarts使用：值序列
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

// vega-lite使用：自定义颜色范围
const colorRange = [
  'Black',
  'Blue',
  'BlueViolet',
  'Brown',
  'Chocolate',
  'Crimson',
  'DarkGreen',
  'DarkSlateBlue',
  'Gold',
  'HotPink',
  'LightSeaGreen',
  'Olive',
  'PaleVioletRed',
];

// vega-lite使用：获取res的(legend time value)数组
const getArrays = (responseData) => {
  const ans = [];
  responseData.forEach((val, index) => {
    val.values.forEach((dataval, i) => {
      const obj = {
        symbol: index,
        time: dayjs.unix(dataval[0]).format('HH:mm'),
        value: Number.parseInt(dataval[1], 10) + i, // 把数据改成变化的
      };
      ans.push(obj);
    });
  });
  return ans;
};

// vega-lite使用：获取res的(color symbol max min avg)统计版数据
const getArraysStatistic = (responseData) => {
  const ans = [];
  responseData.forEach((val, index) => {
    ans.push({
      color: colorRange[index],
      symbol: index,
      max: -Number.MAX_VALUE,
      min: Number.MAX_VALUE,
      avg: 0,
    });
    let sum = 0;
    val.values.forEach((dataval, i) => {
      const value = Number.parseInt(dataval[1], 10) + i; // 把数据改成变化的
      ans[index].max = Math.max(ans[index].max, value);
      ans[index].min = Math.min(ans[index].min, value);
      sum += value;
    });
    ans[index].avg = sum / val.values.length;
  });
  return ans;
};

export default {
  res,
  timeSeries: getTimeSeries(res),
  valueSeries: getValueSeries(res),
  arrays: getArrays(res),
  arraysStatistic: getArraysStatistic(res),
  colorRange,
};
