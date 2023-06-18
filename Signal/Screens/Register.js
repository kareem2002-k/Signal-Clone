import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button , Image , TextInput } from 'react-native'
import { useState } from 'react'
import { useEffect, useLayoutEffect } from 'react'
import { auth } from '../Config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'




const Register = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
   
   useLayoutEffect(() => {
         navigation.setOptions({
                headerBackTitle: "Back to Login",
            });

        return () => {
            console.log("cleanup");
        }

    }, [navigation])

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            userCredential.user.updateProfile({
                displayName: name,
                



            })
        }
        )
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        }
        );

    }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container} >
    <Text style={{fontSize: 20 , marginBottom: 50}}>Create a new account</Text>
       <TextInput 
      style={styles.inputContainer}
      placeholder="Full name"
      value={name}
      onChangeText={(text) => setName(text)}
      
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
         <TextInput
       style={styles.inputContainer}
      placeholder="Confirm your password"
      value={confirmpassword}
      onChangeText={(text) => setConfirmPassword(text)}
      secureTextEntry
      type="password"

      />
      <Button onPress={handleRegister} title="Register"   />

  </KeyboardAvoidingView>
  )
}

export default Register

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