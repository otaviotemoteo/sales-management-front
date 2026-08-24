import type {
  CustomerResponse,
  CreateCustomerRequest,
  UpdateCustomerRequest,
} from "@/types/customer";
import type { PageResponse, PaginationParams } from "@/types/api";
import {
  buildQuery,
  handleResponse,
  handleVoidResponse,
} from "@/lib/service-utils";

export async function getCustomers(
  params?: PaginationParams,
): Promise<PageResponse<CustomerResponse>> {
  const res = await fetch(`/api/customers${buildQuery(params)}`);
  return handleResponse(res);
}

export async function getCustomerById(id: number): Promise<CustomerResponse> {
  const res = await fetch(`/api/customers/${id}`);
  return handleResponse(res);
}

export async function createCustomer(
  data: CreateCustomerRequest,
): Promise<CustomerResponse> {
  const res = await fetch("/api/customers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updateCustomer(
  id: number,
  data: UpdateCustomerRequest,
): Promise<CustomerResponse> {
  const res = await fetch(`/api/customers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteCustomer(id: number): Promise<void> {
  const res = await fetch(`/api/customers/${id}`, { method: "DELETE" });
  return handleVoidResponse(res, "Erro ao deletar cliente");
}

export async function searchCustomers(
  query: string,
  params?: PaginationParams,
): Promise<PageResponse<CustomerResponse>> {
  const searchParams = new URLSearchParams({ query });
  if (params?.page != null) searchParams.set("page", String(params.page));
  if (params?.size != null) searchParams.set("size", String(params.size));

  const res = await fetch(`/api/customers/search?${searchParams}`);
  return handleResponse(res);
}
