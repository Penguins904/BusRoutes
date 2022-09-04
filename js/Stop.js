class Stop {
    constructor(name, routeId, stopId, lat, lon) {
        this.name = name;
        this.routeId = routeId;
        this.stopId = stopId;
        this.cords = new Cords(lat, lon);
    }

    get lat() {
        return this.cords.lat;
    }

    get lon() {
        return this.cords.lon;
    }

    getNextStopTime(isEstimate = true){
        timeType = "EstimateTime" ? is_estimate : "ScheduledTime";
        data = Requests.makeRequest("GetStopArrivalTimes", {"routestopIds": this.stopId})[0];
        times = data.Times.map(timeObj => parseInt(timeObj[timeType].split("(")[1].split(")")[0])); //converts /Date(1234)/ to 1234
        return new Date(Math.min(...times));
    }

    toString() {
        return `${this.name} Stop, Id is ${this.stopId}, belongs to Route ${this.routeId} Cords are ${this.cords}`;
    }
}