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
    {
      // layer: y axis with opacity, selection
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
    {
      // layer: tooltip
      transform: [
        {
          pivot: 'symbol',
          value: 'value',
          groupby: ['time'],
        },
      ],
      mark: {
        type: 'rule',
      },
      encoding: {
        opacity: {
          condition: {
            value: 0.3,
            selection: 'hover',
          },
          value: 0,
        },
        tooltip: [
          { field: 'time', type: 'nominal' },
          { field: '0', type: 'quantitative' },
          { field: '1', type: 'quantitative' },
          { field: '2', type: 'quantitative' },
          { field: '3', type: 'quantitative' },
          { field: '4', type: 'quantitative' },
          { field: '5', type: 'quantitative' },
          { field: '6', type: 'quantitative' },
          { field: '7', type: 'quantitative' },
          { field: '8', type: 'quantitative' },
          { field: '9', type: 'quantitative' },
          { field: '10', type: 'quantitative' },
          { field: '11', type: 'quantitative' },
          { field: '12', type: 'quantitative' },
        ],
      },
      selection: {
        hover: {
          type: 'single',
          fields: ['time'],
          nearest: true,
          on: 'mouseover',
          empty: 'none',
          clear: 'mouseout',
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
