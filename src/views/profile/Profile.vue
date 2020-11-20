<template>
  <user-form v-model="user" />
</template>

<script>
import userForm from '../../components/UserForm.vue';

const makeUser = () => ({});

export default {
  components: {
    userForm,
  },

  data() {
    const user = makeUser();

    return {
      user,
    };
  },
};
</script>
