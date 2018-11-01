/*
* author: mamingyang@baofeng.com
* date: 2018/10/25
*/

import Vue from 'vue';
import vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';

Vue.use(vuex);

const state = {

};

const store = new vuex.Store({
  state,
  actions,
  mutations,
});

export default store;
