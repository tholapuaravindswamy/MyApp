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
  Dimensions,
  FlatList,
  TextInput,
} from "react-native"
import { Menu, Search, Plus, Home } from "react-native-feather"
import type { RootStackParamList } from "../../../../App"
import AntDesign from "react-native-vector-icons/AntDesign"
import TMNewScreenModal from "../components/TMNewScreenModal"

type TaskManagerProps = {
  navigation: DrawerNavigationProp<RootStackParamList, "TaskManager">
}

const { height } = Dimensions.get("window")

const TaskManager: React.FC<TaskManagerProps> = ({ navigation }) => {
  const [subTab, setSubTab] = useState("All")
  const [isNewModalVisible, setIsNewModalVisible] = useState(false)

  const filterCounts = {
    All: 27,
    Opened: 27,
    Closed: 27,
    Cancelled: 1,
  }

  const [isSearching, setIsSearching] = useState(false)
  const HandleMenu = () => navigation.openDrawer()
  const HandleAdd = () => setIsNewModalVisible(true)
  const handleList = () => navigation.navigate("TMDetails")
  const handleModuleNavigation = () => {
    navigation.navigate('ModuleScreen', { previousScreen: 'TaskManager' });
  };

  const listData = [
    {
      category: "Tittle",
      location: "Description",
      foundon: "01-04-2025",
    },
    {
      category: "Tittle",
      location: "Description",
      foundon: "01-04-2025",
    },
    {
      category: "Tittle",
      location: "Description",
      foundon: "01-04-2025",
    },
    {
      category: "Tittle",
      location: "Description",
      foundon: "01-04-2025",
    },
    {
      category: "Tittle",
      location: "Description",
      foundon: "01-04-2025",
    },
    {
      category: "Tittle",
      location: "Description",
      foundon: "01-04-2025",
    },
    {
      category: "Tittle",
      location: "Description",
      foundon: "01-04-2025",
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
          <Text style={styles.categoryName}>{item.category}</Text>
          <Text style={styles.categoryName2}>{item.categoryname}</Text>
          <Text style={styles.locationName}>{item.location}</Text>
          <Text style={styles.scheduleText}>
            <Text style={styles.scheduleLabel}>Resolution: </Text>
            {item.foundon}
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
          item.location.toLowerCase().includes(text.toLowerCase()) ||
          item.foundon.toLowerCase().includes(text.toLowerCase()),
      )
      setFilteredData(filtered)
    }
  }

  const handleNewTaskSubmit = (formData: any) => {
    console.log("New task submitted:", formData)
    // Here you would typically send the data to your backend
    // and then refresh the task list
    setIsNewModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000"/>

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
              placeholder="Search Your Items"
              placeholderTextColor="#999"
              value={searchText}
              keyboardAppearance="dark"
              onChangeText={handleSearch}
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
              <Text style={styles.headerTitle}>Task Manager</Text>
            </View>
            <TouchableOpacity style={styles.searchIconContainer} onPress={() => setIsSearching(true)}>
              <Search stroke="#000" width={20} height={20} />
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Filters */}
      <View style={styles.tabsContainer}>
        {Object.keys(filterCounts).map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.tab, subTab === filter && (styles.activeTab)]}
            onPress={() => setSubTab(filter)}
          >
            <Text
              style={[
                styles.tabText,
                subTab === filter && (styles.activeTabText),
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <View style={styles.listContainer}>
        <FlatList
          data={filteredData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderListItem}
          showsVerticalScrollIndicator={false}
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

      {/* New Task Modal */}
      <TMNewScreenModal
        visible={isNewModalVisible}
        onClose={() => setIsNewModalVisible(false)}
        onSubmit={handleNewTaskSubmit}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
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
  searchIconContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
    padding: 10,
  },
  tab: {
    minHeight: 36,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "#000",
    paddingHorizontal: 16,
    padddingTop: 12,
  },
  filter: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    paddingBottom: 8,
  },
  activeFilter: {
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
  },
  filterText: {
    color: "#fff",
    fontSize: 14,
    marginRight: 4,
    lineHeight: 38,
  },
  filterBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  filterBadgeText: {
    color: "#000",
    fontSize: 10,
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 180,
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: 1,
    minHeight: height * 1,
    position: "relative",
    paddingTop:10
  },
  listItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: 40,
    marginBottom: 12,
    padding: 12,
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
    position: "absolute",
    top: 3,
    left: 70,
  },
  locationName: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  labelText: {
    fontWeight: "bold",
    color: "#000",
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

export default TaskManager
