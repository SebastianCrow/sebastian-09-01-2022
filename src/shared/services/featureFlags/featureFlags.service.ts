import { FeatureFlag, FeatureValue } from './featureFlags.types';

/**
 * Simple mechanism to check whether the given feature flag is enabled.
 * The flags are usually checked once on startup so it's the safest to reload app after changing key in the local storage.
 * TODO: Replace with the real feature flags mechanism
 */
export const isFeatureFlagEnabled = (flag: FeatureFlag): boolean => {
  return Boolean(localStorage.getItem(flag));
};

/**
 * Simple mechanism to get dynamic value behind the particular key.
 * The values are usually assigned once on startup so it's the safest to reload app after changing value in the local storage.
 * TODO: Replace with the real dynamic values mechanism
 */
export const getFeatureValue = (
  value: FeatureValue,
  defaultValue: string
): string => {
  return localStorage.getItem(value) ?? defaultValue;
};
