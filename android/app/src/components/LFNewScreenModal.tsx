"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, Dimensions, ScrollView } from "react-native"
import Feather from "react-native-vector-icons/Feather"
import AntDesign from "react-native-vector-icons/AntDesign"
import DateTimePicker from "@react-native-community/datetimepicker"
import AnimatedModal from "./AnimatedModal"
import LFLocationModal from "./LFLocationModal"
import LFFoundByModal from "./LFFoundByModal"
import LFArticleCountModal from "./LFArticleCountModal"
import LFGuestDetails from "./LFGuestDetails"

const { height } = Dimensions.get("window")

interface LFNewScreenModalProps {
  visible: boolean
  onClose: () => void
  navigation: any
}

interface FormData {
  foundDate: string
  foundLocation: string
  foundBy: string
  guest?: string
  articleCount: string
}

const LFNewScreenModal: React.FC<LFNewScreenModalProps> = ({ visible, onClose, navigation }) => {
  // State for sub-modals visibility
  const [locationModalVisible, setLocationModalVisible] = useState(false)
  const [foundByModalVisible, setFoundByModalVisible] = useState(false)
  const [guestDetailsModalVisible, setGuestDetailsModalVisible] = useState(false)
  const [articleCountModalVisible, setArticleCountModalVisible] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    foundDate: "",
    foundLocation: "",
    foundBy: "",
    guest: "",
    articleCount: "",
  })

  // Calculate appropriate modal height based on device
  const getModalHeight = () => {
    if (showDatePicker && Platform.OS === "ios") {
      return "55%"
    }

    // For different screen sizes, adjust the percentage
    if (height < 600) {
      return "65%" // Smaller devices need more relative space
    } else if (height > 1000) {
      return "55%" // Larger devices need less relative space
    }

    // Default for most devices
    return "55%"
  }

  const handleSubmit = () => {
    // Process form submission
    console.log("Form submitted", formData)
    onClose()
  }

  const handleLocationSelect = (location: string) => {
    setFormData((prev) => ({ ...prev, foundLocation: location }))
  }

  const handleFoundBySelect = (employee: string) => {
    setFormData((prev) => ({ ...prev, foundBy: employee }))
  }

  const handleArticleCountSelect = (count: string) => {
    setFormData((prev) => ({ ...prev, articleCount: count }))
  }

  const handleGuestSubmit = (guestData: any) => {
    // Create a guest display name from the guest data
    const guestName = `${guestData.firstName} ${guestData.lastName}`
    setFormData((prev) => ({ ...prev, guest: guestName }))
  }

  // Check if form is valid for submission
  const isFormValid = () => {
    return (
      formData.foundDate !== "" &&
      formData.foundLocation !== "" &&
      formData.foundBy !== "" &&
      formData.articleCount !== ""
    )
  }

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("en-GB") // Format: DD/MM/YYYY
      setFormData((prev) => ({ ...prev, foundDate: formattedDate }))
    }
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
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Form Card */}
          <View style={styles.formCard}>
            {/* Found Date */}
            <TouchableOpacity style={styles.formItem} onPress={() => setShowDatePicker(true)}>
              <View style={styles.formItemLeft}>
                <Feather name="calendar" size={20} color="#000" style={styles.formItemIcon} />
                <View>
                  <Text style={styles.formItemText}>
                    Found Date<Text style={styles.requiredStar}>*</Text>
                  </Text>
                  {formData.foundDate ? <Text style={styles.selectedValueText}>{formData.foundDate}</Text> : null}
                </View>
              </View>
              <Feather name="chevron-right" size={20} color="#000" />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onChangeDate}
                maximumDate={new Date()} // Optional: limit to today
              />
            )}
            <View style={styles.divider} />

            {/* Found Location */}
            <TouchableOpacity style={styles.formItem} onPress={() => setLocationModalVisible(true)}>
              <View style={styles.formItemLeft}>
                <Text style={styles.formItemText}>
                  Found Location<Text style={styles.requiredStar}>*</Text>
                </Text>
              </View>
              <View style={styles.formItemRight}>
                {formData.foundLocation && <Text style={styles.selectedValueText}>{formData.foundLocation}</Text>}
                <Feather name="chevron-right" size={20} color="#000" />
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />

            {/* Found By */}
            <TouchableOpacity style={styles.formItem} onPress={() => setFoundByModalVisible(true)}>
              <View style={styles.formItemLeft}>
                <Text style={styles.formItemText}>
                  Found By<Text style={styles.requiredStar}>*</Text>
                </Text>
              </View>
              <View style={styles.formItemRight}>
                {formData.foundBy && <Text style={styles.selectedValueText}>{formData.foundBy}</Text>}
                <Feather name="chevron-right" size={20} color="#000" />
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />

            {/* Guest */}
            <TouchableOpacity style={styles.formItem} onPress={() => setGuestDetailsModalVisible(true)}>
              <View style={styles.formItemLeft}>
                <Text style={styles.formItemText}>Guest</Text>
              </View>
              <View style={styles.formItemRight}>
                {formData.guest && <Text style={styles.selectedValueText}>{formData.guest}</Text>}
                <Feather name="chevron-right" size={20} color="#000" />
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />

            {/* Article Count */}
            <TouchableOpacity style={styles.formItem} onPress={() => setArticleCountModalVisible(true)}>
              <View style={styles.formItemLeft}>
                <Text style={styles.formItemText}>
                  Article Count<Text style={styles.requiredStar}>*</Text>
                </Text>
              </View>
              <View style={styles.formItemRight}>
                {formData.articleCount && <Text style={styles.selectedValueText}>{formData.articleCount}</Text>}
                <Feather name="chevron-right" size={20} color="#000" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              //  !isFormValid() && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            // disabled={!isFormValid()}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Sub-modals */}
        <LFLocationModal
          visible={locationModalVisible}
          onClose={() => setLocationModalVisible(false)}
          onSelect={handleLocationSelect}
        />

        <LFFoundByModal
          visible={foundByModalVisible}
          onClose={() => setFoundByModalVisible(false)}
          onSelect={handleFoundBySelect}
        />

        <LFGuestDetails
          visible={guestDetailsModalVisible}
          onClose={() => setGuestDetailsModalVisible(false)}
          onSubmit={handleGuestSubmit}
        />

        <LFArticleCountModal
          visible={articleCountModalVisible}
          onClose={() => setArticleCountModalVisible(false)}
          onSelect={handleArticleCountSelect}
        />
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
    paddingBottom: Platform.OS === "ios" ? 16 : 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 10,
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
  formCard: {
    backgroundColor: "#fff",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
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
    flex: 1,
  },
  formItemRight: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "50%",
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
    flexShrink: 1,
  },
  requiredStar: {
    color: "#FF5722",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 16,
  },
  submitButton: {
    backgroundColor: "#FF5722",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 8,
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

export default LFNewScreenModal
