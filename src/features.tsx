import React, { Component } from 'react';

import { FeatureSet, FeaturesContextState, FeaturesProvider as Provider } from './feature-context';
import { parseUrlOverrides } from './parse-url-overrides';

type FeatureToggleProps = {
  children: React.ReactNode;
  features: FeatureSet;
};

type FeatureToggleState = {
  features: FeatureSet;
};

export class Features extends Component<FeatureToggleProps, FeatureToggleState> {
  public state: FeatureToggleState;

  constructor(props: FeatureToggleProps) {
    super(props);
    this.state = {
      features: { ...props.features, ...parseUrlOverrides(window.location.search) },
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
    this.setState(prevState => ({
      features: {
        ...prevState.features,
        [feature]: !prevState.features[feature],
      },
    }));
  };

  public render() {
    return <Provider value={this.contextState}>{this.props.children}</Provider>;
  }

  private isSingleFeatureEnabled = (feature: string): boolean => {
    return this.contextState.features[feature];
  };
}
