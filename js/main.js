async function getAllRoutes() {
  routePromises = [];
  data = await Requests.makeRequest("GetRoutes");
  console.log(data)
  for(let route in data) {
    routePromises.push(buildRoute(route.Description));
  }
  routes = await Promise.all(routePromises);
  console.log(routes);
  return routes
}

async function buildRoute(name) {
  let routeBuilder = new RouteBuilder(name);
  await routeBuilder.setId();
  busPromise = routeBuilder.setBuses();
  stopPromise = routeBuilder.setStops();
  await Promise.all([busPromise, stopPromise]);
  return routeBuilder.build();
}
