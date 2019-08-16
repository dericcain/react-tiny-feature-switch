import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { FeatureToggle, FeatureToggler } from '../src';
import { FeatureTogglerProps } from '../src/feature-toggler';

const features = {
  firstName: true,
  lastName: true,
  address: false,
};

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <FeatureToggle features={features}>
    <div>{children}</div>
  </FeatureToggle>
);

describe('<FeatureToggler />', () => {
  const render = ({ alwaysShow = true }: FeatureTogglerProps = {}) =>
    rtlRender(
      <Wrapper>
        <FeatureToggler alwaysShow={alwaysShow} />
      </Wrapper>,
    );

  it('should show the feature toggler', () => {
    const { getByTestId } = render();
    expect(getByTestId('feature-toggler')).toBeInTheDocument();
  });

  it('should have the correct checkboxes checked', () => {
    const { getByTestId } = render();
    expect(getByTestId('feature-toggler-checkbox-firstName')).toHaveAttribute('checked');
    expect(getByTestId('feature-toggler-checkbox-lastName')).toHaveAttribute('checked');
    expect(getByTestId('feature-toggler-checkbox-address')).not.toHaveAttribute('checked');
  });
});
