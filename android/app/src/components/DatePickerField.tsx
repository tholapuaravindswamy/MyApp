import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface DatePickerFieldProps {
  placeholder: string;
  value?: string;
  onSelect?: (value: string) => void;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({ 
  placeholder, 
  value, 
  onSelect 
}) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onSelect && onSelect('')}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.calendarIcon}>📅</Text>
        <Text style={styles.text}>
          {value || placeholder}
        </Text>
      </View>
    </TouchableOpacity>
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
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: '#757575',
  },
});

export default DatePickerField;