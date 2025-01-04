import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db, timestamp } from "../firebase";
import useHookAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import ReceiverMessage from "../components/ReceiverMessage";
import SenderMessage from "../components/SenderMessage";
import { Foundation, Ionicons } from "@expo/vector-icons";

const MessageScreen = ({navigation}) => {
  const { user } = useHookAuth();
  const route = useRoute();
  const { matchDetails } = route.params;
  const name = getMatchedUserInfo(matchDetails.users, user.uid).displayName;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "matches", matchDetails.id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );

    return unsubscribe;
  }, [matchDetails]);

  const sendMessage = () => {
    if (input.trim() === "") return;

    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp,
      userId: user.uid,
      displayName: user.displayName,
      photoURL: matchDetails.users[user.uid].photos[0],
      message: input.trim(),
    });

    setInput("");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity
          className="p-2"
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri: getMatchedUserInfo(matchDetails.users, user.uid).photos[0],
            }}
            style={styles.userImage}
          />
          <View>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userSubtitle}>
              {getMatchedUserInfo(matchDetails.users, user.uid).bio || ""}
            </Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <FlatList
              data={messages}
              keyExtractor={(item) => item.id}
              inverted
              style={styles.messageList}
              renderItem={({ item: message }) =>
                message.userId === user.uid ? (
                  <SenderMessage key={message.id} message={message} />
                ) : (
                  <ReceiverMessage key={message.id} message={message} />
                )
              }
            />

            {/* Input Section */}
            <View style={styles.inputSection}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Message..."
                placeholderTextColor="#888"
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={sendMessage}
              >
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b263b",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#1b263b",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  backButton: {
    color: "#ffc107",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#ffc107",
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  userSubtitle: {
    color: "#ccc",
    fontSize: 14,
  },
  messageList: {
    paddingHorizontal: 10,
  },
  inputSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1b263b",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#2e3b4e",
    borderRadius: 20,
    paddingHorizontal: 15,
    color: "#fff",
  },
  sendButton: {
    backgroundColor: "#ffc107",
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#1b263b",
    fontWeight: "bold",
  },
});

export default MessageScreen;