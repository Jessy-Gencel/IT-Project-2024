import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import MessageListHeader from "../components/MessageListHeader";
import Ionicons from "react-native-vector-icons/Ionicons";


const ChatList = ({navigation, isUnread, isMuted }) => {
  return (
    <View style={styles.container}>
        <MessageListHeader style={styles.MessageListHeader}/>
        <Text style={styles.title}>Messages</Text>
        <View style={styles.listOfChats}>
          <View style={styles.chatListContainer}>
                <Image
                    source = {require('../assets/brent_klein.png')}
                />
                <View style={styles.senderAndMessage}>
                  <Text style= {styles.sender}>Brent Devroey</Text>
                  <View style={styles.timeAndMessage}>
                    <Text numberOfLines={1} style={[styles.message, isUnread && styles.messageUnread]}>Waar zijn jullie? Ik sta aan aula 1</Text>
                    <Text style={[styles.time, isUnread && styles.timeUnread]}>12:33</Text>
                  </View>
                </View>
                <View>
                  {isMuted ? (
                    <Ionicons
                      name="notifications-off-outline"
                      size={20}
                      color="#888"
                      style={styles.mutedIcon}
                    />
                  ) : (
                    isUnread && <View style={styles.dot} />
                  )}
                </View>
          </View>
            <View style={styles.chatListContainer}>
                <Image
                    source = {require('../assets/brent_klein.png')}
                />
                <View style={styles.senderAndMessage}>
                  <Text style= {styles.sender}>Brent Devroey</Text>
                  <View style={styles.timeAndMessage}>
                    <Text numberOfLines={1} style={styles.message}>Waar zijn jullie? Ik sta aan aula 1</Text>
                    <Text>12:33</Text>
                  </View>
                </View>
                <View>
                  {isMuted ? (
                    <Ionicons
                      name="notifications-off-outline"
                      size={20}
                      color="#888"
                      style={styles.mutedIcon}
                    />
                  ) : (
                    isUnread && <View style={styles.dot} />
                  )}
                </View>
            </View>
        </View>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FAFAFA',
  },
  chatListContainer: {
    flexDirection: "row",
    marginTop: 10,
  }
  ,
  senderAndMessage: {
    flexDirection: "column",
    alignSelf: "center",
    marginBottom: 20,
    marginLeft: 15,
    marginTop: 20,
  },
  title:{
    fontWeight: 800,
    color: '#353535',
    fontSize: 18,
    marginBottom: 10,
  },
  sender: {
    fontWeight: 230,
    color: '#353535',
    fontSize: 20,
    marginBottom: 5,
  },
  message:{
    color: '#353535',
    fontSize: 14,
    width: 160,
  },
  timeAndMessage: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    gap: 20,
    fontWeight: 'bold',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#FBB03B",
    marginHorizontal: 5,
    alignSelf: "center",
    marginLeft: 30,

  },



  //unread message

  messageUnread: {
    fontWeight: 'bold',
  },
  timeUnread: {
    fontWeight: 'bold',
  }

});
export default ChatList;