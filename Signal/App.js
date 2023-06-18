import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogIn from './Screens/LogIn';
import Register from './Screens/Register';

export default function App() {

  const globalOptions = {
    headerStyle: { backgroundColor: "#5b70fd" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  };
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
     <Stack.Navigator screenOptions={globalOptions} >
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="Register" component={Register} />
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
