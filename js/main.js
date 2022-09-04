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

function showNotification(name) {
  buildRoute(name).then(route => {
    console.log(route);
    console.log(Notification.permission);
    const n = new Notification(route.name, {body: route});
  });
  
}

window.addEventListener("load", () => {
  if(Notification.permission === "granted") {

  } else if(Notification && Notification.permission !== "denied") {
    let notfButton = document.createElement("button");
    notfButton.appendChild(document.createTextNode("Notify Me"));
    document.body.insertBefore(notfButton, document.body.lastChild);
    notfButton.addEventListener("click", () => {
      Notification.requestPermission().then((status) => {
        console.log(status);
        const n = new Notification("test");
      });
      
    });
  }

  

  document.getElementById("button").addEventListener("click", () => {
    let name = document.getElementById("input").value;
    showNotification(name);
  });

});