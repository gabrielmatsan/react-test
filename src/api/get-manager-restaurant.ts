import { api } from "@/lib/axios";


export type GetManagerRestaurantResponse = {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string
}

export async function getManagerRestaurant() {
  const response = await api.get<GetManagerRestaurantResponse>('/managed-restaurant')

  return response.data
}