class Bus {
    setBusId(id) {
        this.busId = id;
    }

    getBusId() {
        return this.busId;
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
}