import type {
  ProductResponse,
  CreateProductRequest,
  UpdateProductRequest,
} from "@/types/product";
import type { PageResponse, PaginationParams } from "@/types/api";
import {
  buildQuery,
  handleResponse,
  handleVoidResponse,
} from "@/lib/service-utils";

export async function getProducts(
  params?: PaginationParams,
): Promise<PageResponse<ProductResponse>> {
  const res = await fetch(`/api/products${buildQuery(params)}`);
  return handleResponse(res);
}

export async function getProductById(id: number): Promise<ProductResponse> {
  const res = await fetch(`/api/products/${id}`);
  return handleResponse(res);
}

export async function createProduct(
  data: CreateProductRequest,
): Promise<ProductResponse> {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updateProduct(
  id: number,
  data: UpdateProductRequest,
): Promise<ProductResponse> {
  const res = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
  return handleVoidResponse(res, "Could not deactivate the product");
}

export async function searchProducts(
  query: string,
  params?: PaginationParams,
): Promise<PageResponse<ProductResponse>> {
  const searchParams = new URLSearchParams({ query });
  if (params?.page != null) searchParams.set("page", String(params.page));
  if (params?.size != null) searchParams.set("size", String(params.size));

  const res = await fetch(`/api/products/search?${searchParams}`);
  return handleResponse(res);
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch("/api/products/categories");
  return handleResponse(res);
}

export async function getByCategory(
  category: string,
  params?: PaginationParams,
): Promise<PageResponse<ProductResponse>> {
  const res = await fetch(
    `/api/products/category/${encodeURIComponent(category)}${buildQuery(params)}`,
  );
  return handleResponse(res);
}
