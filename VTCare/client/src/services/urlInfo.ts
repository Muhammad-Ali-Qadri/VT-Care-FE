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

export default apiUrl