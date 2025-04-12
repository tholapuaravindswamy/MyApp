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
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SelectField from '../components/SelectField';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import { Download, Trash2, UploadCloud } from 'react-native-feather';


const LFArtical01Screen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const AttachmentPopup = ({ visible, onClose }) => {
    const attachments = [
        { id: '1', uri: 'https://via.placeholder.com/150x150' },
        { id: '2', uri: 'https://via.placeholder.com/150x150' },
        { id: '3', uri: 'https://via.placeholder.com/150x150' },
      ];  
    return (
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <AntDesign name="back" size={26} color="black" />
                </TouchableOpacity>
            <Text style={styles.modalTitle}>Attachment</Text>
            </View>
            <TouchableOpacity style={styles.uploadContainer}>
                   <UploadCloud width={24} height={24} color="#666666" />
                   <Text style={styles.uploadText}>Upload</Text>
                 </TouchableOpacity>
           
                 {/* Attachments */}
                 <View style={styles.attachmentsContainer}>
                   {attachments.map((attachment) => (
                     <View key={attachment.id} style={styles.attachmentItem}>
                       <View style={styles.attachmentPreview} />
                       <View style={styles.attachmentActions}>
                         <TouchableOpacity style={styles.actionButton}>
                           <Trash2 width={16} height={16} color="#666666" />
                         </TouchableOpacity>
                         <TouchableOpacity style={styles.actionButton}>
                           <Download width={16} height={16} color="#666666" />
                         </TouchableOpacity>
                       </View>
                     </View>
                   ))}
                 </View>
  <TouchableOpacity style={styles.editButton}
        //   onPress={HandleEdit}
          >
            <Text style={styles.editButtonText}>Submit</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
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
                  <AntDesign name="back" size={26} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Article - 01</Text>

                <AttachmentPopup visible={modalVisible} onClose={() => setModalVisible(false)} />

             <TouchableOpacity style={styles.attachButton} onPress={() => setModalVisible(true)}>
                <Entypo name="attachment" size={16} style={styles.attachButtonText} />
             </TouchableOpacity>
              </View>
      
      {/* Form */}
      <View style={styles.form}>
      <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Name<Text style={styles.requiredStar}>*</Text></Text>
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
          <Text style={styles.fieldLabel}>Description<Text style={styles.requiredStar}>*</Text></Text>
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
          <Text style={styles.fieldLabel}>Make<Text style={styles.requiredStar}>*</Text></Text>
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
          <Text style={styles.fieldLabel}>color<Text style={styles.requiredStar}>*</Text></Text>
          <TextInput
        placeholder='Enter color'
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
          <Text style={styles.fieldLabel}>Category<Text style={styles.requiredStar}>*</Text></Text>
          <SelectField placeholder="Select Option" />
        </View>
        <KeyboardAvoidingView>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Stored Untill<Text style={styles.requiredStar}>*</Text></Text>
          <SelectField placeholder="Select Option" />
        </View>
      </KeyboardAvoidingView>
      </View>
      
      {/* Create Button */}
      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => navigation.navigate('LFGuestSearch')}
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
        justifyContent: 'space-between',
        paddingHorizontal: 1,
        paddingVertical: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom:15

  },
  backIcon: {
    fontSize: 24,
    fontWeight: '300',
  },
  headerTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    bottom:15,
    right:80  
   },
  attachButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E9ECEF',
    alignItems: 'center',
    justifyContent: 'center',
    bottom:15
  },
  attachButtonText: {
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000aa',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 25,
    color:'black',
    marginLeft:10
  },
  uploadContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'black',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
  },
  attachmentsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding:1,
    borderRadius:8,
  },
  attachmentItem: {
    width: '33.33%',
    paddingHorizontal: 4,
    marginTop:9,
  },
  attachmentPreview: {
    aspectRatio: 1,
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    top:5
  },
  attachmentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    bottom:25,
  },
  actionButton: {
    padding: 4,
    width: 22,
    height: 22,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:3
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  editButton: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    top:10
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
 
});

export default LFArtical01Screen;