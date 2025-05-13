import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import {
  Home,
  AlertTriangle,
  Users,
  MessageSquare,
  Video,
  Menu,
  Power,
} from 'react-native-feather';
import {
  DrawerContentComponentProps,
  useDrawerStatus,
} from '@react-navigation/drawer';
import {useFocusEffect} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const {state, navigation, descriptors} = props;
  const isDrawerOpen = useDrawerStatus() === 'open';

  // Get the current active route name
  const getActiveRouteName = state => {
    const route = state.routes[state.index];

    // If the route has nested navigator, recursively get the active route
    if (route.state) {
      return getActiveRouteName(route.state);
    }

    return route.name;
  };

  // Get the parent route name for nested navigators
  const getParentRouteName = () => {
    const currentRouteName = getActiveRouteName(state);

    // Handle nested routes
    const mainRoute = state.routes[state.index];

    if (currentRouteName?.includes('IncidentLog')) {
      return 'IncidentLog';
    }

    if (currentRouteName?.includes('LostFound')) {
      return 'LostFound';
    }

    if (currentRouteName?.includes('TaskManager')) {
      return 'TaskManager';
    }

    if (
      ['Home', 'Chat', 'Notifications', 'Modules'].includes(currentRouteName)
    ) {
      return 'MainTabs';
    }

    return currentRouteName;
  };

  const activeRouteName = getParentRouteName();

  useFocusEffect(
    useCallback(() => {
      if (isDrawerOpen) {
        setIsLoggedOut(true);
      }
    }, [isDrawerOpen]),
  );

  useEffect(() => {
    if (isDrawerOpen) {
      setIsLoggedOut(true); // Automatically turn ON the switch when drawer opens
    }
  }, [isDrawerOpen]);

  // Safe navigation function that tries different methods
  const safeNavigate = (screenName, nestedScreen = null) => {
    try {
      // First try the simple navigate approach
      if (nestedScreen) {
        // For Guest Service with MainTabs
        navigation.navigate(screenName, {screen: nestedScreen});
      } else {
        // For other screens
        navigation.navigate(screenName);
      }

      // Close the drawer after navigation
      setTimeout(() => {
        navigation.closeDrawer();
      }, 100);
    } catch (error) {
      console.error('Navigation error:', error);
      // If simple navigation fails, try CommonActions as fallback
      try {
        if (nestedScreen) {
          // For Guest Service with MainTabs
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: screenName,
                  state: {
                    routes: [{name: nestedScreen}],
                  },
                },
              ],
            }),
          );
        } else {
          // For other screens
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: screenName}],
            }),
          );
        }

        // Close the drawer after navigation
        setTimeout(() => {
          navigation.closeDrawer();
        }, 100);
      } catch (fallbackError) {
        console.error('Fallback navigation error:', fallbackError);
        Alert.alert(
          'Navigation Error',
          'Could not navigate to the selected screen.',
        );
      }
    }
  };

  const menuItems = [
    {
      name: 'Guest Service',
      route: 'MainTabs',
      icon: (color: string) => <Home color={color} size={22} />,
      onPress: () => {
        // Try to navigate to GuestService with MainTabs
        safeNavigate('GuestService', 'MainTabs');
      },
    },
    {
      name: 'Incident Log',
      route: 'IncidentLog',
      icon: (color: string) => <AlertTriangle color={color} size={25} />,
      onPress: () => {
        safeNavigate('IncidentLog');
      },
    },
    {
      name: 'Lost & Found',
      route: 'LostFound',
      icon: (color: string) => <Users color={color} size={22} />,
      onPress: () => {
        safeNavigate('LostFound');
      },
    },
    {
      name: 'Task Manager',
      route: 'TaskManager',
      icon: (color: string) => <MessageSquare color={color} size={22} />,
      onPress: () => {
        safeNavigate('TaskManager');
      },
    },
  ];

  const handleLogout = (value: boolean) => {
    setIsLoggedOut(value);
    navigation.navigate('Login');
    if (!value) {
      props.navigation.closeDrawer();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.menuTextContainer}>
          <Menu color="#fff" size={22} />
          <Text style={styles.menuText}>Menu</Text>
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.outText}>{isLoggedOut ? 'On' : 'Out'}</Text>
          <Switch
            value={isLoggedOut}
            onValueChange={value => {
              setIsLoggedOut(value);
              // if (!value) {
              //   navigation.closeDrawer();
              // }
            }}
            trackColor={{false: '#3e3e3e', true: '#fff'}}
            thumbColor={isLoggedOut ? 'green' : 'red'}
            ios_backgroundColor="#3e3e3e"
            style={styles.switch}
          />
        </View>
      </View>

      {/* Main content container with flex layout */}
      <View style={styles.contentContainer}>
        {/* Menu Items */}
        <View style={styles.mainMenuContainer}>
          {menuItems.map((item, index) => {
            const isActive = item.route === activeRouteName;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.menuItem, isActive && styles.activeMenuItem]}
                onPress={item.onPress}>
                {item.icon(isActive ? '#000' : '#fff')}
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
        </View>

        {/* Bottom Menu - Always at the bottom */}
        <View style={styles.bottomMenu}>
          {/* Tutorials */}
          <TouchableOpacity
            style={[
              styles.menuItem,
              activeRouteName === 'Tutorials' && styles.activeMenuItem,
            ]}
            onPress={() => {
              // navigation.navigate('Tutorials');
              navigation.closeDrawer();
            }}>
            <Video
              color={activeRouteName === 'Tutorials' ? '#000' : '#fff'}
              size={22}
            />
            <Text
              style={[
                styles.menuItemText,
                activeRouteName === 'Tutorials' && styles.activeMenuItemText,
              ]}>
              Tutorials
            </Text>
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleLogout(false)}>
            <Power color="#fff" size={22} />
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between', // This pushes the bottom menu to the bottom
  },
  mainMenuContainer: {
    paddingTop: 8,
  },
  bottomMenu: {
    marginBottom: 20, // Add some margin at the bottom
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginRight: 20,
    marginLeft: 20,
  },
  menuTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    right: 10,
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
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
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
    backgroundColor: '#fff',
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
    color: '#000',
  },
});

export default CustomDrawer;
