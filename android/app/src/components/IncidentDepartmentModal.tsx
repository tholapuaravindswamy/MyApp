'use client';

import type React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Switch,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AnimatedModal from './AnimatedModal';
import CustomToggleSwitch from './CustomToggleSwitch';

interface IncidentDepartmentModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (department: any) => void;
}

interface ChecklistItem {
  id: string
  name: string
}

const IncidentDepartmentModal: React.FC<IncidentDepartmentModalProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const allChecklistItems = [
    {id: '1', name: 'Department 1'},
    {id: '2', name: 'Department 2'},
    {id: '3', name: 'Department 3'},
    {id: '4', name: 'Department 4'},
    {id: '5', name: 'Department 5'},
    {id: '6', name: 'Department 6'},
    {id: '7', name: 'Department 7'},
    {id: '8', name: 'Department 8'},
    {id: '9', name: 'Department 9'},
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState(allChecklistItems);
  const [showOnlySelected, setShowOnlySelected] = useState(false);
 const [toggleAll, setToggleAll] = useState(false)
 
   // Handle toggle all
   const handleToggleAll = (value: boolean) => {
     setToggleAll(value)
     if (value) {
       setSelectedItems(allChecklistItems)
     } else {
       setSelectedItems([])
     }
   }

  useEffect(() => {
    let filtered = allChecklistItems;

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (showOnlySelected) {
      filtered = filtered.filter(item =>
        selectedItems.some(selected => selected.id === item.id),
      );
    }

    setFilteredItems(filtered);
  }, [searchQuery, showOnlySelected, selectedItems]);

  useEffect(() => {
      setToggleAll(selectedItems.length === allChecklistItems.length)
    }, [selectedItems, allChecklistItems.length])
  
    const handleItemSelect = (item: ChecklistItem) => {
      // Check if item is already selected
      const isSelected = selectedItems.some((i) => i.id === item.id)
  
      if (isSelected) {
        // Remove from selection
        setSelectedItems(selectedItems.filter((i) => i.id !== item.id))
      } else {
        // Add to selection
        setSelectedItems([...selectedItems, item])
      }
    }
  
    const handleSubmit = () => {
      onSelect(selectedItems)
      onClose()
    }
  
    const toggleShowSelected = () => {
      setShowOnlySelected(!showOnlySelected)
    }
  
  const clearSearch = () => {
    setSearchQuery('');
  };

 
  const renderItem = ({item}: {item: any}) => {
    const isSelected = selectedItems.some(i => i.id === item.id);

    return (
      <TouchableOpacity
        style={styles.checklistItem}
        onPress={() => handleItemSelect(item)}
        activeOpacity={0.7}>
        {isSelected ? (
          <View style={styles.selectedCircle}>
            <Feather name="check" size={16} color="#fff" />
          </View>
        ) : (
          <View style={styles.circle} />
        )}
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backButton} onPress={onClose}>
              <AntDesign name="back" size={26} color="black" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Department</Text>

            <TouchableOpacity
              onPress={
                selectedItems.length > 0 ? toggleShowSelected : undefined
              }
              disabled={selectedItems.length === 0}>
              <Text
                style={[
                  styles.showSelectedText,
                  {color: selectedItems.length > 0 ? '#007AFF' : '#ccc'},
                ]}>
                {showOnlySelected ? 'Show All' : 'Show Selected'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.headerRight}>
            <CustomToggleSwitch value={toggleAll} onValueChange={handleToggleAll} />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={18}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons name="close" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {/* Checklist Items */}
        <View style={styles.listContent}>
          <FlatList
            data={filteredItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={ItemSeparator}
          />
        </View>

        {/* Submit Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.submitButton]}
            onPress={handleSubmit}
            disabled={selectedItems.length === 0}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AnimatedModal>
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
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginRight: 1,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  showSelectedText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 13,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    // borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    margin: 1,
    top: 6,
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
    flex: 1,
    backgroundColor: '#fff',
    margin: 1,
    top: 12,
    // borderRadius: 10,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    marginRight: 12,
  },
  selectedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ff5722',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 16,
  },
  bottomContainer: {
    padding: 14,
  },
  submitButton: {
    backgroundColor: '#ff5722',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    top:5
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default IncidentDepartmentModal;
