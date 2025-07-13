import { api } from "@/lib/axios";

export type SignInRequestData = {
  email: string;
}
export async function signIn(data: SignInRequestData) {
  const { email } = data;

  await api.post("/authenticate", {
    email,
  });
}