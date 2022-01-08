import { FeatureFlag } from './featureFlags.types';

export const isFeatureFlagEnabled = (flag: FeatureFlag): boolean => {
  // TODO: Replace with the real feature flags mechanism
  return Boolean(localStorage.getItem(flag));
};
