import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';

interface SelectFieldProps {
  placeholder: string;
  value?: string;
  onSelect?: (value: string) => void;
  options?: string[]; // Array of options to display in dropdown
}

const SelectField: React.FC<SelectFieldProps> = ({ 
  placeholder, 
  value, 
  onSelect,
  options = ['Option 1', 'Option 2', 'Option 3'] // Default options if none provided
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const [fieldMeasurements, setFieldMeasurements] = useState({
    x: 0, y: 0, width: 0, height: 0
  });
  const fieldRef = useRef(null);
  
  const handleSelect = (option: string) => {
    setSelectedValue(option);
    if (onSelect) {
      onSelect(option);
    }
    setIsDropdownVisible(false);
  };

  const openDropdown = () => {
    // Measure the position of the field to position the dropdown
    fieldRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setFieldMeasurements({ x: pageX, y: pageY, width, height });
      setIsDropdownVisible(true);
    });
  };

  return (
    <View>
      <TouchableOpacity 
        ref={fieldRef}
        style={styles.container}
        onPress={openDropdown}
      >
        <Text style={[
          styles.text,
          selectedValue ? styles.selectedText : null
        ]}>
          {selectedValue || placeholder}
        </Text>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isDropdownVisible}
        animationType="none"
        onRequestClose={() => setIsDropdownVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsDropdownVisible(false)}>
          <View style={styles.modalOverlay}>
            <View 
              style={[
                styles.dropdownContainer,
                {
                  top: fieldMeasurements.y + fieldMeasurements.height + 4,
                  left: fieldMeasurements.x,
                  width: fieldMeasurements.width,
                }
              ]}
            >
              <ScrollView 
                style={styles.optionsScrollView}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
              >
                {options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionItem,
                      index === options.length - 1 ? styles.lastOption : null
                    ]}
                    onPress={() => handleSelect(option)}
                  >
                    <Text style={[
                      styles.optionText,
                      selectedValue === option ? styles.selectedOptionText : null
                    ]}>
                      {option}
                    </Text>
                    {selectedValue === option && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#757575',
  },
  selectedText: {
    color: '#000000',
  },
  chevron: {
    fontSize: 18,
    fontWeight: '500',
    transform: [{ rotate: '90deg' }],
    color: '#757575',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  dropdownContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  optionsScrollView: {
    maxHeight: 150,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    fontWeight: '500',
    color: '#FF5722',
  },
  checkmark: {
    fontSize: 18,
    color: '#FF5722',
    fontWeight: 'bold',
  },
});

export default SelectField;