class Bus {
    private int busId;
    private int routeId;
    private double lat;
    private double lon;

    public Bus(int busId, int routeId, double lat, double lon) {
        this.busId = busId;
        this.routeId = routeId;
        this.lat = lat;
        this.lon = lon;
    }

    public int getBusId() {
        return busId;
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

    public void updateLocation() {
        
    }


}