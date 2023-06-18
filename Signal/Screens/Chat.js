import { Keyboard, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLayoutEffect } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { useState } from 'react'
import { db, auth } from '../Config/firebase'
import {collection, addDoc, doc, setDoc} from "firebase/firestore";


const Chat = ({navigation , route}) => {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

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

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection("chats").doc(route.params.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,

        });
        setInput("");

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
                <ScrollView>
                 <Text>Chat Screen</Text>
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


})