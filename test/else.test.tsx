import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Else } from '../src';

describe('<Else />', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Else>
        <div>Here</div>
      </Else>,
    );
    expect(getByText('Here')).toBeVisible();
  });
});
