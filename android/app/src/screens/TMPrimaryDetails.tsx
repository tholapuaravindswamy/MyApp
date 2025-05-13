"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
} from "react-native"
import { ArrowLeft, Calendar, ChevronRight } from "react-native-feather"

const { width } = Dimensions.get("window")

const TMPrimaryDetails = ({ navigation }) => {
  const [formData, setFormData] = useState({
    uid: "ABCD12345678",
    createdOn: "01-04-2025  04:37",
    createdBy: "Employee Name",
    resolutionType: "Employee Name",
    resolutionDate: "01-04-2025",
    subDepartment: "Select Option",
    assignedTo: "Select Option",
    status: "Select Option",
  })

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleBack = () => {
    navigation?.goBack()
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    // Add your submission logic here
  }

  const handleSelectOption = (field) => {
    console.log(`Select option for ${field}`)
    // Add your dropdown/selection logic here
  }

  const handleDateSelect = (field) => {
    console.log(`Select date for ${field}`)
    // Add your date picker logic here
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft width={20} height={20} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Primary Details</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* UID Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            UID<Text style={styles.asterisk}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={formData.uid}
            onChangeText={(text) => handleInputChange("uid", text)}
          />
        </View>

        {/* Created On Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Created On<Text style={styles.asterisk}>*</Text>
          </Text>
          <TouchableOpacity style={styles.dateInput} onPress={() => handleDateSelect("createdOn")}>
            <Calendar width={18} height={18} color="#000000" style={styles.calendarIcon} />
            <Text style={styles.dateText}>{formData.createdOn}</Text>
          </TouchableOpacity>
        </View>

        {/* Created By Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Created By<Text style={styles.asterisk}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={formData.createdBy}
            onChangeText={(text) => handleInputChange("createdBy", text)}
          />
        </View>

        {/* Resolution Type Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Resolution Type<Text style={styles.asterisk}>*</Text>
          </Text>
          <TouchableOpacity style={styles.selectInput} onPress={() => handleSelectOption("resolutionType")}>
            <Text style={styles.selectText}>{formData.resolutionType}</Text>
            <ChevronRight width={18} height={18} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Resolution Date Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Resolution Date<Text style={styles.asterisk}>*</Text>
          </Text>
          <TouchableOpacity style={styles.dateInput} onPress={() => handleDateSelect("resolutionDate")}>
            <Calendar width={18} height={18} color="#000000" style={styles.calendarIcon} />
            <Text style={styles.dateText}>{formData.resolutionDate}</Text>
          </TouchableOpacity>
        </View>

        {/* Sub-Department Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Sub-Department<Text style={styles.asterisk}>*</Text>
          </Text>
          <TouchableOpacity style={styles.selectInput} onPress={() => handleSelectOption("subDepartment")}>
            <Text style={[styles.selectText, formData.subDepartment === "Select Option" && styles.placeholderText]}>
              {formData.subDepartment}
            </Text>
            <ChevronRight width={18} height={18} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Assigned To Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Assigned To<Text style={styles.asterisk}>*</Text>
          </Text>
          <TouchableOpacity style={styles.selectInput} onPress={() => handleSelectOption("assignedTo")}>
            <Text style={[styles.selectText, formData.assignedTo === "Select Option" && styles.placeholderText]}>
              {formData.assignedTo}
            </Text>
            <ChevronRight width={18} height={18} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Status Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Status<Text style={styles.asterisk}>*</Text>
          </Text>
          <TouchableOpacity style={styles.selectInput} onPress={() => handleSelectOption("status")}>
            <Text style={[styles.selectText, formData.status === "Select Option" && styles.placeholderText]}>
              {formData.status}
            </Text>
            <ChevronRight width={18} height={18} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    width:'100%'
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000"
  },
  content: {
    padding: 19,
    backgroundColor: "#ffffff",
    paddingBottom: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 5,
    top:3
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000000",
    marginBottom: 8,
  },
  asterisk: {
    color: "#FF3B30",
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#000000",
    backgroundColor: "#FFFFFF",
  },
  selectInput: {
    height: 44,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  selectText: {
    fontSize: 14,
    color: "#000000",
  },
  placeholderText: {
    color: "#A0A0A0",
  },
  dateInput: {
    height: 44,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  calendarIcon: {
    marginRight: 8,
  },
  dateText: {
    fontSize: 14,
    color: "#000000",
  },
  submitButton: {
    backgroundColor: "#FF5722",
    height: 48,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  submitText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
})

export default TMPrimaryDetails;
