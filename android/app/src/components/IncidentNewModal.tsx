import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, SafeAreaView, Dimensions } from "react-native"
import Feather from "react-native-vector-icons/Feather"
import AntDesign from "react-native-vector-icons/AntDesign"
import DateTimePicker from "@react-native-community/datetimepicker"
import AnimatedModal from "./AnimatedModal"
import IncidentReportedToModal from "./IncidentReportedToModal"
import IncidentCategoryModal from "./IncidentCategoryModal"
import IncidentDepartmentModal from "./IncidentDepartmentModal"
import IncidentDescriptionModal from "./IncidentDescriptionModal"
import IncidentAttachmentModal from "./IncidentAttachmentModal"
import IncidentGuestDetailsModal from "./IncidentGuestDetailsModal"

const { height, width } = Dimensions.get("window")

interface IncidentNewModalProps {
  visible: boolean
  onClose: () => void
  navigation: any
}

// Define interfaces for the selected items
interface Employee {
  id: string
  name: string
}

interface Category {
  id: string
  name: string
}

interface Department {
  id: string
  name: string
}

interface Attachment {
  id: string
  name: string
  size?: string
  type?: string
}

const IncidentNewModal: React.FC<IncidentNewModalProps> = ({ visible, onClose, navigation }) => {
  // State for sub-modals visibility
  const [reportedToModalVisible, setReportedToModalVisible] = useState(false)
  const [GuestDetailsModalVisible, setGuestDetailsModalVisible] = useState(false)
  const [categoryModalVisible, setCategoryModalVisible] = useState(false)
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false)
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false)
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false)

  // State for form values with proper typing
  const [formData, setFormData] = useState({
    incidentDate: null as string | null,
    reportedDate: null as string | null,
    reportedTo: [] as Employee[],
    guest: null as string | null,
    category: [] as Category[],
    department: [] as Department[],
    description: "",
    attachments: [] as Attachment[],
  })

  // Date picker state
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [datePickerMode, setDatePickerMode] = useState<"date" | "time">("date")
  const [currentDateField, setCurrentDateField] = useState("")
  const [tempDate, setTempDate] = useState(new Date())

  // Format selected items for display
  const formatSelectedItems = (items: Array<{ name: string }>, maxDisplay = 2) => {
    if (!items || items.length === 0) return null

    if (items.length === 1) {
      return items[0].name
    }

    if (items.length <= maxDisplay) {
      return items.map((item) => item.name).join(", ")
    }

    const displayedItems = items
      .slice(0, maxDisplay)
      .map((item) => item.name)
      .join(", ")
    return `${displayedItems} +${items.length - maxDisplay} more`
  }

  // Handle date field press
  const handleDatePress = (field: string) => {
    setCurrentDateField(field)
    setDatePickerMode("date")
    setTempDate(new Date())
    setShowDatePicker(true)
  }

  // Handle date selection
  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || tempDate

    // Hide the picker immediately for Android
    if (Platform.OS === "android") {
      setShowDatePicker(false)
    }

    // If the user canceled (Android) or if there's no selected date
    if (event.type === "dismissed" || !selectedDate) {
      return
    }

    setTempDate(currentDate)

    // If we just selected a date, now show the time picker
    if (datePickerMode === "date") {
      setDatePickerMode("time")
      // On Android, we need to show the time picker separately
      if (Platform.OS === "android") {
        setTimeout(() => {
          setShowDatePicker(true)
        }, 100)
      }
      return
    }

    // If we've selected both date and time, format and save
    if (datePickerMode === "time") {
      const day = String(currentDate.getDate()).padStart(2, "0")
      const month = String(currentDate.getMonth() + 1).padStart(2, "0")
      const year = currentDate.getFullYear()
      const hours = String(currentDate.getHours()).padStart(2, "0")
      const minutes = String(currentDate.getMinutes()).padStart(2, "0")

      const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`

      setFormData((prevState) => ({
        ...prevState,
        [currentDateField]: formattedDate,
      }))

      // Hide the picker for iOS (Android already hidden)
      setShowDatePicker(false)
      // Reset to date mode for next time
      setDatePickerMode("date")
    }
  }

  const handleSubmit = () => {
    // Process the form submission
    console.log("Form submitted", formData)
    // Close the modal
    onClose()
  }

  // Check if required fields are filled
  const isFormValid = () => {
    return (
      formData.incidentDate !== null &&
      formData.reportedDate !== null &&
      formData.reportedTo.length > 0 &&
      formData.category.length > 0 &&
      formData.department.length > 0 &&
      formData.description.trim() !== ""
    )
  }

  // Clean up date picker when modal closes
  useEffect(() => {
    if (!visible) {
      setShowDatePicker(false)
    }
  }, [visible])

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
      <SafeAreaView style={styles.modalContainer}>
        {/* Header - Fixed at the top */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <AntDesign name="back" size={26} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New</Text>
        </View>

        {/* Content area with fixed form card and scrollable content */}
        <View style={styles.contentContainer}>
          <View style={styles.formCardContainer}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              {/* Form Items */}
              <View>
                {/* Incident Date & Time */}
                <TouchableOpacity style={styles.formItem} onPress={() => handleDatePress("incidentDate")}>
                  <View style={styles.formItemLeft}>
                    <Feather name="calendar" size={20} color="#000" style={styles.formItemIcon} />
                  </View>
                  <View style={styles.formItemRightColumn}>
                    <Text style={styles.formItemText}>
                      Incident Date & Time<Text style={styles.requiredStar}>*</Text>
                    </Text>
                    {formData.incidentDate && <Text style={styles.selectedValueText}>{formData.incidentDate}</Text>}
                  </View>
                  <Feather name="chevron-right" size={20} color="#000" />
                </TouchableOpacity>
                <View style={styles.divider} />

                {/* Reported Date & Time */}
                <TouchableOpacity style={styles.formItem} onPress={() => handleDatePress("reportedDate")}>
                  <View style={styles.formItemLeft}>
                    <Feather name="calendar" size={20} color="#000" style={styles.formItemIcon} />
                  </View>
                  <View style={styles.formItemRightColumn}>
                    <Text style={styles.formItemText}>
                      Reported Date & Time<Text style={styles.requiredStar}>*</Text>
                    </Text>
                    {formData.reportedDate && <Text style={styles.selectedValueText}>{formData.reportedDate}</Text>}
                  </View>
                  <Feather name="chevron-right" size={20} color="#000" />
                </TouchableOpacity>
                <View style={styles.divider} />

                {/* Reported To */}
                <TouchableOpacity style={styles.formItem} onPress={() => setReportedToModalVisible(true)}>
                  <View style={styles.formItemLeft}>
                    <Text style={styles.formItemText}>
                      Reported To<Text style={styles.requiredStar}>*</Text>
                    </Text>
                  </View>
                  <View style={styles.formItemRight}>
                    {formData.reportedTo.length > 0 && (
                      <Text style={styles.selectedValueText} numberOfLines={1} ellipsizeMode="tail">
                        {formatSelectedItems(formData.reportedTo)}
                      </Text>
                    )}
                    <Feather name="chevron-right" size={20} color="#000" />
                  </View>
                </TouchableOpacity>
                <View style={styles.divider} />

                {/* Guest */}
                <TouchableOpacity style={styles.formItem}onPress={() => setGuestDetailsModalVisible(true)}>
                  <View style={styles.formItemLeft}>
                    <Text style={styles.formItemText}>Guest</Text>
                  </View>
                  <View style={styles.formItemRight}>
                    {formData.guest && <Text style={styles.selectedValueText}>{formData.guest}</Text>}
                    <Feather name="chevron-right" size={20} color="#000" />
                  </View>
                </TouchableOpacity>
                <View style={styles.divider} />

                {/* Category */}
                <TouchableOpacity style={styles.formItem} onPress={() => setCategoryModalVisible(true)}>
                  <View style={styles.formItemLeft}>
                    <Text style={styles.formItemText}>
                      Category<Text style={styles.requiredStar}>*</Text>
                    </Text>
                  </View>
                  <View style={styles.formItemRight}>
                    {formData.category.length > 0 && (
                      <Text style={styles.selectedValueText} numberOfLines={1} ellipsizeMode="tail">
                        {formatSelectedItems(formData.category)}
                      </Text>
                    )}
                    <Feather name="chevron-right" size={20} color="#000" />
                  </View>
                </TouchableOpacity>
                <View style={styles.divider} />

                {/* Department */}
                <TouchableOpacity style={styles.formItem} onPress={() => setDepartmentModalVisible(true)}>
                  <View style={styles.formItemLeft}>
                    <Text style={styles.formItemText}>
                      Department<Text style={styles.requiredStar}>*</Text>
                    </Text>
                  </View>
                  <View style={styles.formItemRight}>
                    {formData.department.length > 0 && (
                      <Text style={styles.selectedValueText} numberOfLines={1} ellipsizeMode="tail">
                        {formatSelectedItems(formData.department)}
                      </Text>
                    )}
                    <Feather name="chevron-right" size={20} color="#000" />
                  </View>
                </TouchableOpacity>
                <View style={styles.divider} />

                {/* Incident Description */}
                <TouchableOpacity style={styles.formItem} onPress={() => setDescriptionModalVisible(true)}>
                  <View style={styles.formItemLeft}>
                    <Text style={styles.formItemText}>
                      Incident Description<Text style={styles.requiredStar}>*</Text>
                    </Text>
                  </View>
                  <View style={styles.formItemRight}>
                    {formData.description && (
                      <Text style={styles.selectedValueText} numberOfLines={1} ellipsizeMode="tail">
                        {formData.description.length > 30
                          ? formData.description.substring(0, 30) + "..."
                          : formData.description}
                      </Text>
                    )}
                    <Feather name="chevron-right" size={20} color="#000" />
                  </View>
                </TouchableOpacity>
                <View style={styles.divider} />

                {/* Attachment */}
                <TouchableOpacity style={styles.formItem} onPress={() => setAttachmentModalVisible(true)}>
                  <View style={styles.formItemLeft}>
                    <Text style={styles.formItemText}>Attachment</Text>
                  </View>
                  <View style={styles.formItemRight}>
                    {formData.attachments.length > 0 && (
                      <Text style={styles.selectedValueText} numberOfLines={1} ellipsizeMode="tail">
                        {formatSelectedItems(formData.attachments)}
                      </Text>
                    )}
                    <Feather name="chevron-right" size={20} color="#000" />
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={tempDate}
            mode={datePickerMode}
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Submit Button - Fixed at the bottom */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.submitButton,
              //  !isFormValid() && styles.disabledButton
              ]}
            onPress={handleSubmit}
            // disabled={!isFormValid()}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Sub-modals */}
      <IncidentReportedToModal
        visible={reportedToModalVisible}
        onClose={() => setReportedToModalVisible(false)}
        onSelect={(employees) => {
          setFormData((prev) => ({ ...prev, reportedTo: employees }))
          setReportedToModalVisible(false)
        }}
      />
      <IncidentGuestDetailsModal
        visible={GuestDetailsModalVisible}
        onClose={() => setGuestDetailsModalVisible(false)}
       
      />
      <IncidentCategoryModal
        visible={categoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
        onSelect={(categories) => {
          setFormData((prev) => ({ ...prev, category: categories }))
          setCategoryModalVisible(false)
        }}
      />

      <IncidentDepartmentModal
        visible={departmentModalVisible}
        onClose={() => setDepartmentModalVisible(false)}
        onSelect={(departments) => {
          setFormData((prev) => ({ ...prev, department: departments }))
          setDepartmentModalVisible(false)
        }}
      />

      <IncidentDescriptionModal
        visible={descriptionModalVisible}
        onClose={() => setDescriptionModalVisible(false)}
        onSave={(desc) => {
          setFormData((prev) => ({ ...prev, description: desc }))
          setDescriptionModalVisible(false)
        }}
      />

      <IncidentAttachmentModal
        visible={attachmentModalVisible}
        onClose={() => setAttachmentModalVisible(false)}
        onSave={(files) => {
          setFormData((prev) => ({ ...prev, attachments: files }))
          setAttachmentModalVisible(false)
        }}
      />
    </AnimatedModal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 7,
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  formCardContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 0,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    overflow: "hidden",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  formItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  formItemRightColumn: {
    flex: 1,
    marginHorizontal: 1,
    justifyContent: "center",
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
    marginTop: 4,
    marginRight: 8,
    maxWidth: width * 0.4, // Limit width to prevent overflow
  },
  requiredStar: {
    color: "#FF5722",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 16,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "ios" ? 16 : 8,
    backgroundColor: "#f5f7fa",
  },
  submitButton: {
    backgroundColor: "#FF5722",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default IncidentNewModal
