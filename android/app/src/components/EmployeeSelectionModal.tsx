import type React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AnimatedModal from './AnimatedModal';

const {width, height} = Dimensions.get('window');

interface Employee {
  id: string;
  name: string;
}

interface EmployeeSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredEmployees: Employee[];
  selectedEmployees: Employee[];
  showingSelected: boolean;
  handleEmployeeSelect: (employee: Employee) => void;
  handleShowSelected: () => void;
  clearSearch: () => void;
  handleEmployeeSelectionSubmit: () => void;
}

const EmployeeSelectionModal: React.FC<EmployeeSelectionModalProps> = ({
  visible,
  onClose,
  searchQuery,
  setSearchQuery,
  filteredEmployees,
  selectedEmployees,
  showingSelected,
  handleEmployeeSelect,
  handleShowSelected,
  clearSearch,
  handleEmployeeSelectionSubmit,
}) => {
  const hasSelectedEmployees = selectedEmployees.length > 0;

  const renderEmployeeItem = ({item}: {item: Employee}) => {
    const isSelected = selectedEmployees.some(e => e.id === item.id);

    return (
      <TouchableOpacity
        style={[
          styles.employeeItem,
          isSelected && {backgroundColor: '#FFF3E0'}, // Light orange background for selected items
        ]}
        onPress={() => handleEmployeeSelect(item)}>
        <Text style={styles.employeeText}>{item.name}</Text>
        {/* {isSelected && <AntDesign name="check" size={18} color="#FF5722" />} */}
      </TouchableOpacity>
    );
  };

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
   <View style={styles.modalHeader}>
  <TouchableOpacity style={styles.closeButton} onPress={onClose}>
    <AntDesign name="back" size={24} color="#333" />
  </TouchableOpacity>

  <View style={styles.titleRow}>
    <Text style={styles.modalTitle}>Assigned To</Text>

    <TouchableOpacity 
      onPress={handleShowSelected}
      disabled={!hasSelectedEmployees && !showingSelected}
      style={styles.showSelectedButton}
    >
      <Text 
        style={[
          styles.showSelectedText,
          (!hasSelectedEmployees && !showingSelected) && styles.disabledText,
          hasSelectedEmployees && styles.activeText
        ]}
      >
        {showingSelected ? 'Show All' : 'Show Selected'}
      </Text>
    </TouchableOpacity>
  </View>
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
          style={[
            styles.submitButton,
            !hasSelectedEmployees && styles.disabledButton
          ]}
          onPress={handleEmployeeSelectionSubmit}
          disabled={!hasSelectedEmployees}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </AnimatedModal>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    gap: 8, // optional spacing; if not supported, use marginLeft on button
  },
  
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  showSelectedButton: {
    marginLeft: 'auto',
  },
  showSelectedText: {
    fontSize: 14,
    fontWeight: '500',
  },
  disabledText: {
    color: '#CCCCCC',
  },
  activeText: {
    color: '#007AFF',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
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
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  employeeList: {
    borderBottomColor: '#ccc',
    marginTop: 10,
  },
  employeeItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  employeeText: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
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
  modalFooter: {
    padding: 5,
  },
  submitButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    bottom:5
  },
  disabledButton: {
    backgroundColor: '#FFCCBC',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default EmployeeSelectionModal;