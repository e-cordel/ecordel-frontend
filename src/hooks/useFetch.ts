import useSWR from 'swr';
import api from '../services/api';

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error, isValidating, mutate } = useSWR<Data, Error>(url, async ulr => {
    const { data } = await api.get(url);
    return data;
  });

  return { data, error, isValidating, mutate }
}