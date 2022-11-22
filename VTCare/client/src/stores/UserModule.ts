import provider from "@/services/provider";
import patient from "@/services/patient";
import { Module } from 'vuex';

const UserModule: Module<any, any> = {
    namespaced: true,
    state: {
        userObj: null,
        userType: null
    },
    mutations: {
        SET_USER_OBJ(state, user) {
            state.userObj = user;
        },
        SET_USER_TYPE(state, type) {
            state.userType = type;
        }
    },
    actions: {
        async setUserObj(context, user) {
            // TODO: call patient if user type is patient
            if(context.state.userType==='Patient') {
                const userdata = await patient.getPatient(user);
                context.commit("SET_USER_OBJ", userdata);
            }
            else {
                const userdata = await provider.getProvider(user);
                context.commit("SET_USER_OBJ", userdata);
            }


        },
        setUserType(context, usertype) {
            context.commit("SET_USER_TYPE", usertype);
        },
        logout(context) {
            context.commit("SET_USER_OBJ", null);
            context.commit("SET_USER_TYPE", null);
        },
    },

    getters: {
        isUserLoggedIn(state) {
            return state.userObj != null;
        },
        getUserType(state) {
            return state.userType;
        },
        getUser(state){
            return JSON.parse(JSON.stringify(state.userObj)); //return copy as we cannot return state
        }
    }
}

export default UserModule;