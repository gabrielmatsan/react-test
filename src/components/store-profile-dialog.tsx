import {
  getManagerRestaurant,
  type GetManagerRestaurantResponse,
} from "@/api/get-manager-restaurant";
import { updateProfile } from "@/api/update-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const profileFormSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
});

type ProfileFormSchema = z.infer<typeof profileFormSchema>;

export function StoreProfileDialog() {
  const queryClient = useQueryClient();
  const { data: managerRestaurant } = useQuery({
    queryKey: ["manager-restaurant"],
    queryFn: getManagerRestaurant,
    staleTime: Infinity,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    values: {
      name: managerRestaurant?.name ?? "",
      description: managerRestaurant?.description ?? "",
    },
  });

  function updateManagerRestaurantCache({
    name,
    description,
  }: {
    name: string | null;
    description: string | null;
  }) {
    const cached = queryClient.getQueryData<GetManagerRestaurantResponse>([
      "manager-restaurant",
    ]);

    if (cached) {
      queryClient.setQueryData<GetManagerRestaurantResponse>(
        ["manager-restaurant"],
        {
          ...cached,
          name: name ?? cached.name,
          description: description ?? cached.description,
        },
      );
    }
    return { cached };
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ name, description }) {
      const { cached } = updateManagerRestaurantCache({ name, description });

      return { prevData: cached };
    },
    onError(_, __, context) {
      if (context?.prevData) {
        updateManagerRestaurantCache({
          name: context.prevData.name,
          description: context.prevData.description,
        });
      }
    },
  });

  async function handleUpdateProfile(data: ProfileFormSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      });

      toast.success("Perfil atualizado com sucesso");
    } catch (error) {
      toast.error("Erro ao atualizar perfil");
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações da sua loja
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input id="name" className="col-span-3" {...register("name")} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              id="description"
              className="col-span-3"
              {...register("description")}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button" disabled={isSubmitting}>
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
