import { Text, View } from "react-native"

import { useEventos } from "../contexts/EventosContext"
import { colors } from "../constants/theme"
import { getDayNames, getMonthGrid, isDateBetween } from "../utils/dateUtils"
import CeldaDia from "./CeldaDia"

export default function CalendarioMes({ year, month, todayISO, onDayPress, onDayLongPress }) {
  const { eventos } = useEventos()
  const grid = getMonthGrid(year, month)

  function getDayData(cell) {
    const result = { eventos: [], tareas: [] }
    for (const evento of eventos) {
      if (evento.tipo === "tarea") {
        if (evento.fechaInicio === cell.dateISO) result.tareas.push(evento)
      } else if (isDateBetween(cell.dateISO, evento.fechaInicio, evento.fechaFin)) {
        result.eventos.push(evento)
      }
    }
    return result
  }

  return (
    <View>
      <View style={styles.weekRow}>
        {getDayNames().map((day) => (
          <Text key={day} style={styles.weekday}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.grid}>
        {grid.map((cell) => {
          const dayData = getDayData(cell)
          return (
            <CeldaDia
              key={cell.dateISO}
              cell={cell}
              dayEventos={dayData.eventos}
              dayTareas={dayData.tareas}
              isToday={cell.dateISO === todayISO}
              onPress={() => onDayPress(cell.dateISO)}
              onLongPress={onDayLongPress ? () => onDayLongPress(cell.dateISO) : undefined}
            />
          )
        })}
      </View>
    </View>
  )
}

const styles = {
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
}