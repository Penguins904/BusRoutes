class Requests {
    static BASE_URL = "https://appalcart.ridesystems.net/Services/JSONPRelay.svc/";
    static API_KEY = "8882812681";
    static async makeRequest(target, args) {
        let params = {...{"ApiKey": this.API_KEY}, ...args};
        const responce = await fetch(this.BASE_URL + target + "?" + new URLSearchParams(params));
        return responce.json();
    }
}