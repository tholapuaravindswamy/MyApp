"use client"

import { useFocusEffect } from "@react-navigation/native"
import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from "react-native"
import { ChevronUp, ChevronDown } from "react-native-feather"
import AntDesign from "react-native-vector-icons/AntDesign"
import IncidentPrimaryDetailsEditModal from "../components/IncidentPrimaryDetailsEditModal"
import IncidentDetailsEditModal from "../components/IncidentDetailsEditModal"
import IncidentGuestScreen from "./IncidentGuestDetailsScreen"

const IncidentDetailsScreen = ({ navigation, route }) => {
  const [formData, setFormData] = useState({
    uid: "ABCD1234567890",
    createdOn: "01-04-2025 04:37",
    createdBy: "New Name",
    incidentDate: "01-04-2025 00:00",
    reportedDate: "01-04-2025 00:00",
    reportedTo: "Employee Name",
    category: "Category Name",
    department: "Department Name",
    incidentSource: "Source Name",
    costOfRecovery: "99,99,999.99",
    status: "Source Name",
    incidentDetails: "",
    investigationDetails: "",
    resolutionDetails: "",
    recoveryDetails: "",
  })

  // Modal visibility states
  const [primaryDetailsModalVisible, setPrimaryDetailsModalVisible] = useState(false)
  const [incidentDetailsModalVisible, setIncidentDetailsModalVisible] = useState(false)
  const [investigationDetailsModalVisible, setInvestigationDetailsModalVisible] = useState(false)
  const [resolutionDetailsModalVisible, setResolutionDetailsModalVisible] = useState(false)
  const [recoveryDetailsModalVisible, setRecoveryDetailsModalVisible] = useState(false)
  const [showTabDropdown, setShowTabDropdown] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.updatedData) {
        console.log("Received updated data:", route.params.updatedData)
        setFormData((prevData) => ({
          ...prevData,
          ...route.params.updatedData,
        }))
      }
    }, [route.params?.updatedData]),
  )

  const [activeTab, setActiveTab] = useState("Booking")

  const [expandedSections, setExpandedSections] = useState({
    primaryDetails: true,
    incidentDetails: false,
    investigationDetails: false,
    resolutionDetails: false,
    recoveryDetails: false,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleTabSelect = (tab) => {
    setActiveTab(tab)
    setShowTabDropdown(false)
  }

  const handlePrimaryDetailsEdit = () => {
    setPrimaryDetailsModalVisible(true)
  }

  const handleIncidentDetailsEdit = () => {
    setIncidentDetailsModalVisible(true)
  }

  const handleInvestigationEdit = () => {
    setInvestigationDetailsModalVisible(true)
  }

  const handleResolutionEdit = () => {
    setResolutionDetailsModalVisible(true)
  }

  const handleRecoveryEdit = () => {
    setRecoveryDetailsModalVisible(true)
  }

  const handlePrimaryDetailsSubmit = (updatedData) => {
    setFormData((prev) => ({
      ...prev,
      ...updatedData,
    }))
  }

  const handleIncidentDetailsSubmit = (text) => {
    setFormData((prev) => ({
      ...prev,
      incidentDetails: text,
    }))
  }

  const handleInvestigationDetailsSubmit = (text) => {
    setFormData((prev) => ({
      ...prev,
      investigationDetails: text,
    }))
  }

  const handleResolutionDetailsSubmit = (text) => {
    setFormData((prev) => ({
      ...prev,
      resolutionDetails: text,
    }))
  }

  const handleRecoveryDetailsSubmit = (text) => {
    setFormData((prev) => ({
      ...prev,
      recoveryDetails: text,
    }))
  }

  // Guest tab content
   const renderGuestContent = () => {
    return <IncidentGuestScreen navigation={navigation} route={route} incidentId={formData.uid} />
  }

  // Booking tab content (incident details)
  const renderBookingContent = () => {
    return (
      <>
        {/* Primary Details Section */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.sectionHeader}
            activeOpacity={1}
            onPress={() => toggleSection("primaryDetails")}
          >
            <View style={styles.sectionLeft}>
              <Text style={styles.sectionTitle}>Primary Details</Text>
              <TouchableOpacity onPress={handlePrimaryDetailsEdit}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

            {expandedSections.primaryDetails ? (
              <ChevronUp color="#666" size={20} style={styles.sectionIcon} />
            ) : (
              <ChevronDown color="#666" size={20} style={styles.sectionIcon} />
            )}
          </TouchableOpacity>

          {expandedSections.primaryDetails && (
            <View style={styles.sectionContent}>
              <View style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <Text style={styles.detailLabel}>UID*</Text>
                  <Text style={styles.detailValue}>{formData.uid}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <Text style={styles.detailLabel}>Created By*</Text>
                  <Text style={styles.detailValue}>{formData.createdBy}</Text>
                </View>
                <View style={styles.detailRight}>
                  <Text style={styles.detailLabel}>Created on*</Text>
                  <Text style={styles.detailValue}>{formData.createdOn}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <Text style={styles.detailLabel}>Incident Date & Time*</Text>
                  <Text style={styles.detailValue}>{formData.incidentDate}</Text>
                </View>
                <View style={styles.detailRight}>
                  <Text style={styles.detailLabel}>Reported Date & Time*</Text>
                  <Text style={styles.detailValue}>{formData.reportedDate}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <Text style={styles.detailLabel}>Reported To*</Text>
                  <Text style={styles.detailValue}>{formData.reportedTo}</Text>
                </View>
                <View style={styles.detailRight}>
                  <Text style={styles.detailLabel}>Category*</Text>
                  <Text style={styles.detailValue}>{formData.category}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <Text style={styles.detailLabel}>Department*</Text>
                  <Text style={styles.detailValue}>{formData.department}</Text>
                </View>
                <View style={styles.detailRight}>
                  <Text style={styles.detailLabel}>Incident Source*</Text>
                  <Text style={styles.detailValue}>{formData.incidentSource}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <Text style={styles.detailLabel}>Cost Of Recovery*</Text>
                  <Text style={styles.detailValue}>{formData.costOfRecovery}</Text>
                </View>
                <View style={styles.detailRight}>
                  <Text style={styles.detailLabel}>Status*</Text>
                  <Text style={styles.detailValue}>{formData.status}</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Incident Details Section */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.sectionHeader}
            activeOpacity={1}
            onPress={() => toggleSection("incidentDetails")}
          >
            <View style={styles.sectionLeft}>
              <Text style={styles.sectionTitle}>Incident Details</Text>
              <TouchableOpacity onPress={handleIncidentDetailsEdit}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

            {expandedSections.incidentDetails ? (
              <ChevronUp color="#666" size={20} style={styles.sectionIcon} />
            ) : (
              <ChevronDown color="#666" size={20} style={styles.sectionIcon} />
            )}
          </TouchableOpacity>

          {expandedSections.incidentDetails && (
            <View style={styles.sectionContent}>
              <Text style={styles.detailText}>{formData.incidentDetails || "No details provided"}</Text>
            </View>
          )}

          {!expandedSections.incidentDetails && (
            <View style={styles.collapsedContent}>
              <Text style={styles.placeholderText}>
                {formData.incidentDetails
                  ? formData.incidentDetails.substring(0, 50) + (formData.incidentDetails.length > 50 ? "..." : "")
                  : "Enter Text"}
              </Text>
            </View>
          )}
        </View>

        {/* Investigation Details Section */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.sectionHeader}
            activeOpacity={1}
            onPress={() => toggleSection("investigationDetails")}
          >
            <View style={styles.sectionLeft}>
              <Text style={styles.sectionTitle}>Investigation Details</Text>
              <TouchableOpacity onPress={handleInvestigationEdit}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

            {expandedSections.investigationDetails ? (
              <ChevronUp color="#666" size={20} style={styles.sectionIcon} />
            ) : (
              <ChevronDown color="#666" size={20} style={styles.sectionIcon} />
            )}
          </TouchableOpacity>

          {expandedSections.investigationDetails && (
            <View style={styles.sectionContent}>
              <Text style={styles.detailText}>{formData.investigationDetails || "No details provided"}</Text>
            </View>
          )}
          {!expandedSections.investigationDetails && (
            <View style={styles.collapsedContent}>
              <Text style={styles.placeholderText}>
                {formData.investigationDetails
                  ? formData.investigationDetails.substring(0, 50) +
                    (formData.investigationDetails.length > 50 ? "..." : "")
                  : "Enter Text"}
              </Text>
            </View>
          )}
        </View>

        {/* Resolution Details Section */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.sectionHeader}
            activeOpacity={1}
            onPress={() => toggleSection("resolutionDetails")}
          >
            <View style={styles.sectionLeft}>
              <Text style={styles.sectionTitle}>Resolution Details</Text>
              <TouchableOpacity onPress={handleResolutionEdit}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

            {expandedSections.resolutionDetails ? (
              <ChevronUp color="#666" size={20} style={styles.sectionIcon} />
            ) : (
              <ChevronDown color="#666" size={20} style={styles.sectionIcon} />
            )}
          </TouchableOpacity>

          {expandedSections.resolutionDetails && (
            <View style={styles.sectionContent}>
              <Text style={styles.detailText}>{formData.resolutionDetails || "No details provided"}</Text>
            </View>
          )}
          {!expandedSections.resolutionDetails && (
            <View style={styles.collapsedContent}>
              <Text style={styles.placeholderText}>
                {formData.resolutionDetails
                  ? formData.resolutionDetails.substring(0, 50) + (formData.resolutionDetails.length > 50 ? "..." : "")
                  : "Enter Text"}
              </Text>
            </View>
          )}
        </View>

        {/* Recovery Details Section */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.sectionHeader}
            activeOpacity={1}
            onPress={() => toggleSection("recoveryDetails")}
          >
            <View style={styles.sectionLeft}>
              <Text style={styles.sectionTitle}>Recovery Details</Text>
              <TouchableOpacity onPress={handleRecoveryEdit}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

            {expandedSections.recoveryDetails ? (
              <ChevronUp color="#666" size={20} style={styles.sectionIcon} />
            ) : (
              <ChevronDown color="#666" size={20} style={styles.sectionIcon} />
            )}
          </TouchableOpacity>

          {expandedSections.recoveryDetails && (
            <View style={styles.sectionContent}>
              <Text style={styles.detailText}>{formData.recoveryDetails || "No details provided"}</Text>
            </View>
          )}
          {!expandedSections.recoveryDetails && (
            <View style={styles.collapsedContent}>
              <Text style={styles.placeholderText}>
                {formData.recoveryDetails
                  ? formData.recoveryDetails.substring(0, 50) + (formData.recoveryDetails.length > 50 ? "..." : "")
                  : "Enter Text"}
              </Text>
            </View>
          )}
        </View>
      </>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header with Tab Dropdown */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <AntDesign name="back" size={26} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>UID: {formData.uid}</Text>
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
            style={[styles.tabDropdownItem, activeTab === "Guest" && styles.activeDropdownItem]}
            onPress={() => handleTabSelect("Guest")}
          >
            <Text style={styles.tabDropdownItemText}>Guest</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.content}>
        {activeTab === "Booking" ? renderBookingContent() : renderGuestContent()}
      </ScrollView>

      {/* Overlay to close dropdown when clicking outside */}
      {showTabDropdown && (
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setShowTabDropdown(false)} />
      )}

      {/* Modals */}
      <IncidentPrimaryDetailsEditModal
        visible={primaryDetailsModalVisible}
        onClose={() => setPrimaryDetailsModalVisible(false)}
        initialData={formData}
        onSubmit={handlePrimaryDetailsSubmit}
      />

      <IncidentDetailsEditModal
        visible={incidentDetailsModalVisible}
        onClose={() => setIncidentDetailsModalVisible(false)}
        initialText={formData.incidentDetails}
        onSubmit={handleIncidentDetailsSubmit}
        title="Incident Details"
      />

      <IncidentDetailsEditModal
        visible={investigationDetailsModalVisible}
        onClose={() => setInvestigationDetailsModalVisible(false)}
        initialText={formData.investigationDetails}
        onSubmit={handleInvestigationDetailsSubmit}
        title="Investigation Details"
      />

      <IncidentDetailsEditModal
        visible={resolutionDetailsModalVisible}
        onClose={() => setResolutionDetailsModalVisible(false)}
        initialText={formData.resolutionDetails}
        onSubmit={handleResolutionDetailsSubmit}
        title="Resolution Details"
      />

      <IncidentDetailsEditModal
        visible={recoveryDetailsModalVisible}
        onClose={() => setRecoveryDetailsModalVisible(false)}
        initialText={formData.recoveryDetails}
        onSubmit={handleRecoveryDetailsSubmit}
        title="Recovery Details"
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#000",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
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
    borderRadius:8
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
  content: {
    flex: 1,
    padding: 12,
  },
  sectionContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#EBF0FA",
  },
  sectionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginRight: 10, // space between title and Edit
  },
  sectionHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  editText: {
    fontSize: 14,
    color: "#007AFF",
    marginRight: 8,
  },
  sectionIcon: {
    marginLeft: 4,
  },
  sectionContent: {
    padding: 16,
  },
  collapsedContent: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    height: 90,
  },
  placeholderText: {
    color: "#999",
    fontSize: 14,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  detailLeft: {
    flex: 1,
    paddingRight: 8,
  },
  detailRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  detailLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
  },
  detailText: {
    fontSize: 14,
    color: "#333",
  },
  textArea: {
    borderWidth: 0,
    padding: 0,
    fontSize: 14,
    color: "#333",
    height: 40,
    textAlignVertical: "top",
  },
  // Guest tab styles
  guestContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  guestTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  guestDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
})

export default IncidentDetailsScreen
