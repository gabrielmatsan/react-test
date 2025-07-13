import { getOrders } from "@/api/get-orders";
import { Pagination } from "@/components/pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import z from "zod";
import { OrderTableFilters } from "./order-table-filters";
import { OrderTableRow } from "./order-table-row";

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const {
    data: result,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders", pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        orderId,
        customerName,
        status,
      }),
    staleTime: Infinity,
  });

  function handlePaginationChange(page: number) {
    setSearchParams((state) => {
      state.set("page", (page + 1).toString());
      return state;
    });
  }

  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizada há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <td colSpan={8} className="py-8 text-center">
                      Carregando pedidos...
                    </td>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <td colSpan={8} className="py-8 text-center text-red-500">
                      Erro ao carregar pedidos: {error.message}
                    </td>
                  </TableRow>
                ) : result && result.orders ? (
                  result.orders.length > 0 ? (
                    result.orders.map((order) => (
                      <OrderTableRow key={order.orderId} order={order} />
                    ))
                  ) : (
                    <TableRow>
                      <td colSpan={8} className="py-8 text-center">
                        Nenhum pedido encontrado.
                      </td>
                    </TableRow>
                  )
                ) : (
                  <TableRow>
                    <td colSpan={8} className="py-8 text-center">
                      Carregando...
                    </td>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {result && (
            <Pagination
              onPageChange={handlePaginationChange}
              pageIndex={pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
            />
          )}
        </div>
      </div>
    </>
  );
}
