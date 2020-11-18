<template>
  <div class="m-10">
    <!-- title -->
    <h2 class="text-xl mb-4 ml-48">
      {{ $i18n.t('profile') }}
    </h2>
    <ValidationObserver v-slot="v" tag="p">
    <div class="flex flex-row">
      <!-- form field -->
      <dao-form class="w-2/5">
        <!-- name -->
        <dao-form-item :label="$i18n.t('userName')">
          <ValidationProvider rules="userNameValidation" v-slot="{ errors }">
          <dao-input
          :placeholder="$i18n.t('userNameDefault')"
          v-model="user.name"
          @input="updateUser"/>
          <p class="ml-8">{{errors[0]}}</p>
          </ValidationProvider>
        </dao-form-item>

        <!-- gender -->
        <dao-form-item :label="$i18n.t('gender')">
          <dao-radio-group>
            <dao-radio
              name="sex"
              v-for="item in $i18n.t('genderList')"
              :key="item"
              :value="item"
              :label="item"
              v-model="user.gender"
              @change="updateUser">
              {{ item }}
            </dao-radio>
          </dao-radio-group>
        </dao-form-item>

        <!-- career -->
        <dao-form-item :label="$i18n.t('career')">
          <dao-select v-model="user.career" @change="updateUser">
            <dao-option
              size="sm"
              v-for="item in $i18n.t('careerList')"
              :key="item"
              :value="item"
              :label="item"/>
          </dao-select>
        </dao-form-item>

        <!-- email -->
        <dao-form-item :label="$i18n.t('email')">
          <ValidationProvider rules="emailValidation" v-slot="{ errors }">
          <dao-input
          :placeholder="$i18n.t('emailDefault')"
          v-model="user.email"
          @input="updateUser"/>
          <p class="ml-8">{{errors[0]}}</p>
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
        <dao-button class="mr-2">
          {{ $i18n.t('buttonCancel') }}
        </dao-button>
        <dao-button color="blue"
        :disabled="v.invalid">
          {{ $i18n.t('buttonConfirm') }}
        </dao-button>
      </div>

      <!-- text - change time -->
      <div class="mt-4">
        <p>
          {{ $i18n.t('tipsText') }}
        </p>
        <p>
          {{ changeTime }}
        </p>
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
    return {
      user: {
        name: '',
        gender: this.$i18n.t('genderList')[0],
        career: this.$i18n.t('careerList')[0],
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
    this.initVuex();
    this.updateUser();
  },

  methods: {
    initVuex() {
      this.$store.state.user = this.user;
    },

    updateUser() {
      // binding
      this.$emit('input', this.user);

      // vuex
      this.updateVuex();

      // change time
      this.updateChangeTime();

      // codemirror
      this.updateCodeMirror();
    },

    updateVuex() {
      this.$store.commit('updateUser', this.user);
    },

    updateChangeTime() {
      const currentTime = dayjs().format('YYYY-MM-DD dddd HH:mm:ss');
      this.changeTime = currentTime;
      // localStorage
      localStorage.changeTime = currentTime;
    },

    updateCodeMirror() {
      this.mirror.curCode = `User: ${JSON.stringify(this.user, null, 2)}`;
    },
  },
};
</script>
