"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native"
import Feather from "react-native-vector-icons/Feather"
import AntDesign from "react-native-vector-icons/AntDesign"
import AnimatedModal from "./AnimatedModal"
import TMSubDepartmentModal from "./TMSubDepartmentModal"
import TMResolutionModal from "./TMResolutionModal"
import TMAssignToModal from "./TMAssignToModal"
import TMDescriptionModal from "./TMDescriptionModal"
import TMAttachmentModal from "./TMAttachmentModal"

const { height } = Dimensions.get("window")

interface Attachment {
  id: string
  name: string
  size: string
  type: string
  uri?: string
}

interface SubDepartment {
  id: string
  name: string
}

interface AssignTo {
  id: string
  name: string
}

interface TMNewScreenModalProps {
  visible: boolean
  onClose: () => void
  onSubmit: (formData: any) => void
}

const TMNewScreenModal: React.FC<TMNewScreenModalProps> = ({ visible, onClose, onSubmit }) => {
  // Form state
  const [formData, setFormData] = useState({
    subDepartment: [] as SubDepartment[],
    resolution: { resolutionType: null, resolutionDate: null },
    assignTo: [] as AssignTo[],
    taskDescription: "",
    attachments: [] as Attachment[],
  })

  // Modal visibility states
  const [subDepartmentModalVisible, setSubDepartmentModalVisible] = useState(false)
  const [resolutionModalVisible, setResolutionModalVisible] = useState(false)
  const [assignToModalVisible, setAssignToModalVisible] = useState(false)
  const [taskDescriptionModalVisible, setTaskDescriptionModalVisible] = useState(false)
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false)

  // Calculate content height to determine if scrolling is needed
  const [contentHeight, setContentHeight] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const [needsScrolling, setNeedsScrolling] = useState(false)

  useEffect(() => {
    // Check if content needs scrolling
    if (contentHeight > 0 && containerHeight > 0) {
      setNeedsScrolling(contentHeight > containerHeight)
    }
  }, [contentHeight, containerHeight])

  // Calculate appropriate modal height based on device
  const getModalHeight = () => {
    if (height < 600) {
      return "60%" // Reduced from 65% for smaller devices
    } else if (height > 1000) {
      return "45%" // Reduced from 50% for larger devices
    }
    return Platform.OS === "ios" ? "55%" : "53%" // Reduced from 60%/58% for default devices
  }

  // Check if required fields are filled
  const isFormValid = () => {
    return (
      formData.subDepartment.length > 0 &&
      formData.resolution.resolutionType !== null &&
      formData.assignTo.length > 0 &&
      formData.taskDescription.trim() !== ""
    )
  }

  // Handle form submission
  const handleSubmit = () => {
    if (isFormValid()) {
      onSubmit(formData)
      onClose()
    } else {
      // Show validation error (could be implemented with a toast or alert)
      console.log("Please fill all required fields")
    }
  }

  // Handle sub-department selection
  const handleSubDepartmentSelect = (items) => {
    setFormData({ ...formData, subDepartment: items })
  }

  // Handle resolution selection
  const handleResolutionSelect = (resolution) => {
    setFormData({ ...formData, resolution })
  }

  // Handle assign to selection
  const handleAssignToSelect = (items) => {
    setFormData({ ...formData, assignTo: items })
  }

  // Handle task description
  const handleTaskDescription = (description) => {
    setFormData({ ...formData, taskDescription: description })
  }

  // Handle attachment
  const handleAttachment = (attachments) => {
    setFormData({ ...formData, attachments })
  }

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

  return (
    <AnimatedModal visible={visible} onClose={onClose} adaptiveHeight={true} minHeight={getModalHeight()}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />

        {/* Header - Fixed at the top */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <AntDesign name="back" size={26} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New</Text>
        </View>

        {/* Content Container - Takes remaining space */}
        <View
          style={styles.contentContainer}
          onLayout={(event) => {
            setContainerHeight(event.nativeEvent.layout.height)
          }}
        >
          {/* Form Card - Fixed position */}
          <View style={styles.formCardContainer}>
            {/* Scrollable Form Content */}
            <ScrollView
              style={styles.formScrollView}
              contentContainerStyle={styles.formScrollViewContent}
              showsVerticalScrollIndicator={false}
            >
              <View
                onLayout={(event) => {
                  setContentHeight(event.nativeEvent.layout.height)
                }}
              >
                {/* Sub-Department */}
                <TouchableOpacity style={styles.formItem} onPress={() => setSubDepartmentModalVisible(true)}>
                  <View style={styles.formItemLeft}>
                    <Text style={styles.formItemText}>
                      Sub-Department<Text style={styles.requiredStar}>*</Text>
                    </Text>
                  </View>
                  <View style={styles.formItemRight}>
                    {formData.subDepartment.length > 0 ? (
                      <Text style={styles.selectedValueText} numberOfLines={1} ellipsizeMode="tail">
                        {formatSelectedItems(formData.subDepartment)}
                      </Text>
                    ) : null}
                    <Feather name="chevron-right" size={20} color="#000" />
                  </View>
                </TouchableOpacity>
                <View style={styles.divider} />

                {/* Resolution */}
                <TouchableOpacity style={styles.formItem} onPress={() => setResolutionModalVisible(true)}>
                  <View style={styles.formItemLeft}>
                    <Text style={styles.formItemText}>
                      Resolution<Text style={styles.requiredStar}>*</Text>
                    </Text>
                  </View>
                  <View style={styles.formItemRight}>
                    {formData.resolution.resolutionType ? (
                      <Text style={styles.selectedValueText}>
                        {formData.resolution.resolutionType === "until_resolved"
                          ? "Until Resolved"
                          : `Resolved: ${formData.resolution.resolutionDate}`}
                      </Text>
                    ) : null}
                    <Feather name="chevron-right" size={20} color="#000" />
                  </View>
                </TouchableOpacity>
                <View style={styles.divider} />

                {/* Assign To */}
                <TouchableOpacity style={styles.formItem} onPress={() => setAssignToModalVisible(true)}>
                  <View style={styles.formItemLeft}>
                    <Text style={styles.formItemText}>
                      Assign To<Text style={styles.requiredStar}>*</Text>
                    </Text>
                  </View>
                  <View style={styles.formItemRight}>
                    {formData.assignTo.length > 0 ? (
                      <Text style={styles.selectedValueText} numberOfLines={1} ellipsizeMode="tail">
                        {formatSelectedItems(formData.assignTo)}
                      </Text>
                    ) : null}
                    <Feather name="chevron-right" size={20} color="#000" />
                  </View>
                </TouchableOpacity>
                <View style={styles.divider} />

                {/* Task Description */}
                <TouchableOpacity style={styles.formItem} onPress={() => setTaskDescriptionModalVisible(true)}>
                  <View style={styles.formItemLeft}>
                    <Text style={styles.formItemText}>
                      Task Description<Text style={styles.requiredStar}>*</Text>
                    </Text>
                  </View>
                  <View style={styles.formItemRight}>
                    {formData.taskDescription ? (
                      <Text style={styles.selectedValueText} numberOfLines={1} ellipsizeMode="tail">
                        {formData.taskDescription.substring(0, 20)}
                        {formData.taskDescription.length > 20 ? "..." : ""}
                      </Text>
                    ) : null}
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
                    {formData.attachments.length > 0 ? (
                      <Text style={styles.selectedValueText} numberOfLines={1} ellipsizeMode="tail">
                        {formatSelectedItems(formData.attachments)}
                      </Text>
                    ) : null}
                    <Feather name="chevron-right" size={20} color="#000" />
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Submit Button - Fixed at the bottom */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              // !isFormValid() && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            // disabled={!isFormValid()}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* Sub Modals */}
        <TMSubDepartmentModal
          visible={subDepartmentModalVisible}
          onClose={() => setSubDepartmentModalVisible(false)}
          onSelect={handleSubDepartmentSelect}
          initialValue={formData.subDepartment}
        />

        <TMResolutionModal
          visible={resolutionModalVisible}
          onClose={() => setResolutionModalVisible(false)}
          onSelect={handleResolutionSelect}
          initialValue={formData.resolution}
        />

        <TMAssignToModal
          visible={assignToModalVisible}
          onClose={() => setAssignToModalVisible(false)}
          onSelect={handleAssignToSelect}
          initialValue={formData.assignTo}
        />

        {/* Task Description Modal */}
        <TMDescriptionModal
          visible={taskDescriptionModalVisible}
          onClose={() => setTaskDescriptionModalVisible(false)}
          onSelect={handleTaskDescription}
          initialValue={formData.taskDescription}
        />

        {/* Attachment Modal */}
        <TMAttachmentModal
          visible={attachmentModalVisible}
          onClose={() => setAttachmentModalVisible(false)}
          onSelect={handleAttachment}
          initialValue={formData.attachments}
        />
      </SafeAreaView>
    </AnimatedModal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    paddingTop: 10,
  },
  formCardContainer: {
    flex: 1,
    backgroundColor: "#fff",
    // borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
    marginLeft: -0,
    marginRight: -0,
  },
  formScrollView: {
    flex: 1,
  },
  formScrollViewContent: {
    paddingBottom: 0, // Reduced from 4
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
    maxWidth: "60%", // Limit width to prevent overflow
  },
  formItemText: {
    fontSize: 16,
    color: "#000",
  },
  selectedValueText: {
    fontSize: 14,
    color: "#666",
    marginRight: 8,
    flexShrink: 1, // Allow text to shrink if needed
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
    paddingBottom: 0, // Reduced from Platform.OS === "ios" ? 16 : 20
    paddingTop: 10,
    backgroundColor: "#f0f2f5",
  },
  submitButton: {
    backgroundColor: "#FF5722",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0, // Changed from -7 to 0
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default TMNewScreenModal
