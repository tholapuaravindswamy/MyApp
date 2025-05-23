"use client"

import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, TextInput } from "react-native"
import { Circle, Search, ShoppingBag } from "react-native-feather"
import AntDesign from "react-native-vector-icons/AntDesign"

const NotificationScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("unread")
  const [isSearching, setIsSearching] = useState(false)
  const [searchText, setSearchText] = useState("")

  const handleBack = () => {
    navigation.goBack()
  }

  const handleSearch = (text) => {
    setSearchText(text)
  }

  const notifications = [
    {
      id: 1,
      status: "reopened",
      statusText: "Re-Opened:",
      description: "Guest task under Maintenance for 1011 is re-opened.",
      icon: "maintenance",
      iconText: "Preventive Maintenance",
    },
    {
      id: 2,
      status: "queue",
      statusText: "Queue:",
      description: "Guest task under Amenities for 1011 is in queue.",
      icon: "shampoo",
      iconText: "AC not working",
    },
    {
      id: 3,
      status: "queue",
      statusText: "Queue:",
      description: "Guest task under Amenities for 1011 is in queue.",
      icon: "shampoo",
      iconText: "Shampoo +2 more",
    },
    {
      id: 4,
      status: "hold",
      statusText: "Hold:",
      description: "Guest task under Amenities for 1011 is on hold.",
      icon: "shampoo",
      iconText: "Shampoo +2 more",
    },
    {
      id: 5,
      status: "delayed",
      statusText: "Delayed:",
      description: "Internal task under Maintenance for 101 is delayed.",
      icon: "door",
      iconText: "Door lock not working",
    },
    {
      id: 6,
      status: "cancelled",
      statusText: "Cancelled:",
      description: "Guest task under Amenities for 1011 is cancelled.",
      icon: "shampoo",
      iconText: "Shampoo +2 more",
    },
    {
      id: 7,
      status: "assigned",
      statusText: "Assigned:",
      description: "Guest task under Amenities for 1011 is assigned to you.",
      icon: "shampoo",
      iconText: "Shampoo +2 more",
    },
    {
      id: 8,
      status: "unassigned",
      statusText: "Unassigned:",
      description: "Guest task under Amenities for 1011 is unassigned.",
      icon: "shampoo",
      iconText: "Shampoo +2 more",
    },
  ]

  const filteredNotifications = searchText
    ? notifications.filter(
        (notification) =>
          notification.description.toLowerCase().includes(searchText.toLowerCase()) ||
          notification.statusText.toLowerCase().includes(searchText.toLowerCase()) ||
          notification.iconText.toLowerCase().includes(searchText.toLowerCase()),
      )
    : notifications

  const getStatusColor = (status) => {
    switch (status) {
      case "reopened":
        return "#2196F3" // Blue
      case "queue":
        return "#9C27B0" // Purple
      case "hold":
        return "#FF9800" // Orange
      case "delayed":
        return "#F44336" // Red
      case "cancelled":
        return "#757575" // Gray
      case "assigned":
        return "#4CAF50" // Green
      case "unassigned":
        return "#F44336" // Red
      default:
        return "#000000"
    }
  }

  const getIconComponent = (icon) => {
    switch (icon) {
      case "maintenance":
        return <ShoppingBag color={"black"} width={16} height={16} />
      case "shampoo":
        return <ShoppingBag color={"black"} width={16} height={16} />
      case "door":
        return <ShoppingBag color={"black"} width={16} height={16} />
      default:
        return <ShoppingBag color={"black"} width={16} height={16} />
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        {isSearching ? (
          <View style={styles.fullSearchContainer}>
            <TouchableOpacity
              onPress={() => {
                setIsSearching(false)
                setSearchText("")
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
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <AntDesign name="back" size={26} style={{ color: "white" }} />
            </TouchableOpacity>
            {/* Title */}
            <Text style={styles.headerTitle}>Notifications</Text>

            {/* Search Icon with Circle Background */}
            <TouchableOpacity style={styles.circleButton} onPress={() => setIsSearching(true)}>
              <View style={styles.circleContainer}>
                <Circle stroke="#fff" fill="#fff" width={30} height={30} />
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
                  <Text style={styles.notificationTitle}>Guest Service</Text>
                  <Text style={styles.notificationTime}>• AYS Pro • now</Text>
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
                  {getIconComponent(notification.icon)}
                  <Text style={styles.iconText}>{notification.iconText}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.fullScreenEmptyState}>
            <Text style={styles.noResultsText}>No notifications found</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  header: {
    backgroundColor: "#000",
    paddingTop: 1,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 120,
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
  searchIcon: {
    position: "absolute",
    zIndex: 1, // Ensures it's on top of the circle
  },
  // Search styles
  fullSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
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
    flex: 1,
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
  emptyStateContainer: {
    flex: 1,
    height: "100%",
  },
  emptyNotificationContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    width: "100%",
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
  iconText: {
    fontSize: 13,
    color: "grey",
    marginLeft: 6,
  },
  noResultsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  fullScreenEmptyState: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    minHeight: 500,
  },
})

export default NotificationScreen
