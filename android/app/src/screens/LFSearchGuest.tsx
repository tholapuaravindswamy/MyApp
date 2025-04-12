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
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView, TextInput } from 'react-native-gesture-handler';


const LFSearchGuestScreen = () => {
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
               <Text style={styles.headerTitle}>Search Guest</Text>
             </View>
      
      {/* Form */}
      <View style={styles.form}>
      <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Profile ID<Text style={styles.requiredStar}>*</Text></Text>
          <TextInput
        placeholder='Enter Name'
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
        
      <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>AR ID<Text style={styles.requiredStar}>*</Text></Text>
          <TextInput
        placeholder='Enter Text'
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
        
      <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>First Name<Text style={styles.requiredStar}>*</Text></Text>
          <TextInput
        placeholder='Enter First Name'
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
        
      <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Last Name<Text style={styles.requiredStar}>*</Text></Text>
          <TextInput
        placeholder='Enter Last Name'
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
        
      <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Phone<Text style={styles.requiredStar}>*</Text></Text>
          <TextInput
        placeholder='Enter Mobile Number'
        placeholderTextColor={'#ccc'}
        keyboardType='numeric'
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 4,
          padding: 10,
          fontSize: 16,
        }}
        />
      </View>
        <KeyboardAvoidingView>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>E-Mail<Text style={styles.requiredStar}>*</Text></Text>
          <TextInput
        placeholder='Enter E-Mail'
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
        onPress={() => navigation.navigate('LFGuestSearch2')}
      >
        <Text style={styles.createButtonText}>Search</Text>
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
    flexDirection: 'row',
    alignItems: 'center',

  },
  backIcon: {
    fontSize: 24,
    fontWeight: '300',
  },
  headerTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  helpButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    bottom:15

  },
  helpButtonText: {
    fontWeight: 'bold',
    color: 'black',
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

export default LFSearchGuestScreen;