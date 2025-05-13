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
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { height } = Dimensions.get('window');

const HotelResetPasswordScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleReset = () => {
    if (newPassword !== confirmPassword) {
      // Handle password mismatch
      return;
    }
    navigation.navigate('Acceptance');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <ScrollView 
          bounces={false} 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logo} />
            </View>
            <Text style={styles.title}>The Ultimate Hotel Operating System</Text>
            <Text style={styles.subtitle}>Effortlessly Powerful, Incredibly Simple.</Text>
          </View>
          
          {/* Content Section */}
          <View style={styles.content}>
            <View style={styles.contentInner}>
              <Text style={styles.resetTitle}>Reset</Text>
              <Text style={styles.resetSubtitle}>Please enter new password</Text>
              
              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>New Password</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={newPassword}
                      onChangeText={setNewPassword}
                      secureTextEntry={!showNewPassword}
                      placeholderTextColor="#999"
                    />
                    <TouchableOpacity 
                      onPress={() => setShowNewPassword(!showNewPassword)} 
                      style={styles.iconButton}
                    >
                      <MaterialCommunityIcons
                        name={showNewPassword ? "eye-off" : "eye"}
                        size={24}
                        color="gray"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Re-enter New Password</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      placeholderTextColor="#999"
                    />
                    <TouchableOpacity 
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)} 
                      style={styles.iconButton}
                    >
                      <MaterialCommunityIcons
                        name={showConfirmPassword ? "eye-off" : "eye"}
                        size={24}
                        color="gray"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.resetButton} 
                  onPress={handleReset}
                >
                  <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <Text style={styles.copyright}>© 2025 NeoTeknos Hospitality. All rights reserved.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  keyboardContainer: {
    flex: 1,
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
    color: '#FF5722',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
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
  resetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: 'black'
  },
  resetSubtitle: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 20,
  },
  inputGroup: {
    marginTop: 25,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: 'black',
    paddingVertical: 8,
  },
  iconButton: {
    padding: 8,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#FF5722',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: {
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

export default HotelResetPasswordScreen;