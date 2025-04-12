import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SelectField from '../components/SelectField';
import DatePickerField from '../components/DatePickerField';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView, TextInput } from 'react-native-gesture-handler';


const LFNewScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <Text style={styles.fieldLabel}>Location Type<Text style={styles.requiredStar}>*</Text></Text>
          <SelectField placeholder="Select Option" />
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Location<Text style={styles.requiredStar}>*</Text></Text>
          <SelectField placeholder="Select Option" />
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Guest<Text style={styles.requiredStar}>*</Text></Text>
          <SelectField placeholder="Select Option" />
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Found Date<Text style={styles.requiredStar}>*</Text></Text>
          <SelectField placeholder="Select Option" />
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Found By<Text style={styles.requiredStar}>*</Text></Text>
          <SelectField placeholder="Select Option" />
        </View>
        <KeyboardAvoidingView>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Article Count<Text style={styles.requiredStar}>*</Text></Text>
          <TextInput
        placeholder='Enter Number'
        keyboardType='numeric'
        placeholderTextColor={'#ccc'}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 4,
          padding: 10,
          fontSize: 16,
        }}
        />
      </View>
      </KeyboardAvoidingView>
      </View>
      
      {/* Create Button */}
      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => navigation.navigate('LFArtical')}
      >
        <Text style={styles.createButtonText}>Next</Text>
      </TouchableOpacity>
      </ScrollView>
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

export default LFNewScreen;