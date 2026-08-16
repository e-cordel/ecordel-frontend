import useSWR from "swr";
import api from "../services/api";

export async function fetchJson<Data = any>(url: string): Promise<Data> {
  const response = await api.get(url, {
    headers: {
      Accept: "application/json",
    },
  });

  return response.data;
}

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<Data, Error>(url, fetchJson);

  return { data, error, isLoading, isValidating, mutate };
}
