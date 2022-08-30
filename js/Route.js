class Route {
    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setBuses(buses) {
        this.buses = buses;
    }

    getBuses() {
        return this.buses;
    }

    setStops(stops) {
        this.stops = stops;
    }

    getStops() {
        return this.stops;
    }

    getStop(name) {
        this.stops.forEach(stop => {
            if(stop.getName() === name) {
                return stop;
            }
        });
    }
}