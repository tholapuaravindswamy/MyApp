"use client"
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from "react-native"
import type React from "react"
import { useState } from "react"

import DateTimePicker from "@react-native-community/datetimepicker"
import { Calendar } from "react-native-feather"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import AnimatedModal from "./AnimatedModal"
import GuestStatusModal from "./GuestStatusModal"

const { width, height } = Dimensions.get("window")

interface PrimaryDetailsModalProps {
  visible: boolean
  onClose: () => void
  formValues: any
  setFormValues: (callback: (prev: any) => any) => void
  handleSaveDetails: () => void
  handleDatePress: (field: string) => void
  showDatePicker: boolean
  handleDateChange: (event: any, date?: Date) => void
}

const PrimaryDetailsModal: React.FC<PrimaryDetailsModalProps> = ({
  visible,
  onClose,
  formValues,
  setFormValues,
  handleSaveDetails,
  handleDatePress,
  showDatePicker,
  handleDateChange,
}) => {
  const [statusModalVisible, setStatusModalVisible] = useState(false)

  const handleStatusSelect = (status: string) => {
    setFormValues((prev: any) => ({ ...prev, status: status }))
    setStatusModalVisible(false)
  }

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
      <View style={styles.modalHeader}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <AntDesign name="back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Edit Primary Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.modalContent}>
        {/* UID */}
        <Text style={styles.label}>UID*</Text>
        <TextInput
          style={styles.input}
          value={formValues.uid}
          onChangeText={(text) => setFormValues((prev) => ({ ...prev, uid: text }))}
        />

        {/* Created On */}
        <Text style={styles.label}>Created On*</Text>
        <TouchableOpacity style={styles.inputRow} onPress={() => handleDatePress("createdOn")}>
          <Calendar color="#333" size={18} style={styles.calendarIcon} />
          <Text style={[styles.dateText, !formValues.createdOn && styles.placeholderText]}>
            {formValues.createdOn || "Select Date"}
          </Text>
        </TouchableOpacity>

        {/* Created By */}
        <Text style={styles.label}>Created By*</Text>
        <TextInput
          style={styles.input}
          value={formValues.createdBy}
          onChangeText={(text) => setFormValues((prev) => ({ ...prev, createdBy: text }))}
        />

        {/* Task Type */}
        <Text style={styles.label}>Task Type*</Text>
        <TextInput
          style={styles.input}
          value={formValues.taskType}
          onChangeText={(text) => setFormValues((prev) => ({ ...prev, taskType: text }))}
        />

        {/* Category */}
        <Text style={styles.label}>Category*</Text>
        <TextInput
          style={styles.input}
          value={formValues.category}
          onChangeText={(text) => setFormValues((prev) => ({ ...prev, category: text }))}
        />

        {/* Location */}
        <Text style={styles.label}>Location*</Text>
        <TextInput
          style={styles.input}
          value={formValues.location}
          onChangeText={(text) => setFormValues((prev) => ({ ...prev, location: text }))}
        />

        {/* Schedule */}
        <Text style={styles.label}>Schedule*</Text>
        <TouchableOpacity style={styles.inputRow} onPress={() => handleDatePress("schedule")}>
          <Calendar color="#333" size={18} style={styles.calendarIcon} />
          <Text style={[styles.dateText, !formValues.schedule && styles.placeholderText]}>
            {formValues.schedule || "Select Date"}
          </Text>
        </TouchableOpacity>

        {/* Timer */}
        <Text style={styles.label}>Timer*</Text>
        <TextInput
          style={styles.input}
          value={formValues.timer}
          onChangeText={(text) => setFormValues((prev) => ({ ...prev, timer: text }))}
        />

        {/* Status */}
        <Text style={styles.label}>Status*</Text>
        <TouchableOpacity 
          style={styles.inputRow} 
          onPress={() => setStatusModalVisible(true)}
        >
          <Text style={[styles.selectText, formValues.status !== "Select Option" && styles.activeSelectText]}>
            {formValues.status}
          </Text>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker mode="date" display="default" value={new Date()} onChange={handleDateChange} />
      )}

      <View style={styles.modalFooter}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSaveDetails}>
          <Text style={styles.submitText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Status Modal */}
      <GuestStatusModal
        visible={statusModalVisible}
        onClose={() => setStatusModalVisible(false)}
        onSelect={handleStatusSelect}
        currentStatus={formValues.status}
      />
    </AnimatedModal>
  )
}

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
    marginBottom:10
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    textAlign: 'left',
    left:8
  },
  closeButton: {
    padding: 4,
  },
  headerSpacer: {
    width: 24,
  },
  modalContent: {
    padding: 10,
    flex: 1,
    backgroundColor: "white",
    // borderRadius: 10,
    paddingVertical: 0,
    top: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: "#fff",
    color: "#000",
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
  calendarIcon: {
    marginRight: 8,
  },
  dateText: {
    fontSize: 14,
    color: "#000",
  },
  placeholderText: {
    color: "#999",
  },
  selectText: {
    flex: 1,
    fontSize: 14,
    color: "#999",
  },
  activeSelectText: {
    color: "#000",
  },
  modalFooter: {
    padding: 10,
  },
  submitButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default PrimaryDetailsModal