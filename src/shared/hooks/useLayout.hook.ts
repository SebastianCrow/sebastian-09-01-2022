import { useWindowResize } from './useWindowResize.hook';

// The same as in styles/variables.scss
const DESKTOP_MIN_WIDTH = 768;

export const useLayout = (): 'mobile' | 'desktop' => {
  const { width } = useWindowResize();
  return width >= DESKTOP_MIN_WIDTH ? 'desktop' : 'mobile';
};
