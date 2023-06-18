import { StyleSheet, Text, View ,  } from 'react-native'
import React from 'react'
import { ListItem } from 'react-native-elements'

const CustomList = ({id , chatName , enterChat}) => {
  return (
    <ListItem bottomDivider onPress={()=> enterChat(id , chatName)} >
        <ListItem.Content>
            <ListItem.Title style={{fontWeight: "800"}}>{chatName}</ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                So this is my name i am kareem ahmed and iam trying to do my best to work on 
            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
    
  )
}

export default CustomList

const styles = StyleSheet.create({})