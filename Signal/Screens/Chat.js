import { Keyboard, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useLayoutEffect } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { useState } from 'react'
import { db, auth } from '../Config/firebase'
import {collection, addDoc, doc, setDoc , serverTimestamp} from "firebase/firestore";
import firebase from "firebase/app";
import { onSnapshot, query, orderBy } from "firebase/firestore";
import { getDocs, limit } from "firebase/firestore";
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { useRef } from 'react'


const Chat = ({navigation , route}) => {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const scrollViewRef = useRef();

    useLayoutEffect(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, [messages]);



    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            marginLeft: 10,
                            fontWeight: "700",
                            fontSize: 20,
                        }}
                    >
                        {route.params.chatName}
                    </Text>
                </View>
            ),
        });
    }, [navigation]);

    useLayoutEffect(() => {
        const fetchMessages = async () => {
          const querySnapshot = await getDocs(
            query(
              collection(db, 'chats', route.params.id, 'messages'),
              orderBy('timestamp'),  // Assuming 'timestamp' is the field you want to order the messages by
            )
          );
    
          setMessages(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        };
    
        fetchMessages();
    
        const unsubscribe = onSnapshot(
          query(
            collection(db, 'chats', route.params.id, 'messages'),
            orderBy('timestamp')  // Assuming 'timestamp' is the field you want to order the messages by
          ),
          (snapshot) => {
            setMessages(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
          }
        );
    
        return unsubscribe;
      }, [route.params]);



    const sendMessage = async () => {
        Keyboard.dismiss();
        const messagesRef = collection(db, 'chats', route.params.id, 'messages');
        const messageData = {
          timestamp: serverTimestamp(),
          message: input,
          displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
        };
      
        try {
          await addDoc(messagesRef, messageData);
          setInput('');
        } catch (error) {
          console.error('Error sending message:', error);
        }


    };



  return (
    <SafeAreaView style={{
        flex: 1,
        backgroundColor: "white",
    }}>
        <StatusBar style="light" />
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={90}
        >
            <>
            <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.scrollViewContent}
      onContentSizeChange={() =>
        scrollViewRef.current.scrollToEnd({ animated: true })
      }
    >
      {messages.map(({ id, data }) => (
        <View
          key={id}
          style={data.email !== auth.currentUser.email ? styles.receiver : styles.sender}
        >
          <Text style={data.email !== auth.currentUser.email ? styles.receiverText : styles.senderText}>
            {data.message}
          </Text>
          <Text style={data.email !== auth.currentUser.email ? styles.receiverName : styles.senderName}>
            {data.email}
          </Text>
        </View>
      ))}
    </ScrollView>
                <View style={styles.footer}>
                    <TextInput
                        placeholder="Signal Message"
                        style={styles.textInput}
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        onSubmitEditing={sendMessage}

                    />
                 
                    <TouchableOpacity  onPress={sendMessage} activeOpacity={0.5}>  
                        <Ionicons name="send" size={24} color="#2B68E6" />
                    </TouchableOpacity>

                </View>
            </>
        </KeyboardAvoidingView>


    </SafeAreaView>

  )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,

    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },
    receiverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },
    receiver: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    sender: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",
    },
    receiverName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "black",
    },





})