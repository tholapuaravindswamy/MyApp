"use client"
import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import { ChevronDown, ChevronUp } from "react-native-feather"
import LFArticleTab from "../components/LFArticleTab"
import LFBookingTab from "../components/LFBookingTab"
import LFGuestTab from "../components/LFGuestTab"
import LFPrimaryDetailsEditModal from "../components/LFPrimaryDetailsEditModal"

const LFDetails = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Booking")
  const [primaryDetailsModalVisible, setPrimaryDetailsModalVisible] = useState(false)
  const [showTabDropdown, setShowTabDropdown] = useState(false)

  // Add state to store the primary details
  const [primaryDetails, setPrimaryDetails] = useState({
    uid: "ABCD123456789",
    createdOn: "01-04-2025 04:37",
    createdBy: "Employee Name",
    foundLocation: "Room Number/Public Area",
    foundOn: "01-04-2025",
    foundBy: "Employee Name",
    articleCount: "02",
  })

  const handleBack = () => {
    navigation?.goBack()
  }

  const handleOpenPrimaryDetailsModal = () => {
    setPrimaryDetailsModalVisible(true)
  }

  const handlePrimaryDetailsSubmit = (data) => {
    console.log("Primary details submitted:", data)
    // Update the state with the new data
    setPrimaryDetails(data)
    // Close the modal
    setPrimaryDetailsModalVisible(false)
  }

  const handleTabSelect = (tab) => {
    setActiveTab(tab)
    setShowTabDropdown(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header with Tab Dropdown */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <AntDesign name="back" size={26} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>UID: {primaryDetails.uid}</Text>
        </View>

        {/* Tab Dropdown Button */}
        <TouchableOpacity style={styles.tabDropdownButton} onPress={() => setShowTabDropdown(!showTabDropdown)}>
          <Text style={styles.tabDropdownText}>{activeTab}</Text>
          {showTabDropdown ? <ChevronUp color="#fff" size={18} /> : <ChevronDown color="#fff" size={18} />}
        </TouchableOpacity>
      </View>

      {/* Tab Dropdown Menu */}
      {showTabDropdown && (
        <View style={styles.tabDropdownMenu}>
          <TouchableOpacity
            style={[styles.tabDropdownItem, activeTab === "Booking" && styles.activeDropdownItem]}
            onPress={() => handleTabSelect("Booking")}
          >
            <Text style={styles.tabDropdownItemText}>Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabDropdownItem, activeTab === "Article" && styles.activeDropdownItem]}
            onPress={() => handleTabSelect("Article")}
          >
            <Text style={styles.tabDropdownItemText}>Article</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabDropdownItem, activeTab === "Guest" && styles.activeDropdownItem]}
            onPress={() => handleTabSelect("Guest")}
          >
            <Text style={styles.tabDropdownItemText}>Guest</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Content based on active tab */}
      {activeTab === "Booking" && (
        <LFBookingTab
          navigation={navigation}
          onEditPrimaryDetails={handleOpenPrimaryDetailsModal}
          primaryDetails={primaryDetails}
        />
      )}
      {activeTab === "Article" && <LFArticleTab />}
      {activeTab === "Guest" && <LFGuestTab navigation={navigation} />}

      {/* Overlay to close dropdown when clicking outside */}
      {showTabDropdown && (
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setShowTabDropdown(false)} />
      )}

      {/* Primary Details Edit Modal */}
      <LFPrimaryDetailsEditModal
        visible={primaryDetailsModalVisible}
        onClose={() => setPrimaryDetailsModalVisible(false)}
        onSubmit={handlePrimaryDetailsSubmit}
        navigation={navigation}
        initialData={primaryDetails}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#000000",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  tabDropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tabDropdownText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    marginRight: 4,
  },
  tabDropdownMenu: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 100,
    width: 100,
    overflow: "hidden",
  },
  tabDropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  activeDropdownItem: {
    backgroundColor: "#EBF0FA",
    borderRadius: 8,
  },
  tabDropdownItemText: {
    fontSize: 14,
    color: "#333333",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 50,
  },
})

export default LFDetails
