<template>
  <div class="m-10">
    <!-- title -->
    <h2 class="text-xl mb-4 ml-48" v-text="TEXT.profile"></h2>
    <ValidationObserver v-slot="vs">
    <div class="flex flex-row">
      <!-- form field -->
      <dao-form class="w-2/5">
        <!-- name -->
        <dao-form-item :label="TEXT.userName">
          <ValidationProvider rules="userNameValidation" v-slot="{ errors }">
          <dao-input
          :placeholder="TEXT.userNameDefault"
          v-model="user.name"
          @input="userOnChange"/>
          <span class="ml-8">{{errors[0]}}</span>
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
          <ValidationProvider rules="emailValidation" v-slot="{ errors }">
          <dao-input
          :placeholder="TEXT.emailDefault"
          v-model="user.email"
          @input="userOnChange"
          name="email"/>
          <span class="ml-8">{{errors[0]}}</span>
          </ValidationProvider>
        </dao-form-item>
      </dao-form>

      <!-- codemirror -->
      <codemirror
        class="ml-8 w-1/5 h-1"
        ref="mycode"
        :value="mirror.curCode"
        :options="mirror.cmOptions"/>
    </div>

    <!-- form information addition -->
    <div class="ml-40">
      <!-- button -->
      <div class="mt-8">
        <dao-button class="mr-2" v-text="TEXT.buttonCancel"/>
        <dao-button color="blue"
        v-text="TEXT.buttonConfirm"
        :disabled="vs.invalid"/>
      </div>

      <!-- text - change time -->
      <div class="mt-4">
        <p v-text="TEXT.tipsText"/>
        <p v-text="changeTime"/>
      </div>
    </div>
    </ValidationObserver>
  </div>
</template>

<script>
import dayjs from 'dayjs';

import { codeMirror } from 'vue-codemirror';
import 'codemirror/theme/ambiance.css';
import 'codemirror/mode/javascript/javascript';

console.log(codeMirror);

export default {
  name: 'userForm',

  data() {
    const TEXT = this.$i18n.t('UserFormText');

    return {
      // constants
      TEXT,

      // user,
      user: {
        name: '',
        gender: TEXT.genderList[0],
        career: TEXT.careerList[0],
        email: '',
      },

      changeTime: null,

      mirror: {
        curCode: '',
        cmOptions: {
          mode: 'text/javascript',
          theme: 'ambiance',
          readOnly: true,
        },
      },
    };
  },

  mounted() {
    this.userOnChange(); // init
  },

  methods: {
    userOnChange() {
      // two direction binding
      this.$emit('input', this.user); // App.vue component

      // set change time
      this.changeTime = dayjs().format('YYYY-MM-DD dddd HH:mm:ss'); // update view
      localStorage.changeTime = this.changeTime; // set time to localStorage

      // update codemirror
      // deliver value between data and data (mounted or methods)
      this.mirror.curCode = `
  User: {
  ${JSON.stringify(this.user).replace(/,/g, ',\n  ').replace(/[{}]/g, '')}
  }`; // output format
    },
  },
};
</script>
