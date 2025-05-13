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

const LFNewGuestScreen = ({ navigation }) => {
  const [salutation, setSalutation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState([{ code: '', number: '' }]);
  const [email, setEmail] = useState('');
  const [showSalutationDropdown, setShowSalutationDropdown] = useState(false);

  const addPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, { code: '', number: '' }]);
  };

  const handleCreateGuest = () => {
    // Validation and submission logic
    console.log({
      salutation,
      firstName,
      lastName,
      phoneNumbers,
      email,
    });
  };
const HandleCreate =()=>{
  navigation.navigate('LFMembership')
}

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
     <View style={styles.header}>
                    <TouchableOpacity 
                      style={styles.backButton}
                      onPress={() => navigation.goBack()}
                    >
              <AntDesign name="back" size={26} style={{ color: "black" }} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Search Guest</Text>
                  </View>
      
      <ScrollView style={styles.formContainer}>
        {/* Salutation */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Salutation</Text>
          <TouchableOpacity 
            style={styles.dropdownInput}
            onPress={() => setShowSalutationDropdown(!showSalutationDropdown)}
          >
            <Text style={styles.dropdownText}>
              {salutation || 'Select Option'}
            </Text>
            <Feather name="chevron-down" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        
        {/* First Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>First Name<Text style={styles.requiredStar}>*</Text></Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Text"
            placeholderTextColor={'#777'}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        
        {/* Last Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Last Name<Text style={styles.requiredStar}>*</Text></Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Text"
            placeholderTextColor={'#777'}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        
        {/* Phone */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Phone</Text>
          {phoneNumbers.map((phone, index) => (
            <View key={index} style={styles.phoneInputContainer}>
              <TouchableOpacity style={styles.codeDropdown}>
                <Text style={styles.codeText}>Code</Text>
                <Feather name="chevron-down" size={16} color="#000" />
              </TouchableOpacity>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter Number"
                placeholderTextColor={'#777'}
                keyboardType="phone-pad"
                value={phone.number}
                onChangeText={(text) => {
                  const updatedPhones = [...phoneNumbers];
                  updatedPhones[index].number = text;
                  setPhoneNumbers(updatedPhones);
                }}
              />
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={addPhoneNumber}>
            <Feather name="plus" size={16} color="#000" />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        
        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Text"
            placeholderTextColor={'#777'}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        
        {/* Create Button */}
        <TouchableOpacity 
          style={styles.createButton}
          onPress={HandleCreate}
        >
          <Text style={styles.createButtonText}>Create</Text>
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
  phoneInputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  codeDropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    marginRight: 8,
  },
  codeText: {
    fontSize: 16,
    marginRight: 4,
    color: '#777',
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
    color: '#000',
  },
  createButton: {
    backgroundColor: '#FF5722',
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LFNewGuestScreen;