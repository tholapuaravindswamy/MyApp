import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import AnimatedModal from "./AnimatedModal"

interface LFArticleCountModalProps {
  visible: boolean
  onClose: () => void
  onSelect: (count: string) => void
}

const LFArticleCountModal: React.FC<LFArticleCountModalProps> = ({ visible, onClose, onSelect }) => {
  const [selectedCount, setSelectedCount] = useState<string | null>(null)
  const [selectedCountNumber, setSelectedCountNumber] = useState<string | null>(null)

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

  const handleSubmit = () => {
    if (selectedCountNumber) {
      onSelect(selectedCountNumber)
      onClose()
    }
  }

  const renderCountItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.countItem, selectedCount === item.id && styles.selectedCountItem]}
      onPress={() => {
        setSelectedCount(item.id)
        setSelectedCountNumber(item.number)
      }}
    >
      <Text style={styles.countText}>{item.number}</Text>
      {/* {selectedCount === item.id && <AntDesign name="check" size={18} color="#FF5722" />} */}
    </TouchableOpacity>
  )

  const renderSeparator = () => <View style={styles.separator} />

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <AntDesign name="back" size={26} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Article Count</Text>
        </View>

        {/* Content Card */}
        <View style={styles.contentCard}>
          <FlatList
            data={counts}
            showsVerticalScrollIndicator={false}
            renderItem={renderCountItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={renderSeparator}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, 
            // !selectedCount && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          // disabled={!selectedCount}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
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
    marginBottom: 10,
    backgroundColor:'#fff',
    padding:12
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginLeft: 12,
  },
  backButton: {
    padding: 4,
  },
  contentCard: {
    flex: 1,
    backgroundColor: "#fff",
    // borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation:  1,
    marginBottom: 70,
  },
  countItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  selectedCountItem: {
    backgroundColor: "#fef4ee",
  },
  countText: {
    fontSize: 16,
    color: "#000",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
  },
  submitButton: {
    position: "absolute",
    bottom: 10,
    left: 16,
    right: 16,
    backgroundColor: "#FF5722",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default LFArticleCountModal
