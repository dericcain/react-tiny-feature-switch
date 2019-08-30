import React, { useState } from 'react';

import { FeatureSet, FeaturesContextState, FeaturesProvider as Provider } from './feature-context';
import { parseUrlOverrides } from './parse-url-overrides';

type FeatureToggleProps = {
  children: React.ReactNode;
  features: FeatureSet;
};

export function Features({ features: propsFeatures, children }: FeatureToggleProps) {
  const [features, setFeatures] = useState<FeatureSet>({
    ...propsFeatures,
    ...parseUrlOverrides(window.location.search)
  });

  const contextState: FeaturesContextState = {
    features,
    allFeatures: propsFeatures,
    isEnabled,
    toggleFeature,
  };

  function isEnabled (feature: string | string[]): boolean {
    if (Array.isArray(feature)) {
      return feature.every(isSingleFeatureEnabled);
    }

    return isSingleFeatureEnabled(feature);
  };

  function toggleFeature (feature: string) {
    setFeatures(prevState => ({
      ...prevState,
      [feature]: !prevState[feature],
    }));
  };

  function isSingleFeatureEnabled(feature: string): boolean {
    return contextState.features[feature];
  };

  return <Provider value={contextState}>{children}</Provider>;
}
