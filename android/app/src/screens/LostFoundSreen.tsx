import { DrawerNavigationProp } from '@react-navigation/drawer';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import {
  Menu,
  Search,
  Bell,
  User,
  ChevronRight,
  Plus,
} from 'react-native-feather';
import { RootStackParamList } from '../../../../App';

type LostFoundScreenProps = {
  navigation: DrawerNavigationProp<RootStackParamList, 'LostFound'>;
};

const { width } = Dimensions.get('window');

const LostFoundScreen: React.FC<LostFoundScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Room');
  const [activeFilter, setActiveFilter] = useState('All');

  const filterCounts = {
    All: 27,
    Stored: 27,
    Auctioned: 27,
    Returned: 27,
    HandOver: 12,
  };

  const HandleProfile = () => navigation.navigate('UserProfile');
  const HandleSearch = () => navigation.navigate('LFSearch');
  const HandleNotification = () => navigation.navigate('Notifications');
  const HandleMenu = () => navigation.openDrawer();
  const HandleAdd = () => navigation.navigate('NewIconLF');

  const renderListItem = (index: number) => (
    <TouchableOpacity key={index} style={styles.listItem}>
      <View style={styles.listItemContent}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
        </View>
        <View style={styles.itemDetails}>
  <Text style={styles.categoryName}>Article Name</Text>
  <Text style={styles.locationName}>Location Name</Text>

  <Text style={styles.scheduleText}>
  <Text style={styles.labelText}>Found On:</Text>
  <Text style={{color: '#666'}}> 01-04-2025</Text>
  {'  |  '}
  <Text style={styles.labelText}>Count:</Text>
  <Text style={{color: '#666',}}> 03</Text>
</Text>
</View>

        <ChevronRight color="#FF5722" size={20} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={HandleMenu}>
            <Menu color="#fff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Lost & Found</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon} onPress={HandleSearch}>
            <Search color="#fff" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} onPress={HandleNotification}>
            <Bell color="#fff" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} onPress={HandleProfile}>
            <User color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {['Room', 'Public Area',].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filtersContainer}>
          {Object.keys(filterCounts).map(filter => (
            <TouchableOpacity
              key={filter}
              style={[styles.filter, activeFilter === filter && styles.activeFilter]}
              onPress={() => setActiveFilter(filter)}>
              <Text style={styles.filterText}>{filter}</Text>
              <View style={[styles.filterBadge, { backgroundColor: getBadgeColor(filter) }]}>
                <Text style={styles.filterBadgeText}>{filterCounts[filter]}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* List */}
      <FlatList
        data={Array.from({ length: 7 })}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ index }) => renderListItem(index)}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={HandleAdd}>
        <Plus color="#fff" size={24} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Helper function
const getBadgeColor = (status: string) => {
  switch (status) {
    case 'All':
      return '#fff';
    case 'Stored':
      return '#2196F3';
    case 'Auctioned':
      return '#9C27B0';
    case 'Returned':
      return 'yellow';
    case 'HandOver':
      return 'green';
    default:
      return '#ccc';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  activeTab: {
    backgroundColor: '#FF5722',
  },
  tabText: {
    color: '#000',
    fontSize: 14,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filtersContainer: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingHorizontal: 16,
    padddingTop: 12,
    
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    paddingBottom: 8,
  },
  activeFilter: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 4,
    lineHeight: 38,
  },
  filterBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 80,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top:10
  },
  listItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 40,
    marginBottom: 12,
    padding: 12,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  itemDetails: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  locationName: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },

  labelText: {
    fontWeight: 'bold',
    color: '#000',
  },
  
  scheduleText: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default LostFoundScreen;
