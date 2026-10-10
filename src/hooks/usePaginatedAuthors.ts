import useSWRInfinite from "swr/infinite";
import { Author } from "../types";
import { fetchJson } from "./useFetch";

type AuthorPageResponse = {
  content?: Author[];
  last?: boolean;
} | Author[];

export interface PaginatedAuthors {
  authors?: Author[];
  error?: Error;
  isLoading: boolean;
  isLoadingMore: boolean;
  isReachingEnd: boolean;
  loadMore: () => void;
  retry: () => void;
}

const getAuthorSearchKey =
  (searchName: string) =>
  (pageIndex: number, previousPageData: AuthorPageResponse | null): string | null => {
    if (!previousPageData) {
      // continue
    } else if (Array.isArray(previousPageData) || previousPageData.last) {
      return null;
    }

    const params = new URLSearchParams({
      page: pageIndex.toString(),
      name: searchName,
    });

    return `authors?${params.toString()}`;
  };

const flattenAuthorPages = (pages?: AuthorPageResponse[]) =>
  pages?.reduce<Author[]>((acc, page) => {
    const pageAuthors = Array.isArray(page) ? page : page.content || [];
    return [...acc, ...pageAuthors];
  }, []);

export function usePaginatedAuthors(searchName: string): PaginatedAuthors {
  const { data, error, isLoading, isValidating, mutate, setSize, size } =
    useSWRInfinite<AuthorPageResponse, Error>(
      getAuthorSearchKey(searchName),
      fetchJson
    );

  const isLoadingMore =
    isValidating && Boolean(data) && size > (data?.length ?? 0);
  const lastPage = data?.[data.length - 1];
  const isArrayPage = Array.isArray(lastPage);

  return {
    authors: flattenAuthorPages(data),
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd: isArrayPage || (!isArrayPage && (lastPage?.last ?? false)),
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
