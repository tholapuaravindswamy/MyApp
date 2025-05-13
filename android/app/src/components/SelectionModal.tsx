import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Dimensions } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import AnimatedModal from "./AnimatedModal"

const { width, height } = Dimensions.get("window")

interface SelectionOption {
  id: string
  name: string
}

interface SelectionModalProps {
  visible: boolean
  onClose: () => void
  onSelect: (value: string) => void
  title: string
  options: SelectionOption[]
  previousSelection?: string
}

const SelectionModal: React.FC<SelectionModalProps> = ({
  visible,
  onClose,
  onSelect,
  title,
  options,
  previousSelection,
}) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItems, setSelectedItems] = useState<SelectionOption[]>(
    previousSelection ? [{ id: "prev", name: previousSelection }] : []
  )
  const [showingSelected, setShowingSelected] = useState(false)

  const hasSelectedItems = selectedItems.length > 0

  // Filter options based on search query and whether to show only selected
  const filteredOptions = options.filter((option) => {
    const matchesSearch = option.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSelected = showingSelected ? selectedItems.some((item) => item.id === option.id) : true
    return matchesSearch && matchesSelected
  })

  const handleSelect = (option: SelectionOption) => {
    onSelect(option.name)
  }

  const toggleShowSelected = () => {
    if (hasSelectedItems) {
      setShowingSelected(!showingSelected)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const renderItem = ({ item }: { item: SelectionOption }) => {
    const isSelected = selectedItems.some((selected) => selected.id === item.id || selected.name === item.name)

    return (
      <TouchableOpacity
        style={[styles.optionItem, isSelected && styles.selectedItem]}
        onPress={() => handleSelect(item)}
      >
        <Text style={styles.optionText}>{item.name}</Text>
        {isSelected && <AntDesign name="check" size={18} color="#FF5722" />}
      </TouchableOpacity>
    )
  }

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <AntDesign name="back" size={24} color="#333" />
          </TouchableOpacity>
          
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            
            {/* Show Selected button positioned next to the title */}
            <TouchableOpacity 
              onPress={toggleShowSelected}
              disabled={!hasSelectedItems}
              style={styles.showSelectedButton}
            >
              <Text 
                style={[
                  styles.showSelectedText,
                  !hasSelectedItems && styles.disabledText
                ]}
              >
                {showingSelected ? "Show All" : "Show Selected"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#999" style={styles.searchIcon} />
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

        {/* Options List */}
        <View style={styles.listContainer}>
          {filteredOptions.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No results found</Text>
            </View>
          ) : (
            <FlatList
              data={filteredOptions}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>

        {/* Submit Button */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={() => {
              if (previousSelection) {
                onSelect(previousSelection)
              } else if (selectedItems.length > 0) {
                onSelect(selectedItems[0].name)
              } else {
                onClose()
              }
            }}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingVertical: 13,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },
  showSelectedButton: {
    marginLeft: 12, // Position it next to the title
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
    alignItems: "center",
    backgroundColor: "white",
    // marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 15,
    color: "#333",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "white",
    // marginHorizontal: 16,
    marginBottom: 1,
    // borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  listContent: {
    paddingVertical: 8,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  selectedItem: {
    backgroundColor: "#FFF3E0",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 16,
  },
  noResultsContainer: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  noResultsText: {
    fontSize: 16,
    color: "#999",
  },
  footer: {
    padding: 10,
  },
  submitButton: {
    backgroundColor: "#FF5722",
    height: 44, 
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default SelectionModal