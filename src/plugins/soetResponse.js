import dayjs from 'dayjs';
import soetResponse from '../data/soet-response.json';

const res = soetResponse.data.result;

const getTimeSeries = (responseData) => {
  const ans = [];
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

// 自定义颜色范围
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

// 获取res的统计版数据，获得每一项的max min avg
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
