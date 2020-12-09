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
  width: 600,
  height: 200,

  encoding: {
    x: {
      field: 'time',
      type: 'nominal',
      axis: {
        labelOverlap: 'greedy',
        labelSeparation: 70, // dynamic distance
      },
    },
  },

  layer: [
    { // layer: y axis with selection 'selected'
      mark: {
        type: 'line',
      },
      encoding: {
        y: {
          field: 'value',
          type: 'quantitative',
        },
        color: {
          field: 'symbol',
          type: 'nominal',
          scale: {
            range: [
              // DIY color
              // can also use { field: 'xxx' }, corresponding origin data { xxx: 'Black'}
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
            ],
          },
          legend: {
            orient: 'bottom', // legend position
          },
        },
        opacity: {
          condition: {
            selection: 'selected',
            value: 1, // show
          },
          value: 0, // hidden
        },
      },
      selection: {
        selected: {
          // selected - show
          type: 'single',
          fields: ['symbol'],
          bind: 'legend',
        },
      },
    },
  ],
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
