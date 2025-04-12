import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SelectField from '../components/SelectField';
import DatePickerField from '../components/DatePickerField';
import AntDesign from 'react-native-vector-icons/AntDesign';


const NewScreen = () => {
  const navigation = useNavigation();

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
        <Text style={styles.headerTitle}>New</Text>
      </View>
      
      {/* Form */}
      <View style={styles.form}>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Task Type<Text style={styles.requiredStar}>*</Text></Text>
          <SelectField placeholder="Select Option" />
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Category<Text style={styles.requiredStar}>*</Text></Text>
          <SelectField placeholder="Select Option" />
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Room/Public Area<Text style={styles.requiredStar}>*</Text></Text>
          <SelectField placeholder="Select Option" />
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Room/Public Area<Text style={styles.requiredStar}>*</Text></Text>
          <SelectField placeholder="Select Option" />
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Task<Text style={styles.requiredStar}>*</Text></Text>
          <SelectField placeholder="Select Option" />
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Schedule</Text>
          <DatePickerField placeholder="Select Option" />
        </View>
      </View>
      
      {/* Create Button */}
      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => navigation.navigate('AddTaskScreen')}
      >
        <Text style={styles.createButtonText}>Create</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    fontSize: 24,
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10,
    color:'black'
  },
  form: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color:'black'
  },
  requiredStar: {
    color: '#FF5722',
  },
  createButton: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default NewScreen;