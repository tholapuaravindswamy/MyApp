// NotificationScreen.js
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
import { ArrowLeft, Search, ShoppingBag } from 'react-native-feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const IncidentLogNotifications = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('unread');
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  
  const handleBack = () => {
    navigation.goBack();
  };

  const notifications = [
    {
      id: 1,
      title: 'Incident Log',
      time: 'AYS Pro • now',
      status: 'reopened',
      statusText: 'Re-Opened:',
      description: 'Incident Type Name incident occurred on 01-04-2025 at 23:47 pertaining to Department Name,',
      icon: 'document',
      iconText: 'Category Name, Category Name',
    },
    {
      id: 2,
      title: 'Incident Log',
      time: 'AYS Pro • now',
      status: 'recovered',
      statusText: 'Recovered:',
      description: 'Incident Type Name incident occurred on 01-04-2025 at 23:47 pertaining to Department Name,',
      icon: 'document',
      iconText: 'Category Name, Category Name',
    },
    {
      id: 3,
      title: 'Incident Log',
      time: 'AYS Pro • now',
      status: 'new',
      statusText: 'New:',
      description: 'Incident Type Name incident occurred on 01-04-2025 at 23:47 pertaining to Department Name',
      icon: 'document',
      iconText: 'Category Name, Category Name',
    },
    {
      id: 4,
      title: 'Incident Log',
      time: 'AYS Pro • now',
      status: 'resolved',
      statusText: 'Resolved:',
      description: 'Incident Type Name incident occurred on 01-04-2025 at 23:47 pertaining to Department Name',
      icon: 'document',
      iconText: 'Category Name, Category Name',
    },
    {
      id: 5,
      title: 'Incident Log',
      time: 'AYS Pro • now',
      status: 'delayed',
      statusText: 'Resolution Delayed:',
      description: 'Incident Type Name incident occurred on 01-04-2025 at 23:47 pertaining to Department Name,',
      icon: 'document',
      iconText: 'Category Name, Category Name',
    },
    {
      id: 6,
      title: 'Incident Log',
      time: 'AYS Pro • now',
      status: 'recovery',
      statusText: 'Recovery Delayed:',
      description: 'Incident Type Name incident occurred on 01-04-2025 at 23:47 pertaining to Department Name,',
      icon: 'document',
      iconText: 'Category Name, Category Name',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return '#4CAF50'; // Green
      case 'recovered':
        return '#9C27B0'; // Purple
      case 'resolved':
        return '#2196F3'; // Blue
      case 'reopened':
        return '#F44336'; // Red
      case 'delayed':
      case 'recovery':
        return '#FF9800'; // Orange
      default:
        return '#000000';
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredNotifications = searchText 
    ? notifications.filter(notification => 
        notification.description.toLowerCase().includes(searchText.toLowerCase()) ||
        notification.statusText.toLowerCase().includes(searchText.toLowerCase()) ||
        notification.iconText.toLowerCase().includes(searchText.toLowerCase())
      )
    : notifications;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

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
            {/* Back Button */}
            <TouchableOpacity 
              onPress={handleBack}
              style={styles.backButton}
            >
              <AntDesign name="back" size={26} color="white" />
            </TouchableOpacity>
            
            {/* Title */}
            <Text style={styles.headerTitle}>Notifications</Text>

            {/* Search Icon with Circle Background */}
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

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "all" && styles.activeTab]}
            onPress={() => setActiveTab("all")}
          >
            <Text style={[styles.tabText, activeTab === "all" && styles.activeTabText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "unread" && styles.activeTab]}
            onPress={() => setActiveTab("unread")}
          >
            <Text style={[styles.tabText, activeTab === "unread" && styles.activeTabText]}>Unread</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.markAllRead}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      {/* Notification List */}
      <ScrollView style={styles.notificationList}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <View key={notification.id} style={styles.notificationItem}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar} />
              </View>
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationTime}>• {notification.time}</Text>
                </View>

                <View style={styles.notificationBody}>
                  <Text style={styles.notificationText}>
                    <Text style={[styles.statusText, { color: getStatusColor(notification.status) }]}>
                      {notification.statusText}
                    </Text>{" "}
                    {notification.description}
                  </Text>
                </View>

                <View style={styles.notificationFooter}>
                  <View style={styles.documentIcon}>
                    <Text style={styles.documentIconText}>📄</Text>
                  </View>
                  <Text style={styles.iconText}>{notification.iconText}</Text>
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
    backgroundColor: "#EBF0FA",
    bottom:10
  },
  header: {
    backgroundColor: "#000",
    paddingTop: 1,
    paddingBottom: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    right:60
  },
  fullSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
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
    color: "#333",
    padding: 0,
  },
  circleButton: {
    padding: 4,
  },
  circleContainer: {
    position: "relative",
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 17.5,
    backgroundColor: "#fff",
  },
  searchIcon: {
    position: "absolute",
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 4,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  activeTab: {
    backgroundColor: "#FF5722",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "600",
  },
  markAllRead: {
    color: "#FF5722",
    fontSize: 14,
    fontWeight: "500",
  },
  notificationList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  notificationTime: {
    fontSize: 13,
    color: "grey",
    marginLeft: 4,
  },
  notificationBody: {
    marginBottom: 6,
  },
  notificationText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  statusText: {
    fontWeight: "600",
  },
  notificationFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  documentIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 4,
    marginRight: 6,
  },
  documentIconText: {
    fontSize: 12,
  },
  iconText: {
    fontSize: 13,
    color: "grey",
  },
  noResults: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
  },
});

export default IncidentLogNotifications;