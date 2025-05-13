"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, Dimensions } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import AnimatedModal from "./AnimatedModal"

interface TaskTypeModalProps {
  visible: boolean
  onClose: () => void
  onSelect: (taskType: string) => void
}

const TaskTypeModal: React.FC<TaskTypeModalProps> = ({ visible, onClose, onSelect }) => {
  const [selectedTaskType, setSelectedTaskType] = useState<string | null>(null)
  const [modalHeight, setModalHeight] = useState("35%")

  // Get screen dimensions
  const { height } = Dimensions.get("window")

  // Adjust modal height based on screen size for very small or very large devices
  useEffect(() => {
    if (height < 600) {
      // For smaller devices
      setModalHeight("40%")
    } else if (height > 1000) {
      // For larger devices
      setModalHeight("30%")
    } else {
      // For most devices
      setModalHeight("35%")
    }
  }, [height])

  const handleSelect = (taskType: string) => {
    setSelectedTaskType(taskType)
  }

  const handleSubmit = () => {
    if (selectedTaskType) {
      onSelect(selectedTaskType)
      onClose()
    }
  }

  return (
    <AnimatedModal visible={visible} onClose={onClose} adaptiveHeight={true} minHeight={modalHeight}>
      <SafeAreaView style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <AntDesign name="back" size={26} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Task Type</Text>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          {/* Internal Option */}
          <TouchableOpacity
            style={[styles.formItem, selectedTaskType === "Internal" && styles.selectedItem]}
            onPress={() => handleSelect("Internal")}
          >
            <View style={styles.formItemLeft}>
              <Text style={styles.formItemText}>
                Internal<Text style={styles.requiredStar}>*</Text>
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Guest Option */}
          <TouchableOpacity
            style={[styles.formItem, selectedTaskType === "Guest" && styles.selectedItem]}
            onPress={() => handleSelect("Guest")}
          >
            <View style={styles.formItemLeft}>
              <Text style={styles.formItemText}>
                Guest<Text style={styles.requiredStar}>*</Text>
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton,
            //  !selectedTaskType && styles.disabledButton
            ]}
          onPress={handleSubmit}
          // disabled={!selectedTaskType}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
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
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: -7,
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  formCard: {
    backgroundColor: "#fff",
    marginTop: 16,
    marginBottom: 11,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  formItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  formItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  selectedItem: {
    backgroundColor: "#FFE5D0",
  },
  formItemText: {
    fontSize: 16,
    color: "#000",
  },
  requiredStar: {
    color: "#FF5722",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 16,
  },
  submitButton: {
    backgroundColor: "#FF5722",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: Platform.OS === "ios" ? 16 : 3,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default TaskTypeModal
