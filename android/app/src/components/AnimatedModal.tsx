import React, { useEffect, useRef } from "react"
import {
  View,
  Modal,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  StyleProp,
  ViewStyle,
} from "react-native"

const { height } = Dimensions.get("window")

interface AnimatedModalProps {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
  containerStyle?: StyleProp<ViewStyle>
  height?: number | string
  adaptiveHeight?: boolean
  minHeight?: number | string
  maxHeight?: number | string
}

const AnimatedModal: React.FC<AnimatedModalProps> = ({
  visible,
  onClose,
  children,
  containerStyle,
  height: modalHeight = height * 0.7,
  adaptiveHeight = false,
  minHeight = height * 0.2,
  maxHeight = height * 0.7,
}) => {
  const slideAnim = useRef(new Animated.Value(height)).current
  const backdropOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (visible) {
      // Start animations when modal becomes visible
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      // Animate modal out when closing
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [visible, slideAnim, backdropOpacity])

  // Calculate the final height to use
  const getFinalHeight = () => {
    if (!adaptiveHeight) {
      return modalHeight
    }
    
    // If adaptiveHeight is true, use the specified minHeight
    // Convert minHeight to a number if it's a percentage
    if (typeof minHeight === 'string' && minHeight.includes('%')) {
      return height * (parseInt(minHeight) / 100)
    }
    
    return minHeight
  }

  if (!visible) return null

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: backdropOpacity,
            },
          ]}
        >
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.backdropTouchable} />
          </TouchableWithoutFeedback>
        </Animated.View>

        <Animated.View
          style={[
            styles.contentContainer,
            containerStyle,
            {
              height: getFinalHeight(),
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backdropTouchable: {
    flex: 1,
  },
  contentContainer: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },
})

export default AnimatedModal