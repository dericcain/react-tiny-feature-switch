import { createContext } from 'react';

export type Features = {
  [key: string]: boolean;
};

export type FeaturesContextState = {
  features: Features;
  isEnabled: (feature: string | string[]) => boolean;
  toggleFeature: (feature: string) => void;
  allFeatures: Features;
};

const featuresContext = createContext({} as FeaturesContextState);
const { Provider, Consumer } = featuresContext;

export { Provider as FeaturesProvider, Consumer as FeaturesConsumer, featuresContext };
