<template>
  <div>
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
        <br />
        legend的方向：
        <dao-select v-model="legendConfig.direction">
          <dao-option
            v-for="item in legendConfig.directionItems"
            :key="item.value"
            :value="item.text"
            :label="item.text"
          />
        </dao-select>
        <br>
        max:
        <dao-switch v-model="check.max" />
        <br>
        min:
        <dao-switch v-model="check.min" />
        <br>
        avg:
        <dao-switch v-model="check.avg" />
        <br>
      </div>
    </div>
    <div>
      <table class="border" v-show="checkAll">
        <thead>
          <tr class="border">
            <th><div class="mx-16">color</div></th>
            <th><div class="mx-16">symbol</div></th>
            <th v-show="check.max"><div class="mx-16">max</div></th>
            <th v-show="check.min"><div class="mx-16">min</div></th>
            <th v-show="check.avg"><div class="mx-16">avg</div></th>
          </tr>
        </thead>
        <tbody>
          <tr class="border" v-for="item in table" :key="item.symbol">
            <th :style="{ color: item.color }">——</th>
            <th>{{ item.symbol }}</th>
            <th v-show="check.max">{{ item.max }}</th>
            <th v-show="check.min">{{ item.min }}</th>
            <th v-show="check.avg">{{ item.avg }}</th>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="view">
      <div id="viewBind"></div>
    </div>
  </div>
</template>

<script>
import embed, { vega } from 'vega-embed';
import soetResponse from '../plugins/soetResponse';

// legend相关配置和参数
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
    { value: 0, text: 'horizontal' },
    { value: 1, text: 'vertical' },
  ],
};

// vega-lite配置主JSON数据
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
            range: soetResponse.colorRange,
            // DIY color
            // can also use { field: 'xxx' }, corresponding origin data { xxx: 'Black'}
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

// switch开关组
const check = {
  max: false,
  min: false,
  avg: false,
};

export default {
  data() {
    // tooltip DOM
    let view;

    return {
      legendConfig,
      spec,
      check,
      view,
      table: soetResponse.arraysStatistic,
    };
  },

  computed: {
    checkAll() {
      return this.check.max || this.check.min || this.check.avg;
    },
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
