import React, {useState, useEffect} from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const IncidentCategory = ({navigation, route}) => {
  // Get previously selected checklist items if any
  const previouslySelected = route.params?.selectedChecklist || [];

  // Sample data - in a real app, this would come from an API
  const allChecklistItems = [
    {id: '1', name: 'Data1'},
    {id: '2', name: 'Data2'},
    {id: '3', name: 'Data3'},
    {id: '4', name: 'Data4'},
    {id: '5', name: 'Data5'},
    {id: '6', name: 'Data6'},
    {id: '7', name: 'Data7'},
    {id: '8', name: 'Data8'},
    {id: '9', name: 'Data9'},
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState(previouslySelected);
  const [filteredItems, setFilteredItems] = useState(allChecklistItems);
  const [showOnlySelected, setShowOnlySelected] = useState(false);

  // Filter items based on search query and showOnlySelected state
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

  const handleItemSelect = item => {
    // Check if item is already selected
    const isSelected = selectedItems.some(i => i.id === item.id);

    if (isSelected) {
      // Remove from selection
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      // Add to selection
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSubmit = () => {
    // Return to the previous screen with selected items
    // navigation.navigate('Bookings', { selectedChecklist: selectedItems });
  };

  const toggleShowSelected = () => {
    setShowOnlySelected(!showOnlySelected);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const renderItem = ({item}) => {
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <AntDesign name="back" size={26} color="black" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Category</Text>

          <TouchableOpacity onPress={toggleShowSelected}>
            <Text style={styles.showSelectedText}>Show Selected</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={[
              styles.allButton,
              showOnlySelected
                ? styles.allButtonInactive
                : styles.allButtonActive,
            ]}
            onPress={() => setShowOnlySelected(false)}>
            <Text style={styles.allButtonText}>All</Text>
          </TouchableOpacity>
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
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.listContent}
      />

      {/* Submit Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF0FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    color: '#007AFF',
    fontWeight: '500',
    marginLeft: 13,
  },
  allButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  allButtonActive: {
    backgroundColor: '#0F172A',
  },
  allButtonInactive: {
    backgroundColor: '#ddd',
  },
  allButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
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
    top: 20,
    position: 'absolute',
    bottom: 1,
    right: 1,
    left: 1,
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
    backgroundColor: '#4CAF50',
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
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

export default IncidentCategory;
