import { Pressable, View } from "react-native"

import { eventPalette } from "../constants/theme"

export default function SelectorColor({ selected, onSelect }) {
  return (
    <View style={styles.container}>
      {eventPalette.map((color) => {
        const isSelected = color === selected
        return (
          <Pressable
            key={color}
            onPress={() => onSelect(color)}
            accessibilityLabel={`Color ${color}`}
            style={[styles.swatch, { backgroundColor: color }, isSelected && styles.selected]}
          />
        )
      })}
    </View>
  )
}

const styles = {
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  swatch: {
    width: 36,
    height: 36,
  },
  selected: {
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
}