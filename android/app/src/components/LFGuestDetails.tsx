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
} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import DateTimePicker from "@react-native-community/datetimepicker"
import CountryPicker, { type Country, type CountryCode, DEFAULT_THEME } from "react-native-country-picker-modal"
import AnimatedModal from "./AnimatedModal"

const { width } = Dimensions.get("window")

interface LFGuestDetailsProps {
  visible: boolean
  onClose: () => void
  onSubmit?: (guestData: any) => void
}

interface PhoneInput {
  countryCode: CountryCode
  country: Country | null
  displayCode: string
  number: string
}

const LFGuestDetails: React.FC<LFGuestDetailsProps> = ({ visible, onClose, onSubmit }) => {
  // Form state
  const [formData, setFormData] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    telephones: [] as string[],
    emails: [] as string[],
    membershipType: "",
    membershipLevel: "",
    membershipNumber: "",
    dateOfBirth: "",
    anniversary: "",
  })

  // State for phone inputs
  const [phoneInputs, setPhoneInputs] = useState<PhoneInput[]>([
    {
      countryCode: "IN",
      country: null,
      displayCode: "Code",
      number: "",
    },
    {
      countryCode: "IN",
      country: null,
      displayCode: "Code",
      number: "",
    },
  ])

  // State for email input
  const [newEmail, setNewEmail] = useState("")

  // Country picker state
  const [activePhoneIndex, setActivePhoneIndex] = useState(0)
  const [countryPickerVisible, setCountryPickerVisible] = useState(false)
  const [withFlag, setWithFlag] = useState(true)
  const [withEmoji, setWithEmoji] = useState(true)
  const [withFilter, setWithFilter] = useState(true)
  const [withCallingCode, setWithCallingCode] = useState(true)
  const [withCallingCodeButton, setWithCallingCodeButton] = useState(false)

  // Date picker states
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [dateField, setDateField] = useState<"dateOfBirth" | "anniversary">("dateOfBirth")
  const [selectedDate, setSelectedDate] = useState(new Date())

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

  // Open country picker for specific phone input
  const openCountryPicker = (index: number) => {
    setActivePhoneIndex(index)
    setCountryPickerVisible(true)
  }

  // Handle country selection
  const handleCountrySelect = (country: Country) => {
    setPhoneInputs((prev) => {
      const updated = [...prev]
      updated[activePhoneIndex].countryCode = country.cca2
      updated[activePhoneIndex].country = country

      if (country.callingCode && country.callingCode.length > 0) {
        updated[activePhoneIndex].displayCode = `+${country.callingCode[0]}`
      } else {
        updated[activePhoneIndex].displayCode = "Code"
      }

      return updated
    })

    setCountryPickerVisible(false)
  }

  // Handle adding telephones
  const handleAddTelephone = () => {
    // Process each phone input that has a number
    const newTelephones: string[] = []

    phoneInputs.forEach((phoneInput) => {
      if (phoneInput.number.trim() !== "") {
        let phoneDisplay = phoneInput.displayCode
        if (phoneInput.country && phoneInput.country.flag) {
          phoneDisplay = `${phoneInput.displayCode}`
        }

        const fullNumber = `${phoneDisplay} ${phoneInput.number}`
        newTelephones.push(fullNumber)
      }
    })

    if (newTelephones.length > 0) {
      setFormData((prev) => ({
        ...prev,
        telephones: [...prev.telephones, ...newTelephones],
      }))

      // Clear the inputs after adding
      setPhoneInputs((prev) =>
        prev.map((input) => ({
          ...input,
          number: "",
        })),
      )
    }
  }

  // Handle adding a new email
  const handleAddEmail = () => {
    if (newEmail.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        emails: [...prev.emails, newEmail],
      }))
      setNewEmail("")
    }
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

  // Handle form submission
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData)
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
              <TouchableOpacity style={styles.selectInput}>
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
                  <TouchableOpacity style={styles.codeContainer} onPress={() => openCountryPicker(index)}>
                    <Text
                      style={[
                        styles.codeText,
                        phoneInput.country && { color: "#333", fontWeight: "500", fontSize: 16 },
                      ]}
                    >
                      {phoneInput.country
                        ? phoneInput.country.flag
                          ? ` ${phoneInput.displayCode}`
                          : phoneInput.displayCode
                        : "Code"}
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
                    <TouchableOpacity style={styles.searchIcon}>
                      <Feather name="search" size={20} color="#888" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              {/* Display existing phones */}
              {formData.telephones.map((phone, index) => (
                <View key={index} style={styles.addedItemContainer}>
                  <Text style={styles.addedItem}>{phone}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setFormData((prev) => ({
                        ...prev,
                        telephones: prev.telephones.filter((_, i) => i !== index),
                      }))
                    }}
                    style={styles.deleteButton}
                  >
                    <AntDesign name="close" size={16} color="#666" />
                  </TouchableOpacity>
                </View>
              ))}

              <TouchableOpacity style={styles.addButton} onPress={handleAddTelephone}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.emailInputContainer}>
                <TextInput
                  style={styles.emailInput}
                  placeholder="Enter Email ID"
                  value={newEmail}
                  onChangeText={setNewEmail}
                  keyboardType="email-address"
                />
                <TouchableOpacity style={styles.searchIcon}>
                  <Feather name="search" size={20} color="#888" />
                </TouchableOpacity>
              </View>

              {/* Display existing emails */}
              {formData.emails.map((email, index) => (
                <View key={index} style={styles.addedItemContainer}>
                  <Text style={styles.addedItem}>{email}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setFormData((prev) => ({
                        ...prev,
                        emails: prev.emails.filter((_, i) => i !== index),
                      }))
                    }}
                    style={styles.deleteButton}
                  >
                    <AntDesign name="close" size={16} color="#666" />
                  </TouchableOpacity>
                </View>
              ))}

              <TouchableOpacity style={styles.addButton} onPress={handleAddEmail}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>

            {/* Membership Type */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Membership Type</Text>
              <TouchableOpacity style={styles.selectInput}>
                <Text style={[styles.inputText, !formData.membershipType && styles.placeholderText]}>
                  {formData.membershipType || "Select Option"}
                </Text>
                <Feather name="chevron-right" size={20} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Membership Level */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Membership Level</Text>
              <TouchableOpacity style={styles.selectInput}>
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
                  <Feather name="search" size={20} color="#888" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Date Of Birth */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Date Of Birth</Text>
              <TouchableOpacity style={styles.dateInput} onPress={() => handleDateFieldPress("dateOfBirth")}>
                <AntDesign name="calendar" size={20} color="#888" style={{ marginRight: 8 }} />
                <Text style={[styles.inputText, !formData.dateOfBirth && styles.placeholderText]}>
                  {formData.dateOfBirth || "01-04-2025"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Anniversary */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Anniversary</Text>
              <TouchableOpacity style={styles.dateInput} onPress={() => handleDateFieldPress("anniversary")}>
                <AntDesign name="calendar" size={20} color="#888" style={{ marginRight: 8 }} />
                <Text style={[styles.inputText, !formData.anniversary && styles.placeholderText]}>
                  {formData.anniversary || "01-04-2025"}
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

        {/* Country Picker Modal */}
        <CountryPicker
          {...{
            countryCode: phoneInputs[activePhoneIndex].countryCode,
            withFilter,
            withFlag,
            withCountryNameButton: false,
            withCallingCodeButton,
            withCallingCode,
            withEmoji,
            onSelect: handleCountrySelect,
            modalProps: {
              visible: countryPickerVisible,
            },
            onClose: () => setCountryPickerVisible(false),
            containerButtonStyle: styles.countryPickerButton,
            theme: DEFAULT_THEME,
            renderFlagButton: () => <View />,
          }}
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
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#000",
    marginBottom: 8,
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
    height: 44,
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
    height: 40,
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
  addedItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  addedItem: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  deleteButton: {
    padding: 4,
  },
  submitButton: {
    height: 48,
    backgroundColor: "#FF5722",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  countryPickerButton: {
    display: "none",
  },
})

export default LFGuestDetails
