import type React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AnimatedModal from './AnimatedModal';

interface IncidentDescriptionModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (description: string) => void;
}

const IncidentDescriptionModal: React.FC<IncidentDescriptionModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (description.trim()) {
      onSave(description);
      onClose();
    }
  };

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <AntDesign name="back" size={26} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Description</Text>
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
            placeholderTextColor="grey"
            style={styles.textInput}
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={[styles.submitButton]} onPress={handleSubmit}>
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
    backgroundColor: '#fff',
    marginBottom: 6,
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
    margin: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
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
    top: 8,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default IncidentDescriptionModal;
