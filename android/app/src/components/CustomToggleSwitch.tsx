import React from "react"
import { Text, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native"

interface CustomToggleSwitchProps {
  value: boolean
  onValueChange: (value: boolean) => void
  label?: string
}

const CustomToggleSwitch: React.FC<CustomToggleSwitchProps> = ({ value, onValueChange, label = "All" }) => {
  const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: false,
    }).start()
  }, [value, animatedValue])

  const togglePosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 25], // Adjust these values based on your design
  })

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E8EEFB", "#E8EEFB"],
  })

  const handleToggle = () => {
    onValueChange(!value)
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleToggle} style={styles.container}>
      <Animated.View style={[styles.toggleContainer, { backgroundColor }]}>
        <Animated.View style={[styles.toggleButton, { left: togglePosition }]} />
        <Text style={[styles.label, { color: value ? "#FFFFFF" : "#0F172A" }]}>{label}</Text>
        </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  toggleContainer: {
    width: 50,
    height: 24,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 7,
    position: "relative",
    left:6
  },
  toggleButton: {
    width: 21,
    height: 21,
    borderRadius: 18,
    backgroundColor: "#0F172A",
    position: "absolute",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
  labelActive: {
    color: "#0F172A",
  },
  labelInactive: {
    color: "#0F172A",
  },
})

export default CustomToggleSwitch
