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

    toString() {
        let output = `${this.name} route: RouteId = ${this.id},\n`;
        output += "Buses:\n";
        this.buses.forEach(bus => {
            output +=  "\t" + bus + "\n";
        });
        output += "Stops:\n";
        this.stops.forEach(stop => {
            output += "\t" + stop + "\n";
        });
        return output;
    }
}