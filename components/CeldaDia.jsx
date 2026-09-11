import { Platform, Pressable, Text, View } from "react-native"

import { colors, spacing, withAlpha } from "../constants/theme"

const MAX_DOTS = 3

export default function CeldaDia({ cell, dayEventos, dayTareas, isToday, onPress, onLongPress }) {
  const evento = dayEventos[0]
  const dots = dayTareas.slice(0, MAX_DOTS)

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={400}
      accessibilityLabel={`Día ${cell.day}`}
      android_ripple={{ color: withAlpha(colors.accent, 0.2) }}
      style={({ pressed, hovered }) => [
        styles.cell,
        !cell.inMonth && styles.cellOutside,
        evento && { backgroundColor: withAlpha(evento.color, 0.2) },
        (pressed || hovered) && styles.cellHighlight,
      ]}
    >
      {isToday ? (
        <View style={styles.todayPill}>
          <Text style={styles.dayTextToday}>{cell.day}</Text>
        </View>
      ) : (
        <Text style={[styles.dayText, !cell.inMonth && styles.dayTextOutside]}>{cell.day}</Text>
      )}

      {dots.length > 0 && (
        <View style={styles.dots}>
          {dots.map((tarea, index) => (
            <View key={`${tarea.id}-${index}`} style={[styles.dot, { backgroundColor: tarea.color }]} />
          ))}
        </View>
      )}
    </Pressable>
  )
}

const styles = {
  cell: {
    width: "14.28%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: spacing.sm,
    paddingHorizontal: 2,
    backgroundColor: colors.cell,
  },
  cellOutside: {
    opacity: 0.35,
  },
  cellHighlight: {
    backgroundColor: withAlpha(colors.accent, 0.12),
  },
  dayText: {
    color: colors.textPrimary,
    fontSize: Platform.OS === "web" ? 18 : 13,
    fontWeight: "500",
  },
  dayTextOutside: {
    color: colors.textSecondary,
  },
  dayTextToday: {
    color: colors.accentText,
    fontWeight: "700",
  },
  todayPill: {
    height: Platform.OS === "web" ? 28 : 24,
    minWidth: Platform.OS === "web" ? 28 : 24,
    paddingHorizontal: 6,
    borderRadius: Platform.OS === "web" ? 14 : 12,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  dots: {
    flexDirection: "row",
    gap: 3,
    marginTop: 3,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
}