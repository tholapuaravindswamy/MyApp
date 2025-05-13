import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, StatusBar, Dimensions } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import { ChevronRight } from "react-native-feather"
import { Platform } from "react-native"
import PrimaryDetailsModal from "../components/PrimaryDetailsModal"
import AssignedToModal from "../components/AssignedToModal"
import EmployeeSelectionModal from "../components/EmployeeSelectionModal"
import ChecklistModal from "../components/ChecklistModal"

// Get screen dimensions for better modal sizing
const { width, height } = Dimensions.get("window")

const BookingScreen = ({ navigation, route }) => {
  const uid = route?.params?.uid || "ABCD1234567890"
  const [primaryModalVisible, setPrimaryModalVisible] = useState(false)
  const [assignedModalVisible, setAssignedModalVisible] = useState(false)
  const [employeeSelectionModalVisible, setEmployeeSelectionModalVisible] = useState(false)
  const [checklistModalVisible, setChecklistModalVisible] = useState(false)

  // State for primary details
  const [primaryDetails, setPrimaryDetails] = useState({
    uid: "ABCD12345678",
    createdOn: "01-04-2025 04:37",
    createdBy: "Employee Name",
    taskType: "Task Type Name",
    category: "Category Name",
    location: "Room Number/Public Area",
    schedule: "01-04-2025 00:00",
    timer: "00:00",
    status: "Status Name",
  })

  // State for form values in the modal
  const [formData, setFormData] = useState(primaryDetails)
  const [formValues, setFormValues] = useState({ ...primaryDetails })
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [currentDateField, setCurrentDateField] = useState("")

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // State for assigned employees
  const [assignedEmployees, setAssignedEmployees] = useState([
    { id: "1", name: "Employee Name 1" },
    { id: "2", name: "Employee Name 2" },
  ])

  // State for employee selection
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEmployees, setSelectedEmployees] = useState([...assignedEmployees])
  const [showingSelected, setShowingSelected] = useState(false)

  // Sample data - in a real app, this would come from an API
  const allEmployees = [
    { id: "1", name: "Employee Name 1" },
    { id: "2", name: "Employee Name 2" },
    { id: "3", name: "Employee Name 3" },
    { id: "4", name: "Employee Name 4" },
    { id: "5", name: "Employee Name 5" },
    { id: "6", name: "Employee Name 6" },
    { id: "7", name: "Employee Name 7" },
    { id: "8", name: "Employee Name 8" },
  ]

  const [filteredEmployees, setFilteredEmployees] = useState(allEmployees)

  // State for selected checklist items
  const [selectedChecklist, setSelectedChecklist] = useState([
    { id: "2", name: "Data2" }, // Default selected item
  ])

  // State for checklist selection
  const [checklistSearchQuery, setChecklistSearchQuery] = useState("")
  const [tempSelectedChecklist, setTempSelectedChecklist] = useState([...selectedChecklist])
  const [showOnlySelectedChecklist, setShowOnlySelectedChecklist] = useState(false)

  const [showSchedulePicker, setShowSchedulePicker] = useState(false)
  const [showTimerPicker, setShowTimerPicker] = useState(false)
  const [scheduleDate, setScheduleDate] = useState(new Date())
  const [timerDate, setTimerDate] = useState(new Date())

  const handleScheduleChange = (event, selectedDate) => {
    const currentDate = selectedDate || scheduleDate
    setShowSchedulePicker(Platform.OS === "ios")
    setScheduleDate(currentDate)
    setFormValues({ ...formValues, schedule: currentDate.toLocaleString() })
  }

  const handleTimerChange = (event, selectedDate) => {
    const currentDate = selectedDate || timerDate
    setShowTimerPicker(Platform.OS === "ios")
    setTimerDate(currentDate)
    setFormValues({ ...formValues, timer: currentDate.toLocaleTimeString() })
  }

  const handleDatePress = (field) => {
    setCurrentDateField(field)
    setShowDatePicker(true)
  }

  const handleDateChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setShowDatePicker(false)
      return
    }

    setShowDatePicker(Platform.OS === "ios")

    if (selectedDate) {
      const day = String(selectedDate.getDate()).padStart(2, "0")
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
      const year = selectedDate.getFullYear()
      const hours = String(selectedDate.getHours()).padStart(2, "0")
      const minutes = String(selectedDate.getMinutes()).padStart(2, "0")

      const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`

      setFormData((prevState) => ({
        ...prevState,
        [currentDateField]: formattedDate,
      }))

      setFormValues((prevState) => ({
        ...prevState,
        [currentDateField]: formattedDate,
      }))
    }
  }

  // Sample checklist data
  const allChecklistItems = [
    { id: "1", name: "Data1" },
    { id: "2", name: "Data2" },
    { id: "3", name: "Data3" },
    { id: "4", name: "Data4" },
    { id: "5", name: "Data5" },
  ]

  const [filteredChecklistItems, setFilteredChecklistItems] = useState(allChecklistItems)

  const [expandedSections, setExpandedSections] = useState({
    primaryDetails: true,
    taskDetails: true,
    assignedTo: true,
    checklist: true,
  })

  // Filter employees based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      // If we're showing selected only, keep that filter
      if (showingSelected) {
        setFilteredEmployees(selectedEmployees)
      } else {
        setFilteredEmployees(allEmployees)
      }
    } else {
      // Apply search filter to either all employees or only selected employees
      const sourceList = showingSelected ? selectedEmployees : allEmployees
      const filtered = sourceList.filter((employee) => employee.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredEmployees(filtered)
    }
  }, [searchQuery, selectedEmployees, showingSelected])

  // Filter checklist items based on search query and showOnlySelected state
  useEffect(() => {
    let filtered = allChecklistItems

    if (checklistSearchQuery.trim() !== "") {
      filtered = filtered.filter((item) => item.name.toLowerCase().includes(checklistSearchQuery.toLowerCase()))
    }

    if (showOnlySelectedChecklist) {
      filtered = filtered.filter((item) => tempSelectedChecklist.some((selected) => selected.id === item.id))
    }

    setFilteredChecklistItems(filtered)
  }, [checklistSearchQuery, showOnlySelectedChecklist, tempSelectedChecklist])

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const handlePrimaryEdit = () => {
    // Open the modal with current values
    setFormValues({ ...primaryDetails })
    setPrimaryModalVisible(true)
  }

  const handleSaveDetails = () => {
    // Save the edited values
    setPrimaryDetails({ ...formValues })
    setPrimaryModalVisible(false)
  }

  const handleAssignEdit = () => {
    // Initialize selected employees with current assigned employees
    setSelectedEmployees([...assignedEmployees])
    setAssignedModalVisible(true)
  }

  const handleAddEmployee = () => {
    // Open employee selection modal
    setEmployeeSelectionModalVisible(true)
  }

  const handleEmployeeSelect = (employee) => {
    // Check if employee is already selected
    const isSelected = selectedEmployees.some((e) => e.id === employee.id)

    if (isSelected) {
      // Remove from selection
      const newSelectedEmployees = selectedEmployees.filter((e) => e.id !== employee.id)
      setSelectedEmployees(newSelectedEmployees)

      // If we're showing only selected and we just unselected one, update the filtered list
      if (showingSelected) {
        setFilteredEmployees(newSelectedEmployees)
      }
    } else {
      // Add to selection
      const newSelectedEmployees = [...selectedEmployees, employee]
      setSelectedEmployees(newSelectedEmployees)

      // If we're showing only selected and we just selected one, update the filtered list
      if (showingSelected) {
        setFilteredEmployees(newSelectedEmployees)
      }
    }
  }

  const handleShowSelected = () => {
    if (showingSelected) {
      // Currently showing selected, switch to showing all
      setShowingSelected(false)
      setFilteredEmployees(allEmployees)
    } else {
      // Currently showing all, switch to showing only selected
      setShowingSelected(true)
      setFilteredEmployees(selectedEmployees)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const clearChecklistSearch = () => {
    setChecklistSearchQuery("")
  }

  const handleSubmitEmployees = () => {
    // Save the selected employees
    setAssignedEmployees([...selectedEmployees])
    setAssignedModalVisible(false)
  }

  const handleEmployeeSelectionSubmit = () => {
    // Close the employee selection modal and return to assigned modal
    setEmployeeSelectionModalVisible(false)
  }

  const handleChecklistEdit = () => {
    // Initialize temp selected checklist with current selected checklist
    setTempSelectedChecklist([...selectedChecklist])
    setChecklistModalVisible(true)
  }

  const handleChecklistItemSelect = (item) => {
    // Check if item is already selected
    const isSelected = tempSelectedChecklist.some((i) => i.id === item.id)

    if (isSelected) {
      // Remove from selection
      setTempSelectedChecklist(tempSelectedChecklist.filter((i) => i.id !== item.id))
    } else {
      // Add to selection
      setTempSelectedChecklist([...tempSelectedChecklist, item])
    }
  }

  const toggleShowSelectedChecklist = () => {
    setShowOnlySelectedChecklist(!showOnlySelectedChecklist)
  }

  const handleSubmitChecklist = () => {
    // Save the selected checklist items
    setSelectedChecklist([...tempSelectedChecklist])
    setChecklistModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <AntDesign name="back" size={26} style={{ color: "white" }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>UID: {uid}</Text>
      </View>

      {/* Booking Tab */}
      {/* <View style={styles.tabContainer}>
        <View style={styles.activeTab}>
          <Text style={styles.activeTabText}>Booking</Text>
        </View>
      </View> */}

      <ScrollView style={styles.content}>
        {/* Primary Details Section */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection("primaryDetails")}>
            <View style={styles.sectionLeft}>
              <Text style={styles.sectionTitle}>Primary Details</Text>
              <TouchableOpacity onPress={handlePrimaryEdit}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

            <Ionicons
              name={expandedSections.primaryDetails ? "chevron-up" : "chevron-down"}
              size={20}
              color="#666"
              style={styles.sectionIcon}
            />
          </TouchableOpacity>

          {expandedSections.primaryDetails && (
            <View style={styles.sectionContent}>
              <View style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <Text style={styles.detailLabel}>UID*</Text>
                  <Text style={styles.detailValue}>{primaryDetails.uid}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <Text style={styles.detailLabel}>Created By*</Text>
                  <Text style={styles.detailValue}>{primaryDetails.createdBy}</Text>
                </View>
                <View style={styles.detailRight}>
                  <Text style={styles.detailLabel}>Created On*</Text>
                  <Text style={styles.detailValue}>{primaryDetails.createdOn}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <Text style={styles.detailLabel}>Task Type*</Text>
                  <Text style={styles.detailValue}>{primaryDetails.taskType}</Text>
                </View>
                <View style={styles.detailRight}>
                  <Text style={styles.detailLabel}>Category*</Text>
                  <Text style={styles.detailValue}>{primaryDetails.category}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <Text style={styles.detailLabel}>Location*</Text>
                  <Text style={styles.detailValue}>{primaryDetails.location}</Text>
                </View>
                <View style={styles.detailRight}>
                  <Text style={styles.detailLabel}>Schedule*</Text>
                  <Text style={styles.detailValue}>{primaryDetails.schedule}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <Text style={styles.detailLabel}>Timer*</Text>
                  <Text style={styles.detailValue}>{primaryDetails.timer}</Text>
                </View>
                <View style={styles.detailRight}>
                  <Text style={styles.detailLabel}>Status*</Text>
                  <Text style={styles.detailValue}>{primaryDetails.status}</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Task Details Section */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection("taskDetails")}>
            <Text style={styles.sectionTitle}>Task Details</Text>
            <Ionicons
              name={expandedSections.taskDetails ? "chevron-up" : "chevron-down"}
              size={20}
              color="#666"
              style={styles.sectionIcon}
            />
          </TouchableOpacity>

          {expandedSections.taskDetails && (
            <View style={styles.sectionContent}>
              <Text style={styles.taskItem}>Task Name × 02</Text>
              <Text style={styles.taskItem}>Task Name × 02</Text>
            </View>
          )}
        </View>

        {/* Assigned To Section */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection("assignedTo")}>
            <View style={styles.sectionLeft}>
              <Text style={styles.sectionTitle}>Assigned To</Text>
              <TouchableOpacity onPress={handleAssignEdit}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

            <Ionicons
              name={expandedSections.assignedTo ? "chevron-up" : "chevron-down"}
              size={20}
              color="#666"
              style={styles.sectionIcon}
            />
          </TouchableOpacity>
          {expandedSections.assignedTo && (
            <View style={styles.sectionContent}>
              {assignedEmployees.map((employee) => (
                <View key={employee.id} style={styles.employeeItem}>
                  <Text style={styles.employeeName}>{employee.name}</Text>
                  <ChevronRight color="#555" size={16} />
                </View>
              ))}
              {assignedEmployees.length === 0 && <Text style={styles.noItemsText}>No employees assigned</Text>}
            </View>
          )}
        </View>

        {/* Checklist Section */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection("checklist")}>
            <View style={styles.sectionLeft}>
              <Text style={styles.sectionTitle}>Checklist</Text>
              <TouchableOpacity onPress={handleChecklistEdit}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

            <Ionicons
              name={expandedSections.checklist ? "chevron-up" : "chevron-down"}
              size={20}
              color="#666"
              style={styles.sectionIcon}
            />
          </TouchableOpacity>

          {expandedSections.checklist && (
            <View style={styles.sectionContent}>
              {selectedChecklist.map((item) => (
                <View key={item.id} style={styles.checklistItem}>
                  <View style={styles.checklistCompletedCircle}>
                    <AntDesign name="check" size={14} color="#fff" />
                  </View>
                  <Text style={styles.checklistText}>{item.name}</Text>
                </View>
              ))}

              {selectedChecklist.length === 0 && <Text style={styles.noItemsText}>No checklist items selected</Text>}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Primary Details Modal */}
      <PrimaryDetailsModal
        visible={primaryModalVisible}
        onClose={() => setPrimaryModalVisible(false)}
        formValues={formValues}
        setFormValues={setFormValues}
        handleSaveDetails={handleSaveDetails}
        handleDatePress={handleDatePress}
        showDatePicker={showDatePicker}
        handleDateChange={handleDateChange}
        styles={styles}
      />

      {/* Assigned To Modal */}
      <AssignedToModal
        visible={assignedModalVisible}
        onClose={() => setAssignedModalVisible(false)}
        selectedEmployees={selectedEmployees}
        handleAddEmployee={handleAddEmployee}
        handleSubmitEmployees={handleSubmitEmployees}
        styles={styles}
      />

      {/* Employee Selection Modal */}
      <EmployeeSelectionModal
        visible={employeeSelectionModalVisible}
        onClose={() => setEmployeeSelectionModalVisible(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredEmployees={filteredEmployees}
        selectedEmployees={selectedEmployees}
        showingSelected={showingSelected}
        handleEmployeeSelect={handleEmployeeSelect}
        handleShowSelected={handleShowSelected}
        clearSearch={clearSearch}
        handleEmployeeSelectionSubmit={handleEmployeeSelectionSubmit}
        styles={styles}
      />

      {/* Checklist Modal */}
      <ChecklistModal
        visible={checklistModalVisible}
        onClose={() => setChecklistModalVisible(false)}
        checklistSearchQuery={checklistSearchQuery}
        setChecklistSearchQuery={setChecklistSearchQuery}
        filteredChecklistItems={filteredChecklistItems}
        tempSelectedChecklist={tempSelectedChecklist}
        showOnlySelectedChecklist={showOnlySelectedChecklist}
        handleChecklistItemSelect={handleChecklistItemSelect}
        toggleShowSelectedChecklist={toggleShowSelectedChecklist}
        clearChecklistSearch={clearChecklistSearch}
        handleSubmitChecklist={handleSubmitChecklist}
        styles={styles}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#000",
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#EBF0FA",
  },
  activeTab: {
    backgroundColor: "#FF5722",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "500",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#EBF0FC",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#EBF0FA",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  sectionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  editText: {
    fontSize: 16,
    color: "#007AFF",
  },
  sectionIcon: {
    marginLeft: 4,
  },
  sectionContent: {
    padding: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailLeft: {
    flex: 1,
    paddingRight: 8,
  },
  detailRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  detailLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
  },
  taskItem: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  employeeItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  employeeName: {
    fontSize: 16,
    color: "#000",
  },
  selectedEmployeeItem: {
    borderRadius: 10,
  },
  employeeText: {
    fontSize: 16,
    color: "#333",
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checklistCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#666",
    marginRight: 8,
  },
  checklistCompletedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checklistText: {
    fontSize: 14,
    color: "#333",
  },
  noItemsText: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
  },

  // Modal styles - Some of these are still needed for the modal content
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 0,
    flex: 1,
    marginTop: 15,
  },
  modalContent1: {
    padding: 10,
    flex: 1,
    backgroundColor: "white",
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
    paddingVertical: -20,
    top: 10,
  },
  modalFooter: {
    padding: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
    marginTop: 12,
  },
  dateInput: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f9f9f9",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: "#fff",
    color: "#000",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    height: 44,
  },
  inputNoBorder: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  icon: {
    marginRight: 8,
  },
  selectText: {
    flex: 1,
    fontSize: 14,
    color: "#999",
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

  // Assigned To Modal styles
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  employeeField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: "#1a1f36",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 25,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },

  // Employee Selection Modal styles
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 16,
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
  employeeListContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  employeeList: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 10,
    borderWidth: 0,
    borderRadius: 0,
  },
  separator: {
    height: 1,
    marginLeft: 16,
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
  showSelectedText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },

  // Checklist Modal styles
  checklistListContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
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
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
})

export default BookingScreen
