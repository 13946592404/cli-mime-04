<template>
  <div class="m-10">
    <!-- title -->
    <h2 class="text-xl mb-4" v-text="TEXT.profile"></h2>
    <dao-form>
      <!-- name -->
      <dao-form-item :label="TEXT.userName">
        <ValidationProvider rules="userNameValidation" v-slot="v">
        <dao-input
        :placeholder="TEXT.userNameDefault"
        v-model="user.name"
        @input="userOnChange"/>
        <span class="ml-8">{{v.errors[0]}}</span>
        </ValidationProvider>
      </dao-form-item>

      <!-- gender -->
      <dao-form-item :label="TEXT.gender">
        <dao-radio-group>
          <dao-radio
            name="sex"
            v-for="item in TEXT.genderList"
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
      <dao-form-item :label="TEXT.career">
        <dao-select v-model="user.career" @change="userOnChange">
          <dao-option
            size="sm"
            v-for="item in TEXT.careerList"
            :key="item"
            :value="item"
            :label="item"
          />
        </dao-select>
      </dao-form-item>

      <!-- email -->
      <dao-form-item :label="TEXT.email">
        <ValidationProvider rules="emailValidation" v-slot="v">
        <dao-input
        :placeholder="TEXT.emailDefault"
        v-model="user.email"
        @input="userOnChange"
        name="email"/>
        <span class="ml-8">{{v.errors[0]}}</span>
        </ValidationProvider>
      </dao-form-item>
    </dao-form>

    <div class="mt-4 flex justify-end">
      <dao-button class="mr-2" v-text="TEXT.buttonCancel"></dao-button>
      <dao-button color="blue" v-text="TEXT.buttonConfirm"></dao-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'userForm',

  data() {
    const TEXT = this.$i18n.t('UserFormText');

    return {
      // constants
      TEXT,

      user: {
        name: '',
        gender: TEXT.genderList[0],
        career: TEXT.careerList[0],
        email: '',
      },
    };
  },

  created() {
    this.userOnChange();
  },

  methods: {
    userOnChange() {
      this.$emit('input', this.user);
    },
  },
};
</script>
