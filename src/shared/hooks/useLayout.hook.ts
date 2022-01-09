import { useWindowResize } from './useWindowResize.hook';

// The same as in styles/variables.scss
const DESKTOP_MIN_WIDTH = 768;

/**
 * Notify changes in the app's layout (mobile/desktop)
 */
export const useLayout = (): 'mobile' | 'desktop' => {
  const { width } = useWindowResize();
  return width >= DESKTOP_MIN_WIDTH ? 'desktop' : 'mobile';
};
