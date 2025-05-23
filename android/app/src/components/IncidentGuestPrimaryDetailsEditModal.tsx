"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import DateTimePicker from "@react-native-community/datetimepicker"
import AnimatedModal from "./AnimatedModal"
import IncidentSalutionModal from "../components/IncidentSaluationModal"

interface IncidentPrimaryDetailsEditModalProps {
  visible: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  initialData?: {
    profileId?: string
    salutation?: string
    firstName?: string
    lastName?: string
    dateOfBirth?: string
    anniversary?: string
  }
}

const IncidentPrimaryDetailsEditModal: React.FC<IncidentPrimaryDetailsEditModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData = {},
}) => {
  const [formData, setFormData] = useState({
    profileId: initialData.profileId || "",
    salutation: initialData.salutation || "",
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    dateOfBirth: initialData.dateOfBirth || "",
    anniversary: initialData.anniversary || "",
  })

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [dateField, setDateField] = useState<"dateOfBirth" | "anniversary">("dateOfBirth")
  const [salutationModalVisible, setSalutationModalVisible] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleDateFieldPress = (field: "dateOfBirth" | "anniversary") => {
    setDateField(field)
    setShowDatePicker(true)
  }

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false)

    if (date) {
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

  const handleSalutationSelect = (selectedItems: any[]) => {
    if (selectedItems.length > 0) {
      setFormData((prev) => ({
        ...prev,
        salutation: selectedItems[0].name,
      }))
    }
  }

  const handleSubmit = () => {
    onSubmit(formData)
    onClose()
  }

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <AntDesign name="back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Primary Details</Text>
        </View>
<ScrollView>
        <View style={styles.content}>
          {/* Profile ID */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Profile ID*</Text>
            <TextInput
              style={styles.textInput}
              value={formData.profileId}
              onChangeText={(text) => handleInputChange("profileId", text)}
            />
          </View>

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

          {/* Date Of Birth */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Date Of Birth</Text>
            <TouchableOpacity style={styles.dateInput} onPress={() => handleDateFieldPress("dateOfBirth")}>
              <AntDesign name="calendar" size={20} color="#888" style={styles.calendarIcon} />
              <Text style={[styles.inputText, !formData.dateOfBirth && styles.placeholderText]}>
                {formData.dateOfBirth || "01-04-2025"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Anniversary */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Anniversary</Text>
            <TouchableOpacity style={styles.dateInput} onPress={() => handleDateFieldPress("anniversary")}>
              <AntDesign name="calendar" size={20} color="#888" style={styles.calendarIcon} />
              <Text style={[styles.inputText, !formData.anniversary && styles.placeholderText]}>
                {formData.anniversary || "01-04-2025"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
</ScrollView>
      </SafeAreaView>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker value={new Date()} mode="date" display="default" onChange={handleDateChange} />
        )}

        {/* Salutation Modal */}
        <IncidentSalutionModal
          visible={salutationModalVisible}
          onClose={() => setSalutationModalVisible(false)}
          onSelect={handleSalutationSelect}
        />
    </AnimatedModal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:10,
    backgroundColor: "#f0f2f5",

  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
    marginBottom:10

  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  content: {
    flex: 1,
    padding: 16,
       backgroundColor: "#fff",
 
  },
  inputGroup: {
    marginBottom: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: "#000",
    marginBottom: 8,
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
  dateInput: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  calendarIcon: {
    marginRight: 8,
  },
  inputText: {
    fontSize: 14,
    color: "#333",
  },
  placeholderText: {
    color: "#999",
  },
  submitButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginHorizontal:15,
    marginBottom:8
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default IncidentPrimaryDetailsEditModal
