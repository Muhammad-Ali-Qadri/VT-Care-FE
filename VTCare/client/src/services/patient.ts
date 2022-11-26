import apiUrl from "@/services/urlInfo";
import {Patient, PatientVisitHistory} from "@/types";

export default {
    async getPatient(id: number) {
        const url = apiUrl + "/patients/" + id;
        const temp = await fetch(url);
        return await temp.json();
    },

    registerPatient(patientInfo: Patient): Promise<Patient> {
        const url = apiUrl + "/patients";
        return fetch(url,{
            method: "POST",
            body: JSON.stringify(patientInfo),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .catch((reason) => {
                console.log("Error fetching category data", reason);
            });
    },
    addHistory(patHist : PatientVisitHistory){
        const url = apiUrl + "/patients/addHistory";
        return fetch(url,{
            method: "POST",
            body: JSON.stringify(patHist),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .catch((reason) => {
                console.log("Error fetching category data", reason);
                return reason.json();
            });
    },

    async getHistory(patid : number):Promise<PatientVisitHistory[]>{
        const url = apiUrl + "/patients/" + patid + "/getHistory";
        const temp = await fetch(url);
        return await temp.json();
    },
}