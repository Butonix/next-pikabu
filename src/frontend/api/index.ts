import axios from "axios";
// const baseURL = "https://next-pikabu-andreineu.vercel.app/api";
const baseURL = "https://pikabu-nextjs.herokuapp/api";
// const baseURL = "https://localhost:3000";

export const api = axios.create({ baseURL: baseURL });
