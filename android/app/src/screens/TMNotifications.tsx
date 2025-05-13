// LFNotificationsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { ArrowLeft, Search } from 'react-native-feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TMNotifications = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleMarkAllRead = () => {
    // Handle mark all read functionality
    console.log('Mark all read');
  };

  // Mock notifications data based on the screenshot
  const notifications = [
    {
      id: '1',
      title: 'Task Manager',
      source: 'AYS Pro',
      time: 'now',
      status: 'New',
      statusColor: '#4CAF50', // Green
      description: 'Handover Type Name handover for Section Name, Section Name with Resolution Type Name is created',
      category: 'Title Name',
      icon: 'document-text-outline',
    },
    {
      id: '2',
      title: 'Task Manager',
      source: 'AYS Pro',
      time: 'now',
      status: 'Resolved',
      statusColor: '#2196F3', // Blue
      description: 'Handover Type Name handover for Section Name, Section Name with Resolution Type Name is resolved',
      category: 'Title Name',
      icon: 'document-text-outline',
    },
    {
      id: '3',
      title: 'Task Manager',
      source: 'AYS Pro',
      time: 'now',
      status: 'Delayed',
      statusColor: '#FF9800', // Orange
      description: 'Handover Type Name handover for Section Name, Section Name with Resolution Type Name is delayed',
      category: 'Title Name',
      icon: 'document-text-outline',
    },
    {
      id: '4',
      title: 'Task Manager',
      source: 'AYS Pro',
      time: 'now',
      status: 'Re-opened',
      statusColor: '#F44336', // Red
      description: 'Handover Type Name handover for Section Name, Section Name with Resolution Type Name is re-opened',
      category: 'Title Name',
      icon: 'document-text-outline',
    },
    {
      id: '5',
      title: 'Task Manager',
      source: 'AYS Pro',
      time: 'now',
      status: 'Cancelled',
      statusColor: '#9E9E9E', // Gray
      description: 'Handover Type Name handover for Section Name, Section Name with Resolution Type Name is cancelled',
      category: 'Title Name',
      icon: 'document-text-outline',
    },
    {
      id: '6',
      title: 'Task Manager',
      source: 'AYS Pro',
      time: 'now',
      status: 'Assigned',
      statusColor: '#4CAF50', // Green
      description: 'Handover Type Name handover for Section Name, Section Name with Resolution Type Name is assigned to you',
      category: 'Title Name',
      icon: 'document-text-outline',
    },
    {
      id: '7',
      title: 'Task Manager',
      source: 'AYS Pro',
      time: 'now',
      status: 'Unassigned',
      statusColor: '#9C27B0', // Purple
      description: 'Handover Type Name handover for Section Name, Section Name with Resolution Type Name is unassigned',
      category: 'Title Name',
      icon: 'document-text-outline',
    },
  ];

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredNotifications = searchText 
    ? notifications.filter(notification => 
        notification.description.toLowerCase().includes(searchText.toLowerCase()) ||
        notification.status.toLowerCase().includes(searchText.toLowerCase()) ||
        notification.category.toLowerCase().includes(searchText.toLowerCase()) ||
        notification.title.toLowerCase().includes(searchText.toLowerCase())
      )
    : notifications;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={styles.header}>
        {isSearching ? (
          <View style={styles.fullSearchContainer}>
            <TouchableOpacity 
              onPress={() => {
                setIsSearching(false);
                setSearchText('');
              }} 
              style={styles.searchBackButton}
            >
              <AntDesign name="back" size={26} color="black" />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#999"
              value={searchText}
              keyboardAppearance="dark"
              onChangeText={handleSearch}
              autoFocus
            />
            <TouchableOpacity>
              <Search color="#000" size={20} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBack}
            >
              <AntDesign name="back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Notifications</Text>
            <TouchableOpacity 
              style={styles.circleButton}
              onPress={() => setIsSearching(true)}
            >
              <View style={styles.circleContainer}>
                <View style={styles.circle} />
                <Search stroke="black" width={20} height={20} style={styles.searchIcon} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      {/* Filter Section */}
      <View style={styles.tabContainer}>
        <View style={styles.tabs}>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'All' && styles.activeTab
            ]}
            onPress={() => setActiveTab('All')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'All' && styles.activeTabText
            ]}>All</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'Unread' && styles.activeTab
            ]}
            onPress={() => setActiveTab('Unread')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'Unread' && styles.activeTabText
            ]}>Unread</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={handleMarkAllRead}>
          <Text style={styles.markAllRead}>Mark all read</Text>
        </TouchableOpacity>
      </View>
      
      {/* Notifications List */}
      <ScrollView 
        style={styles.notificationList}
        showsVerticalScrollIndicator={false}
      >
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <View key={notification.id} style={styles.notificationItem}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar} />
              </View>
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationTime}>• {notification.source} • {notification.time}</Text>
                </View>

                <View style={styles.notificationBody}>
                  <Text style={styles.notificationText}>
                    <Text style={[styles.statusText, { color: notification.statusColor }]}>
                      {notification.status}:{' '}
                    </Text>
                    {notification.description}
                  </Text>
                </View>

                <View style={styles.notificationFooter}>
                  <Ionicons name={notification.icon} size={18} color="#666" style={styles.footerIcon} />
                  <Text style={styles.iconText}>{notification.category}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No notifications found</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#000000',
    paddingTop: 1,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    right:65
  },
  circleButton: {
    padding: 4,
  },
  circleContainer: {
    position: 'relative',
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 17.5,
    backgroundColor: '#FFFFFF',
  },
  searchIcon: {
    position: 'absolute',
  },
  fullSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  searchBackButton: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333333',
    padding: 0,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: 4,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  activeTab: {
    backgroundColor: '#FF5722',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  markAllRead: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF5722',
  },
  notificationList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
  },
  notificationTime: {
    fontSize: 13,
    color: '#666666',
    marginLeft: 4,
  },
  notificationBody: {
    marginBottom: 6,
  },
  notificationText: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
  },
  statusText: {
    fontWeight: '600',
  },
  notificationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerIcon: {
    marginRight: 6,
  },
  iconText: {
    fontSize: 13,
    color: '#666666',
  },
  noResults: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666666',
  },
});

export default TMNotifications;