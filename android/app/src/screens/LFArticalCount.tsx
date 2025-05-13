import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { height } = Dimensions.get('window');

const LFArticleCountScreen = ({ navigation }) => {
  const [selectedCount, setSelectedCount] = useState(null);
  
  const counts = [
    { id: '1', number: '01' },
    { id: '2', number: '02' },
    { id: '3', number: '03' },
    { id: '4', number: '04' },
    { id: '5', number: '05' },
    { id: '6', number: '06' },
    { id: '7', number: '07' },
    { id: '8', number: '08' },
    { id: '9', number: '09' },
    { id: '10', number: '10' },
    { id: '11', number: '11' },
  ];

  const handleSubmit = () => {
    if (selectedCount) {
        navigation.navigate('LFArtical')
      console.log('Selected count:', selectedCount);
    }
  };

  const renderCountItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.countItem,
        selectedCount === item.id && styles.selectedCountItem,
      ]}
      onPress={() => setSelectedCount(item.id)}
    >
      <Text style={styles.countText}>{item.number}</Text>
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
             <Text style={styles.title}>Artical Count</Text>
           </View>
      
      {/* Content Card */}
      <View style={styles.contentCard}>
      <FlatList
        data={counts}
        showsVerticalScrollIndicator={false}
        renderItem={renderCountItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={renderSeparator}
        />
      </View>
      
      {/* Submit Button */}
      <TouchableOpacity 
        style={[
          styles.submitButton,
          !selectedCount && styles.submitButtonDisabled
        ]}
        onPress={handleSubmit}
        disabled={!selectedCount}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom:5
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  backButton: {
    padding: 8,
    marginRight: 18,
    left:15,
  },
  headerRight: {
    width: 28,
  },
  contentCard: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    height: 600, 
    position: 'relative',
  },
  
  listContent: {
    paddingVertical: 8,
  },
  countItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  selectedCountItem: {
    backgroundColor: '#f8f8f8',
  },
  countText: {
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
    left: 16,
    right: 16,
    backgroundColor: '#FF5722',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LFArticleCountScreen;