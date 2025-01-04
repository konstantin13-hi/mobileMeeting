import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState('');

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'matches', matchDetails.id, 'messages'),
        orderBy('timestamp', 'desc'),
        limit(1)
      ),
      (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message || '')
    );
  }, [matchDetails]);

  return (
    <TouchableOpacity
      style={styles.rowContainer}
      onPress={() => navigation.navigate('Message', { matchDetails })}
    >
      {/* User Avatar */}
      <Image
        style={styles.avatar}
        source={{ uri: matchedUserInfo?.photos[0] }}
      />

      {/* Text Section */}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{matchedUserInfo?.displayName}</Text>
        <Text style={styles.message}>{lastMessage || 'Say Hi'}</Text>
      </View>

      {/* Example Timestamp */}
      <Text style={styles.time}>2 hours</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1b263b',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // Shadow for Android
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ffc107', // Golden border
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  message: {
    fontSize: 14,
    color: '#ccc',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
});

export default ChatRow;