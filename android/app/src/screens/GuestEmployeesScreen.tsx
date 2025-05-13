import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';
import { Search } from 'react-native-feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';


const EmployeeSelectionScreen = ({ navigation, route }) => {
  // Get previously selected employees if any
  const previouslySelected = route.params?.selectedEmployees || [];
  
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
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState(previouslySelected);
  const [filteredEmployees, setFilteredEmployees] = useState(allEmployees);
  const [showingSelected, setShowingSelected] = useState(false); // Track if we're showing only selected employees
  
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
  
  const handleSubmit = () => {
    // Return to the previous screen with selected employees
    navigation.navigate('Assigned', { selectedEmployees });
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
  
  const renderItem = ({ item }) => {
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
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="back" size={26} color="black" />
        </TouchableOpacity>

        {/* Title + Show Selected/All Button in a Row */}
        <View style={styles.titleRow}>
          <Text style={styles.headerTitle}>Assigned To</Text>
          <TouchableOpacity onPress={handleShowSelected}>
            <Text style={styles.showSelectedText}>
              {showingSelected ? "Show All" : "Show Selected"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>   
        {/* Search Icon on the Left */}
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
      <View style={styles.listContent}>
        {filteredEmployees.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No results found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredEmployees}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={ItemSeparator}
          />
        )}
      </View>

      {/* Submit Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  
  backButton: {
    padding: 4,
  },
  
  titleRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginRight: 8,
  },
  
  showSelectedText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },  
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    top: 10,
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
  
  listContent: {
    backgroundColor: '#fff',
    maxHeight: 500,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    top: 120,
    position: 'absolute',
    bottom: 1,
    right: 1,
    left: 1
  },
  employeeItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedEmployeeItem: {
    // backgroundColor: '#f0f8ff', // Light blue background for selected items
    borderRadius: 10
  },
  employeeText: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 16,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
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
  
  submitButton: {
    backgroundColor: '#ff5722',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default EmployeeSelectionScreen;