import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './components/registration/SignUp';
import SignInScreen from './components/registration/SignIn';



const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="sign-up">
        <Stack.Screen name="sign-up" component={SignUpScreen} />
        <Stack.Screen name="sign-in" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


