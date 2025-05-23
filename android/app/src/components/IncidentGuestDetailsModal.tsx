"use client"

import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
  Alert,
} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import DateTimePicker from "@react-native-community/datetimepicker"
import AnimatedModal from "./AnimatedModal"
import IncidentSalutionModal from "../components/IncidentSaluationModal"
import IncidentMemberShipTypeModal from "./IncidentMemberShipTypeModal"
import IncidentMembershipLevelModal from "./IncidentMembershipLevelModal"
import MatchDetectedModal from "./MatchDetectedModal"
import CountryCodeModal from "./CountryCodeModal"

const { width } = Dimensions.get("window")

interface IncidentGuestDetailsModalProps {
  visible: boolean
  onClose: () => void
  onSubmit?: (guestData: any) => void
}

interface PhoneInput {
  displayCode: string
  countryName: string
  number: string
}

interface EmailInput {
  email: string
}

interface MatchedGuest {
  id: string
  salutation: string
  firstName: string
  lastName: string
  telephone: string
  email: string
  membershipNumber: string
  membershipType: string
  membershipLevel: string
  address: string
  zipCode: string
  city: string
  state: string
  country: string
  dateOfBirth?: string
  anniversary?: string
}

// Mock data for demonstration purposes
const mockGuestDatabase = [
  {
    id: "1",
    salutation: "Mr.",
    firstName: "John",
    lastName: "Doe",
    telephone: "+1 1234567890",
    email: "john.doe@example.com",
    membershipNumber: "MEM123456",
    membershipType: "Gold",
    membershipLevel: "Premium",
    address: "123 Main St",
    zipCode: "10001",
    city: "New York",
    state: "NY",
    country: "USA",
    dateOfBirth: "01-01-1980",
    anniversary: "05-10-2010",
  },
  {
    id: "2",
    salutation: "Mrs.",
    firstName: "Jane",
    lastName: "Smith",
    telephone: "+1 9876543210",
    email: "jane.smith@example.com",
    membershipNumber: "MEM789012",
    membershipType: "Silver",
    membershipLevel: "Standard",
    address: "456 Oak Ave",
    zipCode: "90210",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    dateOfBirth: "15-05-1985",
    anniversary: "22-07-2015",
  },
]

const IncidentGuestDetailsModal: React.FC<IncidentGuestDetailsModalProps> = ({ visible, onClose, onSubmit }) => {
  // Form state
  const [formData, setFormData] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    membershipType: "",
    membershipLevel: "",
    membershipNumber: "",
    dateOfBirth: "",
    anniversary: "",
    address: "",
    zipCode: "",
    city: "",
    state: "",
    country: "",
  })

  // State for phone inputs
  const [phoneInputs, setPhoneInputs] = useState<PhoneInput[]>([
    {
      displayCode: "Code",
      countryName: "",
      number: "",
    },
  ])

  // State for email inputs
  const [emailInputs, setEmailInputs] = useState<EmailInput[]>([
    {
      email: "",
    },
  ])

  // Match detected modal state
  const [matchDetectedModalVisible, setMatchDetectedModalVisible] = useState(false)
  const [matchedGuests, setMatchedGuests] = useState<MatchedGuest[]>([])

  // Store previously submitted guests for search functionality
  const [savedGuests, setSavedGuests] = useState<MatchedGuest[]>([])

  // Country code modal state
  const [countryCodeModalVisible, setCountryCodeModalVisible] = useState(false)
  const [activePhoneIndex, setActivePhoneIndex] = useState(0)

  // Salutation modal state
  const [salutationModalVisible, setSalutationModalVisible] = useState(false)

  // Date picker states
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [dateField, setDateField] = useState<"dateOfBirth" | "anniversary">("dateOfBirth")
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Membership Type Modal State
  const [membershipTypeModalVisible, setMembershipTypeModalVisible] = useState(false)

  // Membership Level Modal State
  const [membershipLevelModalVisible, setMembershipLevelModalVisible] = useState(false)

  // Handle text input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle phone number input change
  const handlePhoneNumberChange = (index: number, value: string) => {
    setPhoneInputs((prev) => {
      const updated = [...prev]
      updated[index].number = value
      return updated
    })
  }

  // Handle email input change
  const handleEmailChange = (index: number, value: string) => {
    setEmailInputs((prev) => {
      const updated = [...prev]
      updated[index].email = value
      return updated
    })
  }

  // Open country code modal for specific phone input
  const openCountryCodeModal = (index: number) => {
    setActivePhoneIndex(index)
    setCountryCodeModalVisible(true)
  }

  // Handle country code selection
  const handleCountryCodeSelect = (code: string, name: string) => {
    setPhoneInputs((prev) => {
      const updated = [...prev]
      updated[activePhoneIndex].displayCode = code
      updated[activePhoneIndex].countryName = name
      return updated
    })
  }

  // Handle salutation selection
  const handleSalutationSelect = (selectedItems: any[]) => {
    if (selectedItems.length > 0) {
      // Since we're only selecting one item, just use the first one
      setFormData((prev) => ({
        ...prev,
        salutation: selectedItems[0].name,
      }))
    }
  }

  // Handle membership type selection
  const handleMemberShipType = (selectedItems: any[]) => {
    if (selectedItems.length > 0) {
      // Since we're only selecting one item, just use the first one
      setFormData((prev) => ({
        ...prev,
        membershipType: selectedItems[0].name,
      }))
    }
  }

  // Handle membership level selection
  const handleMembershipLevel = (selectedItems: any[]) => {
    if (selectedItems.length > 0) {
      // Since we're only selecting one item, just use the first one
      setFormData((prev) => ({
        ...prev,
        membershipLevel: selectedItems[0].name,
      }))
    }
  }

  // Handle adding a new telephone input field
  const handleAddTelephone = () => {
    // Add a new phone input field if less than 10
    if (phoneInputs.length < 10) {
      setPhoneInputs((prev) => [
        ...prev,
        {
          displayCode: "Code",
          countryName: "",
          number: "",
        },
      ])
    }
  }

  // Handle removing a telephone input field
  const handleRemoveTelephone = (indexToRemove: number) => {
    setPhoneInputs((prev) => prev.filter((_, index) => index !== indexToRemove))
  }

  // Handle adding a new email input field
  const handleAddEmail = () => {
    // Add a new email input field if less than 10
    if (emailInputs.length < 10) {
      setEmailInputs((prev) => [
        ...prev,
        {
          email: "",
        },
      ])
    }
  }

  // Handle removing an email input field
  const handleRemoveEmail = (indexToRemove: number) => {
    setEmailInputs((prev) => prev.filter((_, index) => index !== indexToRemove))
  }

  // Handle date picker
  const handleDateFieldPress = (field: "dateOfBirth" | "anniversary") => {
    setDateField(field)
    setShowDatePicker(true)
  }

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === "ios")

    if (date) {
      setSelectedDate(date)

      // Format date as DD-MM-YYYY
      const day = String(date.getDate()).padStart(2, "0")
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const year = date.getFullYear()
      const formattedDate = `${day}-${month}-${year}`

      setFormData((prev) => ({
        ...prev,
        [dateField]: formattedDate,
      }))
    }
  }

  // Search for guest by phone number
  const searchByPhone = (index: number) => {
    const phoneInput = phoneInputs[index]
    if (!phoneInput.number || phoneInput.number.trim() === "") return

    const fullNumber = `${phoneInput.displayCode} ${phoneInput.number}`

    // Search in mock database and saved guests
    const dbMatches = mockGuestDatabase.filter((guest) => guest.telephone.includes(phoneInput.number))

    const savedMatches = savedGuests.filter((guest) => guest.telephone.includes(phoneInput.number))

    // Combine results, removing duplicates by ID
    const allMatches = [...dbMatches, ...savedMatches]
    const uniqueMatches = allMatches.filter((match, index, self) => index === self.findIndex((m) => m.id === match.id))

    if (uniqueMatches.length > 0) {
      setMatchedGuests(uniqueMatches)
      setMatchDetectedModalVisible(true)
    }
  }

  // Search for guest by email
  const searchByEmail = (index: number) => {
    const emailInput = emailInputs[index]
    if (!emailInput.email || emailInput.email.trim() === "") return

    // Search in mock database and saved guests
    const dbMatches = mockGuestDatabase.filter((guest) =>
      guest.email.toLowerCase().includes(emailInput.email.toLowerCase()),
    )

    const savedMatches = savedGuests.filter((guest) =>
      guest.email.toLowerCase().includes(emailInput.email.toLowerCase()),
    )

    // Combine results, removing duplicates by ID
    const allMatches = [...dbMatches, ...savedMatches]
    const uniqueMatches = allMatches.filter((match, index, self) => index === self.findIndex((m) => m.id === match.id))

    if (uniqueMatches.length > 0) {
      setMatchedGuests(uniqueMatches)
      setMatchDetectedModalVisible(true)
    }
  }

  // Handle guest selection from match detected modal
  const handleGuestSelect = (guest: MatchedGuest) => {
    // Update form data with selected guest information
    setFormData({
      salutation: guest.salutation,
      firstName: guest.firstName,
      lastName: guest.lastName,
      membershipType: guest.membershipType,
      membershipLevel: guest.membershipLevel,
      membershipNumber: guest.membershipNumber,
      dateOfBirth: guest.dateOfBirth || "",
      anniversary: guest.anniversary || "",
      address: guest.address,
      zipCode: guest.zipCode,
      city: guest.city,
      state: guest.state,
      country: guest.country,
    })

    // Update phone inputs
    setPhoneInputs([
      {
        displayCode: guest.telephone.split(" ")[0],
        countryName: "",
        number: guest.telephone.split(" ").slice(1).join(" "),
      },
    ])

    // Update email inputs
    setEmailInputs([
      {
        email: guest.email,
      },
    ])
  }

  // Handle form submission
  const handleSubmit = () => {
    // Collect all valid phone numbers
    const telephones = phoneInputs
      .filter((input) => input.number.trim() !== "")
      .map((input) => `${input.displayCode} ${input.number}`)

    // Collect all valid emails
    const emails = emailInputs.filter((input) => input.email.trim() !== "").map((input) => input.email)

    // Create the final form data with collected phone numbers and emails
    const finalFormData = {
      ...formData,
      telephones,
      emails,
    }

    // Create a guest object in the format expected by the match detection
    const newGuest: MatchedGuest = {
      id: `manual-${Date.now()}`, // Generate a unique ID
      salutation: formData.salutation,
      firstName: formData.firstName,
      lastName: formData.lastName,
      telephone: telephones.length > 0 ? telephones[0] : "",
      email: emails.length > 0 ? emails[0] : "",
      membershipNumber: formData.membershipNumber,
      membershipType: formData.membershipType,
      membershipLevel: formData.membershipLevel,
      address: formData.address,
      zipCode: formData.zipCode,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      dateOfBirth: formData.dateOfBirth,
      anniversary: formData.anniversary,
    }

    // Add to saved guests if we have at least a name
    if (formData.firstName.trim() !== "" || formData.lastName.trim() !== "") {
      setSavedGuests((prev) => [...prev, newGuest])
    }

    // Show success alert
    Alert.alert("Success", "Successfully submitted Guest details", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ])

    // Check if onSubmit exists before calling it
    if (typeof onSubmit === "function") {
      onSubmit(finalFormData)
    } else {
      console.log("Form data submitted:", finalFormData)
    }

    onClose()
  }

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
      <SafeAreaView style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <AntDesign name="back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Guest Details</Text>
        </View>

        {/* Form Content */}
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Salutation */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Salutation</Text>
              <TouchableOpacity style={styles.selectInput} onPress={() => setSalutationModalVisible(true)}>
                <Text style={[styles.inputText, !formData.salutation && styles.placeholderText]}>
                  {formData.salutation || "Select Option"}
                </Text>
                <Feather name="chevron-right" size={20} color="#000" />
              </TouchableOpacity>
            </View>

            {/* First Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                First Name<Text style={styles.requiredStar}>*</Text>
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Text"
                value={formData.firstName}
                onChangeText={(text) => handleInputChange("firstName", text)}
              />
            </View>

            {/* Last Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Last Name<Text style={styles.requiredStar}>*</Text>
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Text"
                value={formData.lastName}
                onChangeText={(text) => handleInputChange("lastName", text)}
              />
            </View>

            {/* Telephone */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Telephone</Text>

              {/* Phone Inputs */}
              {phoneInputs.map((phoneInput, index) => (
                <View key={`phone-${index}`} style={styles.phoneInputContainer}>
                  <TouchableOpacity style={styles.codeContainer} onPress={() => openCountryCodeModal(index)}>
                    <Text
                      style={[
                        styles.codeText,
                        phoneInput.displayCode !== "Code" && { color: "#333", fontWeight: "500", fontSize: 16 },
                      ]}
                    >
                      {phoneInput.displayCode}
                    </Text>
                    <Feather name="chevron-right" size={20} color="#000" />
                  </TouchableOpacity>
                  <View style={styles.phoneInputWrapper}>
                    <TextInput
                      style={styles.phoneInput}
                      placeholder="Enter Number"
                      value={phoneInput.number}
                      onChangeText={(text) => handlePhoneNumberChange(index, text)}
                      keyboardType="phone-pad"
                    />
                    <TouchableOpacity style={styles.searchIcon} onPress={() => searchByPhone(index)}>
                      <Feather name="search" size={18} color="#888" />
                    </TouchableOpacity>
                  </View>
                  {index > 0 && (
                    <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveTelephone(index)}>
                      <AntDesign name="close" size={16} color="#666" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              <TouchableOpacity
                style={[styles.addButton, phoneInputs.length >= 10 && styles.disabledButton]}
                onPress={handleAddTelephone}
                disabled={phoneInputs.length >= 10}
              >
                <Text style={[styles.addButtonText, phoneInputs.length >= 10 && styles.disabledButtonText]}>Add</Text>
              </TouchableOpacity>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>

              {/* Email Inputs */}
              {emailInputs.map((emailInput, index) => (
                <View key={`email-${index}`} style={styles.emailInputContainer}>
                  <TextInput
                    style={styles.emailInput}
                    placeholder="Enter Email ID"
                    value={emailInput.email}
                    onChangeText={(text) => handleEmailChange(index, text)}
                    keyboardType="email-address"
                  />
                  <TouchableOpacity style={styles.searchIcon} onPress={() => searchByEmail(index)}>
                    <Feather name="search" size={18} color="#888" />
                  </TouchableOpacity>
                  {index > 0 && (
                    <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveEmail(index)}>
                      <AntDesign name="close" size={16} color="#666" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              <TouchableOpacity
                style={[styles.addButton, emailInputs.length >= 10 && styles.disabledButton]}
                onPress={handleAddEmail}
                disabled={emailInputs.length >= 10}
              >
                <Text style={[styles.addButtonText, emailInputs.length >= 10 && styles.disabledButtonText]}>Add</Text>
              </TouchableOpacity>
            </View>

            {/* Membership Type */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Membership Type</Text>
              <TouchableOpacity style={styles.selectInput} onPress={() => setMembershipTypeModalVisible(true)}>
                <Text style={[styles.inputText, !formData.membershipType && styles.placeholderText]}>
                  {formData.membershipType || "Select Option"}
                </Text>
                <Feather name="chevron-right" size={20} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Membership Level */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Membership Level</Text>
              <TouchableOpacity style={styles.selectInput} onPress={() => setMembershipLevelModalVisible(true)}>
                <Text style={[styles.inputText, !formData.membershipLevel && styles.placeholderText]}>
                  {formData.membershipLevel || "Select Option"}
                </Text>
                <Feather name="chevron-right" size={20} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Membership Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Membership Number</Text>
              <View style={styles.emailInputContainer}>
                <TextInput
                  style={styles.emailInput}
                  placeholder="Employee Name"
                  value={formData.membershipNumber}
                  onChangeText={(text) => handleInputChange("membershipNumber", text)}
                />
                <TouchableOpacity style={styles.searchIcon}>
                  <Feather name="search" size={18} color="#888" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Address */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Address"
                value={formData.address}
                onChangeText={(text) => handleInputChange("address", text)}
              />
            </View>

            {/* ZIP/PIN Code */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>ZIP/PIN Code</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter ZIP/PIN Code"
                value={formData.zipCode}
                onChangeText={(text) => handleInputChange("zipCode", text)}
                keyboardType="numeric"
              />
            </View>

            {/* City */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter City"
                value={formData.city}
                onChangeText={(text) => handleInputChange("city", text)}
              />
            </View>

            {/* State */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>State</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter State"
                value={formData.state}
                onChangeText={(text) => handleInputChange("state", text)}
              />
            </View>

            {/* Country */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Country</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Country"
                value={formData.country}
                onChangeText={(text) => handleInputChange("country", text)}
              />
            </View>

            {/* Date Of Birth */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Date Of Birth</Text>
              <TouchableOpacity style={styles.dateInput} onPress={() => handleDateFieldPress("dateOfBirth")}>
                <AntDesign name="calendar" size={20} color="#888" marginHorizontal={4} />
                <Text style={[styles.inputText, !formData.dateOfBirth && styles.placeholderText]}>
                  {formData.dateOfBirth || "Select Date"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Anniversary */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Anniversary</Text>
              <TouchableOpacity style={styles.dateInput} onPress={() => handleDateFieldPress("anniversary")}>
                <AntDesign name="calendar" size={20} color="#888" marginHorizontal={4} />
                <Text style={[styles.inputText, !formData.anniversary && styles.placeholderText]}>
                  {formData.anniversary || "Select Date"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker value={selectedDate} mode="date" display="default" onChange={handleDateChange} />
        )}

        {/* Country Code Modal */}
        <CountryCodeModal
          visible={countryCodeModalVisible}
          onClose={() => setCountryCodeModalVisible(false)}
          onSelect={handleCountryCodeSelect}
          initialCode={
            phoneInputs[activePhoneIndex]?.displayCode !== "Code"
              ? phoneInputs[activePhoneIndex]?.displayCode
              : undefined
          }
        />

        {/* Salutation Modal */}
        <IncidentSalutionModal
          visible={salutationModalVisible}
          onClose={() => setSalutationModalVisible(false)}
          onSelect={handleSalutationSelect}
        />

        {/* Membership Type Modal */}
        <IncidentMemberShipTypeModal
          visible={membershipTypeModalVisible}
          onClose={() => setMembershipTypeModalVisible(false)}
          onSelect={handleMemberShipType}
        />

        {/* Membership Level Modal */}
        <IncidentMembershipLevelModal
          visible={membershipLevelModalVisible}
          onClose={() => setMembershipLevelModalVisible(false)}
          onSelect={handleMembershipLevel}
        />

        {/* Match Detected Modal */}
        <MatchDetectedModal
          visible={matchDetectedModalVisible}
          onClose={() => setMatchDetectedModalVisible(false)}
          matches={matchedGuests}
          onSelect={handleGuestSelect}
        />
      </SafeAreaView>
    </AnimatedModal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 13,
    backgroundColor: "white",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginRight: 8,
    left: 8,
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    marginRight: 1,
    marginLeft: 1,
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: "#000",
    marginBottom: 15,
    top: 6,
    fontWeight: "400",
  },
  requiredStar: {
    color: "#FF5722",
  },
  textInput: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#333",
  },
  dateInput: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  selectInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputText: {
    fontSize: 14,
    color: "#333",
  },
  placeholderText: {
    color: "#999",
  },
  // Additional styles needed for the component
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  codeContainer: {
    height: 40,
    width: 100,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 8,
  },
  codeText: {
    fontSize: 14,
    color: "#999",
  },
  phoneInputWrapper: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  phoneInput: {
    flex: 1,
    height: 44,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#333",
  },
  searchIcon: {
    padding: 10,
  },
  emailInputContainer: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  emailInput: {
    flex: 1,
    height: 44,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#333",
  },
  addButton: {
    height: 36,
    width: 80,
    backgroundColor: "#0f172a",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  disabledButtonText: {
    color: "#888",
  },
  removeButton: {
    padding: 8,
    marginLeft: 8,
  },
  submitButton: {
    height: 48,
    backgroundColor: "#FF5722",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default IncidentGuestDetailsModal
