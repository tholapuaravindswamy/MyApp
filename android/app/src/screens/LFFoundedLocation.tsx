import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const mockData = [
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
];

const { height } = Dimensions.get('window');

const LFFoundedByScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleLocationSelect = (item: any) => {
    setSelectedLocation(item.id);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const filteredLocations = mockData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="back" size={26} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Founded By</Text>
        <TouchableOpacity>
          <Text style={styles.showSelected}> Show Selected</Text>
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
            <Text style={styles.noResultsText}>No Results Found</Text>
          ) : (
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
    </SafeAreaView>
  );
};

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
    bottom:5
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
    marginLeft: 'auto',
    fontWeight: '500',
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
    color: '#000',
  },
  singleCardContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    minHeight: height * 0.9,
    marginBottom: 40,
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

export default LFFoundLocationScreen;
