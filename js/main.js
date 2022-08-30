async function getAllRoutes() {
  routePromises = [];
  data = await Requests.makeRequest("GetRoutes");
  for(let route in data) {
    routePromises.push(buildRoute(route.Description, route.RouteID));
  }
  routes = await Promise.all(routePromises);
  console.log(routes);
  return routes
}

async function buildRoute(name, id) {
  let routeBuilder = new RouteBuilder(name, id);
  if(id === undefined) {
    await routeBuilder.setId();
  }
  busPromise = routeBuilder.setBuses();
  stopPromise = routeBuilder.setStops();
  await Promise.all([busPromise, stopPromise]);
  return routeBuilder.build();
}
