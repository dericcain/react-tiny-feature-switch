import React, { useContext } from 'react';

import { featuresContext } from './feature-context';

type FeatureSwitchProps = {
  features: string | string[];
  children: React.ReactNode;
};

export function FeatureToggle({ features, children }: FeatureSwitchProps): any {
  const { isEnabled } = useContext(featuresContext);
  return isEnabled(features)
    ? React.Children.map(children, (child: any) =>
        child.type.displayName === 'FeatureElse' ? null : child,
      )
    : React.Children.map(children, (child: any) =>
        child.type.displayName === 'FeatureElse' ? child : null,
      );
}
