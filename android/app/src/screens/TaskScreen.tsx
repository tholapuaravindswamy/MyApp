import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Clock, Edit } from 'react-native-feather';



  
const TaskScreen = () => {
    
    return (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>UID</Text>
            <Text style={styles.sectionValue}>ABCD1234567890</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Created On</Text>
            <View style={styles.dateContainer}>
              <Calendar width={16} height={16} color="#666666" style={styles.icon} />
              <Text style={styles.sectionValue}>01-04-2025 23:47</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Created By</Text>
            <Text style={styles.sectionValue}>Anirudh Jonnalagadda</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Task Type</Text>
            <Text style={styles.sectionValue}>Assets</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Asset</Text>
            <Text style={styles.sectionValue}>Mixer Grinder</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Category</Text>
            <Text style={styles.sectionValue}>Kitchen Equipment</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Location/Room/Public Area</Text>
            <Text style={styles.sectionValue}>Indian Kitchen</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Guest</Text>
            <Text style={styles.sectionValue}>Mr. Anirudh Jonnalagadda</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Task</Text>
            <Text style={styles.sectionValue}>Shampoo x 2</Text>
            <Text style={styles.sectionValue}>Conditioner x 2</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Schedule</Text>
            <View style={styles.scheduleContainer}>
              <View style={styles.dateContainer}>
                <Calendar width={16} height={16} color="#666666" style={styles.icon} />
                <Text style={styles.sectionValue}>02-04-2025 23:48</Text>
              </View>
              <TouchableOpacity style={styles.editIcon}>
                <Edit width={16} height={16} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Timer</Text>
            <View style={styles.dateContainer}>
              <Clock width={16} height={16} color="#666666" style={styles.icon} />
              <Text style={styles.sectionValue}>-02:47</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </>
      );}
const styles = StyleSheet.create({
   
   
    section: {
        marginBottom: 16,
      },
      sectionLabel: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 4,
      },
      sectionValue: {
        fontSize: 14,
        color: '#000000',
        fontWeight: '500',
      },
      dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon: {
        marginRight: 8,
      },
      scheduleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      editIcon: {
        padding: 4,
      },
      editButton: {
        backgroundColor: '#FF5722',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 8,
      },
      editButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
      },
  });
  
export default TaskScreen;
