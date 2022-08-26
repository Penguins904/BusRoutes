from dataclasses import dataclass
from typing import List

import math
from datetime import datetime, timedelta
import requests
import asyncio

BASE_URL = "https://appalcart.ridesystems.net/Services/JSONPRelay.svc/"
API_KEY = "8882812681"

@dataclass
class Stop:
    name: str
    stop_id: int
    route_id: int
    lat: float
    lon: float

    def __convert_unix_timestr(self, time_str: str) -> datetime:
        unix_time = int(time_str.split("(")[1].split(")")[0])
        return datetime.fromtimestamp(unix_time / 1000)

    def get_next_stop_time(self, is_estimate: bool = True) -> datetime:
        time_type = "EstimateTime" if is_estimate else "ScheduledTime"
        data = make_request("GetStopArrivalTimes", {"routestopIds": self.stop_id})[0]
        times = data["Times"]
        return min([self.__convert_unix_timestr(time[time_type]) for time in times])

@dataclass
class Bus:
    bus_id: int
    route_id: int
    lat: float
    lon: float

    def __measure(self, lat1: float, lon1: float, lat2: float, lon2: float):
        """ Returns the distance between two points im meters"""
        RADIUS = 6378.137
        dLat = lat2 * math.pi / 180 - lat1 * math.pi / 180
        dLon = lon2 * math.pi / 180 - lon1 * math.pi / 180
        a = math.sin(dLat/2) * math.sin(dLat/2) + math.cos(lat1 * math.pi / 180) * math.cos(lat2 * math.pi / 180) * math.sin(dLon/2) * math.sin(dLon/2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
        d = RADIUS * c
        return d * 1000

    def get_distance(self, lat: float, lon: float) -> float:
        return self.__measure(self.lat, self.lon, lat, lon)


@dataclass
class Route:
    name: int
    id: int
    stops: List[Stop]
    buses: List[Bus]

    def get_stop(self, name: str):
        for stop in self.stops:
            if name == stop.name:
                return stop

def make_request(target: str, payload: dict = {}, method: str = "GET"):
    payload["ApiKey"] = API_KEY

    while True:
        try:
            res = requests.request(method, BASE_URL + target, params=payload)
            break
        except requests.exceptions.ConnectionError:
            print(f"Request to {target} failed...  Retrying")
    return res.json()

def get_routeid(name: str) -> int:
    for route_dict in make_request("GetRoutes"):
        if route_dict["Description"] == name:
            return int(route_dict["RouteID"])

async def get_stops(route_id: int) -> List[Stop]:
    stops = []
    for stop in make_request("GetStops", {"routeId": route_id}):
        stops.append(Stop(stop["Description"], int(stop["RouteStopID"]), route_id, stop["Latitude"], stop["Longitude"]))

    return stops

async def get_buses(route_id) -> List[Bus]:
    buses = []
    for bus in make_request("GetMapVehiclePoints", {"routeId": route_id}):
        buses.append(Bus(bus["VehicleID"], route_id, bus["Latitude"], bus["Longitude"]))
    return buses

async def get_route(name: str) -> Route:
    route_id = get_routeid(name)
    #stops = get_stops(route_id)
    stop_task = asyncio.create_task(get_stops(route_id))
    #buses = get_bus(route_id)
    bus_task = asyncio.create_task(get_bus(route_id))
    stops = await stop_task
    buses = await bus_task
    return Route(name, route_id, stops, buses)

route = asyncio.run(get_route("Green"))

stop_name = "Dan'l Boone Inn"
stop = route.get_stop(stop_name)
time_until = stop.get_next_stop_time() - datetime.now()
print(f"The next bus will arive at {stop.name} in aproxomately {time_until.seconds // 60} minutes and {time_until.seconds % 60} seconds")

current_lat = 36.214645 
current_lon = -81.675772

print(f"The closest bus on {route.name} route is {min([bus.get_distance(current_lat, current_lon) for bus in route.buses])} meters away")