class Stop {
    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setStopId(id) {
        this.stopId = id;
    }

    getStopId() {
        return this.stopId;
    }

    setRouteId(id) {
        this.routeId = id;
    }

    getRouteId() {
        return this.routeId;
    }

    setCords(lat, lon) {
        this.cords = new Cords(lat, lon);
    }

    getNextStopTime(isEstimate = true){
        timeType = "EstimateTime" ? is_estimate : "ScheduledTime";
        data = Requests.makeRequest("GetStopArrivalTimes", {"routestopIds": this.stopId})[0];
        times = data.Times.map(timeObj => parseInt(timeObj[timeType].split("(")[1].split(")")[0])); //converts /Date(1234)/ to 1234
        return new Date(Math.min(...times));
    }
}