import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z
    .enum([
      "pending",
      "canceled",
      "processing",
      "delivering",
      "delivered",
      "all",
    ])
    .optional(),
});

export type OrderFilters = z.infer<typeof orderFiltersSchema>;

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const { register, handleSubmit, control } = useForm({
    resolver: zodResolver(orderFiltersSchema),
    defaultValues: {
      orderId: orderId ?? undefined,
      customerName: customerName ?? undefined,
      status:
        status === "pending" ||
        status === "canceled" ||
        status === "processing" ||
        status === "delivering" ||
        status === "delivered" ||
        status === "all"
          ? status
          : "all",
    },
  });

  function handleFilter({ orderId, customerName, status }: OrderFilters) {
    setSearchParams((state) => {
      if (orderId) {
        state.set("orderId", orderId);
      } else {
        state.delete("orderId");
      }
      if (customerName) {
        state.set("customerName", customerName);
      } else {
        state.delete("customerName");
      }
      if (status) {
        state.set("status", status);
      } else {
        state.delete("status");
      }

      state.set("page", "1");
      return state;
    });
  }

  return (
    <>
      <form
        className="flex items-center gap-2"
        onSubmit={handleSubmit(handleFilter)}
      >
        <span className="text-sm font-semibold">Filtrar por:</span>

        <Input
          placeholder="ID do pedido"
          className="h-8 w-auto"
          {...register("orderId")}
        />
        <Input
          placeholder="Nome do cliente"
          className="h-8 w-[320px]"
          {...register("customerName")}
        />

        <Controller
          name="status"
          control={control}
          render={({ field: { name, onChange, value, disabled } }) => {
            return (
              <Select
                defaultValue="all"
                value={value}
                onValueChange={onChange}
                name={name}
                disabled={disabled}
              >
                <SelectTrigger className="h-8 w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="approved">Aprovado</SelectItem>
                  <SelectItem value="canceled">Cancelado</SelectItem>
                  <SelectItem value="in-delivery">Em entrega</SelectItem>
                  <SelectItem value="delivered">Entregue</SelectItem>
                  <SelectItem value="in-preparation">Em preparo</SelectItem>
                </SelectContent>
              </Select>
            );
          }}
        ></Controller>

        <Button type="submit" variant="secondary" size="xs">
          <Search className="mr-2 h-3 w-3" />
          Filtrar resultados
        </Button>

        <Button type="button" variant="secondary" size="xs">
          <X className="mr-2 h-3 w-3" />
          Remover filtros
        </Button>
      </form>
    </>
  );
}
