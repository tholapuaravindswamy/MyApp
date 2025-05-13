import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TextInput,
  Keyboard,
} from 'react-native';
import { ArrowLeft, User, CornerUpRight, Search, Menu, Volume, Volume1, Volume2 } from 'react-native-feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const GuestChatScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  
  // Mock chat data
  const chatData = [
    { id: '1', sender: 'Anirudh Jonnalagadda', message: 'Hi! How are you doing?', time: '14:58', isUnread: false },
    { id: '2', sender: 'Mana organization', message: 'Hi! How are you doing?', time: 'Monday', isUnread: true },
    { id: '3', sender: 'Srinivas Aggala', message: 'Hi! How are you doing?', time: '01-04-2025', isUnread: true },
    { id: '4', sender: 'Srija Colleti ', message: 'Hi! How are you doing?', time: 'Wednesday', isUnread: false },
    { id: '5', sender: 'sai sri Anirudh', message: 'Hi! How are you doing?', time: '01-15-2025', isUnread: false },
    { id: '6', sender: ' Jonnalagadda', message: 'Hi! How are you doing?', time: '14:58', isUnread: false },
    { id: '7', sender: 'Anirudh ', message: 'Hi! How are you doing?', time: 'Monday', isUnread: true },
    { id: '8', sender: 'Anirudh Jonnalagadda', message: 'Hi! How are you doing?', time: 'Wednesday', isUnread: false },
    { id: '9', sender: 'Harsha Ammla', message: 'Hi! How are you doing?', time: 'Monday', isUnread: true },
    { id: '10', sender: 'Musthak Gangavaram', message: 'Hi! How are you doing?', time: 'Wednesday', isUnread: false },
  ];

  // Initialize filtered data with all chat data
  useEffect(() => {
    setFilteredData(chatData);
  }, []);

  // Handle search functionality
  const handleSearch = (text) => {
    setSearchText(text);
    
    if (text.trim() === '') {
      setFilteredData(chatData);
    } else {
      const lowercasedQuery = text.toLowerCase();
      const filtered = chatData.filter(
        item => 
          item.sender.toLowerCase().includes(lowercasedQuery) || 
          item.message.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredData(filtered);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChatPress = (chatId) => {
    navigation.navigate('ChatDetail', { chatId });
  };

  const HandleMenu = () => {
    navigation.openDrawer();
  };

  const renderChatItem = ({ item }) => {
    const isVolume2 = ['1', '4', '7'].includes(item.id); 
  
    return (
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
            {isVolume2 ? (
              <Volume1 stroke="#666" width={18} height={18} />
            ) : (
              <Volume2 stroke="#666" width={18} height={18} />
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  


  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No results found</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        {isSearching ? (
          <View style={styles.fullSearchContainer}>
            <TouchableOpacity 
              onPress={() => {
                setIsSearching(false);      
                setSearchText('');            
                setFilteredData(chatData);   
                Keyboard.dismiss();
              }} 
              style={styles.SearchbackButton}
            >
              <AntDesign name="back" size={26} style={{ color: "black" }} />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#999"
              value={searchText}
              keyboardAppearance='dark'
              onChangeText={handleSearch}
              autoFocus={true}
            />
            <TouchableOpacity>
              <Search color="#000" size={20} />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <AntDesign name="back" size={26} style={{color: "white"}} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Chat</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity 
                style={styles.headerButton} 
                onPress={() => setIsSearching(true)}
              >
                <Search stroke="#000" width={20} height={20} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      
      {/* Tab Navigation - Only show when not searching */}
      {!isSearching && (
        <View style={styles.tabContainer}>
          {['All', 'Unread', 'Group'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, isActive && styles.activeTab]}
                onPress={() => handleTabChange(tab)}
              >
                <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      
      {/* Chat List */}
      <FlatList
        data={filteredData}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.chatList,
          filteredData.length === 0 && styles.emptyListContent
        ]}
        ListEmptyComponent={renderEmptyList}
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
    height: 69,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
marginBottom:30, 
padding:5
 },
 SearchbackButton:{
  marginBottom:1 

 },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    bottom: 15,
    right: 90,
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 5,
    marginLeft: 15,
    bottom: 13,
    backgroundColor:'white',
    borderRadius:20
  },
  fullSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eceff1',
    borderRadius: 30,
    paddingHorizontal: 12,
    flex: 1,
    marginVertical: 10,
    bottom: 15,
  },
  searchInput: {
    flex: 1,
    color: '#000',
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 19,
    paddingVertical: 1,
    borderBottomColor: '#f0f0f0',
    bottom: 18,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 29,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    backgroundColor: '#fff', // Inactive background
  },
  activeTab: {
    backgroundColor: '#FF5722', // Active background
  },
  tabText: {
    fontSize: 14,
    color: '#000', // Default inactive text color
  },
  activeTabText: {
    color: '#fff', // Active text color
    fontWeight: '500',
  },
  chatList: {
    paddingVertical: 10,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    bottom: 10,
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
    color: '#000',
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

export default GuestChatScreen;