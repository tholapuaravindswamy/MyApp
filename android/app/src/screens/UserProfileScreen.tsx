import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  Pressable,
} from 'react-native';
import { ArrowLeft, User, Edit, Eye, EyeOff, Camera } from 'react-native-feather'; // You may need to install this package
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RootStackParamList } from '../../../../App';
import { StackNavigationProp } from '@react-navigation/stack';

type UserProfileScreen = StackNavigationProp<RootStackParamList, 'UserProfile'>;

type Props = {
  navigation: UserProfileScreen;
};
const UserProfileScreen: React.FC<Props> = ({ navigation }) => {
    
  // Mock user data
  const userData = {
    name: 'Anirudh Jonnalagadda',
    employeeId: 'Employee ID',
    userId: 'ABCD1234',
  };

  // State for change password modal
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleChangePassword = () => {
    setChangePasswordVisible(true);
  };

  const handleCloseModal = () => {
    setChangePasswordVisible(false);
    // Reset form
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmitChangePassword = () => {
    // Implement password change logic here
    // Validate passwords, check if old password is correct, etc.
    
    // For demo purposes, just close the modal
    handleCloseModal();
    
    // In a real app, you would call an API to change the password
    // and show success/error messages
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
       <TouchableOpacity 
              onPress={() => {
               navigation.goBack();
              }} 
             style={styles.backButton}>
        <AntDesign name="back" size={26} style={{color: "white" }} />
      </TouchableOpacity>
        <Text style={styles.headerTitle}>User Profile</Text>
      </View>
      
      {/* Profile Content */}
      <View style={styles.content}>
        {/* Profile Picture and Name Section */}
        <View style={styles.profileSection}>
           
        <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.employeeIdLabel}>{userData.employeeId}</Text>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <User stroke="#000" width={55} height={55} />
            </View>
            <TouchableOpacity style={styles.editIconContainer}>
              <Camera stroke="#000" width={14} height={16} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Form Section */}
        <View style={styles.formSection}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>User ID*</Text>
            <TextInput
              style={styles.input}
              value={userData.userId}
              editable={false}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password*</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value="••••••••"
                secureTextEntry
                editable={false}
              />
              <TouchableOpacity onPress={handleChangePassword}>
                <Text style={styles.changePasswordText}>Change Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Change Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={changePasswordVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
            <TouchableOpacity 
              onPress={handleCloseModal}
             style={styles.backButton}>
        <AntDesign name="back" size={26} style={{color: "black" }} />
      </TouchableOpacity>
              <Text style={styles.modalTitle}>Change Password</Text>
            </View>

            <View style={styles.modalBody}>
              {/* Old Password Input */}
              <View style={styles.modalInputContainer}>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter Old Password"
                  placeholderTextColor={"#999"}
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  secureTextEntry={!showOldPassword}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon} 
                  onPress={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? (
                    <EyeOff stroke="#999" width={20} height={20} />
                  ) : (
                    <Eye stroke="#999" width={20} height={20} />
                  )}
                </TouchableOpacity>
              </View>

              {/* New Password Input */}
              <View style={styles.modalInputContainer}>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter New Password"
                  placeholderTextColor={"#999"}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={!showNewPassword}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon} 
                  onPress={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff stroke="#999" width={20} height={20} />
                  ) : (
                    <Eye stroke="#999" width={20} height={20} />
                  )}
                </TouchableOpacity>
              </View>

              {/* Confirm New Password Input */}
              <View style={styles.modalInputContainer}>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Re-Enter New Password"
                  placeholderTextColor={"#999"}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon} 
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff stroke="#999" width={20} height={20} />
                  ) : (
                    <Eye stroke="#999" width={20} height={20} />
                  )}
                </TouchableOpacity>
              </View>

              {/* Change Button */}
              <TouchableOpacity 
                style={styles.changeButton}
                onPress={handleSubmitChangePassword}
              >
                <Text style={styles.changeButtonText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    bottom:75
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 65,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    alignSelf:'center',
    marginRight:30,
    color:'black'

  },
  employeeIdLabel: {
    fontSize: 13,
    color: '#666',
    alignSelf:'center',
    marginLeft:55

  },
  formSection: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color:'black'
  },
  passwordContainer: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color:'black'
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    color:'black'
  },
  changePasswordText: {
    color: '#FF5722',
    fontWeight: '500',
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    color:'black'
  },
  modalBody: {
    width: '100%',
  },
  modalInputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
  },
  modalInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: 'black',
  },
  eyeIcon: {
    padding: 5,
  },
  changeButton: {
    backgroundColor: '#FF5722',
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  changeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;