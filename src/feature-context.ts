import { createContext } from 'react';

export type FeatureSet = {
  [key: string]: boolean;
};

export type FeaturesContextState = {
  features: FeatureSet;
  isEnabled: (feature: string | string[]) => boolean;
  toggleFeature: (feature: string) => void;
  allFeatures: FeatureSet;
};

const featuresContext = createContext({} as FeaturesContextState);
const { Provider, Consumer } = featuresContext;

export { Provider as FeaturesProvider, Consumer as FeaturesConsumer, featuresContext };
