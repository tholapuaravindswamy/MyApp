import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Cloud, Trash2, Download, UploadCloud } from 'react-native-feather';
import AntDesign from 'react-native-vector-icons/AntDesign';


const AttachmentScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Task');
  const HandleEdit = () => {
    navigation.navigate('Assigned');
  };
  
  // Sample attachment data
  const attachments = [
    { id: '1', uri: 'https://via.placeholder.com/150x150' },
    { id: '2', uri: 'https://via.placeholder.com/150x150' },
    { id: '3', uri: 'https://via.placeholder.com/150x150' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
  <AntDesign name="back" size={26} style={{color: "white" }} />
  </TouchableOpacity>
          <Text style={styles.headerTitle}>Attachment</Text>
       
      </View>
      
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['Task', 'Guest', 'Changes'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab ? styles.activeTab : null
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text 
              style={[
                styles.tabText,
                activeTab === tab ? styles.activeTabText : null
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Content */}
     {/* Content */}
<ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
  {activeTab === 'Task' && (
    <>
      {/* Upload Area */}
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
    </>
  )}

  {activeTab === 'Guest' && (
    <View style={{ alignItems: 'center', marginTop: 40 }}>
      <Text style={{ fontSize: 16, fontWeight: '500' }}>Welcome to Guest Screen</Text>
    </View>
  )}

  {activeTab === 'Changes' && (
    <View style={{ alignItems: 'center', marginTop: 40 }}>
      <Text style={{ fontSize: 16, fontWeight: '500' }}>Welcome to Changes Screen</Text>
    </View>
  )}
</ScrollView>

      
      {/* Edit Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.editButton}
        onPress={HandleEdit}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom:10

  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    bottom:10

  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 1,
    backgroundColor: '#FFFFFF',
  },
  
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginHorizontal: 6,
    backgroundColor: '#FFFFFF',
    bottom:12
  },
  
  activeTab: {
    backgroundColor: '#FF5722',
    borderColor: '#FF5722',
  },
  
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
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
    marginLeft:11
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
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AttachmentScreen;