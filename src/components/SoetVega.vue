<template>
  <div id="vis" />
</template>

<script>
import embed from 'vega-embed';
import soetResponse from '../plugins/soetResponse';

const spec = {
  data: {
    values: soetResponse.arrays,
  },
  mark: {
    type: 'line',
    // point: true,
  },
  encoding: {
    x: {
      field: 'time',
      type: 'nominal',
      axis: {
        labelOverlap: 'greedy',
        labelSeparation: 70, // 10 mins - dynamic
      },
    },
    y: {
      field: 'value',
      type: 'quantitative',
    },
    color: {
      field: 'symbol',
      type: 'nominal',
    },
  },
  width: 500,
  height: 200,
};

export default {
  data() {
    return {
      spec,
    };
  },

  methods: {
    onVision(dom) {
      embed(dom, this.spec);
    },
  },

  beforeMount() {
    this.onVision('#vis');
  },
};
</script>
