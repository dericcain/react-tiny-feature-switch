import React, { useContext } from 'react';

import { featuresContext } from 'feature-context';

export type FeatureSwitchProps = {
  features: string | string[];
  children: React.ReactNode;
};

export function FeatureSwitch({ features, children }: FeatureSwitchProps): any {
  const { isEnabled } = useContext(featuresContext);
  return isEnabled(features)
    ? React.Children.map(children, (child: any) =>
        child.type.displayName === 'FeaturesElse' ? null : child,
      )
    : React.Children.map(children, (child: any) =>
        child.type.displayName === 'FeaturesElse' ? child : null,
      );
}
