import axios from "axios";
const baseURL = "https://next-pikabu-andreineu.vercel.app/api";
export const api = axios.create({ baseURL: baseURL });
