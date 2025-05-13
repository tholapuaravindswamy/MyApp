"use client"

import type { DrawerNavigationProp } from "@react-navigation/drawer"
import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  TextInput,
} from "react-native"
import { Menu, Search, Plus, Home } from "react-native-feather"
import type { RootStackParamList } from "../../../../App"
import AntDesign from "react-native-vector-icons/AntDesign"
import NewScreenModal from "../components/NewScreenModal" // Import the new modal component

type GuestServiceProps = {
  navigation: DrawerNavigationProp<RootStackParamList, "GuestService">
}

const { height } = Dimensions.get("window")

const GuestService: React.FC<GuestServiceProps> = ({ navigation }) => {
  const [topTab, setTopTab] = useState("Guests")
  const [subTab, setSubTab] = useState("All")
  const [newScreenModalVisible, setNewScreenModalVisible] = useState(false) // Add state for modal visibility
  
  
  const filterCounts = {
    All: 27,
    Ongoing: 27,
    Queue: 27,
    Hold: 27,
    Scheduled: 2,
    Cancelled: 1,
  }

  const HandleProfile = () => navigation.navigate("UserProfile")
  const HandleSearch = () => navigation.navigate("Search")
  const HandleNotification = () => navigation.navigate("Notifications")
  const HandleMenu = () => navigation.openDrawer()
  // Update HandleAdd to open the modal instead of navigating
  const HandleAdd = () => setNewScreenModalVisible(true)
  const [isSearching, setIsSearching] = useState(false)
  const handleList = () => navigation.navigate("Bookings")

  const listData = [
    {
      category: "Location:",
      categoryname: "Room Number/Public Area",
      location: "Catogery Name",
      schedule: "01-04-2025 16:47",
      timer: "-02:46",
    },
    {
      category: "Location:",
      categoryname: "Room Number/Public Area",
      location: "Catogery Name",
      schedule: "01-04-2025 17:00",
      timer: "-01:15",
    },
    {
      category: "Location:",
      categoryname: "Room Number/Public Area",
      location: "Catogery Name",
      schedule: "01-04-2025 17:30",
      timer: "-00:45",
    },
    {
      category: "Location:",
      categoryname: "Room Number/Public Area",
      location: "Catogery Name",
      schedule: "01-04-2025 18:00",
      timer: "+00:15",
    },
    {
      category: "Location:",
      categoryname: "Room Number/Public Area",
      location: "Catogery Name",
      schedule: "01-04-2025 18:30",
      timer: "+00:45",
    },
    {
      category: "Location:",
      categoryname: "Room Number/Public Area",
      location: "Catogery Name",
      schedule: "01-04-2025 19:00",
      timer: "+01:15",
    },
    {
      category: "Aravind:",
      categoryname: "Room Number/Public Area",
      location: "Catogery Name",
      schedule: "01-04-2025 19:30",
      timer: "+01:45",
    },
  ]

  const renderListItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.listItem} onPress={handleList}>
      <View style={styles.listItemContent}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Home color="black" size={24} />
          </View>
        </View>

        <View style={styles.itemDetails}>
        <View style={styles.locationRow}>
  <Text style={styles.categoryName}>{item.category}</Text>
  <Text style={styles.categoryName2}>{item.categoryname}</Text>
</View>
          <Text style={styles.locationName}>{item.location}</Text>
          <Text style={styles.scheduleText}>
            <Text style={styles.scheduleLabel}>Schedule:</Text>
            {item.schedule} |<Text style={styles.scheduleLabel}>Timer:</Text>
            {item.timer}
          </Text>
        </View>
        <AntDesign name="caretright" color="#FF5722" size={13} style={{ top: 5 }} />
      </View>
    </TouchableOpacity>
  )
  const [searchText, setSearchText] = useState("")
  const [filteredData, setFilteredData] = useState(listData)

  const handleSearch = (text: string) => {
    setSearchText(text)
    if (text === "") {
      setFilteredData(listData) // Show all data when search is empty
    } else {
      const filtered = listData.filter(
        (item) =>
          item.category.toLowerCase().includes(text.toLowerCase()) ||
          item.categoryname.toLowerCase().includes(text.toLowerCase()) ||
          item.location.toLowerCase().includes(text.toLowerCase()) ||
          item.schedule.toLowerCase().includes(text.toLowerCase()) ||
          item.timer.toLowerCase().includes(text.toLowerCase()),
      )
      setFilteredData(filtered)
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Fixed Header Section */}
      <View style={styles.headerSection}>
        {/* Header */}
        <View style={styles.header}>
          {isSearching ? (
            <View style={styles.fullSearchContainer}>
              <TouchableOpacity
                onPress={() => {
                  setIsSearching(false)
                  setSearchText("")
                  setFilteredData(listData)
                }}
                style={styles.backButton}
              >
                <AntDesign name="back" size={26} style={{ color: "black" }} />
              </TouchableOpacity>
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#999"
                value={searchText}
                keyboardAppearance="dark"
                onChangeText={handleSearch} // Call the handleSearch function
              />
              <TouchableOpacity>
                <Search color="#000" size={20} />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.headerLeft}>
                <TouchableOpacity onPress={HandleMenu}>
                  <Menu color="#fff" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Guest Service</Text>
              </View>
              <TouchableOpacity style={styles.searchIconContainer} onPress={() => setIsSearching(true)}>
                <Search stroke="#000" width={20} height={20} />
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Top Tabs */}
        <View style={styles.filtersContainer}>
          {["Guests", "Internal"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.filter, topTab === tab && styles.activeFilter]}
              onPress={() => setTopTab(tab)}
            >
              <Text style={[styles.filterText, topTab === tab && styles.activeFilterText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
          <View style={styles.tabsContainer}>
            {Object.keys(filterCounts).map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.tab,
                  subTab === filter && styles.activeTab,
                ]}
                onPress={() => setSubTab(filter)}
              >
                <Text
                  style={[
                    styles.tabText,
                    subTab === filter && styles.activeTabText,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        <FlatList
          data={filteredData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderListItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.noResultBox}>
              <Text style={styles.noResultText}>No results found</Text>
            </View>
          }
        />
      </View>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={HandleAdd}>
        <Plus color="#fff" size={24} />
      </TouchableOpacity>

      {/* New Screen Modal */}
      <NewScreenModal
        visible={newScreenModalVisible}
        onClose={() => setNewScreenModalVisible(false)}
        navigation={navigation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  headerSection: {
    backgroundColor: "#000",
  },
  contentSection: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  fullSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eceff1",
    borderRadius: 30,
    paddingHorizontal: 12,
    flex: 1,
  },
  searchIconContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#000",
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  scrollView: {
    marginBottom: 0,
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 13,
    alignItems: "center",
    paddingVertical: 5,
    
  },
  tab: {
    minHeight: 36,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom:12
  },
  activeTab: {
    backgroundColor: "#FF5722",
  },
  tabText: {
    fontSize: 14,
    color: "#000",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 5,
    marginBottom:15

  },
  filter: {
    marginHorizontal: 20,
    paddingBottom: 8,
    borderBottomWidth: 2,
    width: "40%",
    borderBottomColor: "transparent",
  },
  activeFilter: {
    borderBottomColor: "#fff",
  },
  filterText: {
    color: "#888",
    fontSize: 16,
    alignSelf: "center",
  },
  activeFilterText: {
    color: "#fff",
    fontWeight: "bold",
  },
 listContent: {
    paddingTop: 5,
    paddingHorizontal: 16,
  },
  listItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 40,
    marginBottom: 12,
    padding: 12,
    top:5,
  },
  listItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  itemDetails: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  categoryName2: {
    fontSize: 13,
    color: "#333",
    marginLeft: 2, 
    position: "relative", 
    top: 1,
  },
  
  locationName: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  scheduleText: {
    fontSize: 12,
    color: "#999",
    marginTop: 6,
  },
  scheduleLabel: {
    color: "#000",
    fontWeight: "600",
  },
  noResultBox: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginHorizontal: 20,
  },
  noResultText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  addButton: {
    position: "absolute",
    bottom: 25,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
})

export default GuestService