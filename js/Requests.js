class Requests {
    static BASE_URL = "https://appalcart.ridesystems.net/Services/JSONPRelay.svc/";
    static API_KEY = "8882812681";
    // static async makeRequest(target, args) {
    //     let params = {...{"ApiKey": this.API_KEY}, ...args};
    //     const url = this.BASE_URL + target + "?" + new URLSearchParams(params);
    //     //console.log(url);
    //     const responce = await fetch(url);
    //     return responce.json();
    // }
    static async makeRequest(target, args) {
        let params = {...{"ApiKey": this.API_KEY}, ...args};
        const url = this.BASE_URL + target + "?" + new URLSearchParams(params);
        const responce = await fetch(url);
        return responce.json();
    }

}
