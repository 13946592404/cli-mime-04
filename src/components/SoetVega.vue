<template>
  <div class="flex flex-col">
    <div id="vis" />
    <div class="m-8">
      legend的位置：
      <dao-select
        v-model="legendLocation">
        <dao-option
          v-for="item in legendLocationItems"
          :key="item.value"
          :value="item.text"
          :label="item.text" />
      </dao-select>
    </div>
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
            orient: 'bottom', // legend location (default)
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
        // {
        //   filter: {
        //     selection: 'selected',
        //   },
        // },
      ],
      mark: {
        type: 'rule',
        tooltip: {
          content: 'data',
        },
      },
      encoding: {
        opacity: {
          condition: {
            value: 0.3,
            selection: 'hover',
          },
          value: 0,
        },
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
    const legendLocationItems = [
      { value: 0, text: 'bottom' },
      { value: 1, text: 'top' },
      { value: 2, text: 'left' },
      { value: 3, text: 'right' },
      { value: 4, text: 'top-left' },
      { value: 5, text: 'top-right' },
      { value: 6, text: 'bottom-left' },
      { value: 7, text: 'bottom-right' },
    ];

    return {
      spec,
      legendLocationItems,
      legendLocation: legendLocationItems[0].text,
    };
  },

  methods: {
    onVision() {
      embed('#vis', this.spec);
    },
    modifyLegendLocation() {
      this.spec.layer[0].encoding.color.legend.orient = this.legendLocation;
    },
  },

  beforeMount() {
    this.onVision();
  },

  updated() {
    this.modifyLegendLocation();
    this.onVision();
  },
};
</script>
