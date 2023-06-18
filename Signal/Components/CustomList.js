import { StyleSheet, Text, View ,  } from 'react-native'
import React from 'react'
import { ListItem } from 'react-native-elements'

const CustomList = () => {
  return (
    <ListItem>
        <ListItem.Content>
            <ListItem.Title style={{fontWeight: "800"}}>Title</ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                So this is my name i am kareem ahmed and iam trying to do my best to work on 
            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
    
  )
}

export default CustomList

const styles = StyleSheet.create({})