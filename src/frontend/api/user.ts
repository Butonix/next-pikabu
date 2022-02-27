import { UserInput } from "@shared/types";
import { api } from ".";

export async function registerUser(user: UserInput) {
  const response = await api.post("/auth/signup", user);
  return response;
}

export async function getUserByName(name: string) {
  const response = await api.get(`/user/name/${name}`);
}
