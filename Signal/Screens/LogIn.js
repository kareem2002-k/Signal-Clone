import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button , Image , TextInput } from 'react-native'
import { useState } from 'react'
import { useEffect, useLayoutEffect } from 'react'
import { auth } from '../Config/firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
const LogIn = ({navigation}) => {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    }, [])

    const handleLogin = () => {
     signInWithEmailAndPassword(auth, email, password)
     .catch((error) => {

         const errorCode = error.code;
         const errorMessage = error.message;
         // ..
     });

    }





    
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container} >
      <Image 
     source={require('../assets/Chat.png')}
        style = {{width: 170 , height: 200}}
        />
        <TextInput 
        style={styles.inputContainer}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        type="email"
        />


        <TextInput
         style={styles.inputContainer}
        placeholder="Enter your password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        type="password"

        />
        <Button onPress={handleLogin} title="Log In" />
        <Button   title="Sign Up"  onPress={() => navigation.navigate("Register")} />

    </KeyboardAvoidingView>
  )
}

export default LogIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding : 10,
        backgroundColor: "white",
        gap: 10,

        },

    inputContainer: {
        width: 300,
        borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    },
    button: {
        width: 200,
        marginTop: 10,
      
    },


})