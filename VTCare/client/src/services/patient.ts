import apiUrl from "@/services/urlInfo";
import { PatientHistory } from "@/types";

export default {
    async getPatient(id: number) {
        const url = apiUrl + "/patients/" + id;
        const temp = await fetch(url);
        return await temp.json();
    },
    addHistory(patHist : PatientHistory){
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
}