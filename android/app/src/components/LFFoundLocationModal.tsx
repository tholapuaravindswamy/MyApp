"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import AnimatedModal from "./AnimatedModal"

interface LFFoundLocationModalProps {
  visible: boolean
  onClose: () => void
  onSelect: (location: string) => void
  initialLocation?: string
}

const LFFoundLocationModal: React.FC<LFFoundLocationModalProps> = ({
  visible,
  onClose,
  onSelect,
  initialLocation = "",
}) => {
  // Sample data - in a real app, this would come from an API
  const allLocations = [
    { id: "1", name: "Eluru" },
    { id: "2", name: "Hyderabad" },
    { id: "3", name: "Tanuku" },
    { id: "4", name: "Visakapatnam" },
    { id: "5", name: "Vijayawada" },
    { id: "6", name: "Rajahmundry" },
    { id: "7", name: "Kakinada" },
  ]

  const [searchQuery, setSearchQuery] = useState("")
  const [filteredLocations, setFilteredLocations] = useState(allLocations)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(initialLocation || null)
  const [showOnlySelected, setShowOnlySelected] = useState(false)

  // Reset states when modal becomes visible
  useEffect(() => {
    if (visible) {
      setSelectedLocation(initialLocation || null)
      setShowOnlySelected(false)
      setSearchQuery("")
    }
  }, [visible, initialLocation])

  // Filter locations based on search query and showOnlySelected
  useEffect(() => {
    let filtered = allLocations

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((location) => location.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    if (showOnlySelected && selectedLocation) {
      filtered = filtered.filter((location) => location.name === selectedLocation)
    }

    setFilteredLocations(filtered)
  }, [searchQuery, showOnlySelected, selectedLocation])

  const handleLocationSelect = (location) => {
    setSelectedLocation(location.name)
  }

  const handleSubmit = () => {
    if (selectedLocation) {
      onSelect(selectedLocation)
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
    const isSelected = selectedLocation === item.name

    return (
      <TouchableOpacity
        style={[styles.locationItem, isSelected && styles.selectedLocationItem]}
        onPress={() => handleLocationSelect(item)}
      >
        <Text style={styles.locationText}>{item.name}</Text>
        {/* {isSelected && <AntDesign name="check" size={18} color="#FF5722" />} */}
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

          {/* Title + Show Selected Button in a Row */}
          <View style={styles.titleRow}>
            <Text style={styles.headerTitle}>Found Location</Text>
            <TouchableOpacity
              onPress={toggleShowSelected}
              disabled={!selectedLocation}
              style={!selectedLocation ? styles.disabledButton : undefined}
            >
              <Text style={[styles.showSelectedText, !selectedLocation && styles.disabledText]}>
                {showOnlySelected ? "Show All" : "Show Selected"}
              </Text>
            </TouchableOpacity>
          </View>
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

        {/* Location List */}
        <View style={styles.listContainer}>
          {filteredLocations.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No results found</Text>
            </View>
          ) : (
            <FlatList
              data={filteredLocations}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={ItemSeparator}
            />
          )}
        </View>

        {/* Submit Button - Moved outside the white card */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.submitButton, !selectedLocation && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={!selectedLocation}
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
    marginBottom: 8,
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  titleRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginRight: 12,
  },
  showSelectedText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  disabledText: {
    color: "#CCCCCC",
  },
  disabledButton: {
    opacity: 0.5,
    color:'#ccc'
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    alignItems: "center",
    height: 44,
    marginBottom: 8,
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
    marginBottom: 1,
  },
  locationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  selectedLocationItem: {
    backgroundColor: "#FAF3F0",
  },
  locationText: {
    fontSize: 16,
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginLeft: 16,
  },
  bottomContainer: {
    padding: 10,
    paddingBottom: 8,
    backgroundColor: "#f0f2f5",
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

  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default LFFoundLocationModal
