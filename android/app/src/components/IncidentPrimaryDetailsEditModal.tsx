"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform } from "react-native"
import { Calendar, ChevronRight } from "react-native-feather"
import AntDesign from "react-native-vector-icons/AntDesign"
import DateTimePicker from "@react-native-community/datetimepicker"
import AnimatedModal from "./AnimatedModal"
import SelectionModal from "./SelectionModal" // Import the new SelectionModal component

interface IncidentPrimaryDetailsEditModalProps {
  visible: boolean
  onClose: () => void
  initialData: any
  onSubmit: (data: any) => void
}

const IncidentPrimaryDetailsEditModal: React.FC<IncidentPrimaryDetailsEditModalProps> = ({
  visible,
  onClose,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(initialData)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [currentDateField, setCurrentDateField] = useState("")
  
  // State for selection modals
  const [currentSelectionField, setCurrentSelectionField] = useState("")
  const [showSelectionModal, setShowSelectionModal] = useState(false)

  // Sample data for each dropdown field
  const dropdownOptions = {
    reportedTo: [
      { id: '1', name: 'Employee Name 1' },
      { id: '2', name: 'Employee Name 2' },
      { id: '3', name: 'Employee Name 3' },
      { id: '4', name: 'Employee Name 4' },
      { id: '5', name: 'Employee Name 5' },
      { id: '6', name: 'Employee Name 6' },
      { id: '7', name: 'Employee Name 7' },
      { id: '8', name: 'Employee Name 8' },
    ],
    category: [
      { id: '1', name: 'Category 1' },
      { id: '2', name: 'Category 2' },
      { id: '3', name: 'Category 3' },
      { id: '4', name: 'Category 4' },
      { id: '5', name: 'Category 5' },
      { id: '6', name: 'Category 6' },
      { id: '7', name: 'Category 7' },
      { id: '8', name: 'Category 8' },
    ],
    department: [
      { id: '1', name: 'Department 1' },
      { id: '2', name: 'Department 2' },
      { id: '3', name: 'Department 3' },
      { id: '4', name: 'Department 4' },
      { id: '5', name: 'Department 5' },
      { id: '6', name: 'Department 6' },
      { id: '7', name: 'Department 7' },
      { id: '8', name: 'Department 8' },
    ],
    incidentSource: [
      { id: '1', name: 'Source 1' },
      { id: '2', name: 'Source 2' },
      { id: '3', name: 'Source 3' },
      { id: '4', name: 'Source 4' },
      { id: '5', name: 'Source 5' },
      { id: '6', name: 'Source 6' },
      { id: '7', name: 'Source 7' },
      { id: '8', name: 'Source 8' },
      { id: '9', name: 'Source 9'},
    ],
    status: [
      { id: '1', name: 'Open' },
      { id: '2', name: 'In Progress' },
      { id: '3', name: 'Closed' },
      { id: '4', name: 'Cancelled' },
      { id: '5', name: 'Pending' },
      { id: '6', name: 'Resolved' },
      { id: '7', name: 'On Hold' },
    ]
  }

  // Modal titles for each field
  const fieldTitles = {
    reportedTo: "Reported to",
    category: "Category",
    department: "Department",
    incidentSource: "Incident Source",
    status: "Status"
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleDatePress = (field: string) => {
    setCurrentDateField(field)
    setShowDatePicker(true)
  }

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      setShowDatePicker(false)
      return
    }

    setShowDatePicker(Platform.OS === "ios")

    if (selectedDate) {
      const day = String(selectedDate.getDate()).padStart(2, "0")
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
      const year = selectedDate.getFullYear()
      const hours = String(selectedDate.getHours()).padStart(2, "0")
      const minutes = String(selectedDate.getMinutes()).padStart(2, "0")

      const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`

      setFormData((prevState: any) => ({
        ...prevState,
        [currentDateField]: formattedDate,
      }))
    }
  }

  const handleSubmit = () => {
    onSubmit(formData)
    onClose()
  }

  const handleSelectOption = (field: string) => {
    setCurrentSelectionField(field)
    setShowSelectionModal(true)
  }

  const handleOptionSelected = (option: string) => {
    setFormData((prev: any) => ({ ...prev, [currentSelectionField]: option }))
    setShowSelectionModal(false)
  }

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <AntDesign name="back" size={26} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Primary Details</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* UID (Read-only) */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              UID<Text style={styles.requiredStar}>*</Text>
            </Text>
            <TextInput
              style={[styles.textInput, { backgroundColor: "#f0f0f0" }]}
              value={formData.uid}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>

          {/* Created On */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Created On<Text style={styles.requiredStar}>*</Text>
            </Text>
            <TouchableOpacity style={styles.dateInput} onPress={() => handleDatePress("createdOn")}>
              <Calendar color="#999" size={18} />
              <Text style={styles.inputText}>{formData.createdOn || "Select Date"}</Text>
              {showDatePicker && currentDateField === "createdOn" && (
                <DateTimePicker mode="date" display="default" value={new Date()} onChange={handleDateChange} />
              )}
            </TouchableOpacity>
          </View>

          {/* Created By */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Created By<Text style={styles.requiredStar}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Name"
              placeholderTextColor="#999"
              value={formData.createdBy}
              onChangeText={(text) => handleInputChange("createdBy", text)}
            />
          </View>

          {/* Incident Date & Time */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Incident Date & Time<Text style={styles.requiredStar}>*</Text>
            </Text>
            <TouchableOpacity style={styles.dateInput} onPress={() => handleDatePress("incidentDate")}>
              <Calendar color="#999" size={18} />
              <Text style={styles.inputText}>{formData.incidentDate || "Select Date"}</Text>
              {showDatePicker && currentDateField === "incidentDate" && (
                <DateTimePicker mode="date" display="default" value={new Date()} onChange={handleDateChange} />
              )}
            </TouchableOpacity>
          </View>

          {/* Reported Date & Time */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Reported Date & Time<Text style={styles.requiredStar}>*</Text>
            </Text>
            <TouchableOpacity style={styles.dateInput} onPress={() => handleDatePress("reportedDate")}>
              <Calendar color="#999" size={18} />
              <Text style={styles.inputText}>{formData.reportedDate || "Select Date"}</Text>
              {showDatePicker && currentDateField === "reportedDate" && (
                <DateTimePicker mode="date" display="default" value={new Date()} onChange={handleDateChange} />
              )}
            </TouchableOpacity>
          </View>

          {/* Reported To */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Reported To<Text style={styles.requiredStar}>*</Text>
            </Text>
            <TouchableOpacity style={styles.selectInput} onPress={() => handleSelectOption("reportedTo")}>
              <Text style={[styles.inputText, !formData.reportedTo && styles.placeholderText]}>
                {formData.reportedTo || "Select Option"}
              </Text>
              <ChevronRight color="#999" size={18} />
            </TouchableOpacity>
          </View>

          {/* Category */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Category<Text style={styles.requiredStar}>*</Text>
            </Text>
            <TouchableOpacity style={styles.selectInput} onPress={() => handleSelectOption("category")}>
              <Text style={[styles.inputText, !formData.category && styles.placeholderText]}>
                {formData.category || "Select Option"}
              </Text>
              <ChevronRight color="#999" size={18} />
            </TouchableOpacity>
          </View>

          {/* Department */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Department<Text style={styles.requiredStar}>*</Text>
            </Text>
            <TouchableOpacity style={styles.selectInput} onPress={() => handleSelectOption("department")}>
              <Text style={[styles.inputText, !formData.department && styles.placeholderText]}>
                {formData.department || "Select Option"}
              </Text>
              <ChevronRight color="#999" size={18} />
            </TouchableOpacity>
          </View>

          {/* Incident Source */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Incident Source<Text style={styles.requiredStar}>*</Text>
            </Text>
            <TouchableOpacity style={styles.selectInput} onPress={() => handleSelectOption("incidentSource")}>
              <Text style={[styles.inputText, !formData.incidentSource && styles.placeholderText]}>
                {formData.incidentSource || "Select Option"}
              </Text>
              <ChevronRight color="#999" size={18} />
            </TouchableOpacity>
          </View>

          {/* Cost of Recovery */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Cost Of Recovery</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Number"
              placeholderTextColor="#999"
              value={formData.costOfRecovery}
              onChangeText={(text) => handleInputChange("costOfRecovery", text)}
              keyboardType="numeric"
            />
          </View>

          {/* Status */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Status<Text style={styles.requiredStar}>*</Text>
            </Text>
            <TouchableOpacity style={styles.selectInput} onPress={() => handleSelectOption("status")}>
              <Text style={[styles.inputText, !formData.status && styles.placeholderText]}>
                {formData.status || "Select Option"}
              </Text>
              <ChevronRight color="#999" size={18} />
            </TouchableOpacity>
          </View>
          
          
        </ScrollView>

        {/* Selection Modal */}
        {showSelectionModal && (
          <SelectionModal
            visible={showSelectionModal}
            onClose={() => setShowSelectionModal(false)}
            onSelect={handleOptionSelected}
            title={fieldTitles[currentSelectionField as keyof typeof fieldTitles]}
            options={dropdownOptions[currentSelectionField as keyof typeof dropdownOptions]}
            previousSelection={formData[currentSelectionField]}
          />
        )}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
      </View>
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
    left:8
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    marginRight: 1,
    marginLeft: 1,
    // borderRadius: 8,
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
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
    backgroundColor: "#f9f9f9",
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
    backgroundColor: "#f9f9f9",
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
    backgroundColor: "#f9f9f9",
  },
  inputText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
  },
  placeholderText: {
    color: "#999",
  },
  submitButton: {
    backgroundColor: "#FF5722",
    borderRadius: 10,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 10,
    marginRight:15,
    marginLeft:15
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default IncidentPrimaryDetailsEditModal