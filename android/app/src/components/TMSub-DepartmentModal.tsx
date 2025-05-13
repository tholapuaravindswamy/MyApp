"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Dimensions } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import AnimatedModal from "./AnimatedModal"

interface SubDepartmentModalProps {
  visible: boolean
  onClose: () => void
  onSelect: (value: string) => void
}

const SubDepartmentModal: React.FC<SubDepartmentModalProps> = ({ visible, onClose, onSelect }) => {
  const [modalHeight, setModalHeight] = useState("55%")
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

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
      setModalHeight("55%")
    }
  }, [height])

  const options = [
    { id: "1", name: "Department 1" },
    { id: "2", name: "Department 2" },
    { id: "3", name: "Department 3" },
    { id: "4", name: "Department 4" },
    { id: "5", name: "Department 5" },
    { id: "6", name: "Department 6" },
    { id: "7", name: "Department 7" },
    { id: "8", name: "Department 8" },
    { id: "9", name: "Department 9" },
  ]

  const handleOptionPress = (value: string) => {
    setSelectedOption(value)
  }

  const handleSubmit = () => {
    if (selectedOption) {
      onSelect(selectedOption)
      onClose()
    }
  }

  // Reset selected option when modal is opened
  useEffect(() => {
    if (visible) {
      setSelectedOption(null)
    }
  }, [visible])

  return (
    <AnimatedModal visible={visible} onClose={onClose} adaptiveHeight={true} minHeight={modalHeight}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <AntDesign name="back" size={26} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sub-Department</Text>
        </View>

        <View style={styles.contentContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.optionItem, selectedOption === item.name && styles.selectedOptionItem]}
                onPress={() => handleOptionPress(item.name)}
              >
                <Text style={styles.optionText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.listContent}
          />
        </View>

        {/* Submit Button - Outside the white card */}
          <TouchableOpacity
            style={[styles.submitButton, 
              // !selectedOption && styles.disabledButton
            ]}
            onPress={handleSubmit}
            // disabled={!selectedOption}
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
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    marginBottom: 9,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    marginBottom:10

  },
  listContent: {
    backgroundColor: "#FFFFFF",
  },
  optionItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  selectedOptionItem: {
    backgroundColor: "#FAF3F0",
  },
  optionText: {
    fontSize: 14,
    color: "#000000",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5E5",
  },
 submitButton: {
    backgroundColor: "#FF5722",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom:9,
    marginHorizontal:15
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

export default SubDepartmentModal
