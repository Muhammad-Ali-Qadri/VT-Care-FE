import apiUrl from "@/services/urlInfo";

export default {
    async getPatient(id: number) {
        const url = apiUrl + "/patients/" + id;
        const temp = await fetch(url);
        return await temp.json();
    },
}