import { api } from '@/lib/axios'

export interface GetOrdersQuery {
  pageIndex?: number
  orderId?: string | null
  customerName?: string | null
  status?: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered' | 'all'
}

export interface GetOrdersResponse {
  orders: {
    orderId: string
    createdAt: Date
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered' | 'all'
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders({
  pageIndex = 0,
  orderId,
  customerName,
  status
}: GetOrdersQuery = {}): Promise<GetOrdersResponse> {

  const validPageIndex = Math.max(0, Math.floor(Number(pageIndex) || 0))

  const params: Record<string, any> = {
    pageIndex: validPageIndex,
  };

  if (orderId && orderId.trim()) {
    params.orderId = orderId.trim();
  }

  if (customerName && customerName.trim()) {
    params.customerName = customerName.trim();
  }

  if (status) {
    params.status = status;
  }

  try {
    const response = await api.get("/orders", { params });

    return response.data;
  } catch (error) {
    throw error;
  }
}