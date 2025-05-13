import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';

const modules = [
  {id: '1', name: 'Guest Service Pro'},
  {id: '2', name: 'POS Pro'},
  {id: '3', name: 'CRM Pro'},
  {id: '4', name: 'Rooms Pro'},
];

const ModuleScreen = ({navigation, route}) => {
  // Get the previous screen from route params
  const previousScreen = route.params?.previousScreen;
  // Check if we came from bottom tabs - this will be true if previousScreen exists
  const cameFromBottomTabs = !!previousScreen;

  console.log('Previous screen:', previousScreen);

  const handleModuleSelect = moduleId => {
    if (moduleId === '1') {
      // If we have a previous screen and it's a valid screen, navigate to it
      if (previousScreen) {
        switch (previousScreen) {
          case 'LostFound':
            // Use CommonActions to reset and navigate to LostFound
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'LostFound'}],
              }),
            );
            break;
          case 'IncidentLog':
            // Use CommonActions to reset and navigate to IncidentLog
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'IncidentLog'}],
              }),
            );
            break;
          case 'TaskManager':
            // Use CommonActions to reset and navigate to TaskManager
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'TaskManager'}],
              }),
            );
            break;
          case 'GuestService':
          default:
            // For GuestService, we need to navigate differently
            // First reset to GuestService
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'GuestService',
                    // This is important - we need to specify which screen in the drawer to show
                    state: {
                      routes: [
                        {
                          name: 'MainTabs',
                        },
                      ],
                    },
                  },
                ],
              }),
            );
            break;
        }
      } else {
        // If no previous screen, navigate to default GuestService with MainTabs
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'GuestService',
                state: {
                  routes: [
                    {
                      name: 'MainTabs',
                    },
                  ],
                },
              },
            ],
          }),
        );
      }
    } else {
      console.log(`Selected module (no navigation set): ${moduleId}`);
    }
  };

  // Handle back button press
  const handleBackPress = () => {
    if (previousScreen) {
      switch (previousScreen) {
        case 'LostFound':
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'LostFound'}],
            }),
          );
          break;
        case 'IncidentLog':
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'IncidentLog'}],
            }),
          );
          break;
        case 'TaskManager':
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'TaskManager'}],
            }),
          );
          break;
        case 'GuestService':
        default:
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'GuestService',
                  state: {
                    routes: [
                      {
                        name: 'MainTabs',
                      },
                    ],
                  },
                },
              ],
            }),
          );
          break;
      }
    } else {
      // If no previous screen, just go back
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header Section with conditional back button */}
      <View style={styles.header}>
        {cameFromBottomTabs && (
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <AntDesign name="back" size={24} color="white" />
          </TouchableOpacity>
        )}
        <View style={styles.logoContainer}>
          <View style={styles.logo} />
        </View>
        <Text style={styles.title}>The Ultimate Hotel Operating System</Text>
        <Text style={styles.subtitle}>
          The Group Solution for every property
        </Text>
      </View>

      {/* Modules Section */}
      <View style={styles.modulesContainer}>
        <Text style={styles.modulesTitle}>Modules</Text>
        <Text style={styles.modulesSubtitle}>
          Please select the module to continue
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {modules.map(module => (
            <TouchableOpacity
              key={module.id}
              onPress={() => handleModuleSelect(module.id)}
              style={styles.moduleButtonContainer}>
              <LinearGradient
                colors={['#FF5722', '#FF8A65']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.moduleButton}>
                <Text style={styles.moduleButtonText}>{module.name}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative', // For absolute positioning of back button
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  logoContainer: {
    marginBottom: 15,
  },
  logo: {
    width: 60,
    height: 60,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  modulesContainer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 18,
    top: 35,
  },
  modulesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 5,
  },
  modulesSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  moduleButtonContainer: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    height: 80,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  moduleButton: {
    paddingVertical: 16,
    borderRadius: 10,
    height: 80,
    width: '100%',
  },
  moduleButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    top: 10,
  },
});

export default ModuleScreen;