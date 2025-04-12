import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ChevronDown, Plus } from 'react-native-feather';

const AssignedToScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Task');
  // const HandleSubmit = () => {
  //   navigation.navigate('Changes'); 
  // }
  // Sample assigned users
  const [assignedUsers, setAssignedUsers] = useState([
    { id: '1', name: 'Vishal Sinha' },
    { id: '2', name: 'Biswajit Das' },
  ]);

  const addAssignee = () => {
    // In a real app, this would open a modal or navigate to a selection screen
    console.log('Add assignee');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
  <AntDesign name="back" size={26} style={{color: "white" }} />
  </TouchableOpacity>
          <Text style={styles.headerTitle}>Assigned To</Text>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['Task', 'Guest', 'Changes'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab ? styles.activeTab : null
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text 
              style={[
                styles.tabText,
                activeTab === tab ? styles.activeTabText : null
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Content */}
    {/* Content */}
<ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
  {activeTab === 'Task' && (
    <View style={styles.assignedSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Assigned To</Text>
      </View>

      {/* Assignee List */}
      {assignedUsers.map((user) => (
        <TouchableOpacity key={user.id} style={styles.assigneeItem}>
          <Text style={styles.assigneeName}>{user.name}</Text>
          <ChevronDown width={16} height={16} color="#666666" />
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addAssignee}>
        <Plus width={16} height={16} color="#333333" style={{ marginStart: 2 }} />
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  )}

  {activeTab === 'Guest' && (
    <View style={{ alignItems: 'center', marginTop: 40 }}>
      <Text style={{ fontSize: 16, fontWeight: '500' }}>Welcome to Guest Section</Text>
    </View>
  )}

  {activeTab === 'Changes' && (
    <View style={{ alignItems: 'center', marginTop: 40 }}>
      <Text style={{ fontSize: 16, fontWeight: '500' }}>Welcome to Changes Section</Text>
    </View>
  )}
</ScrollView>

      
      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton}
        // onPress={HandleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
bottom:10
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    bottom:10
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 1,
    backgroundColor: '#FFFFFF',
  },
  
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginHorizontal: 6,
    backgroundColor: '#FFFFFF',
    bottom:12
  },
  
  activeTab: {
    backgroundColor: '#FF5722',
    borderColor: '#FF5722',
  },
  
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  assignedSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:'flex-end',
    borderWidth:1,
    borderRadius:5,
    backgroundColor:'#E9ECEF',
    borderColor: '#E9ECEF' 
  },
  addButtonText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 4,
    padding:4,
    fontWeight:'bold'
  },
  assigneeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 8,
  },
  assigneeName: {
    fontSize: 14,
    color: '#333333',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  submitButton: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AssignedToScreen;