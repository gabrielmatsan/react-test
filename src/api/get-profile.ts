import { api } from "@/lib/axios";


type GetProfileResponse = {
  id: string
  name: string
  email: string
  phone: string
  role: 'member' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>('/me')

  return response.data
}