import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { db } from '../Config/firebase'
import { TouchableOpacity } from 'react-native'
import { Button, Input } from 'react-native-elements'

const AddChat = ({navigation}) => {
    const [input, setInput] = useState("");
    const createChat = async () => {
        try {
            await db.collection("chats").add({
                chatName: input,
            });
            navigation.goBack();
        }
        catch (error) {
            alert(error);

        }
        
    };

  return (
    <View style={{
        backgroundColor: "white",
        padding: 30,
        height: "100%",

    }}>
      
        <Input  
            placeholder="Enter a chat name"
            value={input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={createChat}
        />
        <Button title={"Create Chat"} onPress={createChat}>
            
        </Button>



    </View>
  )
}

export default AddChat

const styles = StyleSheet.create({})