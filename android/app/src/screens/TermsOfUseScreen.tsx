import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Define the navigation type
type TermsOfUseScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TermsOfUse'>;

const TermsOfUseScreen: React.FC = () => {
  const navigation = useNavigation<TermsOfUseScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.logoContainer}>
          <View style={styles.logo} />
        </View>
        <Text style={styles.title}>The Ultimate Hotel Operating System</Text>
        <Text style={styles.subtitle}>
          <Text style={styles.orangeText}>Effortlessly Powerful, Incredibly Simple.</Text>
        </Text>
        </View>
      
      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.privacyTitle}>Terms Of Use</Text>
          <TouchableOpacity 
                onPress={() => {
                 navigation.goBack();
                }} 
               style={styles.backButton}>
          <AntDesign name="back" size={26} style={{ marginLeft: 10, color: "black" }} />
        </TouchableOpacity>
        <Text style={styles.footerText}>
        © 2025 NeoTeknos Hospitality. All rights reserved.
      </Text>
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
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  backArrow: {
    fontSize: 22,
    color: '#000',
  },
  privacyTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    marginTop: 'auto',
    textAlign: 'center',
    paddingBottom: 10,
  },
});

export default TermsOfUseScreen;