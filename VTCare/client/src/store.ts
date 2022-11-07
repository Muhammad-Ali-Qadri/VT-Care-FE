import { createStore } from 'vuex'
import provider from "@/services/provider";
const userObjKey = "USER_OBJ";
const userTypeKey = "USER_TYPE"

const store = createStore({
    state: {
        userObj: null,
        userType:null
    },
    mutations: {
        SET_USER_OBJ(state, user){
            state.userObj = user;
        },
        SET_USER_TYPE(state, type) {
            state.userType = type;
        }
    },
    actions: {
        async setUserObj(context, user) { // todo call patient if user type is patient
            const userdata = await provider.getProvider(user);
            localStorage.setItem(userObjKey, JSON.stringify(userdata) );
            context.commit("SET_USER_OBJ", userdata);
        },
        setUserType(context, usertype) {
            localStorage.setItem(userTypeKey, JSON.stringify(usertype) );
            context.commit("SET_USER_TYPE", usertype);
        },
        reloadStore(context){
            const user = localStorage.getItem(userObjKey);
            const usertype = localStorage.getItem(userTypeKey);
            if(user !== null && usertype !== null) {
                context.commit("SET_USER_OBJ", JSON.parse(user) );
                context.commit("SET_USER_TYPE", JSON.parse(usertype) );
            }
        },
        clearStore(context){
            localStorage.clear();
            context.commit("SET_USER_OBJ", null );
            context.commit("SET_USER_TYPE", null );
        }
    },

})

export default store;

