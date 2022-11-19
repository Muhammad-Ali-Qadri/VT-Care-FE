import { Appointment } from "@/types";
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
    }
}