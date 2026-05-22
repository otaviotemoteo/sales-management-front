import type {
  UserResponse,
  CreateUserRequest,
  UpdateUserRequest,
  ChangePasswordRequest,
} from "@/types/auth";
import type { PageResponse, PaginationParams } from "@/types/api";
import {
  buildQuery,
  handleResponse,
  handleVoidResponse,
} from "@/lib/service-utils";

export async function getUsers(
  params?: PaginationParams,
): Promise<PageResponse<UserResponse>> {
  const res = await fetch(`/api/users${buildQuery(params)}`);
  return handleResponse(res);
}

export async function getUserById(id: number): Promise<UserResponse> {
  const res = await fetch(`/api/users/${id}`);
  return handleResponse(res);
}

export async function createUser(
  data: CreateUserRequest,
): Promise<UserResponse> {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updateUser(
  id: number,
  data: UpdateUserRequest,
): Promise<UserResponse> {
  const res = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
  return handleVoidResponse(res, "Erro ao desativar usuário");
}

export async function reactivateUser(id: number): Promise<UserResponse> {
  const res = await fetch(`/api/users/${id}/reactivate`, { method: "PATCH" });
  return handleResponse(res);
}

export async function updateOwnProfile(
  data: UpdateUserRequest,
): Promise<UserResponse> {
  const res = await fetch("/api/users/me", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function changePassword(
  data: ChangePasswordRequest,
): Promise<void> {
  const res = await fetch("/api/users/me/password", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleVoidResponse(res, "Erro ao alterar senha");
}

export async function searchUsers(
  query: string,
  params?: PaginationParams,
): Promise<PageResponse<UserResponse>> {
  const searchParams = new URLSearchParams({ query });
  if (params?.page != null) searchParams.set("page", String(params.page));
  if (params?.size != null) searchParams.set("size", String(params.size));

  const res = await fetch(`/api/users/search?${searchParams}`);
  return handleResponse(res);
}

export async function getUsersByRole(
  role: "ADMIN" | "SELLER",
  params?: PaginationParams,
): Promise<PageResponse<UserResponse>> {
  const res = await fetch(`/api/users/role/${role}${buildQuery(params)}`);
  return handleResponse(res);
}
