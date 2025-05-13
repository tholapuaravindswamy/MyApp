'use client';

import type React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AnimatedModal from './AnimatedModal';

interface IncidentDetailsEditModalProps {
  visible: boolean;
  onClose: () => void;
  initialText?: string;
  onSubmit: (text: string) => void;
  title: string;
}

const IncidentDetailsEditModal: React.FC<IncidentDetailsEditModalProps> = ({
  visible,
  onClose,
  initialText = '',
  onSubmit,
  title,
}) => {
  const [text, setText] = useState(initialText);

  const handleSubmit = () => {
    onSubmit(text);
    onClose();
  };

  return (
    <AnimatedModal 
    visible={visible} 
    onClose={onClose}
    adaptiveHeight={true}
    minHeight={ Platform.OS === "ios" ? "70%" : "40%"}
  >
          <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <AntDesign name="back" size={26} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          <View style={styles.formItemLeft}>
            <Text style={styles.formItemText}>
              Description<Text style={styles.requiredStar}>*</Text>
            </Text>
          </View>
          <TextInput
            placeholder="Enter Text"
            placeholderTextColor="black"
            style={styles.textInput}
            value={text}
            onChangeText={setText}
            multiline
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </AnimatedModal>
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
    backgroundColor: 'white',
    marginBottom: 10,
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
    // borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
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
    minHeight: 100,
    textAlignVertical: 'top',
    color: 'black',
  },
  formItemText: {
    fontSize: 16,
    color: '#000',
    marginTop: 10,
    marginLeft: 10,
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
    top: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default IncidentDetailsEditModal;
