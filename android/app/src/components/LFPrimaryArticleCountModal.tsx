"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import AnimatedModal from "./AnimatedModal"

interface LFPrimaryArticleCountModalProps {
  visible: boolean
  onClose: () => void
  onSelect: (count: string) => void
  initialCount?: string
}

const LFPrimaryArticleCountModal: React.FC<LFPrimaryArticleCountModalProps> = ({ visible, onClose, onSelect, initialCount = "" }) => {
  const counts = [
    { id: "1", number: "01" },
    { id: "2", number: "02" },
    { id: "3", number: "03" },
    { id: "4", number: "04" },
    { id: "5", number: "05" },
    { id: "6", number: "06" },
    { id: "7", number: "07" },
    { id: "8", number: "08" },
    { id: "9", number: "09" },
    { id: "10", number: "10" },
    { id: "11", number: "11" },
  ]

  const [selectedCount, setSelectedCount] = useState(initialCount)

  const handleCountSelect = (count) => {
    setSelectedCount(count.number)
  }

  const handleSubmit = () => {
    if (selectedCount) {
      onSelect(selectedCount)
      onClose()
    }
  }

  const renderCountItem = ({ item }) => {
    const isSelected = selectedCount === item.number

    return (
      <TouchableOpacity
        style={[styles.countItem, isSelected && styles.selectedCountItem]}
        onPress={() => handleCountSelect(item)}
      >
        <Text style={styles.countText}>{item.number}</Text>
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
          <Text style={styles.headerTitle}>Article Count</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Count List */}
        <View style={styles.listContainer}>
          <FlatList
            data={counts}
            renderItem={renderCountItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={ItemSeparator}
          />
           <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.submitButton, !selectedCount && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={!selectedCount}
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
    backgroundColor: "#f5f7fa",
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
    right:60
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  countItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  selectedCountItem: {
    backgroundColor: "#FAF3F0",
  },
  countText: {
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

export default LFPrimaryArticleCountModal
