'use client';

// Karlo!!!

// External packages
import { useSearchParams, useRouter } from 'next/navigation';

export type UrlParamsProps = 'collection' | 'type' | 'category' | 'sortBy';
export const useSetUrlParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setUrlParams = (
    key: UrlParamsProps,
    queryParams: string | string[]
  ) => {
    const normalizedParam = (queryParams = Array.isArray(queryParams)
      ? queryParams
      : [queryParams]);

    const params = new URLSearchParams(searchParams.toString());

    params.delete(key);
    normalizedParam.forEach((param) => {
      params.append(key, param);
    });

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return setUrlParams;
};
