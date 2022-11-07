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