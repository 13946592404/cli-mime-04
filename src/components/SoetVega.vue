<template>
  <div>
    <div id="vis" />
  </div>
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
  },
  encoding: {
    width: 300,
    height: 200,
    x: {
      field: 'time',
      type: 'nominal',
      axis: {
        labelOverlap: 'greedy',
        labelSeparation: 70, // dynamic
      },
    },
    y: {
      field: 'value',
      type: 'quantitative',
    },
    color: {
      field: 'symbol',
      type: 'nominal',
      scale: {
        range: [
          'blue',
          'green',
          'red',
          'yellow',
          'black',
          'violet',
          'orange',
          'purple',
          'black',
          'pink',
          'sliver',
          'golden',
          'bronze',
        ],
      },
    },
  },
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
