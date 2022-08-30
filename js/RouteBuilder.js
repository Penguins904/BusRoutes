class RouteBuilder {

    constructor(name, id) {
        this.route = new Route();
        if(name) {
            this.name = name;
            this.route.setName(name);
        }

        if(id) {
            this.id = id;
            this.route.setId(id);
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
        let data = await Requests.makeRequest("GetMapVehiclePoints", {"routeId": this.id});
        let buses = [];
        for(let busObj of data) {
            console.log(data);
            buses.push(new Bus(busObj.VehicleID, this.routeId, busObj.Latitude, busObj.Longitude));
        }
        this.route.setBuses(buses);
    }

    async setStops() {
        let data = await Requests.makeRequest("GetStops", {"routeId": this.id});
        let stops = [];
        for(let stopObj of data) {
            stops.push(new Stop(stopObj.Description, this.routeId, stopObj.RouteStopID, stopObj.Latitude, stopObj.Longitude));
        }
        this.route.setStops(stops);
    }

    build() {
        return this.route;
    }
}
