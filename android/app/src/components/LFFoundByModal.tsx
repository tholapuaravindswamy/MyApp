"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import AnimatedModal from "./AnimatedModal"

interface LFFoundByModalProps {
  visible: boolean
  onClose: () => void
  onSelect: (employee: string) => void
  previousEmployee?: string
}

const LFFoundByModal: React.FC<LFFoundByModalProps> = ({ visible, onClose, onSelect, previousEmployee = "" }) => {
  // Sample data - in a real app, this would come from an API
  const allEmployees = [
    { id: "1", name: "Kumar" },
    { id: "2", name: "Ravi" },
    { id: "3", name: "Vijay Kumar" },
    { id: "4", name: "Sai" },
    { id: "5", name: "Kiran Sai" },
    { id: "6", name: "Raju" },
  ]

  const [searchQuery, setSearchQuery] = useState("")
  const [filteredEmployees, setFilteredEmployees] = useState(allEmployees)
  const [selectedEmployee, setSelectedEmployee] = useState(previousEmployee)
  const [showOnlySelected, setShowOnlySelected] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filter employees based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredEmployees(allEmployees)
    } else {
      const filtered = allEmployees.filter((employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredEmployees(filtered)
    }
  }, [searchQuery])

  const handleEmployeeSelect = (employee: any) => {
    setSelectedEmployee(employee.name)
  }

  const handleSubmit = () => {
    if (selectedEmployee) {
      setIsSubmitting(true)
      // Simulate API call with a short delay
      setTimeout(() => {
        onSelect(selectedEmployee)
        setIsSubmitting(false)
        onClose()
      }, 300)
    }
  }

  useEffect(() => {
    let filtered = allEmployees

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((employee) => employee.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    if (showOnlySelected && selectedEmployee) {
      filtered = filtered.filter((employee) => employee.name === selectedEmployee)
    }

    setFilteredEmployees(filtered)
  }, [searchQuery, showOnlySelected, selectedEmployee])

  const toggleShowSelected = () => {
    setShowOnlySelected(!showOnlySelected)
  }

  const handleShowSelected = () => {
    // Filter to show only selected employee
    if (selectedEmployee) {
      const selected = allEmployees.filter((employee) => employee.name === selectedEmployee)
      setFilteredEmployees(selected)
    } else {
      setFilteredEmployees(allEmployees)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const renderItem = ({ item }: { item: any }) => {
    const isSelected = selectedEmployee === item.name

    return (
      <TouchableOpacity
        style={[styles.employeeItem, isSelected && styles.selectedEmployeeItem]}
        onPress={() => handleEmployeeSelect(item)}
      >
        <Text style={styles.employeeText}>{item.name}</Text>
        {/* {isSelected && <Ionicons name="checkmark-circle" size={20} color="#FF5722" />} */}
      </TouchableOpacity>
    )
  }

  const ItemSeparator = () => <View style={styles.separator} />

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
  <TouchableOpacity style={styles.backButton} onPress={onClose}>
    <AntDesign name="back" size={26} color="black" />
  </TouchableOpacity>

  <View style={styles.titleRow}>
    <Text style={styles.headerTitle}>Found By</Text>
    <TouchableOpacity onPress={toggleShowSelected} disabled={!selectedEmployee}>
      <Text style={[
        styles.showSelectedText, 
        !selectedEmployee && styles.disabledShowSelectedText
      ]}>
        {showOnlySelected ? "Show All" : "Show Selected"}
      </Text>
    </TouchableOpacity>
  </View>
</View>


        {/* Search Bar */}
        <View style={styles.searchContainer}>
          {/* Search Icon on the Left */}
          <View style={styles.searchIcon}>
            <Ionicons name="search" size={18} color="#999" />
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />

          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons name="close-circle" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {/* Employee List */}
        <View style={styles.listContent}>
          {filteredEmployees.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No results found</Text>
            </View>
          ) : (
            <FlatList
              data={filteredEmployees}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={ItemSeparator}
            />
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton,
            //  !selectedEmployee && styles.submitButtonDisabled
            ]}
          onPress={handleSubmit}
          // disabled={!selectedEmployee || isSubmitting}
        >
          {/* {isSubmitting ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : ( */}
            <Text style={styles.submitButtonText}>Submit</Text>
          {/* )} */}
        </TouchableOpacity>
      </View>
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
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 12,
  },
  
  backButton: {
    padding: 4,
  },
  
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  
  showSelectedText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
    marginLeft: 12,
  },
  
  disabledShowSelectedText: {
    color: "#CCCCCC",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  searchIcon: {
    paddingRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 15,
    color: "#000",
  },
  listContent: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 72,
  },
  employeeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  selectedEmployeeItem: {
    backgroundColor: "#fef4ee", // Light orange background for selected items
  },

  employeeText: {
    fontSize: 16,
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginLeft: 16,
  },
  noResultsContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  noResultsText: {
    fontSize: 16,
    color: "#888",
  },
  submitButton: {
    position: "absolute",
    bottom: 10,
    left: 16,
    right: 16,
    backgroundColor: "#ff5722",
    borderRadius: 8,
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

export default LFFoundByModal
