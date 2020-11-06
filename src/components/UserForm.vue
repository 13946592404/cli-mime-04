<template>
  <div class="m-10">
    <h2 class="text-xl mb-4">Profile</h2>

    <dao-form>
      <dao-form-item label="Username">
        <dao-input placeholder="name" v-model="user.name" @input="userOnChange"/>
      </dao-form-item>

      <!-- gender -->
      <dao-form-item label="Gender">
        <dao-radio-group>
          <dao-radio
            name="sex"
            v-for="item in GENDERS"
            :key="item"
            :value="item"
            :label="item"
            v-model="user.gender"
            @change="userOnChange"
          >
            {{ item }}
          </dao-radio>
        </dao-radio-group>
      </dao-form-item>

      <!-- career -->
      <dao-form-item label="Career">
        <dao-select v-model="user.career" @change="userOnChange">
          <dao-option
            size="sm"
            v-for="item in CAREERS"
            :key="item"
            :value="item"
            :label="item"
          />
        </dao-select>
      </dao-form-item>
    </dao-form>

    <div class="mt-4 flex justify-end">
      <dao-button class="mr-2">Cancel</dao-button>
      <dao-button color="blue">Confirm</dao-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userForm',

  // props: [
  //   'value',
  // ],

  data() {
    const GENDERS = ['Female', 'Male'];
    const CAREERS = ['Student', 'Worker', 'Others...'];
    return {
      // constants
      GENDERS,
      CAREERS,
      user: {
        name: 'name',
        gender: GENDERS[0],
        career: CAREERS[0],
      },
    };
  },

  methods: {
    userOnChange() {
      this.$emit('input', this.user);
    },
  },

  created() {
    this.userOnChange();
  },
};
</script>
