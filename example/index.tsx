import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { FeatureToggle, FeatureToggler, FeatureSwitch, Else } from '../src';

const Profile = () => (
  <div className="profile">
    <FeatureSwitch features="firstName">
      <span>John</span>
    </FeatureSwitch>{' '}
    <FeatureSwitch features="lastName">
      <span>Doe</span>
    </FeatureSwitch>
    <FeatureSwitch features="address">
      <div>123 Main Street, Birmingham, AL 35201</div>
    </FeatureSwitch>
    <FeatureSwitch features="avatar">
      <img src="https://via.placeholder.com/150" alt="Avatar" />
      <Else>
        <h3>Avatar coming soon!</h3>
        <p>
          This uses the <code>Else</code> component to conditionally render when the{' '}
          <code>FeatureSwitch</code> is disabled
        </p>
      </Else>
      <div>This will only be visible when the avatar is showing.</div>
    </FeatureSwitch>
  </div>
);

const OtherFields = () => (
  <FeatureSwitch features={['phone', 'zip']}>
    <div>Phone: 205.999.9912</div>
    <div>Zip: 35209</div>
  </FeatureSwitch>
);

const Version1Dot1 = () => (
  <FeatureSwitch features="v1.1">
    <div>This is version 1.1</div>
  </FeatureSwitch>
);

// This can be a JS object or even a JSON file.
const features = {
  firstName: true,
  lastName: true,
  address: true,
  avatar: false,
  phone: false,
  zip: false,
  v1: ['firstName', 'lastName'],
  'v1.1': ['phone', 'zip'],
};

const App = () => (
  <FeatureToggle features={features}>
    <div>
      <div className="App">
        <Profile />
        <OtherFields />
      </div>
      <FeatureToggler alwaysShow />
    </div>
  </FeatureToggle>
);

ReactDOM.render(<App />, document.getElementById('root'));
