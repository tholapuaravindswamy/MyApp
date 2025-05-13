import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';


const ArticleScreen = ({ navigation, route }) => {
  const articleId = route.params?.articleId || '01';
  
  useEffect(() => {
    if (route.params?.selectedCategory && route.params?.field) {
      const field = route.params.field;
      setFormData(prevData => ({
        ...prevData,
        [field]: route.params.selectedCategory
      }));
    }
  }, [route.params?.selectedCategory, route.params?.field]);
  
 
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    make: '',
    colour: '',
    category: '',
    storedUntil: '',
    storageLocation: '',
    attachment: '',
    status: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    // console.log('Form data submitted:', formData);
    // // Validate and submit form data
    // navigation.goBack();
  };

  const openSelector = (field) => {
    console.log('Opening selector for', field);
    if (field === 'category') {
      navigation.navigate('LFCategory', { 
        currentCategory: formData.category,
        field: 'category'
      });
    } else 
    if (field === 'storedUntil') {
           // Navigate to attachment selector
        } else if (field === 'storageLocation') {
          navigation.navigate('LFStorage', { 
            currentCategory: formData.category,
            field: 'storageLocation'
          });   
         } else if (field === 'attachment') {
          navigation.navigate('LFAttachment', { 
            currentCategory: formData.category,
            field: 'attachment'
          });      } else if (field === 'status') {
      navigation.navigate('LFStatus', { 
        currentCategory: formData.category,
        field: 'status'
      });  
      }
  };

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
        <Text style={styles.headerTitle}>Article-{articleId}</Text>
        <View style={styles.headerRight} />
      </View>
      
      {/* Form */}
      <ScrollView style={styles.formContainer}>
        {/* Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            Name<Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Text"
            placeholderTextColor={'#999'}
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />
        </View>
        
        {/* Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            style={styles.textInput}
            placeholderTextColor={'#999'}
            placeholder="Enter Text"
            value={formData.description}
            onChangeText={(text) => handleInputChange('description', text)}
          />
        </View>
        
        {/* Make */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Make</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Text"
            placeholderTextColor={'#999'}
            value={formData.make}
            onChangeText={(text) => handleInputChange('make', text)}
          />
        </View>
        
        {/* Colour */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Colour</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Text"
            placeholderTextColor={'#999'}
            value={formData.colour}
            onChangeText={(text) => handleInputChange('colour', text)}
          />
        </View>
        
        {/* Category */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            Category<Text style={styles.requiredStar}>*</Text>
          </Text>
          <TouchableOpacity 
            style={styles.selectorInput}
            onPress={() => openSelector('category')}
          >
            <Text style={styles.selectorText}>
              {formData.category || 'Select Option'}
            </Text>
            <Feather name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        
        {/* Stored Until */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            Stored Until<Text style={styles.requiredStar}>*</Text>
          </Text>
          <TouchableOpacity 
            style={styles.selectorInput}
            onPress={() => openSelector('storedUntil')}
          >
            <View style={styles.selectorContent}>
              <Feather name="calendar" size={18} color="#666" style={styles.calendarIcon} />
              <Text style={styles.selectorText}>
                {formData.storedUntil || 'Select Option'}
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        
        {/* Storage Location */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            Storage Location<Text style={styles.requiredStar}>*</Text>
          </Text>
          <TouchableOpacity 
            style={styles.selectorInput}
            onPress={() => openSelector('storageLocation')}
          >
            <Text style={styles.selectorText}>
              {formData.storageLocation || 'Select Option'}
            </Text>
            <Feather name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        
        {/* Attachment */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Attachment</Text>
          <TouchableOpacity 
            style={styles.selectorInput}
            onPress={() => openSelector('attachment')}
          >
            <Text style={styles.selectorText}>
              {formData.attachment || 'Select Option'}
            </Text>
            <Feather name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        
        {/* Status */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            Status<Text style={styles.requiredStar}>*</Text>
          </Text>
          <TouchableOpacity 
            style={styles.selectorInput}
            onPress={() => openSelector('status')}
          >
            <Text style={styles.selectorText}>
              {formData.status || 'Select Option'}
            </Text>
            <Feather name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        
        {/* Submit Button */}
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
        padding: 10,

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 1,
 paddingBottom:20
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
  headerRight: {
    width: 28, // To balance the header
  },
  formContainer: {
    flex: 1,
    padding: 16,
    backgroundColor:'white',
    borderRadius:10,
    
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
  },
  requiredStar: {
    color: '#FF5722',
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color:'#000'
  },
  selectorInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    marginRight: 8,
  },
  selectorText: {
    fontSize: 14,
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#FF5722',
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 30,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ArticleScreen;