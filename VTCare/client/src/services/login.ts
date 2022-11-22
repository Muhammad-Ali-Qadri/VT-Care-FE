import apiUrl from "./urlInfo";

export default {
    loginRequest(loginInfo: { password: string, email: string, isProviderLogin: boolean }) {
        const url = apiUrl + "/login";
        console.log("POST from " + url);
        return fetch(url,{
            method: "POST",
            body: JSON.stringify(loginInfo),
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
}