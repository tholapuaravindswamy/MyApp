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

const HotelAcceptanceScreen = ({ navigation }) => {
  const handleAccept = () => {
    navigation.navigate('LocationAccessScreen');
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const handleTermsOfUse = () => {
    navigation.navigate('TermsOfUse');
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
            <Text style={styles.acceptanceTitle}>Acceptance</Text>
            <Text style={styles.acceptanceSubtitle}>
              Please accept the terms and conditions
            </Text>
            
            <View style={styles.formContainer}>
              {/* Terms text with links */}
              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  I have read and understood the
                  <Text style={styles.link} onPress={handlePrivacyPolicy}>
                    Privacy Policy
                  </Text>
                  {' & '}
                  <Text style={styles.link} onPress={handleTermsOfUse}>
                    Term Of Use
                  </Text>
                </Text>
              </View>
            </View>
            
            <View style={styles.buttonContainer}>
              {/* Accept button */}
              <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
                <Text style={styles.acceptButtonText}>Accept</Text>
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
  acceptanceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: 'black'
  },
  acceptanceSubtitle: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  termsContainer: {
    padding: 1,
    marginTop:90
  },
  termsText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 20,
  },
  link: {
    color: '#FF5722',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  acceptButton: {
    backgroundColor: '#FF5722',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  copyright: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default HotelAcceptanceScreen;