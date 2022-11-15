import { Provider } from "@/types";

const portFrom = {
    "http:": ":8080",
    "https:": ":8443",
};
const port = location.port === "8081" ? "8080" : location.port

const apiUrl =
    location.protocol +
    "//" +
    location.hostname +
    ":8080/"+
    "VTCareService";

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
}