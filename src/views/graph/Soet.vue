<template>
  <div>
    <soet-chart />
    <soet-table />
  </div>
</template>

<script>
import soetChart from '../../components/SoetChart.vue';
import soetTable from '../../components/SoetTable.vue';

export default {
  components: {
    soetChart,
    soetTable,
  },
};
</script>
