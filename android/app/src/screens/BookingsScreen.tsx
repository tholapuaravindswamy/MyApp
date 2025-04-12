import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import { ArrowLeft, Plus, Settings, User, CornerUpRight, Search } from 'react-native-feather'; // You may need to install this package
import AntDesign from 'react-native-vector-icons/AntDesign';

const BookingsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('All');
  
  // Mock chat data
  const chatData = [
    { id: '1', sender: 'Anirudh Jonnalagadda', message: 'Hi! How are you doing?', time: '14:58', isUnread: false },
    { id: '2', sender: 'Anirudh Jonnalagadda', message: 'Hi! How are you doing?', time: 'Monday', isUnread: true },
    { id: '3', sender: 'Anirudh Jonnalagadda', message: 'Hi! How are you doing?', time: '01-04-2025', isUnread: true },
    { id: '4', sender: 'Anirudh Jonnalagadda', message: 'Hi! How are you doing?', time: 'Wednesday', isUnread: false },
    { id: '5', sender: 'Anirudh Jonnalagadda', message: 'Hi! How are you doing?', time: '01-15-2025', isUnread: false },
    { id: '6', sender: 'Anirudh Jonnalagadda', message: 'Hi! How are you doing?', time: '14:58', isUnread: false },
    { id: '7', sender: 'Anirudh Jonnalagadda', message: 'Hi! How are you doing?', time: 'Monday', isUnread: true },
    { id: '8', sender: 'Anirudh Jonnalagadda', message: 'Hi! How are you doing?', time: 'Wednesday', isUnread: false },
    { id: '9', sender: 'Anirudh Jonnalagadda', message: 'Hi! How are you doing?', time: 'Monday', isUnread: true },
    { id: '10', sender: 'Anirudh Jonnalagadda', message: 'Hi! How are you doing?', time: 'Wednesday', isUnread: false },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNewChat = () => {
navigation.navigate('TaskDetailsScreen')  };

  const handleSettings = () => {
    // Handle settings functionality
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChatPress = (chatId) => {
    // Navigate to individual chat
    navigation.navigate('ChatDetail', { chatId });
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem} 
      onPress={() => handleChatPress(item.id)}
    >
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <User stroke="#666" width={20} height={20} />
        </View>
      </View>
      
      <View style={styles.chatContent}>
        <Text style={styles.senderName}>{item.sender}</Text>
        <Text style={styles.messagePreview} numberOfLines={1}>{item.message}</Text>
      </View>
      
      <View style={styles.chatMeta}>
        <Text style={styles.timeText}>{item.time}</Text>
        {item.isUnread && <View style={styles.unreadIndicator} />}
        <TouchableOpacity style={styles.replyButton}>
          <CornerUpRight stroke="#666" width={18} height={18} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
  <AntDesign name="back" size={26} style={{color: "white" }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton} onPress={handleNewChat}>
            <Plus stroke="#fff" width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleSettings}>
            <Search stroke="#fff" width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {['All', 'Unread', 'Group'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && (tab === 'Unread' ? styles.activeUnreadTab : styles.activeTab)
            ]}
            onPress={() => handleTabChange(tab)}
          >
            <Text 
              style={[
                styles.tabText,
                activeTab === tab && (tab === 'Unread' ? styles.activeUnreadTabText : styles.activeTabText)
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Chat List */}
      <FlatList
        data={chatData}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 5,
    marginLeft: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#FF5722',
  },
  activeUnreadTab: {
    backgroundColor: '#FF5722',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '500',
  },
  activeUnreadTabText: {
    color: '#fff',
    fontWeight: '500',
  },
  chatList: {
    paddingVertical: 10,
  },
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  senderName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  messagePreview: {
    fontSize: 13,
    color: '#666',
  },
  chatMeta: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginBottom: 5,
  },
  replyButton: {
    padding: 5,
  },
});

export default BookingsScreen;