import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Use this instead of react-native-feather
import AntDesign from 'react-native-vector-icons/AntDesign';


const ChatDetailScreen = ({route, navigation}) => {
  const [message, setMessage] = useState('');
  const flatListRef = useRef(null);

  // Mock chat data
  const chatData = {
    user: {
      id: '1',
      name: "User's Name",
      status: 'Online',
      avatar: null,
    },
    messages: [
      {
        id: '1',
        text: 'Hello',
        timestamp: '23:00',
        date: '01-01-2025',
        isOutgoing: false,
      },
      {
        id: '2',
        text: 'Hello',
        timestamp: '23:00',
        date: '01-01-2025',
        isOutgoing: true,
        isRead: true,
      },
    ],
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSendMessage = () => {
    if (message.trim() === '') {
      return;
    }
    setMessage('');
  };

  const renderDateSeparator = date => (
    <View style={styles.dateSeparator}>
      <Text style={styles.dateText}>{date}</Text>
    </View>
  );

  const renderMessage = ({item, index}) => {
    // Check if we need to show the date separator
    const showDateSeparator =
      index === 0 ||
      (index > 0 && item.date !== chatData.messages[index - 1].date);

    return (
      <>
        {showDateSeparator && renderDateSeparator(item.date)}
        <View
          style={[
            styles.messageContainer,
            item.isOutgoing ? styles.outgoingMessage : styles.incomingMessage,
          ]}>
          {!item.isOutgoing && (
            <View style={styles.messageAvatar}>
              <View
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: '#666',
                  borderRadius: 8,
                }}
              />
            </View>
          )}
          <View
            style={[
              styles.messageBubble,
              item.isOutgoing ? styles.outgoingBubble : styles.incomingBubble,
            ]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <View style={styles.messageFooter}>
              <Text style={styles.timestampText}>{item.timestamp}</Text>
              {item.isOutgoing && (
                <View style={styles.readReceipt}>
                  <Text
                    style={{
                      color: item.isRead ? '#4CAF50' : '#999',
                      fontSize: 10,
                    }}>
                    ✓✓
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
  <AntDesign name="back" size={26} style={{  color: "white" }} />
        </TouchableOpacity>

        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Icon name="user" size={20} color="#fff" />
          </View>
          <View style={styles.userTextInfo}>
            <Text style={styles.userName}>{chatData.user.name}</Text>
            <Text style={styles.userStatus}>{chatData.user.status}</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="video" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="phone" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="search" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Messages */}
      <FlatList
        ref={flatListRef}
        data={chatData.messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({animated: true})
        }
      />

      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <View style={styles.inputContainer}>
          <View style={styles.inputActions}>
            <TouchableOpacity style={styles.inputActionButton}>
              <Icon name="smile" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputActionButton}>
              <Icon name="paperclip" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.textInput}
            placeholder="Type your message"
            value={message}
            onChangeText={setMessage}
            multiline
          />

          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}>
            <Icon name="mic" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 60,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    padding: 5,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userTextInfo: {
    marginLeft: 10,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  userStatus: {
    color: '#ccc',
    fontSize: 12,
  },
  headerActions: {
    flexDirection: 'row',

  },
  headerButton: {
    padding: 5,
    marginLeft: 15,
    backgroundColor:"white",
    borderRadius:20
  },
  messagesContainer: {
    padding: 15,
    paddingBottom: 20,
  },
  dateSeparator: {
    alignItems: 'center',
    marginVertical: 15,
  },
  dateText: {
    backgroundColor: '#e0e0e0',
    color: '#666',
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    maxWidth: '80%',
  },
  incomingMessage: {
    alignSelf: 'flex-start',
  },
  outgoingMessage: {
    alignSelf: 'flex-end',
  },
  messageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 15,
    minWidth: 80,
  },
  incomingBubble: {
    backgroundColor: '#e0e0e0',
    borderBottomLeftRadius: 5,
  },
  outgoingBubble: {
    backgroundColor: '#e8f1f3',
    borderBottomRightRadius: 5,
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 5,
  },
  timestampText: {
    fontSize: 11,
    color: '#999',
  },
  readReceipt: {
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  inputActions: {
    flexDirection: 'row',
  },
  inputActionButton: {
    padding: 5,
    marginRight: 5,
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
  },
  sendButton: {
    padding: 5,
    marginLeft: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatDetailScreen;
