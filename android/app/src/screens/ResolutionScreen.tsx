import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ResolutionScreen = () => {
  const [source, setSource] = useState('People');
  const [status, setStatus] = useState('Status Name');

  return (
    <View style={styles.container}>
      {/* Investigation */}
      <View style={styles.section}>
        <Text style={styles.labelMuted}>Investigation</Text>
        <View style={styles.row}>
          <Text style={styles.value}>Investigation Description</Text>
          <Ionicons name="pencil-outline" size={16} color="#000" style={styles.icon} />
        </View>
      </View>

      {/* Resolution */}
      <View style={styles.section}>
        <Text style={styles.labelMuted}>Resolution</Text>
        <View style={styles.row}>
          <Text style={styles.value}>Resolution Description</Text>
          <Ionicons name="pencil-outline" size={16} color="#000" style={styles.icon} />
        </View>
      </View>

      {/* Source */}
      <View style={styles.section}>
        <Text style={styles.labelMuted}>Source</Text>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.value}>{source}</Text>
          <Ionicons name="chevron-down" size={16} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Status */}
      <View style={styles.section}>
        <Text style={styles.labelMuted}>Status</Text>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.value}>{status}</Text>
          <Ionicons name="chevron-down" size={16} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Edit Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 24,
  },
  labelMuted: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    fontSize: 14,
    color: '#000',
    flex: 1,
    flexShrink: 1,
  },
  icon: {
    marginLeft: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    borderTopColor: '#EEEEEE',
    marginTop:280
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

export default ResolutionScreen;
