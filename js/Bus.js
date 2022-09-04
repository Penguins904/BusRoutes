class Bus {

    constructor(busId, routeId, lat, lon) {
        this.busId = busId;
        this.routeId = routeId;
        this.cords = new Cords(lat, lon);
    }

    async update() {

    }

    toString() {
        return `{Bus number is ${this.busId}, belongs to route ${this.routeId}, cordinates are ${this.cords}`;
    }
}