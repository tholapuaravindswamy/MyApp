'use client';

import type React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AnimatedModal from './AnimatedModal';

interface LocationModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (location: string) => void;
}

const {height} = Dimensions.get('window');

// Mock data matching the provided screen
const mockData = {
  Room: [
    {id: '1', name: 'Room 101'},
    {id: '2', name: 'Room 102'},
    {id: '3', name: 'Room 103'},
    {id: '4', name: 'Room 101'},
    {id: '5', name: 'Room 102'},
    {id: '6', name: 'Room 103'},
    {id: '7', name: 'Room 101'},
    {id: '8', name: 'Room 102'},
    {id: '9', name: 'Room 103'},
    {id: '10', name: 'Room 101'},
    {id: '11', name: 'Room 102'},
    {id: '12', name: 'Room 103'},
    {id: '13', name: 'Room 101'},
    {id: '14', name: 'Room 102'},
    {id: '15', name: 'Room 103'},
  ],
  'Public Area': [
    {id: '16', name: 'Lobby'},
    {id: '17', name: 'Reception'},
    {id: '18', name: 'Garden'},
    {id: '19', name: 'Meeting Room'},
    {id: '20', name: 'Conference Room'},
    {id: '21', name: 'Auditorium'},
    {id: '22', name: 'Library'},
  ],
};

const LocationModal: React.FC<LocationModalProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const [activeTab, setActiveTab] = useState<'Room' | 'Public Area'>('Room');
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showOnlySelected, setShowOnlySelected] = useState(false);

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

  const handleShowSelected = () => {
    if (selectedLocation) {
      setShowOnlySelected(prev => !prev);
    }
  };

  const handleSubmit = () => {
    if (selectedLocation) {
      const allLocations = [...mockData.Room, ...mockData['Public Area']];
      const selectedItem = allLocations.find(
        item => item.id === selectedLocation,
      );
      if (selectedItem) {
        onSelect(selectedItem.name);
        onClose();
      }
    }
  };

  // Filter locations based on search and showOnlySelected
  let filteredLocations = mockData[activeTab].filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (showOnlySelected && selectedLocation) {
    filteredLocations = filteredLocations.filter(
      item => item.id === selectedLocation,
    );
  }

  return (
    <AnimatedModal
      visible={visible}
      onClose={onClose}
      adaptiveHeight={true}
      minHeight={Platform.OS === 'ios' ? '70%' : '75%'}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <AntDesign name="back" size={26} color="black" />
          </TouchableOpacity>

          <View style={styles.titleRow}>
            <Text style={styles.title}>Location</Text>
            <TouchableOpacity
              onPress={handleShowSelected}
              disabled={!selectedLocation}
              style={{
                marginRight: 6, // Position it next to the title
              }}>
              <Text
                style={[
                  styles.showSelected,
                  !selectedLocation && {color: '#aaa'}, // gray text when disabled
                ]}>
                {showOnlySelected ? 'Show All' : 'Show Selected'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'Room' ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => handleTabSwitch('Room')}>
            <Text
              style={
                activeTab === 'Room'
                  ? styles.activeTabText
                  : styles.inactiveTabText
              }>
              Room
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'Public Area'
                ? styles.activeTab
                : styles.inactiveTab,
            ]}
            onPress={() => handleTabSwitch('Public Area')}>
            <Text
              style={
                activeTab === 'Public Area'
                  ? styles.activeTabText
                  : styles.inactiveTabText
              }>
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <View style={styles.singleCardContainer}>
            {filteredLocations.length === 0 ? (
              // Show this text when no locations are found
              <Text style={styles.noResultsText}>No Results Found</Text>
            ) : (
              // Show the list of cards when there are results
              filteredLocations.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.listRow,
                    selectedLocation === item.id && styles.listRowSelected,
                  ]}
                  onPress={() => handleLocationSelect(item)}>
                  <Text style={styles.cardText}>{item.name}</Text>
                  {/* {selectedLocation === item.id && <Ionicons name="checkmark-circle" size={20} color="#FF5722" />} */}
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            // !selectedLocation && styles.disabledButton
          ]}
          onPress={handleSubmit}
          // disabled={!selectedLocation}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // optional if supported
  },

  backButton: {
    padding: 4,
    marginRight: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },

  showSelected: {
    color: '#007BFF',
    marginLeft: 10, // space between title and button
    fontSize: 14,
    fontWeight: '500',
  },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E0E7FF',
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
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
    // borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  scrollView: {
    flex: 1,
  },
  singleCardContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    // borderRadius: 20,
    position: 'relative',
    minHeight: height * 0.5,
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
    backgroundColor: '#FAF3F0',
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
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    position: 'relative',
    marginRight: 10,
    marginLeft: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LocationModal;
