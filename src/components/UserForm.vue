<template>
  <div class="userForm text-left">
    <form>
      <ul class="checkList">
        <li>
          <label for="username">
            <h4>Username:</h4>
          </label>
          <dao-input id="username" placeholder="name" v-model="user.name"/>
        </li>
        <li>
          <label>
            <h4>Gender:</h4>
          </label>
          <dao-radio-group>
            <dao-radio name="sex"
              v-for="item in option.radioGroup"
              v-bind:key="item"
              v-bind:value="item"
              v-bind:label="item"
              v-model="user.gender">
              {{item}}
            </dao-radio>
          </dao-radio-group>
        </li>
        <li>
          <label>
            <h4>Career</h4>
          </label>
          <dao-select
            v-model="user.career">
            <dao-option size="sm"
              v-for="item in option.selectGroup"
              v-bind:key="item"
              v-bind:value="item"
              v-bind:label="item">
            </dao-option>
          </dao-select>
        </li>
      </ul>
      <div class="buttonGroup">
        <button class="btn">Cancel</button>
        <button class="btn confirm">Confirm</button>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue';
import daoStyle from 'dao-style-vue';
import 'dao-style-vue/dist/dao-style.css';

Vue.use(daoStyle);

export default {
  name: 'userForm',
  data() {
    return {
      user: {
        name: 'name',
        gender: 'Female',
        career: 'Student',
      },
      option: {
        radioGroup: ['Female', 'Male'],
        selectGroup: ['Student', 'Worker', 'Others...'],
      },
    };
  },
  props: {
    // value: String
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  $black: #000;
  $white: #fff;
  $turtle: #7354e2;
  .userForm{
    @apply flex-1;
    position: relative;
    border: 1px solid $black;
    margin: 20px;
    padding: 10px 20px;
    width: 325px;
    height: 440px;
  }
  .checkList{
    list-style: none;
    li{
    margin: 20px auto;
    }
    h4{
      font-weight: bold;
    }
  }
  .buttonGroup{
    position: absolute;
    right: 20px;
    bottom: 20px;
    .btn{
      margin: 10px;
      border: 1px solid $black;
      width: 70px;
      height: 32px;
      color: $turtle;
    }
    .confirm{
        border: 0px;
        background-color: $turtle;
        color: $white;
    }
  }
</style>
