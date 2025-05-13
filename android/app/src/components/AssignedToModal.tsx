"use client"

import type React from "react"
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Platform } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import AnimatedModal from "./AnimatedModal"
import { ChevronRight } from "react-native-feather"

const { width, height } = Dimensions.get("window")

interface AssignedToModalProps {
  visible: boolean
  onClose: () => void
  selectedEmployees: Array<{ id: string; name: string }>
  handleAddEmployee: () => void
  handleSubmitEmployees: () => void
}

const AssignedToModal: React.FC<AssignedToModalProps> = ({
  visible,
  onClose,
  selectedEmployees,
  handleAddEmployee,
  handleSubmitEmployees,
}) => {
  return (
<AnimatedModal 
      visible={visible} 
      onClose={onClose}
      adaptiveHeight={true}
      minHeight={ Platform.OS === "ios" ? "70%" : "45%"}
    >     
      <View style={styles.modalHeader}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <AntDesign name="back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Assigned To</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.modalContent}>
        <View style={styles.card}>
          {/* Employee Selection Fields */}
          {selectedEmployees.map((employee) => (
            <TouchableOpacity key={employee.id} style={styles.employeeField} onPress={handleAddEmployee}>
              <Text style={styles.employeeText}>{employee.name}</Text>
              <ChevronRight color="#555" size={16} />
            </TouchableOpacity>
          ))}

          {/* Add Button */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddEmployee}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.modalFooter}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitEmployees}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
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
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    textAlign: "left",
    left:8
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 1,
    flex: 1,
    top:8
  },
  card: {
    backgroundColor: "#fff",
    // borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  employeeField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
  },
  employeeText: {
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#1a1f36",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 25,
    alignSelf: "flex-start",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
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

export default AssignedToModal
