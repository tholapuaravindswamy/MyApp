"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import { ChevronUp, ChevronDown } from "react-native-feather"
import IncidentGuestDetailsModal from "../components/IncidentGuestDetailsModal"
import PrimaryDetailsEditModal from "../components/IncidentPrimaryDetailsEditModal"
import CommunicationDetailsEditModal from "../components/IncidentCommunicationDetailsEditModal"
import MembershipDetailsEditModal from "../components/IncidentMembershipDetailsEditModal"
import PreferencesDetailsEditModal from "../components/IncidentPreferencesDetailsEditModal"
import IncidentPrimaryDetailsEditModal from "../components/IncidentGuestPrimaryDetailsEditModal"

interface IncidentGuestScreenProps {
  navigation?: any
  route?: any
  incidentId?: string
}

interface SectionProps {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
  onEdit: () => void
}

interface GuestData {
  profileId: string
  name: string
  salutation?: string
  firstName?: string
  lastName?: string
  dateOfBirth: string
  anniversary: string
  email: string
  telephones: string[]
  membershipType: string
  membershipLevel: string
  membershipNumber: string
  preferences: { group: string; name: string }[]
}

const Section: React.FC<SectionProps> = ({ title, isOpen, onToggle, children, onEdit }) => {
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity style={styles.sectionHeader} onPress={onToggle}>
        <View style={styles.titleWithEdit}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <TouchableOpacity onPress={onEdit}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        </View>
        {isOpen ? <ChevronUp color="#000" size={20} /> : <ChevronDown color="#000" size={20} />}
      </TouchableOpacity>
      {isOpen && <View style={styles.sectionContent}>{children}</View>}
    </View>
  )
}

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
)

const IncidentGuestScreen: React.FC<IncidentGuestScreenProps> = ({ navigation, route, incidentId }) => {
  const [openSections, setOpenSections] = useState({
    primaryDetails: true,
    communicationDetails: true,
    membershipDetails: true,
    preferencesDetails: true,
  })

  // Modal visibility states
  const [guestDetailsModalVisible, setGuestDetailsModalVisible] = useState(false)
  const [primaryDetailsModalVisible, setPrimaryDetailsModalVisible] = useState(false)
  const [communicationDetailsModalVisible, setCommunicationDetailsModalVisible] = useState(false)
  const [membershipDetailsModalVisible, setMembershipDetailsModalVisible] = useState(false)
  const [preferencesDetailsModalVisible, setPreferencesDetailsModalVisible] = useState(false)

  // Guest data state
  const [guestData, setGuestData] = useState<GuestData>({
    profileId: "ABC12134567890",
    name: "Mr. Anurudh Jonnalgadda",
    salutation: "Mr.",
    firstName: "Anurudh",
    lastName: "Jonnalgadda",
    dateOfBirth: "01-04-2025",
    anniversary: "01-04-2025",
    email: "email@gmail.com",
    telephones: ["+91 99123 99123", "+91 99123 99123"],
    membershipType: "Membership Type Name",
    membershipLevel: "Membership Level Name",
    membershipNumber: "ABC12134567890",
    preferences: [
      { group: "Preferences Group", name: "Preference Name" },
      { group: "Preferences Group", name: "Preference Name" },
      { group: "Preferences Group", name: "Preference Name" },
    ],
  })

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleEdit = (section) => {
    console.log(`Edit ${section}`)

    // Open the appropriate edit modal based on the section
    switch (section) {
      case "primaryDetails":
        setPrimaryDetailsModalVisible(true)
        break
      case "communicationDetails":
        setCommunicationDetailsModalVisible(true)
        break
      case "membershipDetails":
        setMembershipDetailsModalVisible(true)
        break
      case "preferencesDetails":
        setPreferencesDetailsModalVisible(true)
        break
      default:
        break
    }
  }

  const handleNewGuest = () => {
    console.log("Add new guest")
    setGuestDetailsModalVisible(true)
  }

  // Handle form submissions from each modal
  const handleGuestDetailsSubmit = (formData) => {
    console.log("Guest details submitted:", formData)

    // Format the data to match our GuestData structure
    const newGuestData: GuestData = {
      profileId: formData.membershipNumber || "New Profile",
      name: `${formData.salutation || ""} ${formData.firstName} ${formData.lastName}`.trim(),
      salutation: formData.salutation || "",
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      dateOfBirth: formData.dateOfBirth || "",
      anniversary: formData.anniversary || "",
      email: formData.emails && formData.emails.length > 0 ? formData.emails[0] : "",
      telephones: formData.telephones || [],
      membershipType: formData.membershipType || "",
      membershipLevel: formData.membershipLevel || "",
      membershipNumber: formData.membershipNumber || "",
      preferences: [], // We would populate this from the form data if available
    }

    // Update the guest data
    setGuestData(newGuestData)
  }

  const handlePrimaryDetailsSubmit = (formData) => {
    console.log("Primary details submitted:", formData)

    setGuestData((prev) => ({
      ...prev,
      profileId: formData.profileId || prev.profileId,
      salutation: formData.salutation || prev.salutation,
      firstName: formData.firstName || prev.firstName,
      lastName: formData.lastName || prev.lastName,
      name: `${formData.salutation || ""} ${formData.firstName} ${formData.lastName}`.trim(),
      dateOfBirth: formData.dateOfBirth || prev.dateOfBirth,
      anniversary: formData.anniversary || prev.anniversary,
    }))
  }

  const handleCommunicationDetailsSubmit = (formData) => {
    console.log("Communication details submitted:", formData)

    setGuestData((prev) => ({
      ...prev,
      email: formData.email || prev.email,
      telephones: formData.telephones || prev.telephones,
    }))
  }

  const handleMembershipDetailsSubmit = (formData) => {
    console.log("Membership details submitted:", formData)

    setGuestData((prev) => ({
      ...prev,
      membershipType: formData.membershipType || prev.membershipType,
      membershipLevel: formData.membershipLevel || prev.membershipLevel,
      membershipNumber: formData.membershipNumber || prev.membershipNumber,
    }))
  }

  const handlePreferencesDetailsSubmit = (formData) => {
    console.log("Preferences details submitted:", formData)

    setGuestData((prev) => ({
      ...prev,
      preferences: formData.preferences || prev.preferences,
    }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Primary Details Section */}
        <Section
          title="Primary Details"
          isOpen={openSections.primaryDetails}
          onToggle={() => toggleSection("primaryDetails")}
          onEdit={() => handleEdit("primaryDetails")}
        >
          <DetailRow label="Profile ID*" value={guestData.profileId} />
          <DetailRow label="Name*" value={guestData.name} />
          <View style={styles.dateRow}>
            <View style={styles.dateColumn}>
              <Text style={styles.detailLabel}>Date of Birth</Text>
              <Text style={styles.detailValue}>{guestData.dateOfBirth}</Text>
            </View>
            <View style={[styles.dateColumn, styles.alignEnd]}>
              <Text style={styles.detailLabel}>Anniversary</Text>
              <Text style={styles.detailValue}>{guestData.anniversary}</Text>
            </View>
          </View>
        </Section>

        {/* Communication Details Section */}
        <Section
          title="Communication Details"
          isOpen={openSections.communicationDetails}
          onToggle={() => toggleSection("communicationDetails")}
          onEdit={() => handleEdit("communicationDetails")}
        >
          <DetailRow label="Email" value={guestData.email} />
          <Text style={styles.detailLabel}>Telephone</Text>
          {guestData.telephones.map((phone, index) => (
            <Text key={index} style={styles.detailValue}>
              {phone}
            </Text>
          ))}
        </Section>

        {/* Membership Details Section */}
        <Section
          title="Membership Details"
          isOpen={openSections.membershipDetails}
          onToggle={() => toggleSection("membershipDetails")}
          onEdit={() => handleEdit("membershipDetails")}
        >
          <View style={styles.membershipRow}>
            <View style={styles.membershipColumn}>
              <Text style={styles.detailLabel}>Membership Type*</Text>
              <Text style={styles.detailValue}>{guestData.membershipType}</Text>
            </View>
            <View style={[styles.dateColumn, styles.alignEnd]}>
              <Text style={styles.detailLabel}>Membership Level</Text>
              <Text style={styles.detailValue}>{guestData.membershipLevel}</Text>
            </View>
          </View>
          <DetailRow label="Membership Number*" value={guestData.membershipNumber} />
        </Section>

        {/* Preferences Details Section */}
        <Section
          title="Preferences Details"
          isOpen={openSections.preferencesDetails}
          onToggle={() => toggleSection("preferencesDetails")}
          onEdit={() => handleEdit("preferencesDetails")}
        >
          {guestData.preferences.map((pref, index) => (
            <View key={index} style={styles.preferenceItem}>
              <Text style={styles.preferenceGroup}>{pref.group}</Text>
              <Text style={styles.preferenceName}>{pref.name}</Text>
            </View>
          ))}
        </Section>
      </ScrollView>

      {/* New Button */}
      <TouchableOpacity style={styles.newButton} onPress={handleNewGuest}>
        <Text style={styles.newButtonText}>New</Text>
      </TouchableOpacity>

      {/* Modals */}
      <IncidentGuestDetailsModal
        visible={guestDetailsModalVisible}
        onClose={() => setGuestDetailsModalVisible(false)}
        onSubmit={handleGuestDetailsSubmit}
      />

      <IncidentPrimaryDetailsEditModal
        visible={primaryDetailsModalVisible}
        onClose={() => setPrimaryDetailsModalVisible(false)}
        onSubmit={handlePrimaryDetailsSubmit}
        initialData={{
          profileId: guestData.profileId,
          salutation: guestData.salutation,
          firstName: guestData.firstName,
          lastName: guestData.lastName,
          dateOfBirth: guestData.dateOfBirth,
          anniversary: guestData.anniversary,
        }}
      />

      <CommunicationDetailsEditModal
        visible={communicationDetailsModalVisible}
        onClose={() => setCommunicationDetailsModalVisible(false)}
        onSubmit={handleCommunicationDetailsSubmit}
        initialData={{
          email: guestData.email,
          telephones: guestData.telephones,
        }}
      />

      <MembershipDetailsEditModal
        visible={membershipDetailsModalVisible}
        onClose={() => setMembershipDetailsModalVisible(false)}
        onSubmit={handleMembershipDetailsSubmit}
        initialData={{
          membershipType: guestData.membershipType,
          membershipLevel: guestData.membershipLevel,
          membershipNumber: guestData.membershipNumber,
        }}
      />

      <PreferencesDetailsEditModal
        visible={preferencesDetailsModalVisible}
        onClose={() => setPreferencesDetailsModalVisible(false)}
        onSubmit={handlePreferencesDetailsSubmit}
        initialData={{
          preferences: guestData.preferences,
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  sectionContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#F4F4F4",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  sectionHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleWithEdit: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1, // Optional spacing between title and Edit, or use marginLeft in editButton
  },
  editButton: {
    color: "#007AFF",
    marginLeft: 10, // you can fine-tune this instead of gap
    fontSize: 14,
    fontWeight: "500",
  },
  sectionContent: {
    padding: 16,
  },
  detailRow: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  alignEnd: {
    alignItems: "flex-end",
  },
  dateColumn: {
    flex: 1,
  },
  membershipRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  membershipColumn: {
    flex: 1,
  },
  preferenceItem: {
    marginBottom: 12,
  },
  preferenceGroup: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  preferenceName: {
    fontSize: 15,
    color: "#333",
  },
  newButton: {
    backgroundColor: "#FF5722",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
    borderRadius: 8,
  },
  newButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default IncidentGuestScreen
