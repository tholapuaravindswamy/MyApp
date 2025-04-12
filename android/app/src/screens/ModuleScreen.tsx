import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type ModuleScreen = StackNavigationProp<RootStackParamList, 'ModuleScreen'>;

type Props = {
  navigation: ModuleScreen;
};

const modules = [
  { id: '1', title: 'Assets', color: '#FF5722', screen: 'Assets' },
  { id: '2', title: 'Bookings', color: '#2196F3', screen: 'Bookings' },
  { id: '3', title: 'Lost & Found', color: '#4CAF50', screen: 'LostFound' },
];

const ModuleScreen: React.FC<Props> = ({ navigation }) => {

  const renderCard = (item) => {
    return (
      <View key={item.id} style={styles.cardWrapper}>
        <View style={styles.stackedCardContainer}>
          {/* Main card */}
          <TouchableOpacity 
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => navigation.navigate(item.screen)}  // Navigate to the corresponding screen
          >
            <View style={styles.cardContent}>
              <View style={styles.checkbox} />
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
          
          {/* Shadow cards for stacked effect */}
          <View style={[styles.stackedCard1, { backgroundColor: item.color, opacity: 0.7 }]} />
          <View style={[styles.stackedCard2, { backgroundColor: item.color, opacity: 0.4 }]} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo} />
        </View>
        <Text style={styles.title}>The Ultimate Hotel Operating System</Text>
        <Text style={styles.subtitle}>The Group Solution for every property</Text>
      </View>
      
      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.modulesTitle}>Modules</Text>
        <Text style={styles.modulesSubtitle}>Please select the module to continue</Text>
        
        {/* Scrollable cards */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          snapToInterval={140} // Card height + margin
          decelerationRate="fast"
        >
          {modules.map(item => renderCard(item))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    header: {
      height: '30%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    logoContainer: {
      marginBottom: 15,
    },
    logo: {
      width: 60,
      height: 60,
      backgroundColor: '#f5f5f5',
      borderRadius: 10,
    },
    title: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subtitle: {
      color: '#FF3B30',
      fontSize: 14,
      textAlign: 'center',
      marginTop: 5,
    },
    content: {
      flex: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    modulesTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 10,
      color:'black'
    },
    modulesSubtitle: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
      marginBottom: 30,
    },
    scrollView: {
      flex: 1,
    },
    scrollViewContent: {
      paddingBottom: 20,
    },
    cardWrapper: {
      marginBottom: 20,
      alignItems: 'center',
    },
    stackedCardContainer: {
      width: '90%',
      height: 120,
      position: 'relative',
      paddingVertical:3
    },
    card: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
      justifyContent: 'center',
      paddingHorizontal: 20,
      zIndex: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    stackedCard1: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: 15,
      top: 10,
      left: 0,
      zIndex: 2,
    },
    stackedCard2: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: 15,
      top: 20,
      left: 0,
      zIndex: 1,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 20,
      height: 20,
      backgroundColor: 'white',
      borderRadius: 4,
      marginRight: 10,
    },
    cardTitle: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default ModuleScreen;
