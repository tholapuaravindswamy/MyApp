"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import AnimatedModal from "./AnimatedModal"

interface LFLocationModalProps {
  visible: boolean
  onClose: () => void
  onSelect: (location: string) => void
}

const mockData = {
  Room: [
    { id: "1", name: "Room 101" },
    { id: "2", name: "Room 102" },
    { id: "3", name: "Room 103" },
    { id: "4", name: "Room 104" },
    { id: "5", name: "Room 105" },
    { id: "6", name: "Room 106" },
    { id: "7", name: "Room 107" },
    { id: "8", name: "Room 108" },
    { id: "9", name: "Room 109" },
    { id: "10", name: "Room 110" },
    { id: "11", name: "Room 111" },
    { id: "12", name: "Room 112" },
    { id: "13", name: "Room 113" },
    { id: "14", name: "Room 114" },
    { id: "15", name: "Room 115" },
  ],
  "Public Area": [
    { id: "16", name: "Lobby" },
    { id: "17", name: "Reception" },
    { id: "18", name: "Garden" },
    { id: "19", name: "Pool" },
    { id: "20", name: "Restaurant" },
    { id: "21", name: "Gym" },
  ],
}

const { height } = Dimensions.get("window")

const LFLocationModal: React.FC<LFLocationModalProps> = ({ visible, onClose, onSelect }) => {
  const [activeTab, setActiveTab] = useState<"Room" | "Public Area">("Room")
  const [search, setSearch] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [selectedLocationName, setSelectedLocationName] = useState<string | null>(null)
  const [showOnlySelected, setShowOnlySelected] = useState(false)

  const handleTabSwitch = (tab: "Room" | "Public Area") => {
    setActiveTab(tab)
    setSearch("")
    setShowOnlySelected(false)
  }

  const handleLocationSelect = (item: any) => {
    setSelectedLocation(item.id)
    setSelectedLocationName(item.name)
  }

  const handleSearch = (text: string) => {
    setSearch(text)
  }

  const handleSubmit = () => {
    if (selectedLocationName) {
      onSelect(selectedLocationName)
      onClose()
    }
  }

  const handleShowSelected = () => {
    if (selectedLocation) {
      setShowOnlySelected((prev) => !prev)
    }
  }

  const filteredLocations = showOnlySelected
    ? mockData[activeTab].filter((item) => item.id === selectedLocation)
    : mockData[activeTab].filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <AntDesign name="back" size={26} color="black" />
          </TouchableOpacity>
          
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Found Location</Text>
            
            <TouchableOpacity 
              onPress={handleShowSelected} 
              disabled={!selectedLocation}
              style={styles.showSelectedButton}
            >
              <Text
                style={[
                  styles.showSelected,
                  !selectedLocation && { color: "#aaa" }, // gray text when disabled
                ]}
              >
                {showOnlySelected ? "Show All" : "Show Selected"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Room" ? styles.activeTab : styles.inactiveTab]}
            onPress={() => handleTabSwitch("Room")}
          >
            <Text style={activeTab === "Room" ? styles.activeTabText : styles.inactiveTabText}>Room</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Public Area" ? styles.activeTab : styles.inactiveTab]}
            onPress={() => handleTabSwitch("Public Area")}
          >
            <Text style={activeTab === "Public Area" ? styles.activeTabText : styles.inactiveTabText}>Public Area</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#888" />
          <TextInput
            placeholder="Search"
            placeholderTextColor={"#888"}
            value={search}
            onChangeText={handleSearch}
            style={styles.input}
          />
          {search !== "" && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>

        {/* List of Cards */}
        <View style={styles.singleCardContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }} // Reduced padding since button is outside
          >
            {filteredLocations.length === 0 ? (
              <Text style={styles.noResultsText}>No Results Found</Text>
            ) : (
              filteredLocations.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.listRow, selectedLocation === item.id && styles.listRowSelected]}
                  onPress={() => handleLocationSelect(item)}
                >
                  <Text style={styles.cardText}>{item.name}</Text>
                  {/* {selectedLocation === item.id && <AntDesign name="check" size={18} color="#FF5722" />} */}
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
        
        {/* Submit Button - Outside the card but inside the modal */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              // !selectedLocation && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            // disabled={!selectedLocation}
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
    backgroundColor: "#f5f7fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginLeft: 6,
  },
  backButton: {
    padding: 4,
    marginRight: 4,
  },
  showSelectedButton: {
    marginLeft: 12, // Position it next to the title
  },
  showSelected: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#E0E7FF",
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 8,
  },
  tab: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#0C0C1E",
  },
  inactiveTab: {
    backgroundColor: "transparent",
  },
  activeTabText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  inactiveTabText: {
    color: "#000",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    // borderRadius: 10,
    marginBottom: 10,
    // marginHorizontal: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    color: "#000",
  },
  singleCardContainer: {
    backgroundColor: "#fff",
    // borderRadius: 10,
    flex: 1,
    // marginHorizontal: 8,
    marginBottom: 10, // Add margin to create space between card and button
  },
  listRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  listRowSelected: {
    backgroundColor: "#fef4ee",
  },
  cardText: {
    fontSize: 16,
    color: "#333",
  },
  noResultsText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
    paddingVertical: 20,
  },
  buttonContainer: {
    marginHorizontal: 8,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#FF5722",
    height: 44, // Set height to 44 as requested
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
})

export default LFLocationModal