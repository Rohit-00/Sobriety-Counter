
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
//auth screens
import SignUp from './screens/auth/signUp';
import SignIn from './screens/auth/signIn';

//main screens
import Home from './screens/main/home';
import Stats from './screens/main/stats';


import { AuthProvider, useAuth } from './store/loginContextProvider';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlusButton from './components/plusButton';
import {  UserProvider } from './store/userContextProvider';
import { CountProvider } from './store/countContextProvider';

const Tab   = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='signIn' screenOptions={{ headerShown: false }} >
        <Stack.Screen name='signIn' component={SignIn} />
        <Stack.Screen name='signUp' component={SignUp} />
      </Stack.Navigator>
  );
};



const MainStack = () => {
  return (
<View style={{flex:1}}>
        <Tab.Navigator 
        screenOptions={{
          headerShown:false,
        }} 
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Stats" component={Stats} />
        </Tab.Navigator>
        <PlusButton/>
      </View>
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
    <GestureHandlerRootView>
    <AuthProvider>
    <UserProvider>
    <CountProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
    </CountProvider>
    </UserProvider>
    </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
