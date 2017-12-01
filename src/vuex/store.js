import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        pageBoolean:false
    },
    mutations:{
        increment (state){
            state.pageBoolean = !state.pageBoolean
        }
    }
})

