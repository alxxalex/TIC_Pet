import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
    isAuthenticated: state.isAuthenticated,
    userRole: state.userRole
  })
})

const store = createStore({
  state: {
    userRole: null,  
    isAuthenticated: false
  },
  mutations: {
    setAuthState(state,isAuthenticated){
      state.isAuthenticated = isAuthenticated;
    },
    setUserRole(state, role) {
      state.userRole = role;
    },
    clearAuthState(state){
      state.isAuthenticated = false;
    }
  },
  getters: {
    getUserRole(state) {
      return state.userRole;
    },
    isAuthenticated: (state) => state.isAuthenticated
  },
  plugins: [vuexLocal.plugin]
});

export default store;
