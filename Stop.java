class Stop {
    private String name;
    private int stopId;
    private int routeId;
    private double lat;
    private double lon;

    public Stop(String name, int stopId, int routeId, double lat, double lon) {
        this.name = name;
        this.stopId = stopId;
        this.routeId = routeId;
        this.lat = lat;
        this.lon = lon;
    }

    public String getName() {
        return name;
    }

    public int getStopId() {
        return stopId;
    }

    public int getRouteId() {
        return routeId;
    }

    public double getLat() {
        return lat;
    }

    public double getLon() {
        return lon;
    }

    private Time covertUnix(int unixTime) {
        
    }

    public Time getNextStopTime(bool isEstimate = true) {
        
    } 
}