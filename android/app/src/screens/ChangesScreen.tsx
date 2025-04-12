import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';



  
const ChangesScreen = () => {
    const changesData = [
       {
         id: '1',
         datePointName: 'Date point name',
         timestamp: '01-04-2025 23:34',
         user: 'Anirudh Jonnalagadda',
         from: 'Description',
         to: 'Description',
       },
       {
         id: '2',
         datePointName: 'Date point name',
         timestamp: '01-04-2025 23:34',
         user: 'Anirudh Jonnalagadda',
         from: 'Description',
         to: 'Description',
       },
       {
         id: '3',
         datePointName: 'Date point name',
         timestamp: '01-04-2025 23:34',
         user: 'Anirudh Jonnalagadda',
         from: 'Description',
         to: 'Description',
       },
       {
         id: '4',
         datePointName: 'Date point name',
         timestamp: '01-04-2025 23:34',
         user: 'Anirudh Jonnalagadda',
         from: 'Description',
         to: 'Description',
       },
       {
         id: '5',
         datePointName: 'Date point name',
         timestamp: '01-04-2025 23:34',
         user: 'Anirudh Jonnalagadda',
         from: 'Description',
         to: 'Description',
       },
       {
         id: '6',
         datePointName: 'Date point name',
         timestamp: '01-04-2025 23:34',
         user: 'Anirudh Jonnalagadda',
         from: 'Description',
         to: 'Description',
       },
       {
         id: '7',
         datePointName: 'Date point name',
         timestamp: '01-04-2025 23:34',
         user: 'Anirudh Jonnalagadda',
         from: 'Description',
         to: 'Description',
       },
     ];
 return (
         <View style={styles.changesContainer}>
         {changesData.map((item) => (
           <View key={item.id} style={styles.changeItem}>
             
             {/* Header with grey background */}
             <View style={styles.changeHeader}>
               <Text style={styles.datePointName}>{item.datePointName}</Text>
               <View style={styles.timestampContainer}>
                 <Text style={styles.timestamp}>{item.timestamp}</Text>
                 <Text style={styles.userName}>{item.user}</Text>
               </View>
             </View>
   
             {/* Details section */}
             <View style={styles.changeDetails}>
               <View style={styles.changeRow}>
                 <Text style={styles.changeLabel}>From</Text>
                 <Text style={styles.changeValue}>{item.from}</Text>
               </View>
               <View style={styles.changeRow}>
                 <Text style={styles.changeLabel}>To</Text>
                 <Text style={styles.changeValue}>{item.to}</Text>
               </View>
             </View>
   
           </View>
         ))}
       </View>
 )}
const styles = StyleSheet.create({
   
   
    changesContainer: {
        paddingHorizontal: 1,
      },  
      changeItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#DDDDDD',
      },
      
      changeHeader: {
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 12,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      },
      
      datePointName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1A1A1A',
      },
      
      timestampContainer: {
        alignItems: 'flex-end',
      },
      
      timestamp: {
        fontSize: 12,
        color: 'black',
      },
      
      userName: {
        fontSize: 12,
        color: 'black',
      },
      
      changeDetails: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#FFFFFF',
      },
      
      changeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
      },
      
      changeLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1A1A1A',
        width: 50,
      },
      
      changeValue: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 8,
      },
  });
  
export default ChangesScreen;
