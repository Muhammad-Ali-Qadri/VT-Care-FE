import { Appointment } from '@/types';
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
            return state.appointment;
        }
    }
}

export default AppointmentModule;

