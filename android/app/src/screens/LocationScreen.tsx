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
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type LocationScreen = StackNavigationProp<RootStackParamList, 'LocationAccessScreen'>;

type Props = {
  navigation: LocationScreen;
};

const { width, height } = Dimensions.get('window'); // Access screen dimensions

const LocationScreen: React.FC<Props> = ({ navigation }) => {
  const handleAccept = (): void => {
    navigation.navigate('ModuleScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top section with logo and title */}
      <View style={styles.topSection}>
        <View style={styles.logoContainer}>
          <View style={styles.logo} />
        </View>

        <Text style={styles.title}>The Ultimate Hotel Operating System</Text>
        <Text style={styles.subtitle}>
          <Text style={styles.orangeText}>Effortlessly Powerful, Incredibly Simple.</Text>
        </Text>
      </View>

      {/* Bottom section with acceptance form */}
      <View style={styles.bottomSection}>
        <View style={styles.formContainer}>
          <Text style={styles.locationTitle}>Location</Text>
          <Text style={styles.locationSubtitle}>
            Please allow location access to continue
          </Text>

          {/* Accept button */}
          <TouchableOpacity style={styles.allowButton} onPress={handleAccept}>
            <Text style={styles.allowButtonText}>Allow</Text>
          </TouchableOpacity>

          {/* Footer */}
          <Text style={styles.footerText}>
            © 2025 NeoTeknos Hospitality. All rights reserved.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topSection: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 5,
    fontSize: 15,
    textAlign: 'center',
  },
  orangeText: {
    color: '#FF5C00',
  },
  bottomSection: {
    flex: 0.6,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 25,
    paddingTop: 40, // Adjusted to give more room
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between', // This helps space out content evenly
    alignItems: 'center',
    paddingTop: 40, // Adjusted to give space for content
  },
  locationTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  locationSubtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  allowButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#FF5C00',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50, // Increased margin for better spacing
  },
  allowButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 20, // Adjusted to ensure footer is not disturbed
    paddingBottom: 20, // Added padding to ensure footer stays at the bottom
  },
});

export default LocationScreen;
