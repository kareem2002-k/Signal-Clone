import { StyleSheet, Text, View ,  } from 'react-native'
import React from 'react'
import { ListItem } from 'react-native-elements'
import { useState } from 'react'
import { useEffect } from 'react'
import { db } from '../Config/firebase'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';




const CustomList = ({id , chatName , enterChat}) => {

 const [chatMessage, setChatMessage] = useState([]); //

    // get the last message sent in chat 
    useEffect(() => {
      const fetchChatMessages = async () => {
        const q = query(
          collection(db, 'chats', id, 'messages'),
          orderBy('timestamp', 'desc')
        );
  
        const querySnapshot = await getDocs(q);
        const messages = querySnapshot.docs.map((doc) => doc.data());
        setChatMessage(messages);
      };
  
      fetchChatMessages();
    }, [id]);
  
  return (
    <ListItem bottomDivider onPress={()=> enterChat(id , chatName)} >
        <ListItem.Content>
            <ListItem.Title style={{fontWeight: "800"}}>{chatName}</ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                {chatMessage[0]?.displayName} : {chatMessage[0]?.message}
            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
    
  )
}

export default CustomList

const styles = StyleSheet.create({})