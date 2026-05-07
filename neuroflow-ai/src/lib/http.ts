import { NextResponse } from "next/server";

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ error: message, details }, { status });
}

export async function readJson<T = Record<string, unknown>>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}

export function parsePagination(url: string) {
  const params = new URL(url).searchParams;
  const page = Number(params.get("page") || 1);
  const limit = Number(params.get("limit") || 20);
  const q = (params.get("q") || "").trim();
  const status = (params.get("status") || "all").trim();

  return {
    page: Number.isNaN(page) ? 1 : Math.max(1, page),
    limit: Number.isNaN(limit) ? 20 : Math.min(100, Math.max(1, limit)),
    q,
    status
  };
}

export function getMonthStart(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
