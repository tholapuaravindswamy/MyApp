"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, SafeAreaView } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import AnimatedModal from "./AnimatedModal"
import Feather from "react-native-vector-icons/Feather"
import CustomToggleSwitch from "./CustomToggleSwitch"

interface PreferenceItem {
  id: string
  name: string
  selected: boolean
}

interface PreferenceGroup {
  id: string
  name: string
  preferences: PreferenceItem[]
}

interface PreferencesDetailsEditModalProps {
  visible: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  initialData?: {
    preferences?: { group: string; name: string }[]
  }
}

const PreferencesDetailsEditModal: React.FC<PreferencesDetailsEditModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData = {},
}) => {
  // Mock data for preference groups
  const [preferenceGroups] = useState<PreferenceGroup[]>([
    {
      id: "1",
      name: "Preferences Group",
      preferences: [
        { id: "1-1", name: "Data", selected: false },
        { id: "1-2", name: "Data", selected: true },
        { id: "1-3", name: "Data", selected: false },
      ],
    },
    {
      id: "2",
      name: "Preferences Group",
      preferences: [
        { id: "2-1", name: "Data", selected: false },
        { id: "2-2", name: "Data", selected: false },
      ],
    },
    {
      id: "3",
      name: "Preferences Group",
      preferences: [
        { id: "3-1", name: "Data", selected: false },
        { id: "3-2", name: "Data", selected: false },
        { id: "3-3", name: "Data", selected: false },
      ],
    },
    {
      id: "4",
      name: "Preferences Group",
      preferences: [
        { id: "4-1", name: "Data", selected: false },
        { id: "4-2", name: "Data", selected: false },
      ],
    },
    {
      id: "5",
      name: "Preferences Group",
      preferences: [
        { id: "5-1", name: "Data", selected: false },
        { id: "5-2", name: "Data", selected: false },
      ],
    },
    {
      id: "6",
      name: "Preferences Group",
      preferences: [
        { id: "6-1", name: "Data", selected: false },
        { id: "6-2", name: "Data", selected: false },
      ],
    },
  ])

  const [selectedGroup, setSelectedGroup] = useState<PreferenceGroup | null>(null)
  const [showPreferencesList, setShowPreferencesList] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPreferences, setFilteredPreferences] = useState<PreferenceItem[]>([])
  const [selectAll, setSelectAll] = useState(false)

  useEffect(() => {
    if (selectedGroup) {
      if (searchQuery.trim() === "") {
        setFilteredPreferences(selectedGroup.preferences)
      } else {
        const filtered = selectedGroup.preferences.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        setFilteredPreferences(filtered)
      }
    }
  }, [selectedGroup, searchQuery])

  const handleGroupSelect = (group: PreferenceGroup) => {
    setSelectedGroup(group)
    setShowPreferencesList(true)
    setSearchQuery("")
  }

  const handleBackToGroups = () => {
    setShowPreferencesList(false)
    setSelectedGroup(null)
  }

  const togglePreference = (id: string) => {
    if (selectedGroup) {
      const updatedPreferences = selectedGroup.preferences.map((pref) =>
        pref.id === id ? { ...pref, selected: !pref.selected } : pref,
      )

      // Update the selected group with the new preferences
      selectedGroup.preferences = updatedPreferences

      // Update filtered preferences
      setFilteredPreferences(
        searchQuery.trim() === ""
          ? updatedPreferences
          : updatedPreferences.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
      )

      // Check if all are selected
      const allSelected = updatedPreferences.every((pref) => pref.selected)
      setSelectAll(allSelected)
    }
  }

  const toggleSelectAll = (value: boolean) => {
    setSelectAll(value)

    if (selectedGroup) {
      // Update all preferences in the selected group
      const updatedPreferences = selectedGroup.preferences.map((pref) => ({
        ...pref,
        selected: value,
      }))

      selectedGroup.preferences = updatedPreferences

      // Update filtered preferences
      setFilteredPreferences(
        searchQuery.trim() === ""
          ? updatedPreferences
          : updatedPreferences.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }
  }

  const handleSubmit = () => {
    // Collect all selected preferences
    const selectedPreferences = preferenceGroups.flatMap((group) =>
      group.preferences.filter((pref) => pref.selected).map((pref) => ({ group: group.name, name: pref.name })),
    )

    onSubmit({ preferences: selectedPreferences })
    onClose()
  }

  const renderGroupItem = ({ item }: { item: PreferenceGroup }) => (
    <TouchableOpacity style={styles.groupItem} onPress={() => handleGroupSelect(item)}>
      <Text style={styles.groupName}>{item.name}</Text>
                <Feather name="chevron-right" size={20} color="#000" />
    </TouchableOpacity>
  )

  const renderPreferenceItem = ({ item }: { item: PreferenceItem }) => (
    <TouchableOpacity style={styles.preferenceItem} onPress={() => togglePreference(item.id)}>
      <View style={styles.preferenceLeft}>
        {item.selected ? (
          <View style={styles.selectedCircle}>
            <AntDesign name="check" size={16} color="#fff" />
          </View>
        ) : (
          <View style={styles.circle} />
        )}
        <Text style={styles.preferenceName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        {showPreferencesList && selectedGroup ? (
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackToGroups}>
              <AntDesign name="back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Preferences</Text>
            <Text style={styles.showSelectedText}>Show Selected</Text>
             {/* Toggle All Switch */}
            <View style={styles.toggleAllContainer}>
              <CustomToggleSwitch value={selectAll} onValueChange={toggleSelectAll} />
            </View>
          </View>
        ) : (
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={onClose}>
              <AntDesign name="back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Preferences Details</Text>
          </View>
        )}

        {showPreferencesList && selectedGroup ? (
          <>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <AntDesign name="search1" size={20} color="#999" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#999"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <AntDesign name="close" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>

           

            {/* Preferences List */}
            <FlatList
              data={filteredPreferences}
              renderItem={renderPreferenceItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              style={styles.list}
            />
          </>
        ) : (
          <FlatList
            data={preferenceGroups}
            renderItem={renderGroupItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            style={styles.list}
          />
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
     backgroundColor: "#fff",
    marginBottom:10
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    flex: 1,
  },
  showSelectedText: {
    color: "#007AFF",
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  toggleAllContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  allText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
  },
  list: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom:10
  },
  groupItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  groupName: {
    fontSize: 16,
    color: "#333",
  },
  preferenceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  preferenceLeft: {
    flexDirection: "row",
    alignItems: "center",
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
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  preferenceName: {
    fontSize: 16,
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginLeft: 16,
  },
  submitButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginHorizontal:15,
    marginBottom:10
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default PreferencesDetailsEditModal
