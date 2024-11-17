import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
//auth screens
import SignUp from './screens/auth/signUp';
import SignIn from './screens/auth/signIn';

//main screens
import Home from './screens/main/home';
import Stats from './screens/main/stats';


import { AuthProvider, useAuth } from './store/loginContextProvider';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab   = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='signUp' component={SignUp} />
      <Stack.Screen name='signIn' component={SignIn} />
    </Stack.Navigator>
  );
};



const MainStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Stats" component={Stats} />
    </Tab.Navigator>

  );
};

const AppNavigator = () => {
  const { isLoggedIn } = useAuth();
  console.log("login status:",isLoggedIn)
  if (isLoggedIn === null) {
    return (
      <View style={styles.loaderContainer}>
        <Text>wait please</Text>
      </View>
    );
  }

  return isLoggedIn ? <MainStack /> : <AuthStack />;
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
