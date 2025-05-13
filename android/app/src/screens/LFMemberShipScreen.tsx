import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';


const LFMembershipScreen = ({ navigation }) => {
  const [membershipType, setMembershipType] = useState('');
  const [membershipLevel, setMembershipLevel] = useState('');
  const [membershipNumber, setMembershipNumber] = useState('');

  const handleSave = () => {
    // Validation and submission logic
    console.log({
      membershipType,
      membershipLevel,
      membershipNumber,
    });
    // Navigate back or to next screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Membership</Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView style={styles.formContainer}>
        {/* Membership Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            Membership Type<Text style={styles.requiredStar}>*</Text>
          </Text>
          <TouchableOpacity style={styles.dropdownInput}>
            <Text style={styles.dropdownText}>
              {membershipType || 'Select Option'}
            </Text>
            <Feather name="chevron-down" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        
        {/* Membership Level */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Membership Level</Text>
          <TouchableOpacity style={styles.dropdownInput}>
            <Text style={styles.dropdownText}>
              {membershipLevel || 'Select Option'}
            </Text>
            <Feather name="chevron-down" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        
        {/* Membership Number */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            Membership Number<Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Text"
            placeholderTextColor={'#777'}
            keyboardType='number-pad'
            value={membershipNumber}
            onChangeText={setMembershipNumber}
          />
        </View>
        
        {/* Save Button */}
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
alignItems: 'center',
paddingTop: 10,
paddingBottom: 20,
marginLeft:18

},
backButton: {
flexDirection: 'row',
alignItems: 'center',

},
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginLeft:8
  },
  headerRight: {
    width: 28, // To balance the header
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#000',
  },
  requiredStar: {
    color: '#FF5722',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  dropdownInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#777',
  },
  saveButton: {
    backgroundColor: '#FF5722',
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LFMembershipScreen;