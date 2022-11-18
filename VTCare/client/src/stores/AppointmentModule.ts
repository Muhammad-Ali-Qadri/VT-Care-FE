import { Module } from 'vuex';

const AppointmentModule: Module<any, any> = {
    namespaced: true,
    state: {
        appointment: null
    },
    mutations: {
        SET_APPOINTMENT(state, appt) {
            state.appointment = appt;
        }
    },
    actions: {
        setAppointment(context, payload) {
            context.commit("SET_APPOINTMENT", payload);
        },
    },
    getters: {
        getAppointment(state){
            return JSON.parse(JSON.stringify(state.appointment)); //return copy as we cannot return state
        }
    }
}

export default AppointmentModule;

