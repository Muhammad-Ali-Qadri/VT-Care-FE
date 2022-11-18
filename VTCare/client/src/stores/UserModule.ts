import provider from "@/services/provider";
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
        async setUserObj(context, user) { // TODO: call patient if user type is patient
            const userdata = await provider.getProvider(user);
            context.commit("SET_USER_OBJ", userdata);
        },
        setUserType(context, usertype) {
            context.commit("SET_USER_TYPE", usertype);
        },
        logout(context) {
            context.commit("SET_USER_OBJ", null);
            context.commit("SET_USER_TYPE", null);
        }
    },
}

export default UserModule;