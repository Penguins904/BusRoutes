class RouteBuilder {

    constructor(name) {
        this.route = new Route();
        if(name) {
            this.name = name;
            this.route.setName(name);
        }
    }

    setName(name) {
        this.name = name;
        this.route.setName(name);
    }

    async setId() {
        let routes = await Requests.makeRequest("GetRoutes");
        for(let obj of routes) {
          if(obj.Description === this.name) {
            this.id = obj.RouteID;
            this.route.setId(this.id);
          }
        }
    }

    //returns promise
    async setBuses() {
        let buses = await Requests.makeRequest("GetMapVehiclePoints", {"routeId": this.id});
        this.route.setBuses(buses);
    }

    async setStops() {
        let stops = await Requests.makeRequest("GetStops", {"routeId": this.id});
        this.route.setStops(stops);
    }

    setStopsAndBuses() {

    }

    build() {
        return this.route;
    }
}
