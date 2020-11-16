import Vue from 'vue';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { email } from 'vee-validate/dist/rules';

import i18n from './i18n'; // use self-defined i18n.js

// Add rules
extend('emailValidation', {
  ...email, // email format
  message: i18n.t('emailError'),
});

extend('userNameValidation', {
  validate: (value) => /^[\u4e00-\u9fa5]{0,}$/.test(value), // Chinese text
  message: i18n.t('userNameError'),
});

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
