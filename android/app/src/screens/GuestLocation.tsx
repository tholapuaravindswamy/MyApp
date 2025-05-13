import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const mockData = {
  Room: [
    { id: '1', name: 'Room 101' },
    { id: '2', name: 'Room 102' },
    { id: '3', name: 'Room 103' },
    { id: '4', name: 'Room 101' },
    { id: '5', name: 'Room 102' },
    { id: '6', name: 'Room 103' },
    { id: '7', name: 'Room 101' },
    { id: '8', name: 'Room 102' },
    { id: '9', name: 'Room 103' },
    { id: '10', name: 'Room 101' },
    { id: '11', name: 'Room 102' },
    { id: '12', name: 'Room 103' },
    { id: '13', name: 'Room 101' },
    { id: '14', name: 'Room 102' },
    { id: '15', name: 'Room 103' },
  ],
  'Public Area': [
    { id: '4', name: 'Lobby' },
    { id: '5', name: 'Reception' },
    { id: '6', name: 'Garden' },
  ],
};

const { height } = Dimensions.get('window');

const LocationScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState<'Room' | 'Public Area'>('Room');
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleTabSwitch = (tab: 'Room' | 'Public Area') => {
    setActiveTab(tab);
    setSearch('');
  };

  const handleLocationSelect = (item: any) => {
    setSelectedLocation(item.id);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const filteredLocations = mockData[activeTab].filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
       <TouchableOpacity 
                 style={styles.backButton} 
                 onPress={() => navigation.goBack()}
               >
              <AntDesign name="back" size={26} color="black" />
               </TouchableOpacity>
               <Text style={styles.title}>Task Type</Text>
               <TouchableOpacity>
               <Text style={styles.showSelected}>Show Selected</Text>
               </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Room' ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => handleTabSwitch('Room')}
        >
          <Text
            style={
              activeTab === 'Room' ? styles.activeTabText : styles.inactiveTabText
            }
          >
            Room
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Public Area' ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => handleTabSwitch('Public Area')}
            >
          <Text
            style={
              activeTab === 'Public Area'
                ? styles.activeTabText
                : styles.inactiveTabText
            }
          >
            Public Area
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color="#888" />
        <TextInput
          placeholder="Search"
          placeholderTextColor={'#888'}
          value={search}
          onChangeText={handleSearch}
          style={styles.input}
        />
        {search !== '' && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

    {/* List of Cards */}
<ScrollView showsVerticalScrollIndicator={false}>
  <View style={styles.singleCardContainer}>
    {filteredLocations.length === 0 ? (
      // Show this text when no locations are found
      <Text style={styles.noResultsText}>No Results Found</Text>
    ) : (
      // Show the list of cards when there are results
      filteredLocations.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.listRow,
            selectedLocation === item.id && styles.listRowSelected,
          ]}
          onPress={() => handleLocationSelect(item)}
        >
          <Text style={styles.cardText}>{item.name}</Text>
          {selectedLocation === item.id && (
            <Ionicons name="checkmark-circle" size={20} color="#FF5722" />
          )}
        </TouchableOpacity>
      ))
    )}
  </View>
</ScrollView>

{/* Submit Button */}
<TouchableOpacity style={styles.submitButton}>
  <Text style={styles.submitButtonText}>Submit</Text>
</TouchableOpacity>
</View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F6FF',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  showSelected: {
    color: '#007BFF',
    left:15
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E0E7FF',
    borderRadius: 10,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#0C0C1E',
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  activeTabText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  inactiveTabText: {
    color: '#000',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  singleCardContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  borderRadius:20,
    position: 'relative',
    minHeight: height * 0.9,
    marginBottom:40,
  },
  
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  
  listRowSelected: {
    backgroundColor: '#fef4ee',
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
  noResultsText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  submitButton: {
    position: 'absolute',
    bottom: 1,
    left: 10,
    right: 10,
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
