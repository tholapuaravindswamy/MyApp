import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { ArrowLeft, Calendar } from 'react-native-feather';
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

const TMResolutionScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [resolutionType, setResolutionType] = useState(null);
  const [items, setItems] = useState([
    { label: 'Until Resolved', value: 'until_resolved' },
    { label: 'Resolved', value: 'resolved' },
  ]);
  const [resolutionDate, setResolutionDate] = useState('01-04-2025');

  const handleBack = () => {
    navigation?.goBack();
  };

  const handleSubmit = () => {
    console.log({
      resolutionType,
      untilResolved: resolutionType === 'until_resolved',
      resolutionDate: resolutionType === 'until_resolved' ? null : resolutionDate,
    });
  };

  const untilResolved = resolutionType === 'until_resolved';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
                  style={styles.backButton} 
                  onPress={() => navigation.goBack()}
                >
               <AntDesign name="back" size={26} color="black" />
                </TouchableOpacity>
        <Text style={styles.headerTitle}>Resolution</Text>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
  {/* Resolution Type */}
  <View style={[styles.formGroup, { zIndex: 2000 }]}>
    <Text style={styles.label}>
      Resolution Type<Text style={styles.required}>*</Text>
    </Text>
    <DropDownPicker
      open={open}
      setOpen={setOpen}
      value={resolutionType}
      setValue={setResolutionType}
      items={items}
      setItems={setItems}
      placeholder="Select Option"
      style={styles.dropdown}
      dropDownContainerStyle={styles.dropdownContainer}
    />
  </View>

  {/* Resolution Date */}
  <View style={[styles.formGroup, { zIndex: 1000 }]}>
    <Text style={styles.label}>
      Resolution Date<Text style={styles.required}>*</Text>
    </Text>
    <TouchableOpacity
      style={[styles.dateContainer, untilResolved && styles.disabledInput]}
      disabled={untilResolved}
    >
      <Calendar width={20} height={20} color="#000000" />
      <Text style={styles.dateText}>{resolutionDate}</Text>
    </TouchableOpacity>
  </View>
</View>


      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
    color: '#000000',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#F5F7FF',
    padding: 16,
  },
  formGroup: {
    marginBottom: 24,
    zIndex: 1000, // Important for dropdown layering
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#000000',
  },
  required: {
    color: '#FF0000',
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  disabledInput: {
    opacity: 0.6,
  },
  dateText: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 12,
  },
  submitButton: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    margin: 16,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TMResolutionScreen;
