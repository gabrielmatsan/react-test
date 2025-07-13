import { api } from "@/lib/axios";


export type UpdateProfileData = {
  name: string;
  description: string | null;
}

export async function updateProfile(data: UpdateProfileData) {
  const { name, description } = data
  await api.put("/profile", {
    name,
    description,
  })
}