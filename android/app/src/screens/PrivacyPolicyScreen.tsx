import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Define the navigation type
type PrivacyPolicyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PrivacyPolicy'>;

const PrivacyPolicyScreen: React.FC = () => {
  const navigation = useNavigation<PrivacyPolicyScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
    
      
      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.privacyTitle}>Privacy Policy</Text>
        <TouchableOpacity 
        onPress={() => {
         navigation.goBack();
        }} 
       style={styles.backButton}>
  <AntDesign name="back" size={26} style={{ marginLeft: 10, color: "black" }} />
</TouchableOpacity>
       
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
 
  bottomSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 25,
    top:15
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15,
    marginLeft:35
  },
 
});

export default PrivacyPolicyScreen;