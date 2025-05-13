"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from "react-native"
import { Calendar, ChevronRight, Share2, Trash2 } from "react-native-feather"
import Feather from "react-native-vector-icons/Feather"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
import AnimatedModal from "./AnimatedModal"
import DateTimePicker from '@react-native-community/datetimepicker'

interface LFArticleEditModalProps {
  visible: boolean
  onClose: () => void
  articleId: string
  navigation: any
  initialData?: {
    name: string
    description: string
    make: string
    colour: string
    category: string
    storedUntil: string
    storageLocation: string
    status: string
  }
  onSubmit: (data: any) => void
}

const LFArticleEditModal: React.FC<LFArticleEditModalProps> = ({
  visible,
  onClose,
  articleId,
  navigation,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      description: "",
      make: "",
      colour: "",
      category: "Employee Name",
      storedUntil: "01-04-2025",
      storageLocation: "Select Option",
      status: "Select Option",
    },
  )

  // Parse the initial date or use current date
  const parseInitialDate = () => {
    try {
      if (formData.storedUntil) {
        const [day, month, year] = formData.storedUntil.split('-').map(Number);
        return new Date(year, month - 1, day); // month is 0-indexed in JS Date
      }
    } catch (e) {
      console.log("Error parsing date:", e);
    }
    return new Date(); // Default to current date
  };

  // State for date picker
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(parseInitialDate());

  const [attachments, setAttachments] = useState([
    { id: "1", name: "Name.png", type: "image", size: "0.11MB" },
    { id: "2", name: "Name.doc", type: "document", size: "0.11MB" },
    { id: "3", name: "Name.mp4", type: "video", size: "0.11MB" },
  ])

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  // Handle date change
  const handleDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === 'ios'); // Keep open on iOS, close on Android
    if (date) {
      setSelectedDate(date);
      // Format date as DD-MM-YYYY
      const formattedDate = formatDate(date);
      handleInputChange("storedUntil", formattedDate);
    }
  };

  // Format date as DD-MM-YYYY
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      attachments,
    })
    onClose()
  }

  const handleDeleteAttachment = (id) => {
    setAttachments(attachments.filter((attachment) => attachment.id !== id))
  }

  const renderAttachmentIcon = (type) => {
    switch (type) {
      case "image":
        return <Feather name="image" size={20} color="#000" />
      case "document":
        return <AntDesign name="file1" size={20} color="#000" />
      case "video":
        return <MaterialCommunityIcons name="file-video-outline" size={20} color="#000" />
      default:
        return <AntDesign name="file1" size={20} color="#000" />
    }
  }

  return (
    <AnimatedModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <AntDesign name="back" size={26} style={{ color: "#000" }} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{articleId}</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Name Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Name<Text style={styles.asterisk}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Text"
              value={formData.name}
              onChangeText={(text) => handleInputChange("name", text)}
              placeholderTextColor="#A0A0A0"
            />
          </View>

          {/* Description Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Text"
              value={formData.description}
              onChangeText={(text) => handleInputChange("description", text)}
              placeholderTextColor="#A0A0A0"
            />
          </View>

          {/* Make Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Make</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Text"
              value={formData.make}
              onChangeText={(text) => handleInputChange("make", text)}
              placeholderTextColor="#A0A0A0"
            />
          </View>

          {/* Colour Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Colour</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Text"
              value={formData.colour}
              onChangeText={(text) => handleInputChange("colour", text)}
              placeholderTextColor="#A0A0A0"
            />
          </View>

          {/* Category Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Category<Text style={styles.asterisk}>*</Text>
            </Text>
            <TouchableOpacity style={styles.selectInput}>
              <Text style={styles.selectText}>{formData.category}</Text>
              <ChevronRight width={18} height={18} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Stored Until Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Stored Until<Text style={styles.asterisk}>*</Text>
            </Text>
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Calendar width={18} height={18} color="#000" style={styles.calendarIcon} />
              <Text style={styles.dateText}>{formData.storedUntil}</Text>
            </TouchableOpacity>
            
            {/* Date Picker */}
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>

          {/* Storage Location Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Storage Location<Text style={styles.asterisk}>*</Text>
            </Text>
            <TouchableOpacity style={styles.selectInput}>
              <Text style={[styles.selectText, formData.storageLocation === "Select Option" && styles.placeholderText]}>
                {formData.storageLocation}
              </Text>
              <ChevronRight width={18} height={18} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Status Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Status<Text style={styles.asterisk}>*</Text>
            </Text>
            <TouchableOpacity style={styles.selectInput}>
              <Text style={[styles.selectText, formData.status === "Select Option" && styles.placeholderText]}>
                {formData.status}
              </Text>
              <ChevronRight width={18} height={18} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Attachments Section */}
          <View style={styles.attachmentsContainer}>
            <TouchableOpacity style={styles.addAttachmentButton}>
              <Feather name="plus" size={18} color="#000" />
              <Text style={styles.addAttachmentText}>Attachment</Text>
            </TouchableOpacity>

            {attachments.map((attachment) => (
              <View key={attachment.id} style={styles.attachmentItem}>
                <View style={styles.attachmentInfo}>
                  <View style={styles.attachmentIconContainer}>{renderAttachmentIcon(attachment.type)}</View>
                  <View style={styles.attachmentDetails}>
                    <Text style={styles.attachmentName}>{attachment.name}</Text>
                    <Text style={styles.attachmentSize}>{attachment.size}</Text>
                  </View>
                </View>
                <View style={styles.attachmentActions}>
                  <TouchableOpacity style={styles.shareButton}>
                    <Share2 width={18} height={18} color="#666" />
                    <Text style={styles.shareText}>Share</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteAttachment(attachment.id)}>
                    <Trash2 width={18} height={18} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

         
        </ScrollView>
         {/* Submit Button */}
         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
      </View>
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
        marginBottom: 10,
        backgroundColor: "#fff",
        height: 55,
        paddingHorizontal: 10,
      },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
  content: {
    padding: 19,
    backgroundColor: "#ffffff",
    paddingBottom: 10,
    // borderRadius: 10,
    marginHorizontal: 1,
    marginBottom: 10,
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
  },
  calendarIcon: {
    marginRight: 8,
  },
  dateText: {
    fontSize: 14,
    color: "#000000",
  },
  attachmentsContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  addAttachmentButton: {
    height: 70,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 4,
    borderStyle: "dashed",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FE",
    marginBottom: 16,
  },
  addAttachmentText: {
    fontSize: 14,
    color: "#000000",
    marginLeft: 8,
  },
  attachmentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    marginVertical: 6,
    borderRadius: 10,
  },
  attachmentInfo: {
    flexDirection: "row",
    alignItems: "center",
    left: 8,
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
    marginRight: 8,
    backgroundColor: "#EBF0FA",
    borderRadius: 6,
  },
  shareText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 4,
  },
  deleteButton: {
    padding: 6,
  },
  submitButton: {
    backgroundColor: "#FF5722",
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    marginRight:15,
    marginLeft:15
  },
  submitText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
})

export default LFArticleEditModal