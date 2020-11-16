<template>
  <div>
    <user-form v-model="user" />
  </div>
</template>

<script>
import UserForm from './components/UserForm.vue';

const makeUser = () => ({
  name: '',
  gender: '',
  career: '',
  email: '',
});

export default {
  name: 'App',

  components: {
    UserForm,
  },

  data() {
    const user = makeUser();

    return {
      user,
    };
  },
};
</script>
