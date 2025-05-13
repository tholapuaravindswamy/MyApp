"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import AnimatedModal from "./AnimatedModal"

interface IncidentReportedToModalProps {
  visible: boolean
  onClose: () => void
  onSelect: (employee: any) => void
}

const IncidentReportedToModal: React.FC<IncidentReportedToModalProps> = ({ visible, onClose, onSelect }) => {
  // Sample data - in a real app, this would come from an API
  const allEmployees = [
    { id: "1", name: "Srinivas" },
    { id: "2", name: "Ganga" },
    { id: "3", name: "Ramesh" },
    { id: "4", name: "Gopi" },
    { id: "5", name: "Vijay" },
    { id: "6", name: "Satish" },

  ]
  
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredEmployees, setFilteredEmployees] = useState(allEmployees)
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null)
  const [showingSelected, setShowingSelected] = useState(false)

  
  // Filter employees based on search query
  useEffect(() => {
    const sourceList = showingSelected && selectedEmployee ? [selectedEmployee] : allEmployees
  
    if (searchQuery.trim() === "") {
      setFilteredEmployees(sourceList)
    } else {
      const filtered = sourceList.filter((employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredEmployees(filtered)
    }
  }, [searchQuery, selectedEmployee, showingSelected])
  
  const handleEmployeeSelect = (employee: any) => {
    if (selectedEmployee?.id === employee.id) {
      setSelectedEmployee(null) // unselect
    } else {
      setSelectedEmployee(employee) // select
    }
  }
  
  const handleShowSelected = () => {
    if (!selectedEmployee) return // prevent toggle if none selected
    setShowingSelected(!showingSelected)
  }
  
  
  const clearSearch = () => {
    setSearchQuery("")
  }
  
  const handleSubmit = () => {
    if (selectedEmployee) {
      onSelect([selectedEmployee]) // still passing as array for compatibility
      onClose()
    }
  }
  
  const renderItem = ({ item }: { item: any }) => {
    const isSelected = selectedEmployee?.id === item.id
  
    return (
      <TouchableOpacity
        style={[styles.employeeItem, isSelected && styles.selectedEmployeeItem]}
        onPress={() => handleEmployeeSelect(item)}
      >
        <Text style={styles.employeeText}>{item.name}</Text>
        {/* {isSelected && <AntDesign name="check" size={18} color="#007AFF" />} */}
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
            <Text style={styles.headerTitle}>Reported To</Text>
            <TouchableOpacity
  onPress={handleShowSelected}
  disabled={!selectedEmployee}
>
  <Text
    style={[
      styles.showSelectedText,
      !selectedEmployee && styles.disabledShowSelectedText
    ]}
  >
    {showingSelected ? "Show All" : "Show Selected"}
  </Text>
</TouchableOpacity>

          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
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
              <AntDesign name="close" size={18} color="#999" />
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
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.submitButton]}
            onPress={handleSubmit}
            // disabled={selectedEmployee.length === 0}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 4,
  },
  titleRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginRight: 8,
  },
  showSelectedText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    // borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    margin: 1,
    top:6
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
  disabledShowSelectedText: {
    color: "#ccc", // light gray to show it's disabled
  },
  listContent: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 1,
    top:14,
    // borderRadius: 10,
  },
  employeeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  selectedEmployeeItem: {
    backgroundColor: "#FAF3F0",
    borderRadius: 5,
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
  bottomContainer: {
    padding: 16,
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
    backgroundColor: "#ff5722",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    top:8
  },
  
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default IncidentReportedToModal
