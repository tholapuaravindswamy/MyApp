"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"

interface Employee {
  id: string
  name: string
}

interface AssignedToScreenProps {
  navigation?: any
  route?: {
    params?: {
      selectedEmployees?: Employee[]
    }
  }
}

const AssignedToScreen: React.FC<AssignedToScreenProps> = ({ navigation, route }) => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: "1", name: "Employee Name 1" },
    { id: "2", name: "Employee Name 2" },
  ])

  useEffect(() => {
    // Safely access route params with optional chaining
    if (route?.params?.selectedEmployees) {
      setEmployees(route.params.selectedEmployees)
    }
  }, [route?.params?.selectedEmployees])

  const handleAddEmployee = () => {
    // Navigate to employee selection screen
    navigation?.navigate("GuestEmployee", { selectedEmployees: employees })
  }

  const handleSubmit = () => {
    console.log("Submit pressed with employees:", employees)
    navigation?.goBack()
  }

  // Simple icon component for the chevron
  const ChevronRightIcon = () => <Text style={{ fontSize: 16, color: "#000" }}>›</Text>

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <AntDesign name="back" size={26} style={{ color: "black" }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assigned To</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          {/* Employee Selection Fields */}
          {employees.map((employee) => (
            <TouchableOpacity key={employee.id} style={styles.employeeField}>
              <Text style={styles.employeeText}>{employee.name}</Text>
              <ChevronRightIcon />
            </TouchableOpacity>
          ))}

          {/* Add Button */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddEmployee}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
    marginBottom: 12,
  },
  employeeText: {
    fontSize: 16,
    color: "#666",
  },
  addButton: {
    backgroundColor: "#1a1f36",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 25,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#ff5722",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default AssignedToScreen
