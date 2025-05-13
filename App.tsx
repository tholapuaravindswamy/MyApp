import 'react-native-gesture-handler'; // This is necessary for gesture handling
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer'; // Drawer Navigator
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; // Bottom Tab Navigator
import {Home, MessageSquare, Bell, Menu as MenuIcon, MessageCircle, Layers,} from 'react-native-feather';

// Import your screens
import HotelLoginScreen from './android/app/src/screens/HotelLoginScreen';
import HotelVerifyScreen from './android/app/src/screens/HotelVerifyScreen';
import HotelResetPasswordScreen from './android/app/src/screens/HotelResetPasswordScreen';
import HotelAcceptanceScreen from './android/app/src/screens/HotelAcceptanceScreen';
import PrivacyPolicyScreen from './android/app/src/screens/PrivacyPolicyScreen';
import TermsOfUseScreen from './android/app/src/screens/TermsOfUseScreen';
import LocationScreen from './android/app/src/screens/LocationScreen';
import ModuleScreen from './android/app/src/screens/ModuleScreen';
import GuestService from './android/app/src/screens/GuestServiceScreen';
import BookingsScreen from './android/app/src/screens/BookingsScreen';
import ChatDetailScreen from './android/app/src/screens/ChatDetailScreen';
import InventoryScreen from './android/app/src/screens/InventoryScreen';
import UserProfileScreen from './android/app/src/screens/UserProfileScreen';
import SearchScreen from './android/app/src/screens/SearchScreen';
import NotificationScreen from './android/app/src/screens/NotificationsScreen';
import CustomDrawer from './android/app/src/components/customDrawer';
import NewScreen from './android/app/src/screens/NewTaskScreen';
import TaskDetailsScreen from './android/app/src/screens/TaskDetailsScreen';
import AttachmentScreen from './android/app/src/screens/AttachmentScreen';
import AssignedToScreen from './android/app/src/screens/AssignedScreen';
import AddTaskScreen from './android/app/src/screens/AddTaskScreen';
import LostFoundScreen from './android/app/src/screens/LostFoundSreen';
import LFSearchScreen from './android/app/src/screens/L&FSearchScreen';
import LFNewScreen from './android/app/src/screens/LFNewScreen';
import LFArtical01Screen from './android/app/src/screens/LFArtical01Screen';
import LFSearchGuestScreen from './android/app/src/screens/LFSearchGuest';
import LFSearchGuest2Screen from './android/app/src/screens/LFServiceGuest2';
import LFNewGuestScreen from './android/app/src/screens/LFNewGuestScreen';
import LFMembershipScreen from './android/app/src/screens/LFMemberShipScreen';
import TaskType from './android/app/src/screens/TaskType';
import GuestLocationScreen from './android/app/src/screens/GuestLocation';
import LFLocationScreen from './android/app/src/screens/LFLocation';
import LFFoundedByScreen from './android/app/src/screens/LFFoundedLocation';
import LFArticleCountScreen from './android/app/src/screens/LFArticalCount';
import LFCategorySelectionScreen from './android/app/src/screens/LFCategorySelection';
import LFStorageLocationScreen from './android/app/src/screens/LFStorageLocation';
import LFStatusScreen from './android/app/src/screens/LFStatusScreen';
import LFAttachment from './android/app/src/screens/LFAttachment';
import GuestChatScreen from './android/app/src/screens/GuestChatScree';
import PrimaryDetailsScreen from './android/app/src/screens/GuestPrimaryScreen';
import EmployeeSelectionScreen from './android/app/src/screens/GuestEmployeesScreen';
import ChecklistScreen from './android/app/src/screens/GuestCheckList';
import IncidentLogScreen from './android/app/src/screens/IncidentLogScreen';
import IncidentNewScreen from './android/app/src/screens/IncidentNewScreen';
import IncidentDepartment from './android/app/src/screens/IncidentDepartment';
import IncidentDescription from './android/app/src/screens/IncidentDescription';
import IncidentAttachment from './android/app/src/screens/IncidentAttachment';
import IncidentDetailsScreen from './android/app/src/screens/IncidentDetailsScreen';
import InvestigationDetailsEdit from './android/app/src/screens/InvestigationDetailsEdit';
import IncidentPrimaryDetailsEdit from './android/app/src/screens/IncidentPrimaryDetailsEdit';
import IncidentResolutionEdit from './android/app/src/screens/IncidentResolutionEdit';
import IncidentRecoveryEdit from './android/app/src/screens/IncidentRecoverEdit';
import IncidentLogNotifications from './android/app/src/screens/IncidentLogNotification';
import IncidentDetailsEdit from './android/app/src/screens/IncidentdetailsEdit';
import IncidentCategory from './android/app/src/screens/IncidentCategory';
import IncidentReportedTo from './android/app/src/screens/IncidentReportedTo';
import LFNotificationsScreen from './android/app/src/screens/LFNotifications';
import TaskManager from './android/app/src/screens/TaskManager';
import TMNewScreen from './android/app/src/screens/TMNewScreen';
import TMSubDepartment from './android/app/src/screens/TMSubDepartment';
import TMResolutionScreen from './android/app/src/screens/TMResolution';
import TMAssignTo from './android/app/src/screens/TMAssignTo';
import TMDescription from './android/app/src/screens/TMDescription';
import TMAttachment from './android/app/src/screens/TMAttachment';
import LFDetails from './android/app/src/screens/LFDetails';
import LFPrimaryDetailsEdit from './android/app/src/screens/LFPrimaryDetailsEdit';
import LFFoundLocation from './android/app/src/screens/LFFoundLocation';
import LFFoundBy from './android/app/src/screens/LFFoundBy';
import LFFoundLocationScreen from './android/app/src/screens/LFFoundLocation';
import LFPrimaryArticleCountScreen from './android/app/src/screens/LFPrimaryDetailsArticalCount';
import TMNotifications from './android/app/src/screens/TMNotifications';
import LFArticleEdit from './android/app/src/screens/LFArticalEdit';
import LFArticleTab from './android/app/src/components/LFArticleTab';
import TMDetails from './android/app/src/screens/TMDetails';
import TMPrimaryDetails from './android/app/src/screens/TMPrimaryDetails';


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
  GuestService: undefined;
  Bookings: undefined;
  ChatDetail: undefined;
  Inventory: undefined;
  UserProfile: undefined;
  Search: undefined;
  Notifications: undefined;
  Home: undefined;
  Chat: undefined;
  GuestChat: undefined;
  CheckList: undefined;
  Modules: undefined;
  MainTabs: undefined;
  Tutorials: undefined;
  Help: undefined;
  NewScreen: undefined;
  IncidentLog: undefined;
  IncidentDetails: undefined;
  IncidentLogNotifications: undefined;
  IncidentNew: undefined;
  IncidentReported: undefined;
  IncidentCategory: undefined;
  IncidentDepartment: undefined;
  IncidentDescription: undefined;
  IncidentPrimaryDetailsEdit: undefined;
  IncidentDetailsEdit: undefined;
  InvestigationDetailsEdit: undefined;
  IncidentResolutionEdit: undefined;
  IncidentRecoveryEdit: undefined;
  IncidentAttachment: undefined;
  GuestLocation: undefined;
  LFLocation: undefined;
  LFNotifications: undefined;
  LFFounded: undefined;
  LFFoundBy: undefined;
  LFPrimaryArtical: undefined;
  LFArticalCount: undefined;
  LFCategory: undefined;
  LFStorage: undefined;
  LFStatus: undefined;
  LFAttachment: undefined;
  LostFound: undefined;
  LFSearch: undefined;
  NewIconLF: undefined;
  LFArtical: undefined;
  LFGuestSearch: undefined;
  LFGuestSearch2: undefined;
  LFNewGuest: undefined;
  LFMembership: undefined;
  LFDetails: undefined;
  LFArticalTab: undefined;
  LFArticalEdit: undefined;
  LFPrimaryDetailsEdit: undefined;
  LFFoundLocation: undefined;
  TaskManager: undefined;
  TaskType: undefined;
  AddTaskScreen: undefined;
  TaskDetailsScreen: undefined;
  Attachments: undefined;
  Assigned: undefined;
  GuestPrimary: undefined;
  GuestEmployee: undefined;
  TMNewIcon: undefined;
  TMSubDepartment: undefined;
  TMResolution: undefined;
  TMAssignTo: undefined;
  TMDescription: undefined;
  TMAttachment: undefined;
  TMNotifications: undefined;
  TMDetails: undefined;
  TMPrimaryDetails: undefined;
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
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      if (route.name === 'Home') {
        return <Home color={color} size={24} />;
      } else if (route.name === 'Chat') {
        return <MessageSquare color={color} size={24} />;
      } else if (route.name === 'Notifications') {
        return <Bell color={color} size={24} />;
      } else if (route.name === 'Modules') {
        return <Layers color={color} size={24} />;
      }
      return null;
    },
    tabBarActiveTintColor: '#ffffff',
    tabBarInactiveTintColor: '#888888',
    tabBarStyle: ['Chat', 'Notifications','Modules'].includes(route.name)
      ? { display: 'none' }
      : {
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
  <Tab.Screen name="Home" component={GuestService} />
  <Tab.Screen name="Chat" component={GuestChatScreen} />
  <Tab.Screen name="Notifications" component={NotificationScreen} />
  <Tab.Screen 
      name="Modules" 
      component={ModuleScreen}
      initialParams={{ previousScreen: 'GuestService' }}
    />
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
      <Drawer.Screen name="IncidentLog" component={IncidentLogDrawer} />
      <Drawer.Screen name="UserProfile" component={UserProfileScreen} />
      <Drawer.Screen name="Chat" component={ChatDetailScreen} />
      {/* <Drawer.Screen name="Tutorials" component={AssetsScreen} /> */}
      <Drawer.Screen name="Help" component={GuestService} />
      <Drawer.Screen name="Bookings" component={BookingsScreen} />
    </Drawer.Navigator>
  );
};
const IncidentLogTabs = () => (
  <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      if (route.name === 'Home') {
        return <Home color={color} size={24} />;
      } else if (route.name === 'Chat') {
        return <MessageSquare color={color} size={24} />;
      } else if (route.name === 'Notifications') {
        return <Bell color={color} size={24} />;
      } else if (route.name === 'Modules') {
        return <Layers color={color} size={24} />;
      }
      return null;
    },
    tabBarActiveTintColor: '#ffffff',
    tabBarInactiveTintColor: '#888888',
    tabBarStyle: ['Chat', 'Notifications','Modules'].includes(route.name)
      ? { display: 'none' }
      : {
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
  <Tab.Screen name="Home" component={IncidentLogScreen} />
  <Tab.Screen name="Chat" component={GuestChatScreen} />
  <Tab.Screen name="Notifications" component={IncidentLogNotifications} />
  <Tab.Screen 
      name="Modules" 
      component={ModuleScreen}
      initialParams={{ previousScreen: 'IncidentLog' }}
    /></Tab.Navigator>
);

// Updated IncidentLogDrawer component
const IncidentLogDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{ 
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#121212',
          width: 280,
        },
      }}
    >
      <Drawer.Screen name="IncidentLogMain" component={IncidentLogTabs} />
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
        return <MessageSquare color={color} size={24} />;
      } else if (route.name === 'Notifications') {
        return <Bell color={color} size={24} />;
      } else if (route.name === 'Modules') {
        return <Layers color={color} size={24} />;
      }
      return null;
    },
    tabBarActiveTintColor: '#ffffff',
    tabBarInactiveTintColor: '#888888',
    tabBarStyle: ['Chat', 'Notifications','Modules'].includes(route.name)
      ? { display: 'none' }
      : {
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
  <Tab.Screen name="Chat" component={GuestChatScreen} />
  <Tab.Screen name="Notifications" component={LFNotificationsScreen} />
  <Tab.Screen 
      name="Modules" 
      component={ModuleScreen}
      initialParams={{ previousScreen: 'LostFound' }}
    /></Tab.Navigator>
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

const TaskManagerTabs = () => (
  <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      if (route.name === 'Home') {
        return <Home color={color} size={24} />;
      } else if (route.name === 'Chat') {
        return <MessageSquare color={color} size={24} />;
      } else if (route.name === 'Notifications') {
        return <Bell color={color} size={24} />;
      } else if (route.name === 'Modules') {
        return <Layers color={color} size={24} />;
      }
      return null;
    },
    tabBarActiveTintColor: '#ffffff',
    tabBarInactiveTintColor: '#888888',
    tabBarStyle: ['Chat', 'Notifications','Modules'].includes(route.name)
      ? { display: 'none' }
      : {
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
  <Tab.Screen name="Home" component={TaskManager} />
  <Tab.Screen name="Chat" component={GuestChatScreen} />
  <Tab.Screen name="Notifications" component={TMNotifications} />
  <Tab.Screen 
      name="Modules" 
      component={ModuleScreen}
      initialParams={{ previousScreen: 'TaskManager' }}
    /></Tab.Navigator>
);

const TaskManagerDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="TaskManagerMain" component={TaskManagerTabs} />
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
    <Stack.Screen name="GuestChat" component={GuestChatScreen} />
    <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
    <Stack.Screen name="Inventory" component={InventoryScreen} />
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen name="Notifications" component={NotificationScreen} />
    <Stack.Screen name="GuestService" component={DrawerNavigator} />
    <Stack.Screen name="NewScreen" component={NewScreen} />
    <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
    <Stack.Screen name="TaskDetailsScreen" component={TaskDetailsScreen} />
    <Stack.Screen name="Attachments" component={AttachmentScreen} />
    <Stack.Screen name="Assigned" component={AssignedToScreen} />
    <Stack.Screen name="LostFound" component={LostFoundDrawer} />
    <Stack.Screen name="TaskManager" component={TaskManagerDrawer} />
    <Stack.Screen name="IncidentLog" component={IncidentLogDrawer} />
    <Stack.Screen name="IncidentNew" component={IncidentNewScreen} />
    <Stack.Screen name="IncidentReported" component={IncidentReportedTo} />
    <Stack.Screen name="IncidentCategory" component={IncidentCategory} />
    <Stack.Screen name="IncidentDepartment" component={IncidentDepartment} />
    <Stack.Screen name="IncidentDescription" component={IncidentDescription} />
    <Stack.Screen name="IncidentAttachment" component={IncidentAttachment} />
    <Stack.Screen name="IncidentDetails" component={IncidentDetailsScreen} />
    <Stack.Screen name="IncidentPrimaryDetailsEdit" component={IncidentPrimaryDetailsEdit} />
    <Stack.Screen name="IncidentDetailsEdit" component={IncidentDetailsEdit} />
    <Stack.Screen name="InvestigationDetailsEdit" component={InvestigationDetailsEdit} />
    <Stack.Screen name="IncidentResolutionEdit" component={IncidentResolutionEdit} />
    <Stack.Screen name="IncidentRecoveryEdit" component={IncidentRecoveryEdit} />
    <Stack.Screen name="IncidentLogNotifications" component={IncidentLogNotifications} />
    <Stack.Screen name="LFSearch" component={LFSearchScreen} />
    <Stack.Screen name="NewIconLF" component={LFNewScreen} />
    <Stack.Screen name="LFArtical" component={LFArtical01Screen} />
    <Stack.Screen name="LFNotifications" component={LFNotificationsScreen} />
    <Stack.Screen name="LFGuestSearch" component={LFSearchGuestScreen} />
    <Stack.Screen name="LFGuestSearch2" component={LFSearchGuest2Screen} />
    <Stack.Screen name="LFNewGuest" component={LFNewGuestScreen} />
    <Stack.Screen name="GuestPrimary" component={PrimaryDetailsScreen} />
    <Stack.Screen name="GuestEmployee" component={EmployeeSelectionScreen} />
    <Stack.Screen name="CheckList" component={ChecklistScreen} />
    <Stack.Screen name="LFMembership" component={LFMembershipScreen} />
    <Stack.Screen name="TaskType" component={TaskType} />
    <Stack.Screen name="GuestLocation" component={GuestLocationScreen} />
    <Stack.Screen name="LFLocation" component={LFLocationScreen} />
    <Stack.Screen name="LFFounded" component={LFFoundLocationScreen} />
    <Stack.Screen name="LFFoundBy" component={LFFoundBy} />
    <Stack.Screen name="LFPrimaryArtical" component={LFPrimaryArticleCountScreen} />
    <Stack.Screen name="LFCategory" component={LFCategorySelectionScreen} />
    <Stack.Screen name="LFStorage" component={LFStorageLocationScreen} />
    <Stack.Screen name="LFStatus" component={LFStatusScreen} />
    <Stack.Screen name="LFAttachment" component={LFAttachment} />
    <Stack.Screen name="LFPrimaryDetailsEdit" component={LFPrimaryDetailsEdit} />
    <Stack.Screen name="LFArticalCount" component={LFArticleCountScreen} />
    <Stack.Screen name="LFFoundLocation" component={LFFoundLocation} />
    <Stack.Screen name="LFDetails" component={LFDetails} />
    <Stack.Screen name="LFArticalEdit" component={LFArticleEdit} />
    <Stack.Screen name="LFArticalTab" component={LFArticleTab} />
    <Stack.Screen name="TMNewIcon" component={TMNewScreen} />
    <Stack.Screen name="TMSubDepartment" component={TMSubDepartment} />
    <Stack.Screen name="TMResolution" component={TMResolutionScreen} />
    <Stack.Screen name="TMAssignTo" component={TMAssignTo} />
    <Stack.Screen name="TMDescription" component={TMDescription} />
    <Stack.Screen name="TMAttachment" component={TMAttachment} />
    <Stack.Screen name="TMNotifications" component={TMNotifications} />
    <Stack.Screen name="TMDetails" component={TMDetails} />
    <Stack.Screen name="TMPrimaryDetails" component={TMPrimaryDetails} />

  </Stack.Navigator>
);

export default function App(): React.ReactElement {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}
