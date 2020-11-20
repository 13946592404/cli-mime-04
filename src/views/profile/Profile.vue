<template>
  <user-form v-model="user" />
</template>

<script>
import getCookie from '../../plugins/getCookie';
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

  created() {
    // cookies have field: auth
    if (!getCookie.hasAuth()) {
      this.$router.push('404');
    }
  },
};
</script>
