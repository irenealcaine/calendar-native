import { useState } from "react"
import { Modal, Pressable, Text, View } from "react-native"

import { colors } from "../constants/theme"
import {
  getDayNames,
  getMonthGrid,
  getMonthName,
  parseISODate,
  todayISO,
} from "../utils/dateUtils"

export default function SelectorFecha({ visible, value, onClose, onChange }) {
  const initial = parseISODate(value)
  const [year, setYear] = useState(initial.getFullYear())
  const [month, setMonth] = useState(initial.getMonth())
  const grid = getMonthGrid(year, month)
  const today = todayISO()

  function shiftMonth(delta) {
    const total = year * 12 + month + delta
    setYear(Math.floor(total / 12))
    setMonth(((total % 12) + 12) % 12)
  }

  function pick(dateISO) {
    onChange(dateISO)
    onClose()
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Pressable onPress={() => shiftMonth(-1)} hitSlop={12} accessibilityLabel="Mes anterior">
              <Text style={styles.arrow}>‹</Text>
            </Pressable>
            <Text style={styles.title}>
              {getMonthName(month)} {year}
            </Text>
            <Pressable onPress={() => shiftMonth(1)} hitSlop={12} accessibilityLabel="Mes siguiente">
              <Text style={styles.arrow}>›</Text>
            </Pressable>
          </View>
          <View style={styles.weekRow}>
            {getDayNames().map((day) => (
              <Text key={day} style={styles.weekday}>
                {day}
              </Text>
            ))}
          </View>
          <View style={styles.grid}>
            {grid.map((cell) => {
              const isSelected = cell.dateISO === value
              const isToday = cell.dateISO === today
              return (
                <Pressable
                  key={cell.dateISO}
                  onPress={() => pick(cell.dateISO)}
                  style={[
                    styles.cell,
                    !cell.inMonth && styles.cellOutside,
                    isSelected && styles.cellSelected,
                    isToday && !isSelected && styles.cellToday,
                  ]}
                >
                  <Text style={[styles.cellText, !cell.inMonth && styles.cellTextOutside, isSelected && styles.cellTextSelected]}>
                    {cell.day}
                  </Text>
                </Pressable>
              )
            })}
          </View>
          <Pressable onPress={() => pick(today)} style={styles.todayButton}>
            <Text style={styles.todayButtonText}>Hoy</Text>
          </Pressable>
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  arrow: {
    color: colors.textPrimary,
    fontSize: 26,
  },
  weekRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  weekday: {
    flex: 1,
    textAlign: "center",
    color: colors.textSecondary,
    fontSize: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cell: {
    width: "14.28%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cellOutside: {
    opacity: 0.35,
  },
  cellSelected: {
    backgroundColor: colors.accent,
  },
  cellToday: {
    borderWidth: 1,
    borderColor: colors.accent,
  },
  cellText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  cellTextOutside: {
    color: colors.textSecondary,
  },
  cellTextSelected: {
    color: colors.accentText,
    fontWeight: "700",
  },
  todayButton: {
    alignSelf: "center",
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  todayButtonText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
}