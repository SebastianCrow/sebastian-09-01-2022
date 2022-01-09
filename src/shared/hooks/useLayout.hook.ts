import { useWindowResize } from './useWindowResize.hook';

// The same as in styles/variables.scss
const DESKTOP_MIN_WIDTH = 768;

export type Layout = 'mobile' | 'desktop';

/**
 * Notify changes in the app's layout (mobile/desktop)
 */
export const useLayout = (): Layout => {
  const { width } = useWindowResize();
  return width >= DESKTOP_MIN_WIDTH ? 'desktop' : 'mobile';
};
