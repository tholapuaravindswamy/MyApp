import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, FlatList, Platform } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import AnimatedModal from "./AnimatedModal"

interface StatusModalProps {
  visible: boolean
  onClose: () => void
  onSelect: (value: string) => void
  currentStatus?: string
}

const StatusModal: React.FC<StatusModalProps> = ({ 
  visible, 
  onClose, 
  onSelect, 
  currentStatus = "Select Option" 
}) => {
  const options = [
    { id: "1", name: "Open" },
    { id: "2", name: "In Progress" },
    { id: "3", name: "Resolved" },
    { id: "4", name: "Closed" },
    { id: "5", name: "On Hold" },
  ]

  const handleSelect = (value: string) => {
    onSelect(value)
    onClose()
  }

  return (
<AnimatedModal 
      visible={visible} 
      onClose={onClose}
      adaptiveHeight={true}
      minHeight={ Platform.OS === "ios" ? "70%" : "52%"}
    >     
     <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <AntDesign name="back" size={26} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Status</Text>
        </View>

        <FlatList
          data={options}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => handleSelect(item.name)}
            >
              <Text 
                style={[
                  styles.optionText,
                  currentStatus === item.name && { color: "#FF5722", fontWeight: "500" }
                ]}
              >
                {item.name}
              </Text>
              {currentStatus === item.name && (
                <Ionicons name="checkmark" size={20} color="#FF5722" />
              )}
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
        />
      </SafeAreaView>
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
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    marginBottom: 9
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  listContent: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 10
  },
  optionItem: {
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: 14,
    color: "#000000",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5E5",
  },
})

export default StatusModal