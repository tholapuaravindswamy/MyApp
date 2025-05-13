import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const LFPrimaryDetailsEdit = ({ navigation, route }) => {
  // State to store form values
  const [formValues, setFormValues] = useState({
    uid: 'ABCD12345678',
    createdOn: '01-04-2025 04:37',
    createdBy: 'Employee Name',
    foundLocation: '',
    foundOn: '01-04-2025',
    foundBy: '',
    articleCount: '',
  });

  // Listen for updates from the selection screens
  useEffect(() => {
    // For Found Location
    if (route.params?.selectedLocation) {
      setFormValues(prev => ({
        ...prev,
        foundLocation: route.params.selectedLocation
      }));
    }
    
    // For Found By
    if (route.params?.selectedEmployee) {
      setFormValues(prev => ({
        ...prev,
        foundBy: route.params.selectedEmployee
      }));
    }
    
    // For Article Count
    if (route.params?.selectedArticleCount) {
      setFormValues(prev => ({
        ...prev,
        articleCount: route.params.selectedArticleCount
      }));
    }
  }, [
    route.params?.selectedLocation, 
    route.params?.selectedEmployee, 
    route.params?.selectedArticleCount
  ]);

  // Navigate to FoundLocation screen
  const navigateToFoundLocation = () => {
    navigation.navigate('LFFoundLocation', {
      previousLocation: formValues.foundLocation,
    });
  };

  // Navigate to FoundBy screen
  const navigateToFoundBy = () => {
    navigation.navigate('LFFoundBy', {
      previousEmployee: formValues.foundBy,
    });
  };

  // Navigate to ArticleCount screen
  const navigateToArticleCount = () => {
    navigation.navigate('LFPrimaryArtical', {
      previousCount: formValues.articleCount,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="back" size={26} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Primary Details</Text>
      </View>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* UID */}
          <Text style={styles.label}>UID*</Text>
          <TextInput
            style={styles.input}
            value={formValues.uid}
            onChangeText={(text) => setFormValues(prev => ({ ...prev, uid: text }))}
          />

          {/* Created On */}
          <Text style={styles.label}>Created On*</Text>
          <View style={styles.inputRow}>
            <Ionicons name="calendar-outline" size={18} color="#333" style={styles.icon} />
            <TextInput
              style={styles.inputNoBorder}
              value={formValues.createdOn}
              editable={false}
            />
          </View>

          {/* Created By */}
          <Text style={styles.label}>Created By*</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Employee Name" 
            value={formValues.createdBy}
            onChangeText={(text) => setFormValues(prev => ({ ...prev, createdBy: text }))}
          />

          {/* Found Location */}
          <Text style={styles.label}>Found Location*</Text>
          <TouchableOpacity style={styles.inputRow} onPress={navigateToFoundLocation}>
            <Text style={[
              styles.selectText, 
              formValues.foundLocation ? styles.selectedText : {}
            ]}>
              {formValues.foundLocation || "Select Option"}
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>

          {/* Found On */}
          <Text style={styles.label}>Found On*</Text>
          <TextInput
            style={styles.input}
            value={formValues.foundOn}
            editable={false}
          />

          {/* Found By */}
          <Text style={styles.label}>Found By*</Text>
          <TouchableOpacity style={styles.inputRow} onPress={navigateToFoundBy}>
            <Text style={[
              styles.selectText, 
              formValues.foundBy ? styles.selectedText : {}
            ]}>
              {formValues.foundBy || "Select Option"}
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>

          {/* Article Count */}
          <Text style={styles.label}>Article Count*</Text>
          <TouchableOpacity style={styles.inputRow} onPress={navigateToArticleCount}>
            <Text style={[
              styles.selectText, 
              formValues.articleCount ? styles.selectedText : {}
            ]}>
              {formValues.articleCount || "Select Option"}
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      {/* Submit */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EBF0FA',
  },
  container: {
    padding: 19,
    backgroundColor: '#ffffff',
    paddingBottom: 10,
    maxHeight: 600,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    backgroundColor: '#fff',
    height: 44,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
    marginTop: 12,
  },
  backButton: {
    padding: 4,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: '#fff',
    color: '#101827CC',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    height: 44,
  },
  inputNoBorder: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  icon: {
    marginRight: 8,
  },
  selectText: {
    flex: 1,
    fontSize: 14,
    color: '#999',
  },
  selectedText: {
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginRight: 10,
    marginLeft: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LFPrimaryDetailsEdit;