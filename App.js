import { View, Text } from 'react-native';
import React from 'react';
import AppNavigator from './src/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { StripeProvider } from '@stripe/stripe-react-native';
import { STRIPE_PUBLISHABLE_KEY } from './stripeConfig';
const App = () => {
  console.log(STRIPE_PUBLISHABLE_KEY, 'STRIPE_PUBLISHABLE_KEY>>');
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </StripeProvider>
  );
};

export default App;
