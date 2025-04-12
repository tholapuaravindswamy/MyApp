import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import {
  Home,
  BarChart2,
  Users,
  MessageSquare,
  Video,
  HelpCircle,
  LogOut,
} from 'react-native-feather';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const {state, navigation} = props;
  const currentRoute = state.routes[state.index].name;

  const menuItems = [
    {
      name: 'Home',
      icon: (color: string) => <Home color={color} size={22} />,
      onPress: () => navigation.navigate('MainTabs'),
    },
    {
      name: 'Analytics',
      icon: (color: string) => <BarChart2 color={color} size={22} />,
      onPress: () => navigation.navigate('Analytics'),
    },
    {
      name: 'Profiles',
      icon: (color: string) => <Users color={color} size={22} />,
      onPress: () => navigation.navigate('UserProfile'),
    },
    {
      name: 'Guest Chat',
      icon: (color: string) => <MessageSquare color={color} size={22} />,
      onPress: () => navigation.navigate('Chat'),
    },
    {
      name: 'Tutorials',
      icon: (color: string) => <Video color={color} size={22} />,
      onPress: () => navigation.navigate('Tutorials'),
    },
    {
      name: 'Help',
      icon: (color: string) => <HelpCircle color={color} size={22} />,
      onPress: () => navigation.navigate('Help'),
    },
  ];

  const handleLogout = () => {
    // Implement your logout logic here
    setIsLoggedOut(!isLoggedOut);
    // navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.menuTextContainer}>
          <Text style={styles.bracketText}>[</Text>
          <Text style={styles.oText}>O</Text>
          <Text style={styles.bracketText}>]</Text>
          <Text style={styles.menuText}>Menu</Text>
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.outText}>Out</Text>
          <Switch
            value={isLoggedOut}
            onValueChange={handleLogout}
            trackColor={{false: '#3e3e3e', true: '#fff'}}
            thumbColor={isLoggedOut ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            style={styles.switch}
          />
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.menuItems}>
        {menuItems.map((item, index) => {
          const isActive =
            (item.name === 'Home' && currentRoute === 'MainTabs') ||
            item.name === currentRoute;

          return (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, isActive && styles.activeMenuItem]}
              onPress={item.onPress}>
              {item.icon(isActive ? '#fff' : '#fff')}
              <Text
                style={[
                  styles.menuItemText,
                  isActive && styles.activeMenuItemText,
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Logout Button */}
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <LogOut color="#fff" size={22} />
          <Text style={styles.menuItemText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  menuTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bracketText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '300',
  },
  oText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  outText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 4,
  },
  switch: {
    transform: [{scaleX: 0.7}, {scaleY: 0.7}],
  },
  menuItems: {
    flex: 1,
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 2,
  },
  activeMenuItem: {
    backgroundColor: '#4169E1',
    borderRadius: 10,
    marginHorizontal: 8,
  },
  menuItemText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
  },
  activeMenuItemText: {
    fontWeight: '500',
  },
});

export default CustomDrawer;
