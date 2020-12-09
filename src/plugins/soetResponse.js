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
    val.values.forEach((dataval) => {
      const obj = {
        symbol: index,
        time: dayjs.unix(dataval[0]).format('HH:mm'),
        value: Number.parseInt(dataval[1], 10),
      };
      ans.push(obj);
    });
  });
  return ans;
};

export default {
  res,
  timeSeries: getTimeSeries(res),
  valueSeries: getValueSeries(res),
  arrays: getArrays(res),
};
