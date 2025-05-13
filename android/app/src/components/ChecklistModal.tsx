import type React from "react"
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Dimensions } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import AnimatedModal from "./AnimatedModal"

const { width, height } = Dimensions.get("window")

interface ChecklistItem {
  id: string
  name: string
}

interface ChecklistModalProps {
  visible: boolean
  onClose: () => void
  checklistSearchQuery: string
  setChecklistSearchQuery: (query: string) => void
  filteredChecklistItems: ChecklistItem[]
  tempSelectedChecklist: ChecklistItem[]
  showOnlySelectedChecklist: boolean
  handleChecklistItemSelect: (item: ChecklistItem) => void
  toggleShowSelectedChecklist: () => void
  clearChecklistSearch: () => void
  handleSubmitChecklist: () => void
}

const ChecklistModal: React.FC<ChecklistModalProps> = ({
  visible,
  onClose,
  checklistSearchQuery,
  setChecklistSearchQuery,
  filteredChecklistItems,
  tempSelectedChecklist,
  showOnlySelectedChecklist,
  handleChecklistItemSelect,
  toggleShowSelectedChecklist,
  clearChecklistSearch,
  handleSubmitChecklist,
}) => {
  const hasSelectedItems = tempSelectedChecklist.length > 0;

  const renderChecklistItem = ({ item }: { item: ChecklistItem }) => {
    const isSelected = tempSelectedChecklist.some((i) => i.id === item.id)

    return (
      <TouchableOpacity
        style={styles.checklistModalItem}
        onPress={() => handleChecklistItemSelect(item)}
        activeOpacity={0.7}
      >
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
     <View style={styles.modalHeader}>
  <TouchableOpacity style={styles.closeButton} onPress={onClose}>
    <AntDesign name="back" size={24} color="#333" />
  </TouchableOpacity>

  <View style={styles.titleWithButton}>
    <Text style={styles.modalTitle}>Checklist</Text>

    <TouchableOpacity 
      onPress={toggleShowSelectedChecklist}
      disabled={!hasSelectedItems && !showOnlySelectedChecklist}
    >
      <Text 
        style={[
          styles.showSelectedText,
          (!hasSelectedItems && !showOnlySelectedChecklist) && styles.disabledText
        ]}
      >
        {showOnlySelectedChecklist ? "Show All" : "Show Selected"}
      </Text>
    </TouchableOpacity>
  </View>
</View>


      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchIcon}>
          <Ionicons name="search-outline" size={18} color="#999" />
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={checklistSearchQuery}
          onChangeText={setChecklistSearchQuery}
          placeholderTextColor="#999"
        />

        {checklistSearchQuery.length > 0 && (
          <TouchableOpacity onPress={clearChecklistSearch}>
            <AntDesign name="close" size={18} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Checklist Items */}
      <View style={styles.checklistListContainer}>
        {filteredChecklistItems.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No results found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredChecklistItems}
            renderItem={renderChecklistItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={ItemSeparator}
            style={styles.checklistList}
          />
        )}
      </View>

      <View style={styles.modalFooter}>
        <TouchableOpacity 
          style={[
            styles.submitButton,
            // !hasSelectedItems && styles.disabledButton
          ]} 
          onPress={handleSubmitChecklist}
          // disabled={!hasSelectedItems}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </AnimatedModal>
  )
}

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  
  titleWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    gap: 8, // Optional: adds space between title and button (if using React Native 0.71+)
  },
  
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginRight: 8, // Adds space between title and "Show Selected"
  },
  
  closeButton: {
    padding: 4,
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
    backgroundColor: "#FFCCBC", // Lighter version of the primary color
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    // borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    height: 44,
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
  checklistListContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    // borderRadius: 10,
    backgroundColor: "#fff",
  },
  checklistList: {
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  checklistModalItem: {
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
    backgroundColor: "#FF5722",
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
    marginLeft: 16,
    backgroundColor: "#eee",
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
  modalFooter: {
    padding: 10,
  },
  submitButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default ChecklistModal