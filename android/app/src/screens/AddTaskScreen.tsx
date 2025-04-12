import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  TextInput,

} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Search, Image } from 'react-native-feather';

const placeholderImage = 'https://via.placeholder.com/40';

// TaskItem Component
const TaskItem = ({ name, quantity, onAdd, onIncrement, onDecrement }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemLeft}>

            <Image color="grey" size={20} style={styles.itemImage}/>
        <Text style={styles.itemName}>{name}</Text>
      </View>

      {quantity > 0 ? (
        <View style={styles.counterBox}>
          <TouchableOpacity onPress={onDecrement} style={styles.counterBtn}>
            <Text style={styles.counterBtndecreaseText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterNumber}>{String(quantity).padStart(2, '0')}</Text>
          <TouchableOpacity onPress={onIncrement} style={styles.counterBtn}>
            <Text style={styles.counterBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={onAdd} style={styles.addBox}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const AddTaskScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const [tasks, setTasks] = useState([
    { id: '1', name: 'Task Name1', quantity: 0 },
    { id: '2', name: 'Task Name2', quantity: 0 },
    { id: '3', name: 'Task Name3', quantity: 0 },
    { id: '4', name: 'Task Name4', quantity: 0 },
    { id: '5', name: 'Task Name5', quantity: 0 },
    { id: '6', name: 'Task Name6', quantity: 0 },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
  <AntDesign name="back" size={26} style={{ color: "black" }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task</Text>
        <TouchableOpacity>
          <Text style={styles.showSelected}>Show Selected</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Search color="#000" size={18} />
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks.filter(task =>
          task.name.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem
            name={item.name}
            quantity={item.quantity}
            onAdd={() => {
              const updated = tasks.map(task =>
                task.id === item.id ? { ...task, quantity: 1 } : task
              );
              setTasks(updated);
            }}
            onIncrement={() => {
              const updated = tasks.map(task =>
                task.id === item.id
                  ? { ...task, quantity: task.quantity + 1 }
                  : task
              );
              setTasks(updated);
            }}
            onDecrement={() => {
              const updated = tasks.map(task =>
                task.id === item.id
                  ? { ...task, quantity: Math.max(task.quantity - 1, 0) }
                  : task
              );
              setTasks(updated);
            }}
          />
        )}
        style={styles.taskList}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  showSelected: {
    color: '#FF6A00',
    fontWeight: '600',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 15,
    color: '#000',
  },
  searchIcon: {
    padding: 6,
  },
  taskList: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: 'white',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  addBox: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  addText: {
    color: '#FF6A00',
    fontWeight: '600',
    fontSize: 14,
  },
  counterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  counterBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  counterBtnText: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  counterBtndecreaseText:{
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
  counterNumber: {
    marginHorizontal: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#FF6A00',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AddTaskScreen;
