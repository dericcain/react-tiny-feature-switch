import React, { useContext } from 'react';

import { featuresContext } from './feature-context';

export type FeatureTogglerProps = {
  alwaysShow?: boolean;
};

export function FeatureToggler({ alwaysShow = false }: FeatureTogglerProps) {
  const { allFeatures, isEnabled, toggleFeature } = useContext(featuresContext);
  const showPanel = new URLSearchParams(window.location.search).has('showPanel');

  return showPanel || alwaysShow ? (
    <div
      data-testid="feature-toggler"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        backgroundColor: '#eee',
        padding: 18,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontSize: '18px',
        opacity: 0.85,
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        maxHeight: 400,
        overflowY: 'auto',
      }}
    >
      {allFeatures &&
        Object.keys(allFeatures).map(key => {
          if (Array.isArray(allFeatures[key])) {
            return null;
          }
          return (
            <div key={key}>
              <label htmlFor={`__feature-${key}`}>
                <input
                  data-testid={`feature-toggler-checkbox-${key}`}
                  type="checkbox"
                  checked={isEnabled(key)}
                  id={`__feature-${key}`}
                  onChange={() => toggleFeature(key)}
                  style={{
                    marginRight: 6,
                  }}
                />
                {key}
              </label>
            </div>
          );
        })}
    </div>
  ) : null;
}
