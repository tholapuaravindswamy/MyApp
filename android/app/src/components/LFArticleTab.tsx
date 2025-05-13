"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import LFArticleEditModal from "./LFArticleEditModal"

const { width } = Dimensions.get("window")

const LFArticleTab = ({ navigation }) => {
  const [expandedArticles, setExpandedArticles] = useState({
    "Article - 01": true,
    "Article - 02": true,
  })

  // State for article edit modal
  const [articleEditModalVisible, setArticleEditModalVisible] = useState(false)
  const [currentArticleId, setCurrentArticleId] = useState("")

  const handleEdit = (articleId) => {
    // For both Article-01 and Article-02, use the modal
    setCurrentArticleId(articleId)
    setArticleEditModalVisible(true)
  }

  const handleArticleSubmit = (data) => {
    console.log("Article data submitted:", data, "for article:", currentArticleId)
    // Here you would update your state or make an API call with the updated data
    setArticleEditModalVisible(false)
  }

  const toggleArticle = (articleId) => {
    setExpandedArticles({
      ...expandedArticles,
      [articleId]: !expandedArticles[articleId],
    })
  }

  const renderArticleSection = (articleId, articleData) => {
    return (
      <View style={styles.articleContainer} key={articleId}>
        <TouchableOpacity style={styles.articleHeader} onPress={() => toggleArticle(articleId)} activeOpacity={0.7}>
          <View style={styles.articleTitleContainer}>
            <Text style={styles.articleTitle}>{articleId}</Text>
            <TouchableOpacity onPress={() => handleEdit(articleId)}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
          <AntDesign name={expandedArticles[articleId] ? "up" : "down"} size={16} color="#000000" />
        </TouchableOpacity>

        {expandedArticles[articleId] && (
          <View style={styles.articleContent}>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>
                  Name<Text style={styles.asterisk}>*</Text>
                </Text>
                <Text style={styles.detailValue}>{articleData.name}</Text>
              </View>
              <View style={[styles.detailItem, styles.rightAlign]}>
                <Text style={styles.detailLabel}>Description</Text>
                <Text style={styles.detailValue}>{articleData.description}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Make</Text>
                <Text style={styles.detailValue}>{articleData.make}</Text>
              </View>
              <View style={[styles.detailItem, styles.rightAlign]}>
                <Text style={styles.detailLabel}>
                  Colour<Text style={styles.asterisk}>*</Text>
                </Text>
                <Text style={styles.detailValue}>{articleData.colour}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>
                  Category<Text style={styles.asterisk}>*</Text>
                </Text>
                <Text style={styles.detailValue}>{articleData.category}</Text>
              </View>
              <View style={[styles.detailItem, styles.rightAlign]}>
                <Text style={styles.detailLabel}>
                  Stored Until<Text style={styles.asterisk}>*</Text>
                </Text>
                <Text style={styles.detailValue}>{articleData.storedUntil}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>
                  Storage Location<Text style={styles.asterisk}>*</Text>
                </Text>
                <Text style={styles.detailValue}>{articleData.storageLocation}</Text>
              </View>
              <View style={[styles.detailItem, styles.rightAlign]}>
                <Text style={styles.detailLabel}>
                  Status<Text style={styles.asterisk}>*</Text>
                </Text>
                <Text style={styles.detailValue}>{articleData.status}</Text>
              </View>
            </View>

            {/* File attachments */}
            {articleData.files && articleData.files.length > 0 && (
              <View style={styles.fileAttachments}>
                {articleData.files.map((file, index) => (
                  <View key={index} style={styles.fileItem}>
                    <View style={styles.fileInfo}>
                      <View style={styles.fileIconContainer}>
                        {file.type === "image" && <Feather name="image" size={20} color="#000" />}
                        {file.type === "document" && <AntDesign name="file1" size={20} color="#000" />}
                        {file.type === "video" && (
                          <MaterialCommunityIcons name="file-video-outline" size={20} color="#000" />
                        )}
                      </View>
                      <View style={styles.fileDetails}>
                        <Text style={styles.fileName}>{file.name}</Text>
                        <Text style={styles.fileSize}>{file.size}</Text>
                      </View>
                    </View>
                    <View style={styles.fileActions}>
                      <TouchableOpacity style={styles.shareButton}>
                        <Feather name="share-2" size={16} color="#666" />
                        <Text style={styles.shareText}>Share</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.moreButton}>
                        <Feather name="chevron-down" size={16} color="#666" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    )
  }

  // Sample article data
  const articles = {
    "Article - 01": {
      name: "Article Name",
      description: "Description",
      make: "Maker Name",
      colour: "Colour Name",
      category: "Category Name",
      storedUntil: "01-04-2025",
      storageLocation: "Storage Location Name",
      status: "Status Name",
      files: [
        { name: "Name.png", type: "image", size: "0.11MB" },
        { name: "Name.doc", type: "document", size: "0.1MB" },
        { name: "Name.mp4", type: "video", size: "0.11MB" },
      ],
    },
    "Article - 02": {
      name: "Article Name",
      description: "Description",
      make: "Maker Name",
      colour: "Colour Name",
      category: "Category Name",
      storedUntil: "01-04-2025",
      storageLocation: "Storage Location Name",
      status: "Status Name",
      files: [
        { name: "Name.png", type: "image", size: "0.11MB" },
        { name: "Name.doc", type: "document", size: "0.1MB" },
        { name: "Name.mp4", type: "video", size: "0.11MB" },
      ],
    },
  }

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {Object.keys(articles).map((articleId) => renderArticleSection(articleId, articles[articleId]))}
      </ScrollView>

      {/* Article Edit Modal */}
      <LFArticleEditModal
        visible={articleEditModalVisible}
        onClose={() => setArticleEditModalVisible(false)}
        articleId={currentArticleId}
        navigation={navigation}
        initialData={currentArticleId ? articles[currentArticleId] : undefined}
        onSubmit={handleArticleSubmit}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 13,
    backgroundColor: "#F5F7FA",
  },
  articleContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    overflow: "hidden",
  },
  articleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#EBF0FA",
  },
  articleTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
  editButton: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4A6FFF",
    marginLeft: 8,
  },
  articleContent: {
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
  rightAlign: {
    alignItems: "flex-end",
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
  fileAttachments: {
    marginTop: 8,
  },
  fileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: "#ddd",
  },
  fileInfo: {
    flexDirection: "row",
    alignItems: "center",
    left: 10,
  },
  fileIconContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 4,
    marginRight: 12,
  },
  fileDetails: {
    justifyContent: "center",
  },
  fileName: {
    fontSize: 14,
    color: "#000000",
  },
  fileSize: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
  fileActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 13,
    backgroundColor: "#EBF0FA",
    borderRadius: 4,
    marginRight: 8,
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

export default LFArticleTab