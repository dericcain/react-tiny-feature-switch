import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Features, FeatureToggler, FeatureToggle, Else } from '../src';

const Profile = () => (
  <div className="profile">
    <FeatureToggle features="firstName">
      <span>John</span>
    </FeatureToggle>{' '}
    <FeatureToggle features="lastName">
      <span>Doe</span>
    </FeatureToggle>
    <FeatureToggle features="address">
      <div>123 Main Street, Birmingham, AL 35201</div>
    </FeatureToggle>
    <FeatureToggle features="avatar">
      <img src="https://via.placeholder.com/150" alt="Avatar" />
      <Else>
        <h3>Avatar coming soon!</h3>
        <p>
          This uses the <code>Else</code> component to conditionally render when the{' '}
          <code>FeatureSwitch</code> is disabled
        </p>
      </Else>
      <div>This will only be visible when the avatar is showing.</div>
    </FeatureToggle>
  </div>
);

// Don't know if this would ever be used, but it does take an array of features. If an array is used,
// both must be true in order for the children to be displayed.
const OtherFields = () => (
  <FeatureToggle features={['phone', 'zip']}>
    <div>Phone: 205.999.9912</div>
    <div>Zip: 35209</div>
  </FeatureToggle>
);

// This can be a JS object or even a JSON file.
const features = {
  firstName: true,
  lastName: true,
  address: true,
  avatar: false,
  phone: false,
  zip: false,
};

const App = () => (
  <Features features={features}>
    <div>
      <div className="App">
        <Profile />
        <OtherFields />
      </div>
      <FeatureToggler alwaysShow />
    </div>
  </Features>
);

ReactDOM.render(<App />, document.getElementById('root'));
