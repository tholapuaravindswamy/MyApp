import type React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AnimatedModal from './AnimatedModal';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface MatchedGuest {
  id: string;
  salutation: string;
  firstName: string;
  lastName: string;
  telephone: string;
  email: string;
  membershipNumber: string;
  membershipType: string;
  membershipLevel: string;
  address: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  dateOfBirth?: string;
  anniversary?: string;
}

interface MatchDetectedModalProps {
  visible: boolean;
  onClose: () => void;
  matches: MatchedGuest[];
  onSelect: (guest: MatchedGuest) => void;
}

const MatchDetectedModal: React.FC<MatchDetectedModalProps> = ({
  visible,
  onClose,
  matches,
  onSelect,
}) => {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);

  const handleSelect = () => {
    const selected = matches.find(match => match.id === selectedMatch);
    if (selected) {
      onSelect(selected);
      onClose();
    }
  };

  return (
    <AnimatedModal
      visible={visible}
      onClose={onClose}
      adaptiveHeight={false}
      minHeight="70%">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.leftSection}>
            <TouchableOpacity style={styles.backButton} onPress={onClose}>
              <AntDesign name="back" size={26} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Match Detected</Text>
          </View>
          <TouchableOpacity style={styles.skipButton} onPress={onClose}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Matches List */}
        <ScrollView
          style={styles.matchesContainer}
          showsVerticalScrollIndicator={false}>
          {matches.map(match => (
            <TouchableOpacity
              key={match.id}
              style={styles.matchItem}
              onPress={() => setSelectedMatch(match.id)}
              activeOpacity={0.7}>
              {/* Selection Circle */}
              {selectedMatch === match.id ? (
                <View style={styles.selectedCircle}>
                  <Feather name="check" size={16} color="#fff" />
                </View>
              ) : (
                <View style={styles.circle} />
              )}

              {/* Match Details */}
              <View style={styles.matchDetails}>
                <Text style={styles.nameText}>
                  {match.salutation} {match.firstName} {match.lastName}
                </Text>
                <Text style={styles.detailText}>
                  Telephone: <Text style={styles.detailValue}>{match.telephone}</Text>
                </Text>
                <Text style={styles.detailText}>
                  Email: <Text style={styles.detailValue}>{match.email}</Text>
                </Text>
                <Text style={styles.detailText}>
                  Membership Number:{' '}
                  <Text style={styles.detailValue}>{match.membershipNumber}</Text>
                </Text>
                <Text style={styles.detailText}>
                  Address: <Text style={styles.detailValue}>{match.address}</Text>
                </Text>
                <Text style={styles.detailText}>
                  ZIP/PIN: <Text style={styles.detailValue}>{match.zipCode}</Text>
                </Text>
                <Text style={styles.detailText}>
                  City: <Text style={styles.detailValue}>{match.city}</Text>
                </Text>
                <Text style={styles.detailText}>
                  State: <Text style={styles.detailValue}>{match.state}</Text>
                </Text>
                <Text style={styles.detailText}>
                  Country: <Text style={styles.detailValue}>{match.country}</Text>
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Select Button */}
        <TouchableOpacity
          style={[styles.selectButton, !selectedMatch && styles.disabledButton]}
          onPress={handleSelect}
          disabled={!selectedMatch}>
          <Text style={styles.selectButtonText}>Select</Text>
        </TouchableOpacity>
      </View>
    </AnimatedModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
    marginBottom: 10,
  },
  backButton: {
    marginRight: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  skipButton: {
    padding: 4,
  },
  skipText: {
    fontSize: 14,
    color: '#FF5722',
    fontWeight: '500',
  },
  matchesContainer: {
    flex: 1,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  matchItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#101827',
  },
  selectedCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#101827',
    marginRight: 12,
    marginTop: 2,
  },
  matchDetails: {
    flex: 1,
  },
  nameText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 3,
    flexDirection: 'row',
  },
  detailValue: {
    color: '#666',
  },
  selectButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 10,
    bottom: 8,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  disabledButton: {
    backgroundColor: '#ffccbc',
  },
});

export default MatchDetectedModal;
