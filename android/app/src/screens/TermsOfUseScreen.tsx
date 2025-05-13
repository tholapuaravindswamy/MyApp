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
    marginLeft: 60
  },
  
});

export default TermsOfUseScreen;