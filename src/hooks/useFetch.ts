import useSWR from 'swr';
import api from '../services/api';

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error, isValidating, mutate } = useSWR<Data, Error>(url, async ulr => {
    const response = await api.get(url);
    return response.data;
  });

  return { data, error, isValidating, mutate }
}