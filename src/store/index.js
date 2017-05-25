/**
 * Created by wanrenya on 2017/2/13.
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const POST_DETAIL = "POST_DETAIL";
const DEL_POST_DETAIL = "DEL_POST_DETAIL";

const state = {
  postDetail:''
}

const mutations = {
  [POST_DETAIL](state,obj) {
    state.postDetail = obj
  },
  [DEL_POST_DETAIL](state) {
    state.postDetail = ''
  }
}

const actions = {
  [POST_DETAIL]({commit},obj){
    commit('POST_DETAIL', obj);
  },
  [DEL_POST_DETAIL]({commit}){
    commit('DEL_POST_DETAIL');
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
