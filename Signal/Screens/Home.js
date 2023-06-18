import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { auth } from '../Config/firebase'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native'
import CustomList from '../Components/CustomList'
import { Avatar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

const Home = ({navigation}) => {

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("LogIn");
        });
    };

  
     
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat Me",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity>
                        <Text onPress={signOutUser} style={{ fontWeight: "bold" }}>Logout</Text>

                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginRight: 20,
                  
                }}>
                   
                   
                    <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>

                </View>
            ),

        });
    }, [navigation]);



  return (
    <SafeAreaView>  
        <ScrollView>
            <CustomList/>
            <CustomList/>
        </ScrollView>
    </SafeAreaView>

  )
}

export default Home

const styles = StyleSheet.create({})