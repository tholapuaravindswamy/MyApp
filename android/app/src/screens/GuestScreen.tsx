import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';


const preferenceGroupsData = [
    {
      groupName: 'Preference Group 1',
      preferences: ['Preference A', 'Preference B', 'Preference C', 'Preference D'],
    },
    {
      groupName: 'Preference Group 2',
      preferences: ['Preference E', 'Preference F', 'Preference G', 'Preference H'],
    },
    {
      groupName: 'Preference Group 3',
      preferences: ['Preference I', 'Preference J', 'Preference K', 'Preference L'],
    },
  ];
  
const GuestScreen = () => {
    const [expandedGroupIndex, setExpandedGroupIndex] = useState(0);
  const [checkedStates, setCheckedStates] = useState({});

  const toggleCheck = (groupIndex, prefIndex) => {
    const key = `${groupIndex}-${prefIndex}`;
    setCheckedStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>First Name</Text>
          <Text style={styles.value}>Anirudh</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Last Name</Text>
          <Text style={styles.value}>Jonnalagadda</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>+91 99123 99123{'\n'}+91 99123 99123</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>anirudh@gmail.com</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Membership</Text>
          <Text style={styles.value}>ABCD1234567890</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>VIP Level</Text>
          <Text style={styles.value}>VIP - 01</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Membership Level</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>No. Of Visit</Text>
          <Text style={styles.value}>10</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Date Of Birth</Text>
          <Text style={styles.value}>01-01-2000</Text>
        </View>
      </View>

      <Text style={styles.label}>Preferences</Text>

      {preferenceGroupsData.map((group, groupIndex) => {
        const isExpanded = expandedGroupIndex === groupIndex;
        return (
          <View style={styles.preferenceBox} key={groupIndex}>
            <TouchableOpacity
              style={styles.preferenceHeader}
              onPress={() =>
                setExpandedGroupIndex(
                  isExpanded ? null : groupIndex
                )
              }
            >
              <Text style={styles.dropdownTitle}>{group.groupName}</Text>
              <Text style={styles.dropdownIcon}>
                {isExpanded ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>

            {isExpanded && (
              <View style={styles.checkboxGrid}>
                {group.preferences.map((pref, prefIndex) => {
                  const key = `${groupIndex}-${prefIndex}`;
                  return (
                    <View style={styles.checkboxItem} key={prefIndex}>
                      <CheckBox
                        value={!!checkedStates[key]}
                        onValueChange={() =>
                          toggleCheck(groupIndex, prefIndex)
                        }
                      />
                      <Text style={styles.checkLabel}>{pref}</Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        );
      })}
        <Text style={styles.stayLabel2}>Stay</Text>
      <TouchableOpacity style={styles.stayRow}>
        <Text style={styles.stayLabel}>View</Text>
        <Text style={styles.stayView}> ▶</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
   
   
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
      marginRight:-60
    },
    column: {
      flex: 1,
      marginRight: 8,
    },
  
    value: {
      fontSize: 14,
      color: '#000',
    },
    preferenceContainer: {
      marginTop: 20,
    },
   
    checkboxRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
      right:5,
    },
    checkLabel: {
      marginRight: 12,
      color:'#0D1B2A'
    },
   
    dropdownTitle1: {
        marginTop: 10,
        paddingHorizontal: 10,
bottom:10     
 },
    stayRow: {
      marginTop: 20,
      paddingVertical: 10,
      borderWidth:1,
      borderRadius:5,
      borderColor: '#eee',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    stayLabel: {
      fontSize: 14,
      marginLeft:10
    },
    stayLabel2: {
        fontSize: 14,
        marginLeft:1,
        top:10,
        color:'black',
        fontWeight:'400'
      },
    stayView: {
      fontSize: 14,
      color: '#000',
      marginRight:20
    },
  
      container: {
        padding: 10,
        backgroundColor: '#fff',
        bottom: 10,
      },
      label: {
        fontSize: 14,
        color: '#888',
        marginBottom: 10,
      },
      preferenceBox: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 10,
        marginBottom: 10,
      },
      preferenceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      dropdownTitle: {
        fontSize: 14,
        color: '#0D1B2A',
      },
      dropdownIcon: {
        fontSize: 16,
        color: '#000',
      },
      checkboxGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
      },
      checkboxItem: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },

  });
  
export default GuestScreen;
