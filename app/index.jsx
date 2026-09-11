import { useEffect, useMemo, useState } from "react"
import { PanResponder, Platform, Pressable, ScrollView, Text, View } from "react-native"
import * as Haptics from "expo-haptics"
import { useRouter } from "expo-router"

import CalendarioMes from "../components/CalendarioMes"
import DetalleDia from "../components/DetalleDia"
import SelectorAnio from "../components/SelectorAnio"
import { colors, spacing, typography } from "../constants/theme"
import { useCalendario } from "../hooks/useCalendario"
import { useResponsive } from "../hooks/useResponsive"
import { getMonthName, todayISO } from "../utils/dateUtils"

export default function IndexScreen() {
  const router = useRouter()
  const { isWide } = useResponsive()
  const { year, month, goToPrevMonth, goToNextMonth, goToMonth, goToToday } = useCalendario()
  const [yearPickerVisible, setYearPickerVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState(todayISO())
  const today = todayISO()

  useEffect(() => {
    if (Platform.OS !== "web") return
    function handleKeyDown(event) {
      if (event.key === "ArrowLeft") goToPrevMonth()
      if (event.key === "ArrowRight") goToNextMonth()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToPrevMonth, goToNextMonth])

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) =>
          Math.abs(gesture.dx) > 12 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
        onPanResponderRelease: (_, gesture) => {
          if (gesture.dx < -50) goToNextMonth()
          if (gesture.dx > 50) goToPrevMonth()
        },
      }),
    [goToPrevMonth, goToNextMonth],
  )

  function handleDayPress(dateISO) {
    if (Platform.OS === "android") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {})
    }
    if (isWide) {
      setSelectedDate(dateISO)
    } else {
      router.push(`/dia/${dateISO}`)
    }
  }

  function handleDayLongPress(dateISO) {
    if (isWide) {
      setSelectedDate(dateISO)
    } else {
      router.push(`/dia/${dateISO}?crear=1`)
    }
  }

  const header = (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Pressable onPress={() => setYearPickerVisible(true)} style={styles.yearButton} hitSlop={8} accessibilityLabel="Cambiar año">
          <Text style={styles.yearText}>{year}</Text>
        </Pressable>
      </View>
      <View style={styles.headerNav}>
        <Pressable onPress={goToPrevMonth} hitSlop={12} accessibilityLabel="Mes anterior">
          <Text style={styles.arrow}>‹</Text>
        </Pressable>
        <Pressable onPress={() => setYearPickerVisible(true)} hitSlop={8}>
          <Text style={styles.monthName}>{getMonthName(month)}</Text>
        </Pressable>
        <Pressable onPress={goToNextMonth} hitSlop={12} accessibilityLabel="Mes siguiente">
          <Text style={styles.arrow}>›</Text>
        </Pressable>
      </View>
    </View>
  )

  const calendar = (
    <View style={styles.calendarInner}>
      <CalendarioMes
        year={year}
        month={month}
        todayISO={today}
        onDayPress={handleDayPress}
        onDayLongPress={handleDayLongPress}
      />
      <Pressable onPress={goToToday} style={styles.todayButton}>
        <Text style={styles.todayText}>Hoy</Text>
      </Pressable>
    </View>
  )

  return (
    <View style={styles.screen}>
      {isWide ? (
        <View style={styles.wideLayout}>
          <View style={styles.calendarPanel}>
            {header}
            <ScrollView contentContainerStyle={styles.scrollContent}>{calendar}</ScrollView>
          </View>
          <View style={styles.detailPanel}>
            <DetalleDia key={selectedDate} fecha={selectedDate} />
          </View>
        </View>
      ) : (
        <>
          {header}
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View {...panResponder.panHandlers}>{calendar}</View>
          </ScrollView>
        </>
      )}

      <SelectorAnio
        visible={yearPickerVisible}
        value={year}
        onClose={() => setYearPickerVisible(false)}
        onSelect={(selectedYear) => goToMonth(selectedYear, month)}
      />
    </View>
  )
}

const styles = {
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: spacing.md,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  headerNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  arrow: {
    color: colors.textPrimary,
    fontSize: 30,
  },
  monthName: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  yearButton: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: 2,
    borderRadius: 8,
  },
  yearText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  wideLayout: {
    flex: 1,
    flexDirection: "row",
  },
  calendarPanel: {
    flex: 1.1,
  },
  calendarInner: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
  },
  detailPanel: {
    flex: 0.9,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    backgroundColor: colors.surface,
  },
  todayButton: {
    alignSelf: "center",
    marginTop: spacing.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  todayText: {
    color: colors.textPrimary,
    ...typography.meta,
  },
}