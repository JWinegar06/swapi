import axios from "axios";

const BASE_URL = "https://swapi.tech/api/planets/";

export function GetPlanet() {
  return axios.get(`${BASE_URL}`);
}

export function GetPlanetById(id) {
  return axios.get(`${BASE_URL}${id}`);
}
