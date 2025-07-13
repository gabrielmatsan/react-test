import { api } from "@/lib/axios";

export type RegisterRestaurantRequestData = {
  name: string;
  restaurantName: string;
  managerName: string;
  phone: string
}

export async function registerRestaurant(data: RegisterRestaurantRequestData) {
  const { name, restaurantName, managerName, phone } = data;

  await api.post("/restaurants", {
    name,
    restaurantName,
    managerName,
    phone,
  });
}