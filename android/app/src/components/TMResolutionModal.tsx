"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import { Calendar } from "react-native-feather"
import DropDownPicker from "react-native-dropdown-picker"
import AnimatedModal from "./AnimatedModal"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import moment from "moment"

interface TMResolutionModalProps {
  visible: boolean
  onClose: () => void
  onSelect: (data: {
    resolutionType: string | null
    resolutionDate: string | null
  }) => void
  initialValue?: { resolutionType: string | null; resolutionDate: string | null }
}

const TMResolutionModal: React.FC<TMResolutionModalProps> = ({
  visible,
  onClose,
  onSelect,
  initialValue = { resolutionType: null, resolutionDate: null },
}) => {
  const [open, setOpen] = useState(false)
  const [resolutionDate, setResolutionDate] = useState<string | null>(initialValue.resolutionDate)
  const [resolutionType, setResolutionType] = useState(initialValue.resolutionType)
  const [items, setItems] = useState([
    { label: "Until Resolved", value: "until_resolved" },
    { label: "Resolved", value: "resolved" },
  ])
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())

  const showDatePicker = () => {
    // Update to current date whenever the picker is opened
    setCurrentDate(new Date())
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: Date) => {
    const formattedDate = moment(date).format("DD-MM-YYYY")
    setResolutionDate(formattedDate)
    hideDatePicker()
  }

  const handleSubmit = () => {
    onSelect({
      resolutionType,
      resolutionDate: resolutionType === "until_resolved" ? null : resolutionDate,
    })
    onClose()
  }

  const untilResolved = resolutionType === "until_resolved"

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <AntDesign name="back" size={26} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Resolution</Text>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Resolution Type */}
          <View style={[styles.formGroup, { zIndex: 2000 }]}>
            <Text style={styles.label}>
              Resolution Type<Text style={styles.required}>*</Text>
            </Text>
            <DropDownPicker
              open={open}
              setOpen={setOpen}
              value={resolutionType}
              setValue={setResolutionType}
              items={items}
              setItems={setItems}
              placeholder="Select Option"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>

          {/* Resolution Date */}
          <View style={[styles.formGroup, { zIndex: 1000 }]}>
            <Text style={styles.label}>
              Resolution Date<Text style={styles.required}>*</Text>
            </Text>
            <TouchableOpacity
              style={[styles.dateContainer, untilResolved && styles.disabledInput]}
              disabled={untilResolved}
              onPress={showDatePicker}
            >
              <Calendar width={20} height={20} color="#000000" />
              <Text style={[styles.dateText, !resolutionDate && styles.placeholderText]}>
                {resolutionDate || "Select Date"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              maximumDate={new Date()} // optional: disable future dates
              date={currentDate} // Set the initial date to current date
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            // (!resolutionType || (resolutionType === "resolved" && !resolutionDate)) && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          // disabled={!resolutionType || (resolutionType === "resolved" && !resolutionDate)}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </AnimatedModal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 12,
    color: "#000000",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    // borderRadius: 10,
  },
  formGroup: {
    marginBottom: 24,
    zIndex: 1000, // Important for dropdown layering
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#000000",
  },
  required: {
    color: "#FF0000",
  },
  dropdown: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  dropdownContainer: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E0E0E0",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  disabledInput: {
    opacity: 0.6,
  },
  disabledButton: {
    backgroundColor: "#ccc",
    opacity: 0.8,
  },
  dateText: {
    fontSize: 16,
    color: "#000000",
    marginLeft: 12,
  },
  placeholderText: {
    color: "#999999",
  },
  submitButton: {
    backgroundColor: "#FF5722",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    margin: 10,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default TMResolutionModal
