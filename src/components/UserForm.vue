<template>
  <div class="m-10">
    <!-- title -->
    <h2 class="text-xl mb-4" v-text="TEXT.profile"></h2>
    <ValidationObserver v-slot="vs">
    <dao-form>
      <!-- name -->
      <dao-form-item :label="TEXT.userName">
        <ValidationProvider rules="userNameValidation" v-slot="{ errors }" userNameRight="true">
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
        <ValidationProvider rules="emailValidation" v-slot="{ errors }" emailRight="true">
        <dao-input
        :placeholder="TEXT.emailDefault"
        v-model="user.email"
        @input="userOnChange"
        name="email"/>
        <span class="ml-8">{{errors[0]}}</span>
        </ValidationProvider>
      </dao-form-item>
    </dao-form>

    <h3 class="mt-4">上次更新时间：{{ changeTime }}</h3>

    <div class="mt-4 flex justify-end">
      <dao-button class="mr-2" v-text="TEXT.buttonCancel"/>
      <dao-button color="blue"
      v-text="TEXT.buttonConfirm"
      :disabled="vs.invalid"/>
    </div>
    </ValidationObserver>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'userForm',

  props: [
    'userNameRight',
    'emailRight',
  ],

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

      changeTime: null,
    };
  },

  created() {
    this.userOnChange();
  },

  methods: {
    userOnChange() {
      this.$emit('input', this.user); // two direction - bind
      this.changeTime = dayjs().format('YYYY-MM-DD dddd HH:mm:ss');
    },
  },
};
</script>
