<template>
  <div class="flex flex-row">
    <div id="vis" />
    <div class="m-8">
      legend的位置：
      <dao-select v-model="legendConfig.orient">
        <dao-option
          v-for="item in legendConfig.orientItems"
          :key="item.value"
          :value="item.text"
          :label="item.text"
        />
      </dao-select>
      <br>
      legend的方向：
      <dao-select v-model="legendConfig.direction">
        <dao-option
          v-for="item in legendConfig.directionItems"
          :key="item.value"
          :value="item.text"
          :label="item.text"
        />
      </dao-select>
    </div>
    <div id="view">
      <div id="viewBind"></div>
    </div>
  </div>
</template>

<script>
import embed, { vega } from 'vega-embed';
import soetResponse from '../plugins/soetResponse';

export default {
  data() {
    const legendConfig = {
      orient: null,
      direction: null,
      orientItems: [
        { value: 0, text: 'bottom' },
        { value: 1, text: 'top' },
        { value: 2, text: 'left' },
        { value: 3, text: 'right' },
        { value: 4, text: 'top-left' },
        { value: 5, text: 'top-right' },
        { value: 6, text: 'bottom-left' },
        { value: 7, text: 'bottom-right' },
      ],
      directionItems: [
        { value: 0, text: 'vertical' },
        { value: 1, text: 'horizontal' },
      ],
    };

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
                orient: null,
                direction: null,
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

    let view;

    return {
      spec, // vega-lite基于整个spec元素
      view, // tooltip选项
      legendConfig, // 关于legend配置
    };
  },

  methods: {
    // 根据spec渲染页面
    onVision() {
      embed('#vis', this.spec);
    },
    // 根据legend是否修改 重新渲染页面 用watch没ok
    onRefresh() {
      let isModify = false;
      if (this.spec.layer[0].encoding.color.legend.orient !== this.legendConfig.orient) {
        this.spec.layer[0].encoding.color.legend.orient = this.legendConfig.orient;
        isModify = true;
      }
      if (this.spec.layer[0].encoding.color.legend.direction !== this.legendConfig.direction) {
        this.spec.layer[0].encoding.color.legend.direction = this.legendConfig.direction;
        isModify = true;
      }
      if (isModify) {
        embed('#vis', this.spec);
      }
    },
  },

  created() {
    // 初始化spec和legendConfig的初始属性
    this.legendConfig.orient = this.legendConfig.orientItems[0].text;
    this.legendConfig.direction = this.legendConfig.directionItems[0].text;
    this.spec.layer[0].encoding.color.legend.orient = this.legendConfig.orient;
    this.spec.layer[0].encoding.color.legend.direction = this.legendConfig.direction;
    // 初始渲染
    this.onVision();
  },

  mounted() {
    this.view = new vega.View(vega.parse(this.spec), {
      logLevel: vega.Warn, // view logging level
      renderer: 'svg', // render type (defaults to 'canvas')
      container: '#view', // parent DOM element
      bind: '#viewBind',
      hover: true, // enable hover event processing
    });
    this.view.runAsync(); // evaluate and render the view
  },

  updated() {
    this.onRefresh(); // 更新页面，以后改掉用全局updated的方式
  },
};
</script>
