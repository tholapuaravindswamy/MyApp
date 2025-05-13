import type React from "react"
import { View, Text, StyleSheet } from "react-native"

interface LFGuestTabProps {
  navigation?: any
}

const LFGuestTab: React.FC<LFGuestTabProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Welcome to Guest Screen</Text>
        <Text style={styles.welcomeDescription}>
          This section displays information about the guest associated with this lost and found item.
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F7FA",
  },
  welcomeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 12,
  },
  welcomeDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
})

export default LFGuestTab
