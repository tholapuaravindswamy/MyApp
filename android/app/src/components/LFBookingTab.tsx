"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { ChevronUp, ChevronDown } from "react-native-feather"

interface LFBookingTabProps {
  navigation?: any
  onEditPrimaryDetails?: () => void
  primaryDetails?: {
    uid: string
    createdOn: string
    createdBy: string
    foundLocation: string
    foundOn: string
    foundBy: string
    articleCount: string
  }
}

const LFBookingTab: React.FC<LFBookingTabProps> = ({
  navigation,
  onEditPrimaryDetails,
  primaryDetails = {
    uid: "ABCD123456789",
    createdOn: "01-04-2025 04:37",
    createdBy: "Employee Name",
    foundLocation: "Room Number/Public Area",
    foundOn: "01-04-2025",
    foundBy: "Employee Name",
    articleCount: "02",
  },
}) => {
  const [expanded, setExpanded] = useState(true)

  const toggleExpand = () => setExpanded(!expanded)

  const handleEdit = () => {
    if (onEditPrimaryDetails) {
      onEditPrimaryDetails()
    } else {
      navigation?.navigate("LFPrimaryDetailsEdit")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <TouchableOpacity style={styles.detailsHeader} onPress={toggleExpand}>
          <View style={styles.detailsTitleContainer}>
            <Text style={styles.detailsTitle}>Primary Details</Text>
            <TouchableOpacity onPress={handleEdit}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
          {expanded ? (
            <ChevronUp width={20} height={20} color="#000000" />
          ) : (
            <ChevronDown width={20} height={20} color="#000000" />
          )}
        </TouchableOpacity>

        {expanded && (
          <View style={styles.detailsContent}>
            {/* Your full Primary Details section */}
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>UID</Text>
                <Text style={styles.detailValue}>{primaryDetails.uid}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>
                  Created By<Text style={styles.asterisk}>*</Text>
                </Text>
                <Text style={styles.detailValue}>{primaryDetails.createdBy}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>
                  Created On<Text style={styles.asterisk}>*</Text>
                </Text>
                <Text style={styles.detailValue}>{primaryDetails.createdOn}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>
                  Found Location<Text style={styles.asterisk}>*</Text>
                </Text>
                <Text style={styles.detailValue}>{primaryDetails.foundLocation}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>
                  Found On<Text style={styles.asterisk}>*</Text>
                </Text>
                <Text style={styles.detailValue}>{primaryDetails.foundOn}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>
                  Found By<Text style={styles.asterisk}>*</Text>
                </Text>
                <Text style={styles.detailValue}>{primaryDetails.foundBy}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>
                  Article Count<Text style={styles.asterisk}>*</Text>
                </Text>
                <Text style={styles.detailValue}>{primaryDetails.articleCount}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F5F7FA",
  },
  detailsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  detailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#EBF0FA",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  detailsTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
  editButton: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4A6FFF",
    marginLeft: 8,
  },
  detailsContent: {
    padding: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  detailItem: {
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
    fontWeight: "400",
  },
  asterisk: {
    color: "#FF0000",
  },
})

export default LFBookingTab
