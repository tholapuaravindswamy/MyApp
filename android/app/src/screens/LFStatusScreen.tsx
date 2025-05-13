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
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { height } = Dimensions.get('window');

const LFStatusScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(route.params?.currentCategory || null);
  
  // Sample data - in a real app, this would come from an API or props
  const categories = [
    { id: '1', name: 'status 1' },
    { id: '2', name: 'status 2' },
    { id: '3', name: 'status 3' },
    { id: '4', name: 'status 4' },
    { id: '5', name: 'status 5' },
    { id: '6', name: 'status 6' },
  ];
  
  const [filteredCategories, setFilteredCategories] = useState(categories);

  // Update filtered categories when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(category => 
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [searchQuery]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id === selectedCategory ? null : category.id);
  };

  const handleSubmit = () => {
    if (selectedCategory) {
      const selectedCategoryData = categories.find(
        category => category.id === selectedCategory
      );
      // Pass the selected category back to the previous screen
      navigation.navigate('LFArtical', { 
        selectedCategory: selectedCategoryData.name,
        field: route.params?.field || 'category'
      });
    } else {
      // Show error or alert that a category must be selected
      console.log('No category selected');
    }
  };

  const handleShowSelected = () => {
    if (selectedCategory) {
      const selectedCategoryData = categories.find(
        category => category.id === selectedCategory
      );
      console.log('Showing selected category:', selectedCategoryData);
      // Scroll to the selected category or highlight it
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => handleCategorySelect(item)}
    >
      <Text style={styles.categoryText}>{item.name}</Text>
      {selectedCategory === item.id && (
        <Ionicons name="checkmark-circle" size={20} color="#FF5722" />
      )}
    </TouchableOpacity>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />
      
      {/* Header */}
      <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <AntDesign name="back" size={26} color="black" />
              </TouchableOpacity>
              <Text style={styles.title}>Status</Text>
            </View>
      
      <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={20} color="#888" />
              <TextInput
                placeholder="Search"
                placeholderTextColor={'#888'}
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.input}
              />
                {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons name="close" size={20} color="#999" />
            </TouchableOpacity>
          )}
            </View>
      {/* Content Card */}
      <View style={styles.contentCard}>
        
        {/* Categories List */}
        <FlatList
          data={filteredCategories}
          showsVerticalScrollIndicator={false}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={renderSeparator}
          contentContainerStyle={styles.listContent}
        /> 
      </View>
      <TouchableOpacity 
          style={[
            styles.submitButton,
            !selectedCategory && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!selectedCategory}
        >
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
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  backButton: {
    padding: 4,
    marginRight: 5,
  },
 
  contentCard: {
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    minHeight: height * 0.9,
    marginBottom:90,
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
  listContent: {
    paddingBottom: 80, // Space for the submit button
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  categoryText: {
    fontSize: 16,
    color: '#000',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
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
 
  submitButtonDisabled: {
    backgroundColor: '#FF5722',
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LFStatusScreen;