<template>
  <user-form v-model="user" />
</template>

<script>
import Cookie from 'js-cookie';
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
    if (!Cookie.get('auth')) {
      this.$router.push('about');
    }
  },
};
</script>
