import useSWRInfinite from "swr/infinite";
import { CordelSummary } from "../types";
import { fetchJson } from "./useFetch";

export interface CordelPage {
  content: CordelSummary[];
  last: boolean;
  number: number;
  totalPages: number;
}

export interface PaginatedCordels {
  cordels?: CordelSummary[];
  error?: Error;
  isLoading: boolean;
  isLoadingMore: boolean;
  isReachingEnd: boolean;
  loadMore: () => void;
  retry: () => void;
}

export const getCordelSearchKey =
  (searchTitle: string) =>
  (pageIndex: number, previousPageData: CordelPage | null): string | null => {
    if (previousPageData?.last) {
      return null;
    }

    const params = new URLSearchParams({
      page: pageIndex.toString(),
      published: "true",
      title: searchTitle,
    });

    return `cordels/summaries?${params.toString()}`;
  };

export const flattenCordelPages = (
  pages?: CordelPage[]
): CordelSummary[] | undefined =>
  pages?.reduce<CordelSummary[]>(
    (cordels, page) => cordels.concat(page.content),
    []
  );

export function usePaginatedCordels(
  searchTitle: string
): PaginatedCordels {
  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    setSize,
    size,
  } = useSWRInfinite<CordelPage, Error>(
    getCordelSearchKey(searchTitle),
    fetchJson
  );

  const isLoadingMore =
    isValidating && Boolean(data) && size > (data?.length ?? 0);
  const lastPage = data?.[data.length - 1];

  return {
    cordels: flattenCordelPages(data),
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd: lastPage?.last ?? false,
    loadMore: () => {
      if (error) {
        mutate();
        return;
      }

      setSize(size + 1);
    },
    retry: () => mutate(),
  };
}
