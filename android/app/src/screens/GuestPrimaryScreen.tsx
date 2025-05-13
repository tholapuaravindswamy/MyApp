import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Get screen dimensions for better modal sizing
const { width, height } = Dimensions.get('window');

const BookingScreen = ({ navigation, route }) => {
  const uid = route.params?.uid || 'ABCD1234567890';
  const [primaryModalVisible, setPrimaryModalVisible] = useState(false);
  const [assignedModalVisible, setAssignedModalVisible] = useState(false);
  const [employeeSelectionModalVisible, setEmployeeSelectionModalVisible] = useState(false);
  
  // State for primary details
  const [primaryDetails, setPrimaryDetails] = useState({
    uid: 'ABCD12345678',
    createdOn: '01-04-2025 04:37',
    createdBy: 'Employee Name',
    taskType: 'Task Type Name',
    category: 'Category Name',
    location: 'Room Number/Public Area',
    schedule: '01-04-2025 00:00',
    timer: '00:00',
    status: 'Status Name',
  });
  
  // State for form values in the modal
  const [formValues, setFormValues] = useState({...primaryDetails});
  
  // State for assigned employees
  const [assignedEmployees, setAssignedEmployees] = useState([
    { id: '1', name: 'Employee Name 1' },
    { id: '2', name: 'Employee Name 2' },
  ]);
  
  // State for employee selection
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([...assignedEmployees]);
  const [showingSelected, setShowingSelected] = useState(false);
  
  // Sample data - in a real app, this would come from an API
  const allEmployees = [
    { id: '1', name: 'Employee Name 1' },
    { id: '2', name: 'Employee Name 2' },
    { id: '3', name: 'Employee Name 3' },
    { id: '4', name: 'Employee Name 4' },
    { id: '5', name: 'Employee Name 5' },
    { id: '6', name: 'Employee Name 6' },
    { id: '7', name: 'Employee Name 7' },
    { id: '8', name: 'Employee Name 8' },
  ];
  
  const [filteredEmployees, setFilteredEmployees] = useState(allEmployees);
  
  // State for selected checklist items
  const [selectedChecklist, setSelectedChecklist] = useState([
    { id: '2', name: 'Data2' }, // Default selected item
  ]);
  
  const [expandedSections, setExpandedSections] = useState({
    primaryDetails: true,
    taskDetails: true,
    assignedTo: true,
    checklist: true,
  });

  // Filter employees based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      // If we're showing selected only, keep that filter
      if (showingSelected) {
        setFilteredEmployees(selectedEmployees);
      } else {
        setFilteredEmployees(allEmployees);
      }
    } else {
      // Apply search filter to either all employees or only selected employees
      const sourceList = showingSelected ? selectedEmployees : allEmployees;
      const filtered = sourceList.filter(employee => 
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  }, [searchQuery, selectedEmployees, showingSelected]);

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const handlePrimaryEdit = () => {
    // Open the modal with current values
    setFormValues({...primaryDetails});
    setPrimaryModalVisible(true);
  };
  
  const handleSaveDetails = () => {
    // Save the edited values
    setPrimaryDetails({...formValues});
    setPrimaryModalVisible(false);
  };
  
  const handleAssignEdit = () => {
    // Initialize selected employees with current assigned employees
    setSelectedEmployees([...assignedEmployees]);
    setAssignedModalVisible(true);
  };
  
  const handleAddEmployee = () => {
    // Open employee selection modal
    setEmployeeSelectionModalVisible(true);
  };
  
  const handleEmployeeSelect = (employee) => {
    // Check if employee is already selected
    const isSelected = selectedEmployees.some(e => e.id === employee.id);
    
    if (isSelected) {
      // Remove from selection
      const newSelectedEmployees = selectedEmployees.filter(e => e.id !== employee.id);
      setSelectedEmployees(newSelectedEmployees);
      
      // If we're showing only selected and we just unselected one, update the filtered list
      if (showingSelected) {
        setFilteredEmployees(newSelectedEmployees);
      }
    } else {
      // Add to selection
      const newSelectedEmployees = [...selectedEmployees, employee];
      setSelectedEmployees(newSelectedEmployees);
      
      // If we're showing only selected and we just selected one, update the filtered list
      if (showingSelected) {
        setFilteredEmployees(newSelectedEmployees);
      }
    }
  };
  
  const handleShowSelected = () => {
    if (showingSelected) {
      // Currently showing selected, switch to showing all
      setShowingSelected(false);
      setFilteredEmployees(allEmployees);
    } else {
      // Currently showing all, switch to showing only selected
      setShowingSelected(true);
      setFilteredEmployees(selectedEmployees);
    }
  };
  
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  const handleSubmitEmployees = () => {
    // Save the selected employees
    setAssignedEmployees([...selectedEmployees]);
    setAssignedModalVisible(false);
  };
  
  const handleEmployeeSelectionSubmit = () => {
    // Close the employee selection modal and return to assigned modal
    setEmployeeSelectionModalVisible(false);
  };
  
  const handleChecklistEdit = () => {
    navigation.navigate('CheckList', { selectedChecklist });
  };

  // Simple icon component for the chevron
  const ChevronRightIcon = () => (
    <Text style={{ fontSize: 16, color: '#000' }}>›</Text>
  );
  
  const renderEmployeeItem = ({ item }) => {
    const isSelected = selectedEmployees.some(e => e.id === item.id);
    
    return (
      <TouchableOpacity
        style={[
          styles.employeeItem,
          isSelected && styles.selectedEmployeeItem
        ]}
        onPress={() => handleEmployeeSelect(item)}
      >
        <Text style={styles.employeeText}>{item.name}</Text>
        {isSelected && (
          <AntDesign name="check" size={18} color="#007AFF" />
        )}
      </TouchableOpacity>
    );
  };
  
  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="back" size={26} style={{color: "white" }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>UID: {uid}</Text>
      </View>
      
      {/* Booking Tab */}
      <View style={styles.tabContainer}>
        <View style={styles.activeTab}>
          <Text style={styles.activeTabText}>Booking</Text>
        </View>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Primary Details Section */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('primaryDetails')}
          >
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
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('taskDetails')}
          >
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
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('assignedTo')}
          >
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
                <Text key={employee.id} style={styles.employeeItem}>{employee.name}</Text>
              ))}
              
              {assignedEmployees.length === 0 && (
                <Text style={styles.noItemsText}>No employees assigned</Text>
              )}
            </View>
          )}
        </View>
        
        {/* Checklist Section */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('checklist')}
          >
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
              
              {selectedChecklist.length === 0 && (
                <Text style={styles.noItemsText}>No checklist items selected</Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Primary Details Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={primaryModalVisible}
        onRequestClose={() => setPrimaryModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.fullScreenModalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setPrimaryModalVisible(false)}
              >
                <AntDesign name="back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Edit Primary Details</Text>
              <View style={{width: 20}} />
            </View>
            
            <ScrollView style={styles.modalContent}>
              {/* UID */}
              <Text style={styles.label}>UID*</Text>
              <TextInput
                style={styles.input}
                value={formValues.uid}
                onChangeText={(text) => setFormValues({...formValues, uid: text})}
              />

              {/* Created On */}
              <Text style={styles.label}>Created On*</Text>
              <View style={styles.inputRow}>
                <Ionicons name="calendar-outline" size={18} color="#333" style={styles.icon} />
                <TextInput
                  style={styles.inputNoBorder}
                  value={formValues.createdOn}
                  editable={false}
                />
              </View>

              {/* Created By */}
              <Text style={styles.label}>Created By*</Text>
              <TextInput 
                style={styles.input} 
                value={formValues.createdBy}
                onChangeText={(text) => setFormValues({...formValues, createdBy: text})}
              />

              {/* Task Type */}
              <Text style={styles.label}>Task Type*</Text>
              <TextInput 
                style={styles.input} 
                value={formValues.taskType}
                onChangeText={(text) => setFormValues({...formValues, taskType: text})}
              />

              {/* Category */}
              <Text style={styles.label}>Category*</Text>
              <TextInput 
                style={styles.input} 
                value={formValues.category}
                onChangeText={(text) => setFormValues({...formValues, category: text})}
              />

              {/* Location */}
              <Text style={styles.label}>Location*</Text>
              <TextInput 
                style={styles.input} 
                value={formValues.location}
                onChangeText={(text) => setFormValues({...formValues, location: text})}
              />

              {/* Schedule */}
              <Text style={styles.label}>Schedule*</Text>
              <View style={styles.inputRow}>
                <Ionicons name="calendar-outline" size={18} color="#333" style={styles.icon} />
                <TextInput
                  style={styles.inputNoBorder}
                  value={formValues.schedule}
                  onChangeText={(text) => setFormValues({...formValues, schedule: text})}
                />
              </View>

              {/* Timer */}
              <Text style={styles.label}>Timer*</Text>
              <TextInput 
                style={styles.input} 
                value={formValues.timer}
                onChangeText={(text) => setFormValues({...formValues, timer: text})}
              />

              {/* Status */}
              <Text style={styles.label}>Status*</Text>
              <TouchableOpacity style={styles.inputRow}>
                <Text style={[styles.selectText, formValues.status !== 'Select Option' && {color: '#000'}]}>
                  {formValues.status}
                </Text>
                <Ionicons name="chevron-forward" size={18} color="#999" />
              </TouchableOpacity>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleSaveDetails}
              >
                <Text style={styles.submitText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Assigned To Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={assignedModalVisible}
        onRequestClose={() => setAssignedModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.fullScreenModalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setAssignedModalVisible(false)}
              >
                <AntDesign name="back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Assigned To</Text>
              <View style={{width: 24}} />
            </View>
            
            <ScrollView style={styles.modalContent}>
              <View style={styles.card}>
                {/* Employee Selection Fields */}
                {selectedEmployees.map((employee) => (
                  <TouchableOpacity
                    key={employee.id}
                    style={styles.employeeField}
                  >
                    <Text style={styles.employeeText}>{employee.name}</Text>
                    <ChevronRightIcon />
                  </TouchableOpacity>
                ))}
                
                {/* Add Button */}
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={handleAddEmployee}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleSubmitEmployees}
              >
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Employee Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={employeeSelectionModalVisible}
        onRequestClose={() => setEmployeeSelectionModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.fullScreenModalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setEmployeeSelectionModalVisible(false)}
              >
                <AntDesign name="back" size={24} color="#333" />
              </TouchableOpacity>
              
              <Text style={styles.modalTitle}>Select Employees</Text>
              
              <TouchableOpacity onPress={handleShowSelected}>
                <Text style={styles.showSelectedText}>
                  {showingSelected ? "Show All" : "Show Selected"}
                </Text>
              </TouchableOpacity>
            </View>
            
            {/* Search Bar */}
            <View style={styles.searchContainer}>   
              <View style={styles.searchIcon}>
                <Ionicons name="search" size={18} color="#999" />
              </View>

              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#999"
              />

              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={clearSearch}>
                  <AntDesign name="close" size={18} color="#999" />
                </TouchableOpacity>
              )}
            </View>

            {/* Employee List */}
            <View style={styles.employeeListContainer}>
              {filteredEmployees.length === 0 ? (
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResultsText}>No results found</Text>
                </View>
              ) : (
                <FlatList
                  data={filteredEmployees}
                  renderItem={renderEmployeeItem}
                  keyExtractor={item => item.id}
                  ItemSeparatorComponent={ItemSeparator}
                  style={styles.employeeList}
                />
              )}
            </View>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleEmployeeSelectionSubmit}
              >
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0F172A',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor:'#EBF0FA'
  },
  activeTab: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth:1,
    borderColor:'#EBF0FC'
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#EBF0FA',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  editText: {
    fontSize: 16,
    color: '#007AFF',
  },
  sectionIcon: {
    marginLeft: 4,
  },
  sectionContent: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLeft: {
    flex: 1,
    paddingRight: 8,
  },
  detailRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
  },
  taskItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  employeeItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedEmployeeItem: {
    borderRadius: 10
  },
  employeeText: {
    fontSize: 16,
    color: '#333',
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checklistCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#666',
    marginRight: 8,
  },
  checklistCompletedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checklistText: {
    fontSize: 14,
    color: '#333',
  },
  noItemsText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Full screen modal for all modals
  fullScreenModalContainer: {
    width: width * 0.95,
    height: height * 0.9,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginRight:90
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 16,
    flex: 1,
    paddingTop:-40
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: '#fff',
    color: '#000',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    height: 44,
  },
  inputNoBorder: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  icon: {
    marginRight: 8,
  },
  selectText: {
    flex: 1,
    fontSize: 14,
    color: '#999',
  },
  submitButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop:-10
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  
  // Assigned To Modal styles
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  employeeField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#1a1f36',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 25,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  
  // Employee Selection Modal styles
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 44,
  },
  searchIcon: {
    paddingRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 15,
    color: '#000',
  },
  employeeListContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  employeeList: {
    backgroundColor: '#fff',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 16,
  },
  noResultsContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#888',
  },
  showSelectedText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
});

export default BookingScreen;