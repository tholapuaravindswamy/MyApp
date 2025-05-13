import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { ArrowLeft, Calendar, ChevronRight } from 'react-native-feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';

const IncidentPrimaryDetailsEdit = ({ navigation, route }) => {
  const initialData = route.params?.data || {
    uid: 'ABCD1234567890',
    createdOn: '01-04-2025 04:37',
    createdBy: 'New Name',
    incidentDate: '01-04-2025 00:00',
    reportedDate: '01-04-2025 00:00',
    reportedTo: 'Employee Name',
    category: 'Category Name',
    department: 'Department Name',
    incidentSource: 'Source Name',
    costOfRecovery: '99,99,999.99',
    status: 'Source Name',
  };
  
  const [formData, setFormData] = useState(initialData);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDateField, setCurrentDateField] = useState('');
  


  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleDatePress = (field) => {
    setCurrentDateField(field);
    setShowDatePicker(true);
  };
  
  const handleDateChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }
  
    setShowDatePicker(Platform.OS === 'ios');
  
    if (selectedDate) {
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const year = selectedDate.getFullYear();
      const hours = String(selectedDate.getHours()).padStart(2, '0');
      const minutes = String(selectedDate.getMinutes()).padStart(2, '0');
  
      const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
  
      setFormData((prevState) => ({
        ...prevState,
        [currentDateField]: formattedDate,
      }));
    }
  };
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    navigation.navigate('IncidentDetails', { updatedData: formData });
  };
  

  const handleSelectOption = (field) => {
    console.log(`Select option for ${field}`);
    // In a real app, this would open a selection modal or navigate to a selection screen
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
                      <AntDesign name="back" size={26} color="black" />
                </TouchableOpacity>
        <Text style={styles.headerTitle}>Primary Details</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
  {/* UID (Read-only) */}
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>
      UID<Text style={styles.requiredStar}>*</Text>
    </Text>
    <TextInput
      style={[styles.textInput, { backgroundColor: '#f0f0f0' }]}
      value={formData.uid}
      editable={false} 
      selectTextOnFocus={false}
    />
  </View>

  {/* Created On */}
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>
      Created On<Text style={styles.requiredStar}>*</Text>
    </Text>
    <TouchableOpacity style={styles.dateInput} onPress={() => handleDatePress('createdOn')}>
      <Calendar color="#999" size={18} />
      <Text style={styles.inputText}>
        {formData.createdOn || 'Select Date'}
      </Text>
      {showDatePicker && (
  <DateTimePicker
    mode="date"
    display="default"
    value={new Date()}
    onChange={handleDateChange}
  />
)}
    </TouchableOpacity>
  </View>

  {/* Created By */}
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>
      Created By<Text style={styles.requiredStar}>*</Text>
    </Text>
    <TextInput
      style={styles.textInput}
      placeholder="Enter Name"
      placeholderTextColor="#999"
      value={formData.createdBy}
      onChangeText={(text) => handleInputChange('createdBy', text)}
    />
  </View>

  {/* Incident Date & Time */}
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>
      Incident Date & Time<Text style={styles.requiredStar}>*</Text>
    </Text>
    <TouchableOpacity style={styles.dateInput} onPress={() => handleDatePress('incidentDate')}>
      <Calendar color="#999" size={18} />
      <Text style={styles.inputText}>
        {formData.incidentDate || 'Select Date'}
      </Text>
    </TouchableOpacity>
  </View>

  {/* Reported Date & Time */}
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>
      Reported Date & Time<Text style={styles.requiredStar}>*</Text>
    </Text>
    <TouchableOpacity style={styles.dateInput} onPress={() => handleDatePress('reportedDate')}>
      <Calendar color="#999" size={18} />
      <Text style={styles.inputText}>
        {formData.reportedDate || 'Select Date'}
      </Text>
    </TouchableOpacity>
  </View>

  {/* Reported To */}
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>
      Reported To<Text style={styles.requiredStar}>*</Text>
    </Text>
    <TouchableOpacity style={styles.selectInput} onPress={() => handleSelectOption('reportedTo')}>
      <Text style={[styles.inputText, !formData.reportedTo && styles.placeholderText]}>
        {formData.reportedTo || 'Select Option'}
      </Text>
      <ChevronRight color="#999" size={18} />
    </TouchableOpacity>
  </View>

  {/* Category */}
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>
      Category<Text style={styles.requiredStar}>*</Text>
    </Text>
    <TouchableOpacity style={styles.selectInput} onPress={() => handleSelectOption('category')}>
      <Text style={[styles.inputText, !formData.category && styles.placeholderText]}>
        {formData.category || 'Select Option'}
      </Text>
      <ChevronRight color="#999" size={18} />
    </TouchableOpacity>
  </View>

  {/* Department */}
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>
      Department<Text style={styles.requiredStar}>*</Text>
    </Text>
    <TouchableOpacity style={styles.selectInput} onPress={() => handleSelectOption('department')}>
      <Text style={[styles.inputText, !formData.department && styles.placeholderText]}>
        {formData.department || 'Select Option'}
      </Text>
      <ChevronRight color="#999" size={18} />
    </TouchableOpacity>
  </View>

  {/* Incident Source */}
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>
      Incident Source<Text style={styles.requiredStar}>*</Text>
    </Text>
    <TouchableOpacity style={styles.selectInput} onPress={() => handleSelectOption('incidentSource')}>
      <Text style={[styles.inputText, !formData.incidentSource && styles.placeholderText]}>
        {formData.incidentSource || 'Select Option'}
      </Text>
      <ChevronRight color="#999" size={18} />
    </TouchableOpacity>
  </View>

  {/* Cost of Recovery */}
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>
      Cost Of Recovery
    </Text>
    <TextInput
      style={styles.textInput}
      placeholder="Enter Number"
      placeholderTextColor="#999"
      value={formData.costOfRecovery}
      onChangeText={(text) => handleInputChange('costOfRecovery', text)}
      keyboardType="numeric"
    />
  </View>

  {/* Status */}
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>
      Status<Text style={styles.requiredStar}>*</Text>
    </Text>
    <TouchableOpacity style={styles.selectInput} onPress={() => handleSelectOption('status')}>
      <Text style={[styles.inputText, !formData.status && styles.placeholderText]}>
        {formData.status || 'Select Option'}
      </Text>
      <ChevronRight color="#999" size={18} />
    </TouchableOpacity>
  </View>
</ScrollView>

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
    backgroundColor: '#EBF0FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor:'white'

  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor:'white',
    marginRight:10,
    marginLeft:10,
    borderRadius:8,
    marginTop:10,
    paddingTop:-15

  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  requiredStar: {
    color: '#FF5722',
  },
  textInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  dateInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f9f9f9',
  },
  selectInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
  },
  inputText: {
    fontSize: 14,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  submitButton: {
    backgroundColor: '#FF5722',
    borderRadius: 10,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 4,
    marginRight:20,
    marginLeft:20
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default IncidentPrimaryDetailsEdit;