import React, { Component } from 'react';

import { Features, FeaturesContextState, FeaturesProvider as Provider } from './feature-context';

export type FeatureToggleProps = {
  children: React.ReactNode;
  features: Features;
};

export type FeatureToggleState = {
  features: string[];
};

export type Overrides = {
  [key: string]: boolean;
};

function parseUrlOverrides() {
  const paramEntries = new URLSearchParams(window.location.search).entries();
  const overrides: Overrides = {};
  for (let [k, v] of paramEntries) {
    overrides[k] = v === 'true' || v === '1';
  }
  return overrides;
}

export default class FeatureToggle extends Component<FeatureToggleProps, FeatureToggleState> {
  public state: FeatureToggleState;

  constructor(props: FeatureToggleProps) {
    super(props);
    this.state = {
      features: this.parseFeatures({ ...this.props.features }),
    };
  }

  public get contextState(): FeaturesContextState {
    return {
      features: this.state.features,
      allFeatures: this.props.features,
      isEnabled: this.isEnabled,
      toggleFeature: this.toggleFeature,
    };
  }

  public isEnabled = (feature: string | string[]): boolean => {
    if (Array.isArray(feature)) {
      return feature.every(this.isSingleFeatureEnabled);
    }

    return this.isSingleFeatureEnabled(feature);
  };

  public toggleFeature = (feature: string) => {
    this.setState(prevState => {
      const features = prevState.features;
      if (prevState.features.includes(feature)) {
        return {
          features: features.filter((f: string) => f !== feature),
        };
      } else {
        features.push(feature);
        return {
          features,
        };
      }
    });
  };

  public render() {
    return <Provider value={this.contextState}>{this.props.children}</Provider>;
  }

  private isSingleFeatureEnabled = (feature: string): boolean => {
    return this.contextState.features.includes(feature);
  };

  private parseFeatures(features: Features): string[] {
    const enabledFeatures: string[] = [];
    Object.entries(features).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        v.forEach(k => {
          if (!enabledFeatures.includes(k)) {
            enabledFeatures.push(k);
          }
        });
      } else if (v && !enabledFeatures.includes(k)) {
        enabledFeatures.push(k);
      }
    });
    const overrides = parseUrlOverrides();

    return [...enabledFeatures, ...Object.keys(overrides)].reduce(
      (acc: string[], current: string) => {
        if (overrides[current] === false || acc.includes(current)) {
          return acc;
        }
        return [...acc, current];
      },
      [],
    );
  }
}
