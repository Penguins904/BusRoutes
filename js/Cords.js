class Cords {
    constructor(lat, lon) {
        this.lat = lat;
        this.lon = lon;
    }
    getLatAndLon() {
        return [this.lat, this.lon];
    }
    distanceFrom(cords) {
        const lat = cords.lat;
        const lon = cords.lon;
        const R = 6378.137; // Radius of earth in KM
        let dLat = lat * Math.PI / 180 - this.lat * Math.PI / 180;
        let dLon = lon * Math.PI / 180 - this.lon * Math.PI / 180;
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.lat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = R * c; //km
        return d * 1000 * 3.28084; // feet
    }
}
