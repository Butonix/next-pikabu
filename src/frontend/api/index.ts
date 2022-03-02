import axios from "axios";
const baseURL = "https://next-pikabu-ccypckvrn-andreineu.vercel.app/";
export const api = axios.create({ baseURL: baseURL });
