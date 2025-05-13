import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Alert,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const { height } = Dimensions.get('window');

const LFAttachment = ({ navigation, route }) => {
  const [attachments, setAttachments] = useState([
    { id: '1', name: 'Name.png', size: '0.1 MB', type: 'image' },
    { id: '2', name: 'Name.doc', size: '0.1 MB', type: 'document' },
    { id: '3', name: 'Name.mp4', size: '0.1 MB', type: 'video' },
  ]);

  const handleAddAttachment = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: false,
      });

      if (results.length > 0) {
        const result = results[0];
        
        // Get file size in MB
        const fileInfo = await RNFS.stat(result.uri);
        const fileSizeInMB = (fileInfo.size / (1024 * 1024)).toFixed(1);
        
        // Determine file type
        let fileType = 'document';
        if (result.type?.startsWith('image')) {
          fileType = 'image';
        } else if (result.type?.startsWith('video')) {
          fileType = 'video';
        }

        // Add new attachment to the list
        const newAttachment = {
          id: Date.now().toString(),
          name: result.name,
          size: `${fileSizeInMB} MB`,
          type: fileType,
          uri: result.uri,
        };

        setAttachments([...attachments, newAttachment]);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User cancelled the picker
      } else {
        console.log('Error picking document:', error);
      }
    }
  };

  const handleShare = (item) => {
    Alert.alert('Share', `Sharing ${item.name}`);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Attachment',
      'Are you sure you want to delete this attachment?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setAttachments(attachments.filter(item => item.id !== id));
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleSubmit = () => {
    console.log('Attachments submitted:', attachments);
    navigation.goBack();
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'image':
        return <Feather name="image" size={20} color="#000" />;
      case 'document':
        return <Feather name="file-text" size={20} color="#000" />;
      case 'video':
        return <Feather name="film" size={20} color="#000" />;
      default:
        return <Feather name="file" size={20} color="#000" />;
    }
  };

  const renderAttachmentItem = ({ item }) => (
    <View style={styles.attachmentItem}>
      <View style={styles.fileInfo}>
        {getFileIcon(item.type)}
        <View style={styles.fileDetails}>
          <Text style={styles.fileName}>{item.name}</Text>
          <Text style={styles.fileSize}>{item.size}</Text>
        </View>
      </View>
      <View style={styles.fileActions}>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={() => handleShare(item)}
        >
          <Feather name="share-2" size={16} color="#666" />
          <Text style={styles.shareText}>Share</Text>
          <Feather name="chevron-down" size={16} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Feather name="trash-2" size={18} color="#FF5722" />
        </TouchableOpacity>
      </View>
    </View>
  );

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
        <Text style={styles.headerTitle}>Attachment</Text>
        <View style={styles.headerRight} />
      </View>
      
      {/* Add Attachment Button */}
      <View style={styles.contentCard}>
      <TouchableOpacity 
        style={styles.addAttachmentButton}
        onPress={handleAddAttachment}
      >
        <AntDesign name="plus" size={16} color="#666" />
        <Text style={styles.addAttachmentText}>Attachment</Text>
      </TouchableOpacity>
      
      {/* Attachments List */}
      <FlatList
        data={attachments}
        renderItem={renderAttachmentItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
      </View>
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
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
  },
  headerRight: {
    width: 28, // To balance the header
  },
  addAttachmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8eef9',
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 25,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'black',
  },
  addAttachmentText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  listContent: {
    padding: 16,
  },
  contentCard: {
    paddingTop: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    minHeight: height * 0.3,
    marginTop:10,

  },
  attachmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    elevation: 1,
    borderWidth:1
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileDetails: {
    marginLeft: 12,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  fileSize: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  fileActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  shareText: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 4,
  },
  deleteButton: {
    padding: 4,
  },
  submitButton: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    top:20
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LFAttachment;