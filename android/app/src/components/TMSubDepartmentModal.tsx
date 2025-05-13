"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  FlatList,
  Switch,
  Dimensions,
} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import AnimatedModal from "./AnimatedModal"
import CustomToggleSwitch from "./CustomToggleSwitch"

const { height } = Dimensions.get("window")

interface ChecklistItem {
  id: string
  name: string
}

interface TMSubDepartmentModalProps {
  visible: boolean
  onClose: () => void
  onSelect: (items: ChecklistItem[]) => void
  initialValue?: ChecklistItem[]
}

const TMSubDepartmentModal: React.FC<TMSubDepartmentModalProps> = ({
  visible,
  onClose,
  onSelect,
  initialValue = [],
}) => {
  // Sample data - in a real app, this would come from an API
  const allChecklistItems = [
    { id: "1", name: "Data1" },
    { id: "2", name: "Data2" },
    { id: "3", name: "Data3" },
    { id: "4", name: "Data4" },
    { id: "5", name: "Data5" },
    { id: "6", name: "Data6" },
    { id: "7", name: "Data7" },
    { id: "8", name: "Data8" },
    { id: "9", name: "Data9" },
    { id: "10", name: "Data10" },
  ]

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItems, setSelectedItems] = useState<ChecklistItem[]>(initialValue)
  const [filteredItems, setFilteredItems] = useState(allChecklistItems)
  const [showOnlySelected, setShowOnlySelected] = useState(false)
  const [toggleAll, setToggleAll] = useState(false)

  // Handle toggle all
  const handleToggleAll = (value: boolean) => {
    setToggleAll(value)
    if (value) {
      setSelectedItems(allChecklistItems)
    } else {
      setSelectedItems([])
    }
  }
  // Calculate the available height for the list
  const getListHeight = () => {
    // Adjust these values based on your header, search bar, and button heights
    const headerHeight = 60 // Approximate header height
    const searchBarHeight = 60 // Approximate search bar height
    const buttonHeight = 80 // Approximate button container height
    const safeAreaPadding = 20 // Additional padding

    // Calculate available height
    return height - headerHeight - searchBarHeight - buttonHeight - safeAreaPadding
  }

  // Filter items based on search query and showOnlySelected state
  useEffect(() => {
    let filtered = allChecklistItems

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    if (showOnlySelected) {
      filtered = filtered.filter((item) => selectedItems.some((selected) => selected.id === item.id))
    }

    setFilteredItems(filtered)
  }, [searchQuery, showOnlySelected, selectedItems])

 

  useEffect(() => {
    setToggleAll(selectedItems.length === allChecklistItems.length)
  }, [selectedItems, allChecklistItems.length])

  const handleItemSelect = (item: ChecklistItem) => {
    // Check if item is already selected
    const isSelected = selectedItems.some((i) => i.id === item.id)

    if (isSelected) {
      // Remove from selection
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id))
    } else {
      // Add to selection
      setSelectedItems([...selectedItems, item])
    }
  }

  const handleSubmit = () => {
    onSelect(selectedItems)
    onClose()
  }

  const toggleShowSelected = () => {
    setShowOnlySelected(!showOnlySelected)
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const renderItem = ({ item }: { item: ChecklistItem }) => {
    const isSelected = selectedItems.some((i) => i.id === item.id)

    return (
      <TouchableOpacity style={styles.checklistItem} onPress={() => handleItemSelect(item)} activeOpacity={0.7}>
        {isSelected ? (
          <View style={styles.selectedCircle}>
            <Feather name="check" size={16} color="#fff" />
          </View>
        ) : (
          <View style={styles.circle} />
        )}
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  const ItemSeparator = () => <View style={styles.separator} />

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backButton} onPress={onClose}>
              <AntDesign name="back" size={26} color="black" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Sub-Department</Text>

            <TouchableOpacity onPress={toggleShowSelected} disabled={selectedItems.length === 0}>
              <Text style={[styles.showSelectedText, { color: selectedItems.length === 0 ? "#999" : "#007AFF" }]}>
                {showOnlySelected ? "Show All" : "Show Selected"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.headerRight}>
            <CustomToggleSwitch value={toggleAll} onValueChange={handleToggleAll} />
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
              <Ionicons name="close" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {/* List Container */}
        <View style={styles.listWrapper}>
          {/* Checklist Items */}
          <FlatList
            data={filteredItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={ItemSeparator}
            style={styles.list}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </SafeAreaView>

      {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton,
            //  selectedItems.length === 0 && styles.submitButtonDisabled
            ]}
          // onPress={handleSubmit}
          disabled={selectedItems.length === 0}
        >
          <Text style={styles.submitButtonText}>
            Submit {/* Whenever you count of the submit then under the line uncomment*/}
            {/* {selectedItems.length > 0 ? `Submit (${selectedItems.length})` : "Submit"} */}
          </Text>
        </TouchableOpacity>
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
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginRight: 5,
    right: 5,
  },
  toggleLabel: {
    marginRight: 6,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    left: 5,
  },
  showSelectedText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
    marginLeft: 1,
    right: 5,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    alignItems: "center",
    paddingVertical: 2,
    marginTop: 10,
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
  listWrapper: {
    backgroundColor: "#fff",
    marginTop: 10,
    flex: 1,
    marginBottom: 13, // Space for the bottom button
  },
  list: {
    backgroundColor: "#fff",
    flex: 1,
  },
  listContent: {
    paddingBottom: 0,
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#999",
    marginRight: 12,
  },
  selectedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ff5722",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginLeft: 16,
  },

  submitButton: {
    backgroundColor: "#ff5722",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom:8,
    marginHorizontal: 16,
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

export default TMSubDepartmentModal
