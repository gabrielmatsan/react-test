import { registerRestaurant } from "@/api/registerRestaurant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signUpForm = z.object({
  email: z.email({
    message: "E-mail inválido",
  }),
  restaurantName: z.string().min(1, {
    message: "Nome do restaurante é obrigatório",
  }),
  managerName: z.string().min(1, {
    message: "Nome do gerente é obrigatório",
  }),
  phoneNumber: z.string().min(1, {
    message: "Número de telefone é obrigatório",
  }),
});

type SignUpFormData = z.infer<typeof signUpForm>;
export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
    retry: 2,
    onSuccess: () => {
      toast.success("Restaurante cadastro realizado com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao cadastrar novo estabelecimento");
    },
  });

  async function handleSignUp(data: SignUpFormData) {
    try {
      const { email, restaurantName, managerName, phoneNumber } = data;

      await registerRestaurantFn({
        name: email,
        restaurantName,
        managerName,
        phone: phoneNumber,
      });

      toast.success("Restaurante cadastro realizado com sucesso.", {
        action: {
          label: "Acessar painel",
          onClick: () => {
            navigate(`/sign-in?email=${email}`);
          },
        },
      });
    } catch (error) {
      toast.error("Erro ao cadastrar novo estabelecimento");
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />

      <div className="p-8">
        <Button variant="ghost" asChild className="absolute top-8 right-4">
          <Link to="/sign-in" className="text-muted-foreground text-sm">
            Voltar para login
          </Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-muted-foreground text-sm">
              Seja um parceiro e comece a vender e ter acesso aos seus dados de
              forma organizada
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName" className="mb-4 font-medium">
                Nome do restaurante
              </Label>
              <Input
                type="text"
                id="restaurantName"
                {...register("restaurantName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName" className="mb-4 font-medium">
                Nome do gerente
              </Label>
              <Input
                type="text"
                id="managerName"
                {...register("managerName")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="mb-4 font-medium">
                Seu e-mail
              </Label>
              <Input type="email" id="email" {...register("email")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="mb-4 font-medium">
                Número de telefone
              </Label>
              <Input type="tel" id="phoneNumber" {...register("phoneNumber")} />
            </div>
            <Button disabled={isSubmitting} type="submit" className="w-full">
              {isSubmitting ? "Criando conta..." : "Finalizar cadastro"}
            </Button>

            <p className="text-muted-foreground px-6 text-center text-sm leading-relaxed">
              Ao continuar e finalizar o cadastro, você concorda com as{" "}
              <a href="/terms" className="underline underline-offset-0">
                nossas políticas e termos de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
