import { api } from ".";
import { Tag } from "@shared/types";

export async function getTags() {
  const response = await api.get<Tag[]>("/tags");
  const data = response.data;
  return data;
}
