"use client"

import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, Dimensions } from "react-native"
import { ChevronUp, ChevronDown, Share2 } from "react-native-feather"
import Feather from "react-native-vector-icons/Feather"
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { TextInput } from "react-native-gesture-handler"
import TMPrimaryDetailsModal from "../components/TMPrimaryDetailsModal"
import TMDescriptionModal from "../components/TMDescriptionModal"
import TMAttachmentModal from "../components/TMAttachmentModal"

const { width } = Dimensions.get("window")

const TMDetails = ({ navigation }) => {
  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState({
    primaryDetails: true,
    task: true,
    attachment: true,
  })

  // State for modal visibility
  const [modals, setModals] = useState({
    primaryDetails: false,
    description: false,
    attachment: false,
  })

  // State for task data
  const [taskData, setTaskData] = useState({
    primaryDetails: {
      uid: "ABCD1234567890",
      createdBy: "Employee Name",
      createdOn: "01-04-2025 00:00",
      resolutionType: "Resolution Type Name",
      resolutionDate: "01-04-2025",
      subDepartment: "Sub-Department Name",
      assignedTo: ["Employee Name",],
      status: "Status Name",
    },
    description: "",
    attachments: [
      { id: "1", name: "Name.png", type: "png", size: "0.11MB" },
      { id: "2", name: "Name.doc", type: "doc", size: "0.11MB" },
      { id: "3", name: "Name.mp4", type: "mp4", size: "0.11MB" },
    ],
  })

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const handleBack = () => {
    navigation?.goBack()
  }

  const handleEdit = (section) => {
    console.log(`Edit ${section}`)
    // Open the corresponding modal instead of navigating
    if (section === "TMPrimaryDetails") {
      setModals({ ...modals, primaryDetails: true })
    } else if (section === "TMDescription") {
      setModals({ ...modals, description: true })
    } else if (section === "TMAttachment") {
      setModals({ ...modals, attachment: true })
    }
  }

  const handlePrimaryDetailsSubmit = (data) => {
    setTaskData({
      ...taskData,
      primaryDetails: data,
    })
  }

  const handleDescriptionSubmit = (description) => {
    setTaskData({
      ...taskData,
      description,
    })
  }

  const handleAttachmentSubmit = (attachments) => {
    setTaskData({
      ...taskData,
      attachments,
    })
  }

  const renderAttachmentIcon = (type) => {
    switch (type) {
      case "png":
        return <Feather name="image" size={20} color="#000" />
      case "doc":
        return <AntDesign name="file1" size={20} color="#000" />
      case "mp4":
        return <MaterialCommunityIcons name="file-video-outline" size={20} color="#000" />
      default:
        return <AntDesign name="file1" size={20} color="#000" />
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <AntDesign name="back" size={26} style={{ color: "white" }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>UID: {taskData.primaryDetails.uid}</Text>
      </View>

      {/* Tab Navigation
      <View style={styles.tabContainer}>
        <View style={styles.activeTab}>
          <Text style={styles.activeTabText}>Booking</Text>
        </View>
      </View> */}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Primary Details Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <Text style={styles.sectionTitle}>Primary Details</Text>
              <TouchableOpacity onPress={() => handleEdit("TMPrimaryDetails")}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => toggleSection("primaryDetails")} style={styles.chevronButton}>
              {expandedSections.primaryDetails ? (
                <ChevronUp width={20} height={20} color="#000000" />
              ) : (
                <ChevronDown width={20} height={20} color="#000000" />
              )}
            </TouchableOpacity>
          </View>

          {expandedSections.primaryDetails && (
            <View style={styles.sectionContent}>
              <View style={styles.detailRow}>
                <View style={styles.detailColumn}>
                  <Text style={styles.detailLabel}>
                    UID<Text style={styles.asterisk}>*</Text>
                  </Text>
                  <Text style={styles.detailValue}>{taskData.primaryDetails.uid}</Text>
                </View>
                <View style={styles.detailColumn}>
                  <Text style={styles.detailLabel}>
                    Created By<Text style={styles.asterisk}>*</Text>
                  </Text>
                  <Text style={styles.detailValue}>{taskData.primaryDetails.createdBy}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailColumn}>
                  <Text style={styles.detailLabel}>
                    Created On<Text style={styles.asterisk}>*</Text>
                  </Text>
                  <Text style={styles.detailValue}>{taskData.primaryDetails.createdOn}</Text>
                </View>
                <View style={styles.detailColumn}>
                  <Text style={styles.detailLabel}>
                    Resolution Type<Text style={styles.asterisk}>*</Text>
                  </Text>
                  <Text style={styles.detailValue}>{taskData.primaryDetails.resolutionType}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailColumn}>
                  <Text style={styles.detailLabel}>
                    Resolution Date<Text style={styles.asterisk}>*</Text>
                  </Text>
                  <Text style={styles.detailValue}>{taskData.primaryDetails.resolutionDate}</Text>
                </View>
                <View style={styles.detailColumn}>
                  <Text style={styles.detailLabel}>
                    Sub-Department<Text style={styles.asterisk}>*</Text>
                  </Text>
                  <Text style={styles.detailValue}>{taskData.primaryDetails.subDepartment}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailColumn}>
                  <Text style={styles.detailLabel}>
                    Assigned To<Text style={styles.asterisk}>*</Text>
                  </Text>
                  {taskData.primaryDetails.assignedTo.map((employee, index) => (
                    <Text key={index} style={styles.detailValue}>
                      {employee}
                    </Text>
                  ))}
                </View>
                <View style={styles.detailColumn}>
                  <Text style={styles.detailLabel}>
                    Status<Text style={styles.asterisk}>*</Text>
                  </Text>
                  <Text style={styles.detailValue}>{taskData.primaryDetails.status}</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Task Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <Text style={styles.sectionTitle}>Task</Text>
              <TouchableOpacity onPress={() => handleEdit("TMDescription")}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => toggleSection("task")} style={styles.chevronButton}>
              {expandedSections.task ? (
                <ChevronUp width={20} height={20} color="#000000" />
              ) : (
                <ChevronDown width={20} height={20} color="#000000" />
              )}
            </TouchableOpacity>
          </View>

          {expandedSections.task && (
            <View style={styles.sectionContent}>
              <Text style={styles.taskLabel}>Description</Text>
              <View style={styles.descriptionContainer}>
                <TextInput placeholder="Enter Description" value={taskData.description} editable={false} />
              </View>
            </View>
          )}
        </View>

        {/* Attachment Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <Text style={styles.sectionTitle}>Attachment</Text>
              <TouchableOpacity onPress={() => handleEdit("TMAttachment")}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => toggleSection("attachment")} style={styles.chevronButton}>
              {expandedSections.attachment ? (
                <ChevronUp width={20} height={20} color="#000000" />
              ) : (
                <ChevronDown width={20} height={20} color="#000000" />
              )}
            </TouchableOpacity>
          </View>

          {expandedSections.attachment && (
            <View style={styles.sectionContent}>
              {taskData.attachments.map((attachment, index) => (
                <View
                  key={attachment.id}
                  style={[
                    styles.attachmentItem,
                    index < taskData.attachments.length - 1 && styles.attachmentItemBorder,
                  ]}
                >
                  <View style={styles.attachmentInfo}>
                    <View style={styles.attachmentIconContainer}>{renderAttachmentIcon(attachment.type)}</View>
                    <View style={styles.attachmentDetails}>
                      <Text style={styles.attachmentName}>{attachment.name}</Text>
                      <Text style={styles.attachmentSize}>{attachment.size}</Text>
                    </View>
                  </View>
                  <View style={styles.attachmentActions}>
                    <TouchableOpacity style={styles.shareButton}>
                      <Share2 width={16} height={16} color="#666666" />
                      <Text style={styles.shareText}>Share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.moreButton}>
                      <ChevronDown width={16} height={16} color="#666666" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modals */}
      <TMPrimaryDetailsModal
        visible={modals.primaryDetails}
        onClose={() => setModals({ ...modals, primaryDetails: false })}
        onSubmit={handlePrimaryDetailsSubmit}
        initialData={taskData.primaryDetails}
      />

      <TMDescriptionModal
        visible={modals.description}
        onClose={() => setModals({ ...modals, description: false })}
        onSubmit={handleDescriptionSubmit}
        initialDescription={taskData.description}
      />

      <TMAttachmentModal
        visible={modals.attachment}
        onClose={() => setModals({ ...modals, attachment: false })}
        onSubmit={handleAttachmentSubmit}
        initialAttachments={taskData.attachments}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#000000",
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#EBF0FA",
  },
  activeTab: {
    backgroundColor: "#FF5722",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  sectionContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#EBF0FA",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sectionHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    fontSize: 14,
    color: "#007AFF",
    marginRight: 12,
  },
  chevronButton: {
    padding: 2,
  },
  sectionContent: {
    padding: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  detailColumn: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 2,
  },
  asterisk: {
    color: "#FF3B30",
  },
  taskLabel: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 8,
  },
  descriptionContainer: {
    height: 90,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 4,
  },
  attachmentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  attachmentItemBorder: {
    borderWidth: 1,
    borderColor: "#F0F0F0",
    marginVertical: 6,
    borderRadius: 8,
  },
  attachmentInfo: {
    flexDirection: "row",
    alignItems: "center",
    left: 10,
  },
  attachmentIconContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 4,
    marginRight: 12,
  },
  attachmentDetails: {
    justifyContent: "center",
  },
  attachmentName: {
    fontSize: 14,
    color: "#000000",
  },
  attachmentSize: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
  attachmentActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#EBF0FA",
    borderRadius: 6,
  },
  shareText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 4,
  },
  moreButton: {
    padding: 6,
  },
})

export default TMDetails
