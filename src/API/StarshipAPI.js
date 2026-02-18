import axios from "axios";

const BASE_URL = "https://swapi.tech/api/starships/";

export function GetStarships() {
  return axios.get(`${BASE_URL}`);
}

export function GetStarshipById(id) {
  return axios.get(`${BASE_URL}${id}`);
}
