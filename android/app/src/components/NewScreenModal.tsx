"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Platform, SafeAreaView } from "react-native"
import Feather from "react-native-vector-icons/Feather"
import AntDesign from "react-native-vector-icons/AntDesign"
import DateTimePicker from "@react-native-community/datetimepicker"
import AnimatedModal from "./AnimatedModal"
import TaskTypeModal from "./TaskTypeModal"
import LocationModal from "./LocationModal"
import CartModal from "./CartModal"

const { width, height } = Dimensions.get("window")

interface NewScreenModalProps {
  visible: boolean
  onClose: () => void
  navigation: any
}

interface CartItem {
  id: string
  name: string
  quantity: number
}

const NewScreenModal: React.FC<NewScreenModalProps> = ({ visible, onClose, navigation }) => {
  // State for sub-modals visibility
  const [taskTypeModalVisible, setTaskTypeModalVisible] = useState(false)
  const [locationModalVisible, setLocationModalVisible] = useState(false)
  const [cartModalVisible, setCartModalVisible] = useState(false)

  // State for date/time picker
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [datePickerMode, setDatePickerMode] = useState<"date" | "time">("date")
  const [selectedDate, setSelectedDate] = useState(new Date())

  // State for selected values
  const [selectedTaskType, setSelectedTaskType] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [selectedCartItems, setSelectedCartItems] = useState<CartItem[]>([])
  const [scheduledDateTime, setScheduledDateTime] = useState<Date | null>(null)

  // State for content measurements
  const [contentHeight, setContentHeight] = useState(0)
  const [isContentMeasured, setIsContentMeasured] = useState(false)

  const handleTaskTypeSelect = (taskType: string) => {
    setSelectedTaskType(taskType)
  }

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location)
  }

  const handleCartSelect = (items: CartItem[]) => {
    setSelectedCartItems(items)
  }

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false)
    }

    if (selectedDate) {
      if (datePickerMode === "date") {
        // Keep the time from the existing scheduledDateTime if it exists
        const newDate = new Date(selectedDate)
        if (scheduledDateTime) {
          newDate.setHours(scheduledDateTime.getHours(), scheduledDateTime.getMinutes())
        }
        setSelectedDate(newDate)

        if (Platform.OS === "android") {
          // On Android, we need to show the time picker after date selection
          setTimeout(() => {
            setDatePickerMode("time")
            setShowDatePicker(true)
          }, 300)
        } else {
          // On iOS, we can just switch to time mode
          setDatePickerMode("time")
        }
      } else {
        // Keep the date from the selected date but update the time
        const newDate = new Date(selectedDate)
        newDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
        setSelectedDate(newDate)
        setScheduledDateTime(newDate)
        setShowDatePicker(false)
      }
    }
  }

  const toggleDatePicker = () => {
    if (!showDatePicker) {
      setDatePickerMode("date")
      setShowDatePicker(true)
    } else {
      setShowDatePicker(false)
    }
  }

  const handleSubmit = () => {
    // Check if all required fields are filled
    if (!selectedTaskType || !selectedLocation || selectedCartItems.length === 0) {
      // You could show an error message here
      return
    }

    // Process the form submission
    console.log({
      taskType: selectedTaskType,
      location: selectedLocation,
      cartItems: selectedCartItems,
      scheduledDateTime: scheduledDateTime,
    })

    // Close the modal
    onClose()
  }

  // Format date and time as DD-MM-YYYY HH:MM
  const formatDateTime = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    return `${day}-${month}-${year} ${hours}:${minutes}`
  }

  // Get the total number of items in cart
  const totalCartItems = selectedCartItems.reduce((sum, item) => sum + item.quantity, 0)

  // Calculate the appropriate modal height based on content and platform
  const getModalHeight = () => {
    // Dynamic height calculation based on screen aspect ratio
    const aspectRatio = height / width

    // For iOS with date picker, we need more space
    if (showDatePicker && Platform.OS === "ios") {
      return aspectRatio > 3 ? "80%" : "85%" // Increased significantly for date picker
    }

    // For different screen sizes, adjust the percentage based on aspect ratio
    if (aspectRatio > 2) {
      // Very tall phones (like iPhone 12 Pro Max)
      return "50%"
    } else if (aspectRatio < 1.6) {
      // Wider phones or tablets
      return "70%"
    } else if (height < 600) {
      // Small devices
      return "75%"
    } else if (height > 1000) {
      // Large devices
      return "60%"
    }

    // Default for most devices
    return "60%"
  }

  // Measure content height for dynamic sizing
  const onContentLayout = (event) => {
    const { height } = event.nativeEvent.layout
    setContentHeight(height)
    setIsContentMeasured(true)
  }

  return (
    <AnimatedModal visible={visible} onClose={onClose} adaptiveHeight={true} minHeight={getModalHeight()}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <AntDesign name="back" size={26} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollViewContent,
            showDatePicker && Platform.OS === "ios" && styles.scrollViewContentWithDatePicker,
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View onLayout={onContentLayout}>
            {/* Form Card */}
            <View style={styles.formCard}>
              {/* Schedule for later */}
              <TouchableOpacity style={styles.formItem} onPress={toggleDatePicker}>
                <View style={styles.formItemLeft}>
                  <Feather name="calendar" size={20} color="#000" style={styles.formItemIcon} />
                  <Text style={styles.formItemText}>Schedule for later</Text>
                </View>
                <View style={styles.formItemRight}>
                  <Feather name={showDatePicker ? "chevron-down" : "chevron-right"} size={20} color="#000" />
                </View>
              </TouchableOpacity>

              {scheduledDateTime && <Text style={styles.scheduledDateText}>{formatDateTime(scheduledDateTime)}</Text>}

              {/* Date Picker (iOS) */}
              {showDatePicker && Platform.OS === "ios" && (
                <View style={styles.datePickerContainer}>
                  <View style={styles.datePickerHeader}>
                    <Text style={styles.datePickerTitle}>
                      {datePickerMode === "date" ? "Select Date" : "Select Time"}
                    </Text>
                    <TouchableOpacity
                      style={styles.datePickerDoneButton}
                      onPress={() => {
                        if (datePickerMode === "date") {
                          setDatePickerMode("time")
                        } else {
                          setScheduledDateTime(selectedDate)
                          setShowDatePicker(false)
                        }
                      }}
                    >
                      <Text style={styles.datePickerDoneText}>{datePickerMode === "date" ? "Next" : "Done"}</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={selectedDate}
                    mode={datePickerMode}
                    display="spinner"
                    onChange={handleDateChange}
                    style={styles.datePicker}
                  />
                </View>
              )}

              {/* Date Picker (Android) is shown as a modal by the OS */}
              {showDatePicker && Platform.OS === "android" && (
                <DateTimePicker
                  value={selectedDate}
                  mode={datePickerMode}
                  is24Hour={true}
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              <View style={styles.divider} />

              {/* Task Type */}
              <TouchableOpacity style={styles.formItem} onPress={() => setTaskTypeModalVisible(true)}>
                <View style={styles.formItemLeft}>
                  <Text style={styles.formItemText}>
                    Task Type<Text style={styles.requiredStar}>*</Text>
                  </Text>
                </View>
                <View style={styles.formItemRight}>
                  {selectedTaskType && <Text style={styles.selectedValueText}>{selectedTaskType}</Text>}
                  <Feather name="chevron-right" size={20} color="#000" />
                </View>
              </TouchableOpacity>
              <View style={styles.divider} />

              {/* Location */}
              <TouchableOpacity style={styles.formItem} onPress={() => setLocationModalVisible(true)}>
                <View style={styles.formItemLeft}>
                  <Text style={styles.formItemText}>
                    Location<Text style={styles.requiredStar}>*</Text>
                  </Text>
                </View>
                <View style={styles.formItemRight}>
                  {selectedLocation && <Text style={styles.selectedValueText}>{selectedLocation}</Text>}
                  <Feather name="chevron-right" size={20} color="#000" />
                </View>
              </TouchableOpacity>
              <View style={styles.divider} />

              {/* Cart */}
              <TouchableOpacity style={styles.formItem} onPress={() => setCartModalVisible(true)}>
                <View style={styles.formItemLeft}>
                  <Text style={styles.formItemText}>
                    Cart<Text style={styles.requiredStar}>*</Text>
                  </Text>
                </View>
                <View style={styles.formItemRight}>
                  {totalCartItems > 0 && (
                    <View style={styles.cartBadge}>
                      <Text style={styles.cartBadgeText}>{totalCartItems} Added</Text>
                    </View>
                  )}
                  <Feather name="chevron-right" size={20} color="#000" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                // (!selectedTaskType || !selectedLocation || selectedCartItems.length === 0) &&
                //  styles.disabledButton
              ]}
              onPress={handleSubmit}
              // disabled={!selectedTaskType || !selectedLocation || selectedCartItems.length === 0}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Sub-modals */}
        <TaskTypeModal
          visible={taskTypeModalVisible}
          onClose={() => setTaskTypeModalVisible(false)}
          onSelect={handleTaskTypeSelect}
        />

        <LocationModal
          visible={locationModalVisible}
          onClose={() => setLocationModalVisible(false)}
          onSelect={handleLocationSelect}
        />

        <CartModal visible={cartModalVisible} onClose={() => setCartModalVisible(false)} onSelect={handleCartSelect} />
      </SafeAreaView>
    </AnimatedModal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 16, // Add consistent padding at the bottom
  },
  scrollViewContentWithDatePicker: {
    paddingBottom: 100, // Add extra padding when date picker is shown
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: -10,
  },
  backButton: {
    padding: 4,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  formCard: {
    backgroundColor: "#fff",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    overflow: "hidden",
    marginHorizontal: -15,
  },
  formItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  formItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  formItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  formItemIcon: {
    marginRight: 12,
  },
  formItemText: {
    fontSize: 16,
    color: "#000",
  },
  selectedValueText: {
    fontSize: 14,
    color: "#666",
    marginRight: 8,
  },
  scheduledDateText: {
    fontSize: 14,
    color: "#666",
    paddingHorizontal: 50,
    paddingBottom: 10,
    marginTop: -10,
  },
  requiredStar: {
    color: "#FF5722",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 16,
  },
  cartBadge: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  cartBadgeText: {
    color: "#666",
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: "#FF5722",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  datePickerContainer: {
    backgroundColor: "#fff",
    paddingBottom: 16,
  },
  datePickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  datePickerTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  datePickerDoneButton: {
    padding: 8,
  },
  datePickerDoneText: {
    fontSize: 16,
    color: "#FF5722",
    fontWeight: "500",
  },
  datePicker: {
    width: "100%",
  },
})

export default NewScreenModal
