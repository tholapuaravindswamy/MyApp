import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import GuestScreen from './GuestScreen';
import ChangesScreen from './ChangesScreen';
import TaskScreen from './TaskScreen';
import ResolutionScreen from './ResolutionScreen';

const TaskDetailsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Task');

  const HandleAttachment = () => {
    navigation.navigate('Attachments');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Task':
        return <TaskScreen />;
      case 'Guest':
        return <GuestScreen />;
      case 'Changes':
        return <ChangesScreen />;
      case 'Resolution':
        return <ResolutionScreen />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      {/* Header and Overlapping Tabs */}
      <View style={{ position: 'relative' }}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="back" size={26} color="white" />
            <Text style={styles.headerTitle}>UID: ABCD1234567890</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.helpButton} onPress={HandleAttachment}>
            <Entypo name="attachment" size={18} style={styles.helpButtonText} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
          style={styles.tabScroll}
        >
          {['Task', 'Resolution', 'Guest','Changes'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {renderContent()}
        <View style={{ height: 20 }} />
      </ScrollView>
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
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom:15

  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  helpButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    bottom:15

  },
  helpButtonText: {
    fontWeight: 'bold',
    color: 'black',
  },
  tabScroll: {
    position: 'absolute',
    bottom: -20,
    width: '100%',
    zIndex: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 1,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginHorizontal: 6,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    padding: 12,
    marginTop: 30, // Push content below the overlapping tabs
  },
});

export default TaskDetailsScreen;
