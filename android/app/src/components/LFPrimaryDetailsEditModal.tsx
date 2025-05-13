"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Platform } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import AnimatedModal from "./AnimatedModal"
import LFFoundLocationModal from "./LFFoundLocationModal"
import LFFoundByModal from "./LFFoundByModal"
import LFArticleCountModal from "./LFArticleCountModal"
import DateTimePicker from "@react-native-community/datetimepicker"

interface LFPrimaryDetailsEditModalProps {
  visible: boolean
  onClose: () => void
  initialData?: any
  onSubmit: (data: any) => void
  navigation: any
}

const LFPrimaryDetailsEditModal: React.FC<LFPrimaryDetailsEditModalProps> = ({
  visible,
  onClose,
  initialData = {},
  onSubmit,
  navigation,
}) => {
  // State to store form values
  const [formValues, setFormValues] = useState({
    uid: "ABCD12345678",
    createdOn: "01-04-2025 04:37",
    createdBy: "Employee Name",
    foundLocation: "",
    foundOn: "01-04-2025",
    foundBy: "",
    articleCount: "",
    ...initialData,
  })

  // Update form values when initialData changes
  useEffect(() => {
    if (visible) {
      setFormValues({
        uid: "ABCD12345678",
        createdOn: "01-04-2025 04:37",
        createdBy: "Employee Name",
        foundLocation: "",
        foundOn: "01-04-2025",
        foundBy: "",
        articleCount: "",
        ...initialData,
      })
    }
  }, [visible, initialData])

  // State for sub-modals
  const [foundLocationModalVisible, setFoundLocationModalVisible] = useState(false)
  const [foundByModalVisible, setFoundByModalVisible] = useState(false)
  const [articleCountModalVisible, setArticleCountModalVisible] = useState(false)

  const [showCreatedOnPicker, setShowCreatedOnPicker] = useState(false)
  const [showFoundOnPicker, setShowFoundOnPicker] = useState(false)
  const [datePickerMode, setDatePickerMode] = useState<"date" | "time">("date")

  // Handle location selection
  const handleLocationSelect = (location: string) => {
    setFormValues((prev) => ({ ...prev, foundLocation: location }))
  }

  // Handle employee selection
  const handleEmployeeSelect = (employee: string) => {
    setFormValues((prev) => ({ ...prev, foundBy: employee }))
  }

  // Handle article count selection
  const handleArticleCountSelect = (count: string) => {
    setFormValues((prev) => ({ ...prev, articleCount: count }))
  }

  // Handle date selection for Created On
  const handleCreatedOnPress = () => {
    setDatePickerMode("date")
    setShowCreatedOnPicker(true)
  }

  // Handle time selection after date is selected for Created On
  const handleCreatedOnTimePress = () => {
    setDatePickerMode("time")
    setShowCreatedOnPicker(true)
  }

  // Handle date selection for Found On
  const handleFoundOnPress = () => {
    setShowFoundOnPicker(true)
  }

  // Handle date change for Created On
  const handleCreatedOnChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date()
    setShowCreatedOnPicker(Platform.OS === "ios")

    if (event.type === "dismissed") {
      return
    }

    if (datePickerMode === "date") {
      // Format the date part and keep the existing time
      const currentCreatedOn = formValues.createdOn
      const timepart = currentCreatedOn.split(" ")[1] || "00:00"

      const day = String(currentDate.getDate()).padStart(2, "0")
      const month = String(currentDate.getMonth() + 1).padStart(2, "0")
      const year = currentDate.getFullYear()

      const newCreatedOn = `${day}-${month}-${year} ${timepart}`
      setFormValues((prev) => ({ ...prev, createdOn: newCreatedOn }))

      // After selecting date, prompt for time
      setTimeout(() => {
        handleCreatedOnTimePress()
      }, 500)
    } else {
      // Format the time part and keep the existing date
      const currentCreatedOn = formValues.createdOn
      const datepart = currentCreatedOn.split(" ")[0] || "01-01-2023"

      const hours = String(currentDate.getHours()).padStart(2, "0")
      const minutes = String(currentDate.getMinutes()).padStart(2, "0")

      const newCreatedOn = `${datepart} ${hours}:${minutes}`
      setFormValues((prev) => ({ ...prev, createdOn: newCreatedOn }))
    }
  }

  // Handle date change for Found On
  const handleFoundOnChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date()
    setShowFoundOnPicker(Platform.OS === "ios")

    if (event.type === "dismissed") {
      return
    }

    const day = String(currentDate.getDate()).padStart(2, "0")
    const month = String(currentDate.getMonth() + 1).padStart(2, "0")
    const year = currentDate.getFullYear()

    const newFoundOn = `${day}-${month}-${year}`
    setFormValues((prev) => ({ ...prev, foundOn: newFoundOn }))
  }

  const handleSubmit = () => {
    onSubmit(formValues)
    onClose()
  }

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <AntDesign name="back" size={26} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Primary Details</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {/* UID */}
            <Text style={styles.label}>UID*</Text>
            <TextInput
              style={styles.input}
              value={formValues.uid}
              onChangeText={(text) => setFormValues((prev) => ({ ...prev, uid: text }))}
            />

            {/* Created On */}
            <Text style={styles.label}>Created On*</Text>
            <TouchableOpacity style={styles.inputRow} onPress={handleCreatedOnPress}>
              <Ionicons name="calendar-outline" size={18} color="#333" style={styles.icon} />
              <Text style={styles.inputNoBorder}>{formValues.createdOn}</Text>
              <Ionicons name="chevron-forward" size={18} color="#999" />
            </TouchableOpacity>

            {/* Created By */}
            <Text style={styles.label}>Created By*</Text>
            <TextInput
              style={styles.input}
              placeholder="Employee Name"
              value={formValues.createdBy}
              onChangeText={(text) => setFormValues((prev) => ({ ...prev, createdBy: text }))}
            />

            {/* Found Location */}
            <Text style={styles.label}>Found Location*</Text>
            <TouchableOpacity style={styles.inputRow} onPress={() => setFoundLocationModalVisible(true)}>
              <Text style={[styles.selectText, formValues.foundLocation ? styles.selectedText : {}]}>
                {formValues.foundLocation || "Select Option"}
              </Text>
              <Ionicons name="chevron-forward" size={18} color="#999" />
            </TouchableOpacity>

            {/* Found On */}
            <Text style={styles.label}>Found On*</Text>
            <TouchableOpacity style={styles.inputRow} onPress={handleFoundOnPress}>
              <Ionicons name="calendar-outline" size={18} color="#333" style={styles.icon} />
              <Text style={styles.inputNoBorder}>{formValues.foundOn}</Text>
              <Ionicons name="chevron-forward" size={18} color="#999" />
            </TouchableOpacity>

            {/* Found By */}
            <Text style={styles.label}>Found By*</Text>
            <TouchableOpacity style={styles.inputRow} onPress={() => setFoundByModalVisible(true)}>
              <Text style={[styles.selectText, formValues.foundBy ? styles.selectedText : {}]}>
                {formValues.foundBy || "Select Option"}
              </Text>
              <Ionicons name="chevron-forward" size={18} color="#999" />
            </TouchableOpacity>

            {/* Article Count */}
            <Text style={styles.label}>Article Count*</Text>
            <TouchableOpacity style={styles.inputRow} onPress={() => setArticleCountModalVisible(true)}>
              <Text style={[styles.selectText, formValues.articleCount ? styles.selectedText : {}]}>
                {formValues.articleCount || "Select Option"}
              </Text>
              <Ionicons name="chevron-forward" size={18} color="#999" />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Submit Button - Fixed at the bottom */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>

        {/* Date Pickers */}
        {showCreatedOnPicker && (
          <DateTimePicker
            value={new Date()}
            mode={datePickerMode}
            is24Hour={true}
            display="default"
            onChange={handleCreatedOnChange}
          />
        )}

        {showFoundOnPicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleFoundOnChange}
          />
        )}
      </View>

      {/* Separate Modal Components */}
      <LFFoundLocationModal
        visible={foundLocationModalVisible}
        onClose={() => setFoundLocationModalVisible(false)}
        onSelect={handleLocationSelect}
        initialLocation={formValues.foundLocation}
      />

      <LFFoundByModal
        visible={foundByModalVisible}
        onClose={() => setFoundByModalVisible(false)}
        onSelect={handleEmployeeSelect}
        initialEmployee={formValues.foundBy}
      />

      <LFArticleCountModal
        visible={articleCountModalVisible}
        onClose={() => setArticleCountModalVisible(false)}
        onSelect={handleArticleCountSelect}
        initialCount={formValues.articleCount}
      />
    </AnimatedModal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 19,
    backgroundColor: "#ffffff",
    paddingBottom: 10,
    marginHorizontal: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    height: 55,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginLeft: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
    marginTop: 12,
  },
  backButton: {
    padding: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: "#fff",
    color: "#101827CC",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    height: 44,
  },
  inputNoBorder: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  icon: {
    marginRight: 8,
  },
  selectText: {
    flex: 1,
    fontSize: 14,
    color: "#999",
  },
  selectedText: {
    color: "#000",
  },
  submitButton: {
    backgroundColor: "#FF5722",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 15,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default LFPrimaryDetailsEditModal
