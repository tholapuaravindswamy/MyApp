// FoundLocation.js
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
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LFFoundLocation = ({ navigation, route }) => {
  // Get previously selected location if any
  const previousLocation = route.params?.previousLocation || '';
  
  // Sample data - in a real app, this would come from an API
  const allLocations = [
    { id: '1', name: 'Eluru' },
    { id: '2', name: 'Hyderabad' },
    { id: '3', name: 'Tanuku' },
    { id: '4', name: 'Visakapatnam' },
    { id: '5', name: 'Vijayawada' },
    { id: '6', name: 'Rajahmundry' },
    { id: '7', name: 'Kakinada' },
    { id: '8', name: 'Nagarkurnool' },
    { id: '9', name: 'Krishnagiri' },
    { id: '10', name: 'Kurnool' },
  ];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(allLocations);
  const [selectedLocation, setSelectedLocation] = useState(previousLocation);
  
  // Filter locations based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredLocations(allLocations);
    } else {
      const filtered = allLocations.filter(location => 
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  }, [searchQuery]);
  
  const handleLocationSelect = (location) => {
    setSelectedLocation(location.name);
  };
  
  const handleSubmit = () => {
    // Return to previous screen with selected location
    navigation.navigate({
      name: 'LFPrimaryDetailsEdit',
      params: { selectedLocation },
      merge: true,
    });
  };
  
  const handleShowSelected = () => {
    // Filter to show only selected location
    if (selectedLocation) {
      const selected = allLocations.filter(location => location.name === selectedLocation);
      setFilteredLocations(selected);
    } else {
      setFilteredLocations(allLocations);
    }
  };
  
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  const renderItem = ({ item }) => {
    const isSelected = selectedLocation === item.name;
    
    return (
      <TouchableOpacity
        style={[
          styles.locationItem,
          isSelected && styles.selectedLocationItem
        ]}
        onPress={() => handleLocationSelect(item)}
      >
        <Text style={styles.locationText}>{item.name}</Text>
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

        {/* Title + Show Selected Button in a Row */}
        <View style={styles.titleRow}>
          <Text style={styles.headerTitle}>Found Location</Text>
          <TouchableOpacity onPress={handleShowSelected}>
            <Text style={styles.showSelectedText}>Show Selected</Text>
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
            <Text style={{ fontSize: 16, color: '#999' }}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Location List */}
      <View style={styles.listContent}>
        {filteredLocations.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No results found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredLocations}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={ItemSeparator}
          />
        )}
      </View>

      {/* Submit Button */}
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
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
  locationItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  selectedLocationItem: {
    backgroundColor: '#f0f8ff', // Light blue background for selected items
    borderRadius: 10
  },
  locationText: {
    fontSize: 16,
    color: '#333',
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

export default LFFoundLocation;