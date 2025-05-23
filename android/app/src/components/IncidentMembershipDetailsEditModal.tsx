'use client';

import type React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import AnimatedModal from './AnimatedModal';
import IncidentMemberShipTypeModal from './IncidentMemberShipTypeModal';
import IncidentMembershipLevelModal from './IncidentMembershipLevelModal';

interface MembershipDetailsEditModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: {
    membershipType?: string;
    membershipLevel?: string;
    membershipNumber?: string;
    isPrimary?: boolean;
  };
}

const MembershipDetailsEditModal: React.FC<MembershipDetailsEditModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData = {},
}) => {
  const [formData, setFormData] = useState({
    membershipType: initialData.membershipType || '',
    membershipLevel: initialData.membershipLevel || '',
    membershipNumber: initialData.membershipNumber || '',
    isPrimary: initialData.isPrimary || false,
  });

  const [membershipTypeModalVisible, setMembershipTypeModalVisible] =
    useState(false);
  const [membershipLevelModalVisible, setMembershipLevelModalVisible] =
    useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const togglePrimary = () => {
    setFormData(prev => ({
      ...prev,
      isPrimary: !prev.isPrimary,
    }));
  };

  const handleMembershipTypeSelect = (selectedItems: any[]) => {
    if (selectedItems.length > 0) {
      setFormData(prev => ({
        ...prev,
        membershipType: selectedItems[0].name,
      }));
    }
  };

  const handleMembershipLevelSelect = (selectedItems: any[]) => {
    if (selectedItems.length > 0) {
      setFormData(prev => ({
        ...prev,
        membershipLevel: selectedItems[0].name,
      }));
    }
  };

  const handleDelete = () => {
    // In a real app, you would implement delete functionality
    console.log('Delete membership');
    onClose();
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <AntDesign name="back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Membership Details</Text>
          <TouchableOpacity>
            <Text style={styles.addNewText}>Add New</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Membership Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Membership Type<Text style={styles.requiredStar}>*</Text>
            </Text>
            <TouchableOpacity
              style={styles.selectInput}
              onPress={() => setMembershipTypeModalVisible(true)}>
              <Text
                style={[
                  styles.inputText,
                  !formData.membershipType && styles.placeholderText,
                ]}>
                {formData.membershipType || 'Select Option'}
              </Text>
              <Feather name="chevron-right" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Membership Level */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Membership Level</Text>
            <TouchableOpacity
              style={styles.selectInput}
              onPress={() => setMembershipLevelModalVisible(true)}>
              <Text
                style={[
                  styles.inputText,
                  !formData.membershipLevel && styles.placeholderText,
                ]}>
                {formData.membershipLevel || 'Select Option'}
              </Text>
              <Feather name="chevron-right" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Membership Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Membership Number<Text style={styles.requiredStar}>*</Text>
            </Text>
            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Enter Text"
                value={formData.membershipNumber}
                onChangeText={text =>
                  handleInputChange('membershipNumber', text)
                }
              />
              <TouchableOpacity style={styles.searchIcon}>
                <Feather name="search" size={20} color="#888" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                formData.isPrimary && styles.primarySelected,
              ]}
              onPress={togglePrimary}>
              <View style={styles.checkboxContainer}>
                {formData.isPrimary && (
                  <AntDesign name="check" size={16} color="#000" />
                )}
              </View>
              <Text style={styles.actionButtonText}>Primary</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleDelete}>
              <AntDesign name="delete" size={20} color="#FF3B30" />
              <Text style={[styles.actionButtonText, styles.deleteText]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        {/* Membership Type Modal */}
        <IncidentMemberShipTypeModal
          visible={membershipTypeModalVisible}
          onClose={() => setMembershipTypeModalVisible(false)}
          onSelect={handleMembershipTypeSelect}
        />

        {/* Membership Level Modal */}
        <IncidentMembershipLevelModal
          visible={membershipLevelModalVisible}
          onClose={() => setMembershipLevelModalVisible(false)}
          onSelect={handleMembershipLevelSelect}
        />
      </SafeAreaView>
    </AnimatedModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  addNewText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
  },
  requiredStar: {
    color: '#FF5722',
  },
  selectInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInputContainer: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 44,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#333',
  },
  searchIcon: {
    padding: 10,
  },
  inputText: {
    fontSize: 14,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
  },
  primarySelected: {
    backgroundColor: '#e6f7ff',
  },
  checkboxContainer: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#333',
  },
  deleteText: {
    color: '#FF3B30',
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginHorizontal: 15,
    marginBottom: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default MembershipDetailsEditModal;
