import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Features, FeatureToggler, FeatureToggle } from '../src';
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
  <Features features={features}>
    <div>{children}</div>
  </Features>
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

  it('should toggle features on and off', () => {
    const App = () => (
      <Wrapper>
        <FeatureToggle features="firstName">
          <span>Jon</span>
        </FeatureToggle>
        <FeatureToggle features="lastName">
          <span>Appleseed</span>
        </FeatureToggle>
        <FeatureToggle features="address">
          <span>123 Main Street</span>
        </FeatureToggle>
        <FeatureToggler alwaysShow={true} />
      </Wrapper>
    );
    const { queryByText, getByTestId } = rtlRender(<App />);

    expect(queryByText(/jon/i)).toBeInTheDocument();
    expect(queryByText(/appleseed/i)).toBeInTheDocument();
    expect(queryByText(/123 main/i)).not.toBeInTheDocument();

    fireEvent.click(getByTestId('feature-toggler-checkbox-firstName'));
    fireEvent.click(getByTestId('feature-toggler-checkbox-lastName'));
    fireEvent.click(getByTestId('feature-toggler-checkbox-address'));

    expect(queryByText(/jon/i)).not.toBeInTheDocument();
    expect(queryByText(/appleseed/i)).not.toBeInTheDocument();
    expect(queryByText(/123 main/i)).toBeInTheDocument();
  });
});
