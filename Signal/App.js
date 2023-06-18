import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogIn from './Screens/LogIn';
import Register from './Screens/Register';
import Home from './Screens/Home';
import AddChat from './Screens/AddChat';
import Chat from './Screens/Chat';

export default function App() {

  const globalOptions = {
    headerStyle: { backgroundColor: "#5b70fd" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  };
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
     <Stack.Navigator 
      initialRouteName="LogIn"
      screenOptions={globalOptions} >
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddChat" component={AddChat} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
