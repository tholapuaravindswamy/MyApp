import 'react-native-gesture-handler'; // This is necessary for gesture handling
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer'; // Drawer Navigator
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; // Bottom Tab Navigator
import {
  Home,
  MessageSquare,
  Bell,
  Menu as MenuIcon,
  MessageCircle,
  Layers,
} from 'react-native-feather';

// Import your screens
import HotelLoginScreen from './android/app/src/screens/HotelLoginScreen';
import HotelVerifyScreen from './android/app/src/screens/HotelVerifyScreen';
import HotelResetPasswordScreen from './android/app/src/screens/HotelResetPasswordScreen';
import HotelAcceptanceScreen from './android/app/src/screens/HotelAcceptanceScreen';
import PrivacyPolicyScreen from './android/app/src/screens/PrivacyPolicyScreen';
import TermsOfUseScreen from './android/app/src/screens/TermsOfUseScreen';
import LocationScreen from './android/app/src/screens/LocationScreen';
import ModuleScreen from './android/app/src/screens/ModuleScreen';
import AssetsScreen from './android/app/src/screens/AssetsScreen';
import BookingsScreen from './android/app/src/screens/BookingsScreen';
import ChatDetailScreen from './android/app/src/screens/ChatDetailScreen';
import InventoryScreen from './android/app/src/screens/InventoryScreen';
import UserProfileScreen from './android/app/src/screens/UserProfileScreen';
import SearchScreen from './android/app/src/screens/SearchScreen';
import NotificationScreen from './android/app/src/screens/NotificationsScreen';
import CustomDrawer from './android/app/src/components/customDrawer';
import AnalyticsScreen from './android/app/src/screens/AnalyticsScreen';
import NewScreen from './android/app/src/screens/NewTaskScreen';
import TaskScreen from './android/app/src/screens/AddTaskScreen';
import TaskDetailsScreen from './android/app/src/screens/TaskDetailsScreen';
import AttachmentScreen from './android/app/src/screens/AttachmentScreen';
import AssignedToScreen from './android/app/src/screens/AssignedScreen';
import AddTaskScreen from './android/app/src/screens/AddTaskScreen';
import LostFoundScreen from './android/app/src/screens/LostFoundSreen';
import SettingsScreen from './android/app/src/screens/SettingsScreen';
import LFSearchScreen from './android/app/src/screens/L&FSearchScreen';
import NewLostFoundScreen from './android/app/src/screens/LFNewScreen';
import LFNewScreen from './android/app/src/screens/LFNewScreen';
import LFArtical01Screen from './android/app/src/screens/LFArtical01Screen';
import LFAttachmentScreen from './android/app/src/screens/LFAttachmentScreen';
import LFSearchGuestScreen from './android/app/src/screens/LFSearchGuest';
import LFSearchGuest2Screen from './android/app/src/screens/LFServiceGuest2';

// Define types for navigation
export type RootStackParamList = {
  Login: undefined;
  Verify: undefined;
  ResetPassword: undefined;
  Acceptance: undefined;
  PrivacyPolicy: undefined;
  TermsOfUse: undefined;
  LocationAccessScreen: undefined;
  ModuleScreen: undefined;
  Assets: undefined;
  Bookings: undefined;
  ChatDetail: undefined;
  Inventory: undefined;
  UserProfile: undefined;
  Search: undefined;
  Notifications: undefined;
  Home: undefined;
  Chat: undefined;
  Modules: undefined;
  MainTabs: undefined;
  Analytics: undefined;
  Tutorials: undefined;
  Help: undefined;
  NewScreen: undefined;
  AddTaskScreen: undefined;
  TaskDetailsScreen: undefined;
  Attachments: undefined;
  Assigned: undefined;
  LostFound: undefined;
  LFSearch: undefined;
  NewIconLF: undefined;
  LFArtical: undefined;
  LFGuestSearch: undefined;
  LFGuestSearch2: undefined;
};

// Create Drawer Navigator
const Drawer = createDrawerNavigator();

// Create Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({color, size}) => {
        if (route.name === 'Home') {
          return <Home color={color} size={24} />;
        } else if (route.name === 'Chat') {
          return <MessageSquare color={color} size={24} />;
        } else if (route.name === 'Notifications') {
          return <Bell color={color} size={24} />;
        } else if (route.name === 'Modules') {
          return <MenuIcon color={color} size={24} />;
        }
        return null;
      },
      tabBarActiveTintColor: '#ffffff',
      tabBarInactiveTintColor: '#888888',
      tabBarStyle: {
        backgroundColor: '#000000',
        height: 60,
        borderTopWidth: 0,
        paddingTop: 5,
        paddingBottom: 5,
        width: '98%',
        borderRadius: 19,
        margin: 4,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        marginTop: 2,
      },
      headerShown: false,
    })}>
    <Tab.Screen name="Home" component={AssetsScreen} />
    <Tab.Screen name="Chat" component={ChatDetailScreen} />
    <Tab.Screen name="Notifications" component={NotificationScreen} />
    <Tab.Screen name="Modules" component={ModuleScreen} />
  </Tab.Navigator>
);

// Create Drawer Navigator with custom drawer content
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#121212',
          width: 280,
        },
      }}>
      <Drawer.Screen name="MainTabs" component={BottomTabNavigator} />
      <Drawer.Screen name="Analytics" component={AnalyticsScreen} />
      <Drawer.Screen name="UserProfile" component={UserProfileScreen} />
      <Drawer.Screen name="Chat" component={ChatDetailScreen} />
      <Drawer.Screen name="Tutorials" component={AssetsScreen} />
      <Drawer.Screen name="Help" component={AssetsScreen} />
      <Drawer.Screen name="Bookings" component={BookingsScreen} />
    </Drawer.Navigator>
  );
};
const LostFoundTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        if (route.name === 'Home') {
          return <Home color={color} size={24} />;
        } else if (route.name === 'Chat') {
          return <MessageCircle color={color} size={24} />;
        }
        else if (route.name === 'Notifications') {
          return <Bell color={color} size={24} />;
        }
        else if (route.name === 'Modules') {
          return <Layers color={color} size={24} />;
        }
        return null;
      },
      tabBarActiveTintColor: '#ffffff',
      tabBarInactiveTintColor: '#888888',
      tabBarStyle: {
        backgroundColor: '#000000',
        height: 60,
        borderTopWidth: 0,
        paddingTop: 5,
        paddingBottom: 5,
        width: '98%',
        borderRadius: 19,
        margin: 4,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        marginTop: 2,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={LostFoundScreen} />
    <Tab.Screen name="Chat" component={BookingsScreen} />
    <Tab.Screen name="Notifications" component={NotificationScreen} />
    <Tab.Screen name="Modules" component={TaskDetailsScreen} />
  </Tab.Navigator>
);

const LostFoundDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="LostFoundMain" component={LostFoundTabs} />
    </Drawer.Navigator>
  );
};


// Main Stack Navigator that holds your authentication flow
const MainStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#000'},
    }}>
    <Stack.Screen name="Login" component={HotelLoginScreen} />
    <Stack.Screen name="Verify" component={HotelVerifyScreen} />
    <Stack.Screen name="ResetPassword" component={HotelResetPasswordScreen} />
    <Stack.Screen name="Acceptance" component={HotelAcceptanceScreen} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} />
    <Stack.Screen name="LocationAccessScreen" component={LocationScreen} />
    <Stack.Screen name="ModuleScreen" component={ModuleScreen} />
    <Stack.Screen name="Bookings" component={BookingsScreen} />
    <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
    <Stack.Screen name="Inventory" component={InventoryScreen} />
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen name="Notifications" component={NotificationScreen} />
    <Stack.Screen name="Assets" component={DrawerNavigator} />
    <Stack.Screen name="NewScreen" component={NewScreen} />
    <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
    <Stack.Screen name="TaskDetailsScreen" component={TaskDetailsScreen} />
    <Stack.Screen name="Attachments" component={AttachmentScreen} />
    <Stack.Screen name="Assigned" component={AssignedToScreen} />
    <Stack.Screen name="LostFound" component={LostFoundDrawer} />
    <Stack.Screen name="LFSearch" component={LFSearchScreen} />
    <Stack.Screen name="NewIconLF" component={LFNewScreen} />
    <Stack.Screen name="LFArtical" component={LFArtical01Screen} />
    <Stack.Screen name="LFGuestSearch" component={LFSearchGuestScreen} />
    <Stack.Screen name="LFGuestSearch2" component={LFSearchGuest2Screen} />
  </Stack.Navigator>
);

export default function App(): React.ReactElement {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}
