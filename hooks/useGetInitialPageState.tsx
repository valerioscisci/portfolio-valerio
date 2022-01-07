import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useWindowSize } from './useWindowSize';

export const useGetInitialPageState = (tArray: Array<string>) => {
  const { t } = useTranslation(tArray);
  const router = useRouter();

  const [width] = typeof window !== 'undefined' ? useWindowSize() : [0];

  return { t, router, width };
};
