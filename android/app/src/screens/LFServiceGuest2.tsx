import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';



const LFSearchGuest2Screen = ({ navigation }) => {
  const [selectedGuest, setSelectedGuest] = useState(null);
  
  const guests = [
    {
      id: '1',
      name: 'Mr. Rajesh',
      phone: '+91 99123 99 123',
      email: 'oraganization@gmail.com',
      address: 'Hyderabad',
      membership: 'ABCD1234567890',
      dob: '01-01-2000',
      profileId: 'ABCD127564367890',
      arId: 'ABCD17755890808',
    },
    {
      id: '2',
      name: 'Mr. Anirudh Sastri Jonnalagadda',
      phone: '+91 6868 797 798',
      email: 'anirudh@gmail.com',
      address: 'Eluru',
      membership: 'ABCD1234567890',
      dob: '01-01-2000',
      profileId: 'ABCD1234567890',
      arId: 'ABCD1234567890',
    },
  ];

  // const handleSelect = () => {
  //   // Handle selection logic
  //   if (selectedGuest) {
  //     console.log('Selected guest:', selectedGuest);
  //     // Navigate or perform action with selected guest
  //   }
  // };
const handleNEwIcon = () => {
  navigation.navigate('LFNewGuest')
}
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
                  <AntDesign name="back" size={26} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Guest</Text>
        <TouchableOpacity style={styles.newButton}
        onPress={handleNEwIcon}>
          <Text style={styles.newButtonText}>
            <Feather name="plus" size={16} color="#000" /> New
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Guest List */}
      <ScrollView style={styles.guestList}>
  {guests.map((guest, index) => (
    <View key={guest.id} style={{ marginBottom: 16 }}>
      {/* Guest Card */}
      <View style={styles.guestCard}>
        <View style={styles.guestCardContent}>
          {/* Top Section */}
          <View style={styles.guestTopSection}>
            <View style={styles.profileSection}>
              <Image
                source={require('../../../../src/assets/images/profile-placeholder.png')}
                style={styles.profileImage}
                defaultSource={require('../../../../src/assets/images/profile-placeholder.png')}
              />
              <View style={styles.guestInfo}>
                <Text style={styles.guestName}>{guest.name}</Text>

                <View style={styles.contactItem}>
                  <Feather name="phone" size={16} color="#000" style={styles.contactIcon} />
                  <Text style={styles.contactLabel}>Phone:</Text>
                  <Text style={styles.contactValue}>{guest.phone}</Text>
                </View>

                <View style={styles.contactItem}>
                  <Feather name="mail" size={16} color="#000" style={styles.contactIcon} />
                  <Text style={styles.contactLabel}>Email:</Text>
                  <Text style={styles.contactValue}>{guest.email}</Text>
                </View>

                <View style={styles.contactItem}>
                  <Feather name="map-pin" size={16} color="#000" style={styles.contactIcon} />
                  <Text style={styles.contactLabel}>Address:</Text>
                  <Text style={styles.contactValue}>{guest.address}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.selectCircle}
              onPress={() => setSelectedGuest(guest.id)}
            >
              {selectedGuest === guest.id && <View style={styles.selectedDot} />}
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Bottom Section */}
          <View style={styles.guestBottomSection}>
            <View style={styles.idSection}>
              <View style={styles.idItem}>
                <Text style={styles.idLabel}>Membership</Text>
                <Text style={styles.idValue}>{guest.membership}</Text>
              </View>

              <View style={styles.idItem}>
                <Text style={styles.idLabel}>Date Of Birth</Text>
                <Text style={styles.idValue}>{guest.dob}</Text>
              </View>
            </View>

            <View style={styles.idSection}>
              <View style={styles.idItem}>
                <Text style={styles.idLabel}>Profile ID</Text>
                <Text style={styles.idValue}>{guest.profileId}</Text>
              </View>

              <View style={styles.idItem}>
                <Text style={styles.idLabel}>AR ID</Text>
                <Text style={styles.idValue}>{guest.arId}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Select Button Outside Card (for the second guest) */}
      {index === 1 && (
        <TouchableOpacity
          style={styles.selectButtonOutside}
          // onPress={handleSelect}
        >
          <Text style={styles.selectButtonText}>Select</Text>
        </TouchableOpacity>
      )}
    </View>
  ))}
</ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginRight:90
  },
  newButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  newButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  guestList: {
    flex: 1,
    padding: 16,
  },
  guestCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  guestCardContent: {
    padding: 16,
  },
  guestTopSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileSection: {
    flexDirection: 'row',
    flex: 1,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: '#ccc',
    padding:10
  },
  guestInfo: {
    marginLeft: 12,
    flex: 1,
  },
  guestName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#000',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactIcon: {
    marginRight: 4,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
    color: '#000',
  },
  contactValue: {
    fontSize: 14,
    color: '#000',
  },
  selectCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  selectedDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  guestBottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  idSection: {
    flex: 1,
  },
  idItem: {
    marginBottom: 8,
  },
  idLabel: {
    fontSize: 14,
    color: '#000',
    marginBottom: 2,
  },
  idValue: {
    fontSize: 14,
    color: '#000',
  },

  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  selectButtonOutside: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    top:10
  },
});

export default LFSearchGuest2Screen;