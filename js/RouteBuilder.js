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
        routes.forEach(obj => {
            if(obj.Description === this.name) {
                this.id = parseInt(obj.RouteID);
                this.route.setId(this.id);
            }
        });
    }

    async setBuses() {
        let buses = await Requests.makeRequest("GetMapVehiclePoints", {"routeId": this.id});
        this.route.setBuses(buses);
    }

    async setStops() {
        let stops = await Requests.makeRequest("GetStops", {"routeId": this.routeId});
        this.route.setStops(stops);
    }

    build() {
        return this.route;
    }
}