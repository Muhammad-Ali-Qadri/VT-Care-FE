import { createStore } from 'vuex'
import AppointmentModule from './AppointmentModule';
import UserModule from './UserModule';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
    modules:{
        UserModule,
        AppointmentModule
    },
    
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })]
})

export default store;

