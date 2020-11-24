<template>
  <table class="m-2 border text-center">
    <thead>
      <tr class="border">
        <th class="p-2">index</th>
        <th class="p-2"
          v-for="(item, index) in res[0].metric"
          :key="index"
          v-show="index != '__name__'">
          {{ index }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
      v-for="(item, index) in res"
      :key="index">
        <td class="p-2">
          {{ index }}
        </td>
        <td class="p-2"
          v-for="(value, keys) in item.metric"
          :key="keys"
          v-show="keys != '__name__'">
          {{ value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import soetResponse from '../plugins/soetResponse';

export default {
  data() {
    return {
      res: soetResponse.res,
    };
  },
};
</script>
