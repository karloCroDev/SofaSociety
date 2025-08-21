'use client';

// External packages
import {
  useSearchParams,
  useRouter,
  usePathname,
  useParams,
} from 'next/navigation';

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

export const useCountryCode = (
  countryOptions?: {
    country: string | undefined;
    region: string;
    label: string | undefined;
  }[]
) => {
  const pathname = usePathname();
  const params = useParams();

  // Prefer params if valid
  if (typeof params.countryCode === 'string') {
    return params.countryCode;
  }

  const [firstPathPart] = pathname.replace(/^\//, '').split('/');

  if (countryOptions?.length) {
    const match = countryOptions.find(
      ({ country }) => country === firstPathPart
    );
    if (match) return match.country;
  }

  if (firstPathPart?.length === 2) {
    return firstPathPart;
  }
};
