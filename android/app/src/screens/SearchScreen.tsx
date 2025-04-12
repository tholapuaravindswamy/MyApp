import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native"
import { ArrowLeft, Calendar, Clock } from "react-native-feather"
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get("window")

const SearchScreen = ({navigation}) => {
  const [showModal, setShowModal] = useState(false)
  const HandleBack = () => {
   navigation.goBack();
   }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
        <TouchableOpacity 
        onPress={HandleBack}
         style={styles.backButton}>
           <AntDesign name="back" size={26} style={{  color: "black" }} />
           </TouchableOpacity>
            <Text style={styles.headerTitle}>Advanced Search</Text>
          <TouchableOpacity>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          {/* UID Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>UID</Text>
            <TextInput style={styles.textInput} placeholder="Enter Text" placeholderTextColor="#999" />
          </View>

          {/* Creation Date (From) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Creation Date (From)</Text>
            <TouchableOpacity style={styles.dateInput}>
            <Calendar stroke="#999" width={18} height={18} />
              <Text style={styles.dateInputText}>Select Option</Text>
            </TouchableOpacity>
          </View>

          {/* Creation Date (Till) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Creation Date (Till)</Text>
            <TouchableOpacity style={styles.dateInput}>
            <Calendar stroke="#999" width={18} height={18} />
              <Text style={styles.dateInputText}>Select Option</Text>
            </TouchableOpacity>
          </View>

          {/* Created By */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Created By</Text>
            <TouchableOpacity style={styles.dropdownInput}>
              <Text style={styles.dateInputText}>Select Option</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Schedule Date (From) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Schedule Date (From)</Text>
            <TouchableOpacity style={styles.dateInput}>
            <Calendar stroke="#999" width={18} height={18} />
              <Text style={styles.dateInputText}>Select Option</Text>
            </TouchableOpacity>
          </View>

          {/* Schedule Time (Till) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Schedule Time (Till)</Text>
            <TouchableOpacity style={styles.dateInput}>
            <Calendar stroke="#999" width={18} height={18} />
              <Text style={styles.dateInputText}>Select Option</Text>
            </TouchableOpacity>
          </View>

          {/* Schedule Time (From) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Schedule Time (From)</Text>
            <TouchableOpacity style={styles.dateInput}>
            <Clock stroke="#999" width={18} height={18} />
              <Text style={styles.dateInputText}>Select Option</Text>
            </TouchableOpacity>
          </View>

          {/* Schedule Time (Till) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Schedule Time (Till)</Text>
            <TouchableOpacity style={styles.dateInput}>
            <Clock stroke="#999" width={18} height={18} />
              <Text style={styles.dateInputText}>Select Option</Text>
            </TouchableOpacity>
          </View>

          {/* Search Button */}
          <TouchableOpacity style={styles.searchButton} onPress={() => setShowModal(true)}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Pop-up Modal */}
      <Modal visible={showModal} transparent={true} animationType="fade" onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity style={styles.modalBackButton} onPress={() => setShowModal(false)}>
              <AntDesign name="back" size={26} style={{  color: "black" }} />
              </TouchableOpacity>
              <Text style={styles.modalUid}>UID:</Text>
              <Text style={styles.modalUidTitle}> ABCD1234567890</Text>
            </View>
            <View style={styles.modalContent}>
              <View style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <Text style={styles.detailLabel}>Asset*</Text>
                  <Text style={styles.detailValue}>Mixer Grinder</Text>
                </View>
                <View style={styles.detailRight}>
                  <Text style={styles.detailLabel}>Location*</Text>
                  <Text style={styles.detailValue}>101</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <Text style={styles.detailLabel}>Category*</Text>
                  <Text style={styles.detailValue}>Amenities</Text>
                </View>
                <View style={styles.detailRight}>
                  <Text style={styles.detailLabel}>Timer*</Text>
                  <Text style={[styles.detailValue, styles.timerValue]}>-05 min</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <Text style={styles.detailLabel}>Schedule*</Text>
                  <Text style={styles.detailValue}>01-01-2025, 16:46</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <Text style={styles.detailLabel}>Task*</Text>
                  <Text style={styles.detailValue}>Shampoo x 02</Text>
                  <Text style={styles.detailValue}>Conditioner x 02</Text>
                </View>
                <View style={styles.detailRight}>
                  <Text style={styles.detailLabel}>Assigned To*</Text>
                  <Text style={styles.detailValue}>Biswajit Das</Text>
                  <Text style={styles.detailValue}>Vishal Sinha</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.viewButton} onPress={() => setShowModal(false)}>
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    flexDirection: "row",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
    color:'black',
  },
  clearAllText: {
    fontSize: 14,
    color: "#FF5722",
    fontWeight: "500",
  },
  formContainer: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  textInput: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    fontSize: 14,
    color:'black'
  },
  dateInput: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    color:'black'
  },
  dateInputText: {
    fontSize: 14,
    color: "#999",
    paddingHorizontal: 10,

  },
  dropdownInput: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 6,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chevron: {
    fontSize: 18,
    color: "#999",
    fontWeight: "bold",
  },
  searchButton: {
    backgroundColor: "#FF5722",
    height: 48,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalBackButton: {
    marginRight: 12,
  },
  modalUidTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  modalUid:{
    fontSize: 16,
    fontWeight: "bold",
    color:'black'
  },
  modalContent: {
    padding: 16,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  detailLeft: {
    flex: 1,
    paddingRight: 8,
  },
  detailRight: {
    flex: 1,
    paddingLeft: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  timerValue: {
    color: "#FF5722",
  },
  viewButton: {
    backgroundColor: "#FF5722",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default SearchScreen

