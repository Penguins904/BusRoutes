let routeBuilder = new RouteBuilder("Gold");
routeBuilder.setId().then(
    Promise.all([routeBuilder.setBuses(), routeBuilder.setStops()])
);
let route = routeBuilder.build();
console.log(route)

