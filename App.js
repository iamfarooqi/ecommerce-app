import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './components/registration/SignUp';
import SignInScreen from './components/registration/SignIn';



const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="sign-up" screenOptions={{
        headerStyle: {
          backgroundColor: '#9400D3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="sign-up" component={SignUpScreen} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="sign-in" component={SignInScreen} options={{ title: 'Sign In' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


