class Bus {

    constructor(busId, routeId, lat, lon) {
        this.busId = busId;
        this.routeId = routeId;
        this.cords = new Cords(lat, lon);
    }

    update() {
        
    }
}