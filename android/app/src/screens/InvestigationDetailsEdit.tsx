import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';


const InvestigationDetailsEdit = ({ navigation }) => {
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
        <Text style={styles.headerTitle}>Investigation Details</Text>
      </View>
      
      {/* Form Card */}
      <View style={styles.formCard}>
        
        {/* Task Type */}
        <View style={styles.formItemLeft}>
  <Text style={styles.formItemText}>
    Description<Text style={styles.requiredStar}>*</Text>
  </Text>
</View>
<TextInput
  placeholder="Enter Text"
  placeholderTextColor="black"
  style={styles.textInput}
/>
</View>
      
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
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
 
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  formItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  formItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 12,
    minHeight: 100, // Increase this value for more height
    textAlignVertical: 'top', // Needed for multiline inputs
    color: 'black',
  },
  formItemText: {
    fontSize: 16,
    color: '#000',
    marginTop:10,
    marginLeft:10
  },
  requiredStar: {
    color: '#FF5722',
  },
 
  submitButton: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default InvestigationDetailsEdit;