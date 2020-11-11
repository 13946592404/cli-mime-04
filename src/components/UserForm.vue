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
import VueI18n from 'vue-i18n';

const EN = require('../locales/en-US/ns/UserFormText.json');
const CH = require('../locales/zh-CN/ns/UserFormText.json');

export default {
  name: 'userForm',

  data() {
    const i18n = new VueI18n({
      locale: this.$i18n.locale,
      messages: {
        en: {
          texts: EN,
        },
        ch: {
          texts: CH,
        },
      },
    });

    const TEXTS = i18n.t('texts');

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
