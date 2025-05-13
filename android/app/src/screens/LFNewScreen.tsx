import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';


const LFNewScreen = ({ navigation }) => {

  const HandleLocation = () => {
    navigation.navigate('LFLocation')
  }

  const HandleFounded = () => {
    navigation.navigate('LFFounded')
  }
 
const HandleArticalCount = () => {
  navigation.navigate('LFArticalCount')
}
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
       <AntDesign name="back" size={26} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New</Text>
      </View>
      
      {/* Form Card */}
      <View style={styles.formCard}>
        {/* Schedule for later */}
        <TouchableOpacity style={styles.formItem}>
          <View style={styles.formItemLeft}>
            <Feather name="calendar" size={20} color="#000" style={styles.formItemIcon} />
            <Text style={styles.formItemText}>Found Date<Text style={styles.requiredStar}>*</Text></Text>
          </View>
          <Feather name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
        <View style={styles.divider} />
        
        {/* Task Type */}
        <TouchableOpacity style={styles.formItem}
          onPress={HandleLocation}>
          <View style={styles.formItemLeft}>
            <Text style={styles.formItemText}>Found Location<Text style={styles.requiredStar}>*</Text></Text>
          </View>
          <Feather name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
        <View style={styles.divider} />
        
        {/* Location */}
        <TouchableOpacity style={styles.formItem}
        onPress={HandleFounded}>
          <View style={styles.formItemLeft}>
            <Text style={styles.formItemText}>Found By<Text style={styles.requiredStar}>*</Text></Text>
          </View>
          <Feather name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
        <View style={styles.divider} />
        
        {/* Cart */}
        <TouchableOpacity style={styles.formItem}
        // onPress={HandleCart}
        >
          <View style={styles.formItemLeft}>
            <Text style={styles.formItemText}>Guest</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.formItem}
        onPress={HandleArticalCount}
        >
          <View style={styles.formItemLeft}>
            <Text style={styles.formItemText}>Artical Count<Text style={styles.requiredStar}>*</Text></Text>
          </View>
          <Feather name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      
      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
 
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  formItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  formItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formItemIcon: {
    marginRight: 12,
  },
  formItemText: {
    fontSize: 16,
    color: '#000',
  },
  requiredStar: {
    color: '#FF5722',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 16,
  },
  submitButton: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LFNewScreen;