import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';

const { height } = Dimensions.get('window');

const LocationScreen = ({ navigation }) => {
  const handleAccept = () => {
    navigation.navigate('ModuleScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <ScrollView 
        bounces={false} 
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logo} />
          </View>
          <Text style={styles.title}>The Ultimate Hotel Operating System</Text>
          <Text style={styles.subtitle}>
            <Text style={styles.orangeText}>Effortlessly Powerful, Incredibly Simple.</Text>
          </Text>
        </View>
        
        {/* Content Section */}
        <View style={styles.content}>
          <View style={styles.contentInner}>
            <Text style={styles.locationTitle}>Location</Text>
            <Text style={styles.locationSubtitle}>
              Please allow location access to continue
            </Text>
            
            <View style={styles.formContainer}>
              {/* This empty view helps with spacing */}
            </View>
            
            <View style={styles.buttonContainer}>
              {/* Allow button */}
              <TouchableOpacity style={styles.allowButton} onPress={handleAccept}>
                <Text style={styles.allowButtonText}>Allow</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Footer */}
          <Text style={styles.copyright}>
            © 2025 NeoTeknos Hospitality. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    height: height * 0.35, // 30% of screen height
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
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
  },
  orangeText: {
    color: '#FF5722',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
  },
  contentInner: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: 'black'
  },
  locationSubtitle: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  allowButton: {
    backgroundColor: '#FF5722',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  allowButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  copyright: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default LocationScreen;