"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, TextInput } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import AnimatedModal from "./AnimatedModal"

interface TMDescriptionModalProps {
  visible: boolean
  onClose: () => void
  onSelect: (description: string) => void
  initialValue?: string
}

const TMDescriptionModal: React.FC<TMDescriptionModalProps> = ({ visible, onClose, onSelect, initialValue = "" }) => {
  const [description, setDescription] = useState(initialValue)

  const handleSubmit = () => {
    onSelect(description)
    onClose()
  }

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <AntDesign name="back" size={26} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Task</Text>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          <View style={styles.formItemLeft}>
            <Text style={styles.formItemText}>
              Description<Text style={styles.requiredStar}>*</Text>
            </Text>
          </View>
          <TextInput
            placeholder="Enter Text"
            placeholderTextColor="grey"
            style={styles.textInput}
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton,
            //  !description.trim() && styles.submitButtonDisabled
            ]}
          onPress={handleSubmit}
        //   disabled={!description.trim()}
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
    backgroundColor: "#f5f7fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
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
    borderRadius: 12,
    margin: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  formItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  formItemText: {
    fontSize: 16,
    color: "#000",
  },
  requiredStar: {
    color: "#FF5722",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
    color: "black",
  },
  submitButton: {
    backgroundColor: "#FF5722",
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: "auto",
    marginBottom: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default TMDescriptionModal
