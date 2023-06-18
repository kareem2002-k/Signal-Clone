import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { auth } from '../Config/firebase'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native'
import CustomList from '../Components/CustomList'
import { Avatar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { db } from '../Config/firebase'
import { useState } from 'react'
import { collection  } from 'firebase/firestore'
import { getDocs } from 'firebase/firestore'
const Home = ({navigation}) => {
    const [chats, setChats] = useState([]); //

    useEffect(() => {
        const fetchChats = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, 'chats'));
            const chatsData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }));
            setChats(chatsData);
          } catch (error) {
            console.error('Error fetching chats:', error);
          }
        };
      
        fetchChats();
      
        // Clean up the subscription
        return () => {
          // Cleanup code, if any
        };
      }, []);



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

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {

            id,
            chatName,
        });
    };



  return (
    <SafeAreaView>  
        <ScrollView>
            {chats.map(({ id, data: { chatName } }) => (
                <CustomList key={id} id={id} chatName={chatName}  enterChat={enterChat} />
            ))}

        </ScrollView>
    </SafeAreaView>

  )
}

export default Home

const styles = StyleSheet.create({})