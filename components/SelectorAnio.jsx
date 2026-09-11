import { Modal, Pressable, ScrollView, Text, View } from "react-native"

import { colors } from "../constants/theme"

export default function SelectorAnio({ visible, value, onClose, onSelect }) {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let year = currentYear - 15; year <= currentYear + 15; year += 1) {
    years.push(year)
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.card}>
          <Text style={styles.title}>Selecciona un año</Text>
          <ScrollView style={styles.list}>
            {years.map((year) => {
              const isSelected = year === value
              return (
                <Pressable
                  key={year}
                  onPress={() => {
                    onSelect(year)
                    onClose()
                  }}
                  style={[styles.row, isSelected && styles.rowSelected]}
                >
                  <Text style={[styles.rowText, isSelected && styles.rowTextSelected]}>{year}</Text>
                </Pressable>
              )
            })}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  )
}

const styles = {
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    maxHeight: 420,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  list: {
    maxHeight: 340,
  },
  row: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  rowSelected: {
    backgroundColor: colors.accent,
  },
  rowText: {
    color: colors.textPrimary,
    fontSize: 16,
    textAlign: "center",
  },
  rowTextSelected: {
    color: colors.accentText,
    fontWeight: "700",
  },
}