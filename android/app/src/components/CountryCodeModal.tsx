"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, SafeAreaView } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import AnimatedModal from "./AnimatedModal"

interface CountryCodeItem {
  name: string
  code: string
}

interface CountryCodeModalProps {
  visible: boolean
  onClose: () => void
  onSelect: (code: string, name: string) => void
  initialCode?: string
}

// Sample country data
const countryData: CountryCodeItem[] = [
  { name: "United Kingdom", code: "+44" },
  { name: "India", code: "+91" },
  { name: "Australia", code: "+61" },
  { name: "Canada", code: "+1" },
  { name: "Germany", code: "+49" },
  { name: "France", code: "+33" },
  { name: "Italy", code: "+39" },
  { name: "Spain", code: "+34" },
  { name: "Japan", code: "+81" },
  { name: "China", code: "+86" },
  { name: "Brazil", code: "+55" },
  { name: "Russia", code: "+7" },
  { name: "Mexico", code: "+52" },
  { name: "South Korea", code: "+82" },
  { name: "Indonesia", code: "+62" },
  { name: "Turkey", code: "+90" },
  { name: "Saudi Arabia", code: "+966" },
  { name: "South Africa", code: "+27" },
  { name: "Nigeria", code: "+234" },
]

const CountryCodeModal: React.FC<CountryCodeModalProps> = ({ visible, onClose, onSelect, initialCode }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCountries, setFilteredCountries] = useState(countryData)
  const [selectedCountry, setSelectedCountry] = useState<CountryCodeItem | null>(null)

  // Filter countries based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCountries(countryData)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = countryData.filter(
        (country) => country.name.toLowerCase().includes(query) || country.code.includes(query),
      )
      setFilteredCountries(filtered)
    }
  }, [searchQuery])

  // Find initial selected country if initialCode is provided
  useEffect(() => {
    if (initialCode) {
      const country = countryData.find((c) => c.code === initialCode)
      if (country) {
        setSelectedCountry(country)
      }
    }
  }, [initialCode])

  const handleSelect = (country: CountryCodeItem) => {
    setSelectedCountry(country)
  }

  const handleSubmit = () => {
    if (selectedCountry) {
      onSelect(selectedCountry.code, selectedCountry.name)
      onClose()
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const renderItem = ({ item }: { item: CountryCodeItem }) => (
    <TouchableOpacity
      style={[styles.countryItem, selectedCountry?.code === item.code && styles.selectedCountryItem]}
      onPress={() => handleSelect(item)}
    >
      <Text style={styles.countryName}>{item.name}</Text>
      <Text style={styles.countryCode}>{item.code}</Text>
    </TouchableOpacity>
  )

  return (
    <AnimatedModal visible={visible} onClose={onClose} adaptiveHeight={false} minHeight="80%">
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
  <View style={styles.leftSection}>
    <TouchableOpacity style={styles.backButton} onPress={onClose}>
      <AntDesign name="back" size={24} color="#000" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>Country Code</Text>
  </View>

  {/* <TouchableOpacity onPress={() => {}}>
    <Text style={styles.showSelectedText}>Show Selected</Text>
  </TouchableOpacity> */}
</View>


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
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <AntDesign name="close" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {/* Column Headers */}
        <View style={styles.columnHeaders}>
          <Text style={styles.columnHeaderText}>Country Name</Text>
          <Text style={styles.columnHeaderText}>Code</Text>
        </View>

        {/* Country List */}
        <FlatList
          data={filteredCountries}
          renderItem={renderItem}
          keyExtractor={(item) => item.code}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          style={styles.list}
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, !selectedCountry && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!selectedCountry}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
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
  leftSection: {
  flexDirection: 'row',
  alignItems: 'center',
},

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    left:5
  },
  showSelectedText: {
    fontSize: 14,
    color: "#2196F3",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom:10
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
  clearButton: {
    padding: 4,
  },
  columnHeaders: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F2F3F4",
  },
  columnHeaderText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  list: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom:10
  },
  countryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  selectedCountryItem: {
    backgroundColor: "#e3f2fd",
  },
  countryName: {
    fontSize: 16,
    color: "#333",
  },
  countryCode: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
  },
  submitButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginHorizontal:15,
    marginBottom:8
  },
  disabledButton: {
    backgroundColor: "#ffccbc",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default CountryCodeModal
