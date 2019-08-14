import { createContext } from 'react';

export type Features = {
  [key: string]: boolean | string[];
};

export type FeaturesContextState = {
  features: string[];
  isEnabled: (feature: string | string[]) => boolean;
  toggleFeature: (feature: string) => void;
  allFeatures: Features;
};

const featuresContext = createContext({} as FeaturesContextState);
const { Provider, Consumer } = featuresContext;

export { Provider as FeaturesProvider, Consumer as FeaturesConsumer, featuresContext };
