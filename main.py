from dataclasses import dataclass
from typing import List
import requests
from datetime import datetime, timedelta

BASE_URL = "https://appalcart.ridesystems.net/Services/JSONPRelay.svc/"
API_KEY = "8882812681"

@dataclass
class Stop:
    name: str
    stop_id: int
    route_id: int
    lat: float
    lon: float

@dataclass
class Bus:
    bus_id: int
    route_id: int
    lat: float
    lon: float

@dataclass
class Route:
    name: int
    id: int
    stops: List[Stop]
    buses: List[Bus]

def make_request(target: str, payload: dict = {}, method: str = "GET"):
    payload["ApiKey"] = API_KEY
    return requests.request(method, BASE_URL + target, params=payload).json()

def get_routeid(name: str) -> int:
    for route_dict in make_request("GetRoutes"):
        if route_dict["Description"] == name:
            return int(route_dict["RouteID"])

def get_stops(route_id: int) -> List[Stop]:
    stops = []
    for stop in make_request("GetStops", {"routeId": route_id}):
        stops.append(Stop(stop["Description"], int(stop["RouteStopID"]), route_id, stop["Latitude"], stop["Longitude"]))

    return stops

def get_bus(route_id):
    buses = []
    for bus in make_request("GetMapVehiclePoints", {"routeId": route_id}):
        buses.append(Bus(bus["VehicleID"], route_id, bus["Latitude"], bus["Longitude"]))

def get_route(name: str) -> Route:
    route_id = get_routeid(name)
    stops = get_stops(route_id)
    buses = get_bus(route_id)
    return Route(name, route_id, stops, buses)

def convert_unix_timestr(time_str: str) -> datetime:
    unix_time = int(time_str.split("(")[1].split(")")[0])
    return datetime.fromtimestamp(unix_time)

def get_time_estimate(stop_id: int) -> datetime:
    data = make_request("GetStopArivalTimes", {"routestopIds": stop_id})[0]
    time_str = data["Times"][0]["EstimateTime"]
    return convert_unix_timestr(time_str)
    
def get_scheduled_time(stop_id: int) -> datetime:
    data = make_request("GetStopArivalTimes", {"routestopIds": stop_id})[0]
    time_str = data["Times"][0]["ScheduledTime"]
    return convert_unix_timestr(time_str)

route = get_route("N.O. Gold")
print(route)

