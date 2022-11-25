import { Appointment, AppointmentStatus } from "@/types";
import apiUrl from "./urlInfo";
import moment from 'moment';

export default {
    async scheduleAppointment(appt: Appointment): Promise<Appointment> {
        const url = apiUrl + "/scheduleappointment";
        appt.date = moment(appt.date).format("MM-DD-YYYY");
        appt.time = moment(appt.time, "hh:mm A").format("HH:mm");

        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(appt),
            headers: {
                "Content-Type": "application/json",
            },
        });

        return await res.json();
    },

    async cancelAppointment(apptId: number) {
        const url = apiUrl + "/appointments/" + apptId + "/cancel";

        const res = await fetch(url, {
            method: "PATCH"
        });
    },
    
    async rescheduleAppointment(appt: Appointment) {
        const url = apiUrl + "/appointments/" + appt.id + "/reschedule";
        appt.date = moment(appt.date).format("MM-DD-YYYY");
        appt.time = moment(appt.time, "hh:mm A").format("HH:mm");

        const res = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(appt),
            headers: {
                "Content-Type": "application/json",
            },
        });
    },

    async updateAppointmentStatus(apptId: number, apptStatus: AppointmentStatus) {
        const url = apiUrl + "/appointments/" + apptId + "/updatestatus";

        const res = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(apptStatus),
            headers: {
                "Content-Type": "application/json",
            },
        });
    },

    async getAppointments(id: number, userType: string): Promise<Appointment[]> {
        const path = (userType === "Provider") ? "providers" : "patients";
        const url = apiUrl + "/patients/" + id + "/appointments";
        const res = await fetch(url);
        return await res.json();
    }
}