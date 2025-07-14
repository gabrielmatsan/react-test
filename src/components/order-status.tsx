type OrderStatusType =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered"
  | "all";

interface OrderStatusProps {
  status: OrderStatusType;
}

const orderStatusMap = {
  pending: {
    label: "Pendente",
    color: "bg-yellow-500",
  },
  canceled: {
    label: "Cancelado",
    color: "bg-rose-500",
  },
  processing: {
    label: "Em processamento",
    color: "bg-blue-500",
  },
  delivering: {
    label: "Em entrega",
    color: "bg-green-500",
  },
  delivered: {
    label: "Entregue",
    color: "bg-green-500",
  },
  all: {
    label: "Todos",
    color: "bg-gray-500",
  },
};

export function OrderStatus({ status }: OrderStatusProps) {
  const statusInfo = orderStatusMap[status];

  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${statusInfo.color}`}></span>
      <span className="text-muted-foreground font-medium">
        {statusInfo.label}
      </span>
    </div>
  );
}
