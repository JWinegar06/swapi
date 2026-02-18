import axios from "axios";

const BASE_URL = "https://swapi.tech/api/people/";

export function GetCharacters() {
  return axios.get(`${BASE_URL}`);
}

export function GetCharacterById(id) {
  return axios.get(`${BASE_URL}${id}`);
}
