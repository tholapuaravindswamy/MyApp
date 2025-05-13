import React from "react"
import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Platform } from "react-native"
import { Calendar, ChevronRight } from "react-native-feather"
import AntDesign from "react-native-vector-icons/AntDesign"
import AnimatedModal from "./AnimatedModal"
import DateTimePicker from "@react-native-community/datetimepicker"
import CreatedByModal from "./TMCreatedByModal"
import ResolutionTypeModal from "./TMResolutionTypeModal"
import SubDepartmentModal from "./TMSub-DepartmentModal"
import AssignedToModal from "./TMAssignedToModal"
import StatusModal from "./TMStatusModal"

interface TMPrimaryDetailsModalProps {
  visible: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  initialData?: any
}

const TMPrimaryDetailsModal: React.FC<TMPrimaryDetailsModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData = {},
}) => {
  // Format date as DD-MM-YYYY
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  // Format date and time as DD-MM-YYYY HH:MM
  const formatDateTime = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    return `${day}-${month}-${year}  ${hours}:${minutes}`
  }

  const [formData, setFormData] = useState({
    uid: initialData.uid || "ABCD12345678",
    createdOn: initialData.createdOn || formatDateTime(new Date()),
    createdBy: initialData.createdBy || "Employee Name",
    resolutionType: initialData.resolutionType || "Employee Name",
    resolutionDate: initialData.resolutionDate || formatDate(new Date()),
    subDepartment: initialData.subDepartment || "Select Option",
    assignedTo: initialData.assignedTo || "Select Option",
    status: initialData.status || "Select Option",
  })

  const [dateTimePickerState, setDateTimePickerState] = useState({
    show: false,
    mode: "date" as "date" | "time",
    currentField: "",
    currentDate: new Date(),
  })

  // State for controlling the visibility of selection modals
  const [modalState, setModalState] = useState({
    createdByModal: false,
    resolutionTypeModal: false,
    subDepartmentModal: false,
    assignedToModal: false,
    statusModal: false,
  })

  React.useEffect(() => {
    if (visible) {
      // Update the createdOn field with the current date and time when the modal opens
      if (!initialData.createdOn) {
        setFormData((prev) => ({
          ...prev,
          createdOn: formatDateTime(new Date()),
        }))
      }
    }
  }, [visible, initialData])

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = () => {
    onSubmit(formData)
    onClose()
  }

  const handleSelectOption = (field: string) => {
    // Open the appropriate modal based on the field
    switch (field) {
      case "createdBy":
        setModalState({ ...modalState, createdByModal: true })
        break
      case "resolutionType":
        setModalState({ ...modalState, resolutionTypeModal: true })
        break
      case "subDepartment":
        setModalState({ ...modalState, subDepartmentModal: true })
        break
      case "assignedTo":
        setModalState({ ...modalState, assignedToModal: true })
        break
      case "status":
        setModalState({ ...modalState, statusModal: true })
        break
      default:
        break
    }
  }

  const handleDateSelect = (field: string, mode: "date" | "time" = "date") => {
    // Set the current date based on the field's existing value if available
    const currentDate = new Date()

    if (field === "createdOn" && formData.createdOn) {
      const [datePart, timePart] = formData.createdOn.split("  ")
      if (datePart) {
        const [day, month, year] = datePart.split("-").map(Number)
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          currentDate.setFullYear(year, month - 1, day)
        }

        if (timePart) {
          const [hours, minutes] = timePart.split(":").map(Number)
          if (!isNaN(hours) && !isNaN(minutes)) {
            currentDate.setHours(hours, minutes)
          }
        }
      }
    } else if (field === "resolutionDate" && formData.resolutionDate) {
      const [day, month, year] = formData.resolutionDate.split("-").map(Number)
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        currentDate.setFullYear(year, month - 1, day)
      }
    }

    setDateTimePickerState({
      show: true,
      mode,
      currentField: field,
      currentDate,
    })
  }

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const { currentField, mode } = dateTimePickerState

    // Hide the picker
    setDateTimePickerState({
      ...dateTimePickerState,
      show: Platform.OS === "ios" ? true : false,
      mode: mode === "date" && Platform.OS === "ios" && currentField === "createdOn" ? "time" : mode,
    })

    if (selectedDate) {
      // Update the form data based on which field was being edited
      if (currentField === "createdOn") {
        if (mode === "date") {
          // If we just picked a date, keep the time from the existing value or use current time
          const existingTime =
            formData.createdOn.split("  ")[1] ||
            `${String(new Date().getHours()).padStart(2, "0")}:${String(new Date().getMinutes()).padStart(2, "0")}`

          // For iOS, we'll show the time picker next
          if (Platform.OS === "ios") {
            setDateTimePickerState({
              ...dateTimePickerState,
              mode: "time",
              currentDate: selectedDate,
            })
          } else {
            // For Android, we need to handle date and time separately
            const formattedDate = formatDate(selectedDate)
            setFormData({
              ...formData,
              createdOn: `${formattedDate}  ${existingTime}`,
            })

            // Show time picker after selecting date on Android
            setTimeout(() => {
              handleDateSelect("createdOn", "time")
            }, 300)
          }
        } else {
          // We just picked a time
          const hours = String(selectedDate.getHours()).padStart(2, "0")
          const minutes = String(selectedDate.getMinutes()).padStart(2, "0")
          const existingDate = formData.createdOn.split("  ")[0] || formatDate(new Date())

          setFormData({
            ...formData,
            createdOn: `${existingDate}  ${hours}:${minutes}`,
          })
        }
      } else if (currentField === "resolutionDate") {
        setFormData({
          ...formData,
          resolutionDate: formatDate(selectedDate),
        })
      }

      // Update the current date in state
      setDateTimePickerState((prev) => ({
        ...prev,
        currentDate: selectedDate,
      }))
    }
  }

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <AntDesign name="back" size={26} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Primary Details</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* UID Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              UID<Text style={styles.asterisk}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={formData.uid}
              onChangeText={(text) => handleInputChange("uid", text)}
            />
          </View>

          {/* Created On Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Created On<Text style={styles.asterisk}>*</Text>
            </Text>
            <View style={styles.dateTimeContainer}>
              <TouchableOpacity
                style={[styles.dateInput, { flex: 1 }]}
                onPress={() => handleDateSelect("createdOn", "date")}
              >
                <Calendar width={18} height={18} color="#000000" style={styles.calendarIcon} />
                <Text style={styles.dateText}>{formData.createdOn}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Created By Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Created By<Text style={styles.asterisk}>*</Text>
            </Text>
            <TouchableOpacity style={styles.selectInput} onPress={() => handleSelectOption("createdBy")}>
              <Text style={styles.selectText}>{formData.createdBy}</Text>
              <ChevronRight width={18} height={18} color="#000000" />
            </TouchableOpacity>
          </View>

          {/* Resolution Type Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Resolution Type<Text style={styles.asterisk}>*</Text>
            </Text>
            <TouchableOpacity style={styles.selectInput} onPress={() => handleSelectOption("resolutionType")}>
              <Text style={styles.selectText}>{formData.resolutionType}</Text>
              <ChevronRight width={18} height={18} color="#000000" />
            </TouchableOpacity>
          </View>

          {/* Resolution Date Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Resolution Date<Text style={styles.asterisk}>*</Text>
            </Text>
            <TouchableOpacity style={styles.dateInput} onPress={() => handleDateSelect("resolutionDate")}>
              <Calendar width={18} height={18} color="#000000" style={styles.calendarIcon} />
              <Text style={styles.dateText}>{formData.resolutionDate}</Text>
            </TouchableOpacity>
          </View>

          {/* Sub-Department Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Sub-Department<Text style={styles.asterisk}>*</Text>
            </Text>
            <TouchableOpacity style={styles.selectInput} onPress={() => handleSelectOption("subDepartment")}>
              <Text style={[styles.selectText, formData.subDepartment === "Select Option" && styles.placeholderText]}>
                {formData.subDepartment}
              </Text>
              <ChevronRight width={18} height={18} color="#000000" />
            </TouchableOpacity>
          </View>

          {/* Assigned To Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Assigned To<Text style={styles.asterisk}>*</Text>
            </Text>
            <TouchableOpacity style={styles.selectInput} onPress={() => handleSelectOption("assignedTo")}>
              <Text style={[styles.selectText, formData.assignedTo === "Select Option" && styles.placeholderText]}>
                {formData.assignedTo}
              </Text>
              <ChevronRight width={18} height={18} color="#000000" />
            </TouchableOpacity>
          </View>

          {/* Status Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Status<Text style={styles.asterisk}>*</Text>
            </Text>
            <TouchableOpacity style={styles.selectInput} onPress={() => handleSelectOption("status")}>
              <Text style={[styles.selectText, formData.status === "Select Option" && styles.placeholderText]}>
                {formData.status}
              </Text>
              <ChevronRight width={18} height={18} color="#000000" />
            </TouchableOpacity>
          </View>

         
        </ScrollView>

        {/* Date Time Picker */}
        {dateTimePickerState.show && (
          <DateTimePicker
            value={dateTimePickerState.currentDate}
            mode={dateTimePickerState.mode}
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Selection Modals */}
        <CreatedByModal
          visible={modalState.createdByModal}
          onClose={() => setModalState({ ...modalState, createdByModal: false })}
          onSelect={(value) => handleInputChange("createdBy", value)}
        />

        <ResolutionTypeModal
          visible={modalState.resolutionTypeModal}
          onClose={() => setModalState({ ...modalState, resolutionTypeModal: false })}
          onSelect={(value) => handleInputChange("resolutionType", value)}
        />

        <SubDepartmentModal
          visible={modalState.subDepartmentModal}
          onClose={() => setModalState({ ...modalState, subDepartmentModal: false })}
          onSelect={(value) => handleInputChange("subDepartment", value)}
        />

        <AssignedToModal
          visible={modalState.assignedToModal}
          onClose={() => setModalState({ ...modalState, assignedToModal: false })}
          onSelect={(value) => handleInputChange("assignedTo", value)}
        />

        <StatusModal
          visible={modalState.statusModal}
          onClose={() => setModalState({ ...modalState, statusModal: false })}
          onSelect={(value) => handleInputChange("status", value)}
        />
         {/* Submit Button */}
         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
      </SafeAreaView>
    </AnimatedModal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  content: {
    padding: 10,
    backgroundColor: "#ffffff",
    paddingBottom: 10,
    // borderRadius: 10,
    marginHorizontal: 1,
    marginBottom: 2,
    marginTop: 10,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000000",
    marginBottom: 8,
  },
  asterisk: {
    color: "#FF3B30",
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#000000",
    backgroundColor: "#FFFFFF",
  },
  selectInput: {
    height: 44,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  selectText: {
    fontSize: 14,
    color: "#000000",
  },
  placeholderText: {
    color: "#A0A0A0",
  },
  dateInput: {
    height: 44,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  calendarIcon: {
    marginRight: 8,
  },
  dateText: {
    fontSize: 14,
    color: "#000000",
  },
  submitButton: {
    backgroundColor: "#FF5722",
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 8,
    marginRight:15,
    marginLeft:15
  },
  submitText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
})

export default TMPrimaryDetailsModal