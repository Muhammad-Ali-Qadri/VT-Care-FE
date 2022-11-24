import { Provider } from "@/types";
import apiUrl from "./urlInfo";

export default {
    getProviders(): Promise<Provider[]>{
        const url = apiUrl + "/providers";
        console.log("GET from " + url);
        return fetch(url)
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

    registerProvider(providerInfo: Provider): Promise<Provider> {
        const url = apiUrl + "/providers";
        return fetch(url,{
            method: "POST",
            body: JSON.stringify(providerInfo),
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

    async getProvider(id: number): Promise<Provider> {
        const url = apiUrl + "/providers/" +id;
        const temp = await fetch(url);
            return await temp.json();
    },

    async getParameterizedProvider(genderSelected?: string, location?: string, nameQuery?:string, specialization?: string): Promise<Provider[]> {
        let querystring = "?";
        if (genderSelected !== 'undefined') {
            querystring += "gender=" + genderSelected + "&";
        }
        if (location !== 'undefined'){
            querystring += "location=" + location + "&";
        }
        if (nameQuery !== 'undefined'){
            querystring += "name=" + nameQuery + "&";
        }
        if (specialization !== 'undefined'){
            querystring += "specialization=" + specialization + "&";
        }
        if(querystring !== "?")
            querystring = querystring.substring(0, querystring.length-1);

        const url = apiUrl + "/searchproviders"+querystring;
        const temp = await fetch(url);
            return await temp.json();
    }
}