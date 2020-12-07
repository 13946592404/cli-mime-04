<template>
  <div class="flex flex-col">
    <soet-vega />
    <soet-chart />
    <soet-table />
  </div>
</template>

<script>
import soetVega from '../../components/SoetVega.vue';
import soetChart from '../../components/SoetChart.vue';
import soetTable from '../../components/SoetTable.vue';

export default {
  components: {
    soetVega,
    soetChart,
    soetTable,
  },
};
</script>
