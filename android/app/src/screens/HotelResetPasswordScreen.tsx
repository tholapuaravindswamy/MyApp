import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

type ResetPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ResetPassword'>;

type Props = {
  navigation: ResetPasswordScreenNavigationProp;
};

const HotelResetPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleReset = (): void => {
    if (newPassword !== confirmPassword) {
      // Handle password mismatch
      return;
    }
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.topSection}>
        <View style={styles.logoContainer}>
          <View style={styles.logo} />
        </View>
        
        <Text style={styles.title}>The Ultimate Hotel Operating System</Text>
        <Text style={styles.subtitle}>Effortlessly Powerful, Incredibly Simple.</Text>
      </View>
      
      <View style={styles.bottomSection}>
        <Text style={styles.resetTitle}>Reset</Text>
        <Text style={styles.resetSubtitle}>Please enter new password</Text>
        
        {/* <Text style={styles.errorText}>
          Your login is temporarily suspended due to multiple incorrect login attempts. {'\n'}
          Please contact the admin for assistance.
        </Text> */}
        
        <Text style={styles.inputLabel}>New Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword}
          />
          <TouchableOpacity 
            onPress={() => setShowNewPassword(!showNewPassword)} 
            style={styles.icon}>
            <MaterialCommunityIcons
              name={showNewPassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.inputLabel}>Re-enter New Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity 
            onPress={() => setShowConfirmPassword(!showConfirmPassword)} 
            style={styles.icon2}>
            <MaterialCommunityIcons
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.resetButton} 
        onPress={() => navigation.navigate('Acceptance')}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
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
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    backgroundColor: '#ccc',
    borderRadius: 12,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    color: '#FF5C00',
    fontSize: 15,
    textAlign: 'center',
  },
  bottomSection: {
    flex: 0.6,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  resetTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
  },
  resetSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  inputContainer: {
    width: '100%',
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    fontSize: 16,
    padding: 8,
    color: 'black',
    bottom:8
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
  icon2: {
    position: 'absolute',
    right: 10,
  },
  resetButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#FF5C00',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 95,
    position:'relative'
  },
});

export default HotelResetPasswordScreen;
