import Vue from 'vue'
import Vuex from 'vuex'

// import d3 json fetcher
import { json } from 'd3-fetch'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: {}
  },
  getters: {
    getData: state => {
      return state.data
    }
  },
  mutations: {
    setData (state, data) {
      state.data = data
    }
  },
  actions: {
    readData (context) {
      json('./dcmetro_subway_entrances.geojson', () => {}).then((response) => {
        context.commit('setData', response)
      })
    }
  },
  modules: {
  }
})
