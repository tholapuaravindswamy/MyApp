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
import CountryCodeModal from './CountryCodeModal';

interface CommunicationDetailsEditModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: {
    email?: string;
    telephones?: string[];
  };
}

interface PhoneInput {
  displayCode: string;
  countryName: string;
  number: string;
}

const CommunicationDetailsEditModal: React.FC<
  CommunicationDetailsEditModalProps
> = ({visible, onClose, onSubmit, initialData = {}}) => {
  const [email, setEmail] = useState(initialData.email || '');

  // Initialize phone inputs from initial data or with empty defaults
  const initialPhones: PhoneInput[] = initialData.telephones
    ? initialData.telephones.map(phone => {
        const parts = phone.split(' ');
        return {
          displayCode: parts[0] || 'Code',
          countryName: '',
          number: parts.slice(1).join(' ') || '',
        };
      })
    : [{displayCode: 'Code', countryName: '', number: ''}];

  const [phoneInputs, setPhoneInputs] = useState<PhoneInput[]>(initialPhones);

  const [countryCodeModalVisible, setCountryCodeModalVisible] = useState(false);
  const [activePhoneIndex, setActivePhoneIndex] = useState(0);

  const handleAddEmail = () => {
    // In a real app, you would add the email to a list
    console.log('Email added:', email);
  };

  const handleAddPhone = () => {
    setPhoneInputs(prev => [
      ...prev,
      {displayCode: 'Code', countryName: '', number: ''},
    ]);
  };

  const handlePhoneNumberChange = (index: number, value: string) => {
    setPhoneInputs(prev => {
      const updated = [...prev];
      updated[index].number = value;
      return updated;
    });
  };

  const openCountryCodeModal = (index: number) => {
    setActivePhoneIndex(index);
    setCountryCodeModalVisible(true);
  };

  const handleCountryCodeSelect = (code: string, name: string) => {
    setPhoneInputs(prev => {
      const updated = [...prev];
      updated[activePhoneIndex].displayCode = code;
      updated[activePhoneIndex].countryName = name;
      return updated;
    });
  };

  const handleSubmit = () => {
    // Collect all valid phone numbers
    const telephones = phoneInputs
      .filter(input => input.number.trim() !== '')
      .map(input => `${input.displayCode} ${input.number}`);

    onSubmit({email, telephones});
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
          <Text style={styles.headerTitle}>Communication Details</Text>
        </View>

        <View style={styles.content}>
          {/* Email */}
          <Text style={styles.sectionTitle}>Email</Text>
          <View style={styles.emailContainer}>
            <TextInput
              style={styles.emailInput}
              placeholder="Enter Text"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.searchIcon}>
              <Feather name="search" size={20} color="#888" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddEmail}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>

          {/* Telephone */}
          <Text style={[styles.sectionTitle, {marginTop: 24}]}>Telephone</Text>

          {phoneInputs.map((phoneInput, index) => (
            <View key={`phone-${index}`} style={styles.phoneInputContainer}>
              <TouchableOpacity
                style={styles.codeContainer}
                onPress={() => openCountryCodeModal(index)}>
                <Text
                  style={[
                    styles.codeText,
                    phoneInput.displayCode !== 'Code' && {
                      color: '#333',
                      fontWeight: '500',
                    },
                  ]}>
                  {phoneInput.displayCode}
                </Text>
                <AntDesign name="right" size={16} color="#888" />
              </TouchableOpacity>

              <View style={styles.phoneInputWrapper}>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Enter Number"
                  value={phoneInput.number}
                  onChangeText={text => handlePhoneNumberChange(index, text)}
                  keyboardType="phone-pad"
                />
                <TouchableOpacity style={styles.searchIcon}>
                  <Feather name="search" size={20} color="#888" />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.addButton} onPress={handleAddPhone}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        {/* Country Code Modal */}
        <CountryCodeModal
          visible={countryCodeModalVisible}
          onClose={() => setCountryCodeModalVisible(false)}
          onSelect={handleCountryCodeSelect}
          initialCode={
            phoneInputs[activePhoneIndex]?.displayCode !== 'Code'
              ? phoneInputs[activePhoneIndex]?.displayCode
              : undefined
          }
        />
      </SafeAreaView>
    </AnimatedModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: '#f0f2f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    color: '#000',
  },
  emailContainer: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emailInput: {
    flex: 1,
    height: 44,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#333',
  },
  searchIcon: {
    padding: 10,
  },
  addButton: {
    height: 36,
    width: 80,
    backgroundColor: '#0f172a',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  codeContainer: {
    height: 44,
    width: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 8,
  },
  codeText: {
    fontSize: 14,
    color: '#999',
  },
  phoneInputWrapper: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneInput: {
    flex: 1,
    height: 44,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginHorizontal: 15,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CommunicationDetailsEditModal;
