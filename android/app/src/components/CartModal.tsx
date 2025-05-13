"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Image } from "react-native-feather"
import AnimatedModal from "./AnimatedModal"

interface CartItem {
  id: string
  name: string
  quantity: number
}

interface CartModalProps {
  visible: boolean
  onClose: () => void
  onSelect: (items: CartItem[]) => void
}

// TaskItem Component
const TaskItem = ({ name, quantity, onAdd, onIncrement, onDecrement }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemLeft}>
        <Image color="grey" size={20} style={styles.itemImage} />
        <Text style={styles.itemName}>{name}</Text>
      </View>

      {quantity > 0 ? (
        <View style={styles.counterBox}>
          <TouchableOpacity onPress={onDecrement} style={styles.counterBtn}>
            <Text style={styles.counterBtndecreaseText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterNumber}>{String(quantity).padStart(2, "0")}</Text>
          <TouchableOpacity onPress={onIncrement} style={styles.counterBtn}>
            <Text style={styles.counterBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={onAdd} style={styles.addBox}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const { height } = Dimensions.get("window")

const CartModal: React.FC<CartModalProps> = ({ visible, onClose, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [showOnlySelected, setShowOnlySelected] = useState(false)

  const [tasks, setTasks] = useState<CartItem[]>([
    { id: "1", name: "Task Name1", quantity: 1 },
    { id: "2", name: "Task Name2", quantity: 0 },
    { id: "3", name: "Task Name3", quantity: 0 },
    { id: "4", name: "Task Name4", quantity: 0 },
    { id: "5", name: "Task Name5", quantity: 0 },
    { id: "6", name: "Task Name6", quantity: 0 },
  ])

  const [filteredTasks, setFilteredTasks] = useState<CartItem[]>(tasks)

  // Update filtered tasks when search query or showOnlySelected changes
  useEffect(() => {
    const filtered = tasks.filter((task) => {
      const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase())
      if (showOnlySelected) {
        return matchesSearch && task.quantity > 0
      }
      return matchesSearch
    })

    setFilteredTasks(filtered)
  }, [searchQuery, showOnlySelected, tasks])

  const toggleShowSelected = () => {
    setShowOnlySelected(!showOnlySelected)
  }

  const handleSubmit = () => {
    const selectedItems = tasks.filter((task) => task.quantity > 0)
    onSelect(selectedItems)
    onClose()
  }

  const handleSearch = (text: string) => {
    setSearchQuery(text)
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const hasSelectedItems = tasks.some((task) => task.quantity > 0)

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
  <TouchableOpacity style={styles.backButton} onPress={onClose}>
    <AntDesign name="back" size={26} color="black" />
  </TouchableOpacity>

  <View style={styles.titleRow}>
    <Text style={styles.title}>Cart</Text>
    <TouchableOpacity onPress={toggleShowSelected} disabled={!hasSelectedItems}>
      <Text style={[styles.showSelected, !hasSelectedItems && styles.disabledText]}>
        {showOnlySelected ? "Show All" : "Show Selected"}
      </Text>
    </TouchableOpacity>
  </View>
</View>

        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#888" />
          <TextInput
            placeholder="Search"
            placeholderTextColor={"#888"}
            value={searchQuery}
            onChangeText={handleSearch}
            style={styles.input}
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>

        {/* Task List */}
        <View style={styles.listContainer}>
          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskItem
                name={item.name}
                quantity={item.quantity}
                onAdd={() => {
                  const updated = tasks.map((task) => (task.id === item.id ? { ...task, quantity: 1 } : task))
                  setTasks(updated)
                }}
                onIncrement={() => {
                  const updated = tasks.map((task) =>
                    task.id === item.id ? { ...task, quantity: task.quantity + 1 } : task,
                  )
                  setTasks(updated)
                }}
                onDecrement={() => {
                  const updated = tasks.map((task) =>
                    task.id === item.id ? { ...task, quantity: Math.max(task.quantity - 1, 0) } : task,
                  )
                  setTasks(updated)
                }}
              />
            )}
            ListEmptyComponent={
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>No items found</Text>
              </View>
            }
          />
        </View>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.submitButton, 
              // !hasSelectedItems && styles.disabledButton
            ]}
            onPress={handleSubmit}
            // disabled={!hasSelectedItems}
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
    display: "flex",
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // or use marginLeft on showSelected
  },
  

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  
  showSelected: {
    color: "#5A81FA",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 8,
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },

  disabledText: {
    color: "#CCCCCC",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 1,
    // borderRadius: 10,
    margin: 1,
    top:10,
    marginBottom:20
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 15,
    color: "#000",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 1,
    // borderRadius: 10,
  },
  itemContainer: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 38,
    height: 38,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#f5f5f5",
  },
  itemName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
  },
  addBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  addText: {
    color: "#FF6A00",
    fontWeight: "600",
    fontSize: 14,
  },
  counterBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 2,
    paddingVertical: 0,
  },
  counterBtn: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  counterBtnText: {
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  counterBtndecreaseText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
  counterNumber: {
    marginHorizontal: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  buttonContainer: {
    padding: 10,
  },
  submitButton: {
    backgroundColor: "#FF5722",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  noResultsContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  noResultsText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
})

export default CartModal
