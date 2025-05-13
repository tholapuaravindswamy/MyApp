"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import AnimatedModal from "./AnimatedModal"

interface LFFoundEmployeeByModalProps {
  visible: boolean
  onClose: () => void
  onSelect: (employee: string) => void
  initialEmployee?: string
}

const LFFoundEmployeeByModal: React.FC<LFFoundEmployeeByModalProps> = ({ visible, onClose, onSelect, initialEmployee = "" }) => {
  // Sample data - in a real app, this would come from an API
  const allEmployees = [
    { id: "1", name: "Vijay" },
    { id: "2", name: "Ravi" },
    { id: "3", name: "Kumar" },
    { id: "4", name: "Sai" },
    { id: "5", name: "Karthik" },
    { id: "6", name: "Suresh" },
  
    
  ]

  const [searchQuery, setSearchQuery] = useState("")
  const [filteredEmployees, setFilteredEmployees] = useState(allEmployees)
  const [selectedEmployee, setSelectedEmployee] = useState(initialEmployee)
  const [showOnlySelected, setShowOnlySelected] = useState(false)

  // Filter employees based on search query and showOnlySelected
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

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee.name)
  }

  const handleSubmit = () => {
    if (selectedEmployee) {
      onSelect(selectedEmployee)
      onClose()
    }
  }

  const toggleShowSelected = () => {
    setShowOnlySelected(!showOnlySelected)
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const renderItem = ({ item }) => {
    const isSelected = selectedEmployee === item.name

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

          <Text style={styles.headerTitle}>Found By</Text>

          <TouchableOpacity onPress={toggleShowSelected} disabled={!selectedEmployee}>
            <Text style={[styles.showSelectedText, !selectedEmployee && styles.disabledText]}>
              {showOnlySelected ? "Show All" : "Show Selected"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color="#999" style={styles.searchIcon} />
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
        <View style={styles.listContainer}>
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
           <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.submitButton,
              //  !selectedEmployee && styles.disabledButton
              ]}
            onPress={handleSubmit}
            // disabled={!selectedEmployee}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        </View>

        {/* Submit Button */}
       
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom:10
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    right:55
  },
  showSelectedText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  disabledText: {
    color: "#CCCCCC",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    margin: 1,
    height: 44,
    marginBottom:10
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 15,
    color: "#000",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 1,
    borderRadius: 10,
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
    backgroundColor: "#FF5722",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
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

export default LFFoundEmployeeByModal
