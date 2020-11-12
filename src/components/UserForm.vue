<template>
  <div class="m-10">
    <!-- title -->
    <h2 class="text-xl mb-4" v-text="TEXTS.profile"></h2>
    <dao-form>
      <!-- name -->
      <dao-form-item :label="TEXTS.userName">
        <dao-input
        :placeholder="user.name"
        v-model="user.name"
        @input="userOnChange"/>
      </dao-form-item>

      <!-- gender -->
      <dao-form-item :label="TEXTS.gender">
        <dao-radio-group>
          <dao-radio
            name="sex"
            v-for="item in TEXTS.genderList"
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
      <dao-form-item :label="TEXTS.career">
        <dao-select v-model="user.career" @change="userOnChange">
          <dao-option
            size="sm"
            v-for="item in TEXTS.careerList"
            :key="item"
            :value="item"
            :label="item"
          />
        </dao-select>
      </dao-form-item>
    </dao-form>

    <div class="mt-4 flex justify-end">
      <dao-button class="mr-2" v-text="TEXTS.buttonCancel"></dao-button>
      <dao-button color="blue" v-text="TEXTS.buttonConfirm"></dao-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'userForm',

  data() {
    const TEXTS = this.$i18n.t('texts');

    return {
      // constants
      TEXTS,

      user: {
        name: TEXTS.userNameDefault,
        gender: TEXTS.genderList[0],
        career: TEXTS.careerList[0],
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
