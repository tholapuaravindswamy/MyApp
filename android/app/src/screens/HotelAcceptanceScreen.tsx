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

type AcceptanceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Acceptance'>;

type Props = {
  navigation: AcceptanceScreenNavigationProp;
};

const { width, height } = Dimensions.get('window');

const HotelAcceptanceScreen: React.FC<Props> = ({ navigation }) => {
  const handleAccept = (): void => {
    navigation.navigate('LocationAccessScreen');
  };

  const handlePrivacyPolicy = (): void => {
    // Navigate to Privacy Policy
    navigation.navigate('PrivacyPolicy');
  };

  const handleTermsOfUse = (): void => {
    navigation.navigate('TermsOfUse');
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
          <Text style={styles.acceptanceTitle}>Acceptance</Text>
          <Text style={styles.acceptanceSubtitle}>
            Please accept the terms and conditions
          </Text>

          {/* Terms text with links */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              I have read and understood the{'\n'}
              <Text style={styles.link} onPress={handlePrivacyPolicy}>
                Privacy Policy
              </Text>
              {' & '}
              <Text style={styles.link} onPress={handleTermsOfUse}>
                Term Of Use
              </Text>
            </Text>
          </View>

          {/* Accept button */}
          <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>
        © 2025 NeoTeknos Hospitality. All rights reserved.
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topSection: {
    flex: 0.5,
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
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-between', // Make sure content is spaced properly
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 20,
    justifyContent: 'center', // Center the form vertically
    alignItems: 'center',
  },
  acceptanceTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  acceptanceSubtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  termsContainer: {
    marginTop: 70, // Adjusted to ensure terms are not pushed too far down
  },
  termsText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 20,
  },
  link: {
    color: '#FF5C00',
    textDecorationLine: 'underline',
  },
  acceptButton: {
    width: '100%', // Ensuring button takes full width
    height: 40,
    backgroundColor: '#FF5C00',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    paddingBottom: 20, // Ensure the footer stays at the bottom of the screen
    position: 'absolute', // Position footer at the bottom
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default HotelAcceptanceScreen;
