import { useState } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"

import FormularioEvento from "./FormularioEvento"
import { colors, spacing, typography, withAlpha } from "../constants/theme"
import { useEventos } from "../contexts/EventosContext"
import { formatDateLong, formatRange, isDateBetween } from "../utils/dateUtils"

export default function DetalleDia({ fecha, autoOpenForm = false }) {
  const { eventos, deleteEvento } = useEventos()
  const [formVisible, setFormVisible] = useState(autoOpenForm)
  const [editing, setEditing] = useState(null)
  const [formKey, setFormKey] = useState(0)

  const dayEventos = eventos.filter(
    (evento) => evento.tipo === "evento" && isDateBetween(fecha, evento.fechaInicio, evento.fechaFin),
  )
  const dayTareas = eventos.filter((evento) => evento.tipo === "tarea" && evento.fechaInicio === fecha)
  const isEmpty = dayEventos.length === 0 && dayTareas.length === 0

  function openCreate() {
    setEditing(null)
    setFormKey((key) => key + 1)
    setFormVisible(true)
  }

  function openEdit(evento) {
    setEditing(evento)
    setFormKey((key) => key + 1)
    setFormVisible(true)
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.dateTitle}>{formatDateLong(fecha)}</Text>

        {isEmpty && (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nada planeado para este día</Text>
            <Text style={styles.emptyHint}>Añade un evento o una tarea</Text>
          </View>
        )}

        {dayEventos.length > 0 && <Text style={styles.sectionTitle}>Eventos</Text>}
        {dayEventos.map((evento) => (
          <Pressable
            key={evento.id}
            onPress={() => openEdit(evento)}
            android_ripple={{ color: withAlpha(colors.accent, 0.15) }}
            style={({ pressed, hovered }) => [
              styles.item,
              { borderLeftColor: evento.color },
              (pressed || hovered) && styles.itemHighlight,
            ]}
          >
            <View style={styles.itemBody}>
              <Text style={styles.itemTitle}>{evento.titulo}</Text>
              <Text style={styles.itemMeta}>{formatRange(evento.fechaInicio, evento.fechaFin)}</Text>
            </View>
            <Pressable onPress={() => deleteEvento(evento.id)} hitSlop={8} accessibilityLabel="Borrar evento">
              <Text style={styles.deleteText}>Borrar</Text>
            </Pressable>
          </Pressable>
        ))}

        {dayTareas.length > 0 && <Text style={styles.sectionTitle}>Tareas</Text>}
        {dayTareas.map((tarea) => (
          <Pressable
            key={tarea.id}
            onPress={() => openEdit(tarea)}
            android_ripple={{ color: withAlpha(colors.accent, 0.15) }}
            style={({ pressed, hovered }) => [
              styles.item,
              (pressed || hovered) && styles.itemHighlight,
            ]}
          >
            <View style={[styles.dot, { backgroundColor: tarea.color }]} />
            <View style={styles.itemBody}>
              <Text style={styles.itemTitle}>{tarea.titulo}</Text>
            </View>
            <Pressable onPress={() => deleteEvento(tarea.id)} hitSlop={8} accessibilityLabel="Borrar tarea">
              <Text style={styles.deleteText}>Borrar</Text>
            </Pressable>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable onPress={openCreate} style={styles.fab} accessibilityLabel="Añadir evento o tarea">
        <Text style={styles.fabText}>+</Text>
      </Pressable>

      <FormularioEvento
        key={formKey}
        visible={formVisible}
        onClose={() => setFormVisible(false)}
        initial={editing}
        defaultDate={fecha}
      />
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    position: "relative",
  },
  scrollContent: {
    padding: spacing.xl,
  },
  dateTitle: {
    color: colors.textPrimary,
    ...typography.title,
    marginBottom: spacing.xl,
  },
  empty: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    gap: spacing.xs,
  },
  emptyText: {
    color: colors.textSecondary,
    ...typography.body,
  },
  emptyHint: {
    color: colors.muted,
    fontSize: 13,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    marginBottom: 10,
    gap: spacing.md,
  },
  itemHighlight: {
    backgroundColor: colors.surfaceAlt,
  },
  itemBody: {
    flex: 1,
  },
  itemTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "600",
  },
  itemMeta: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  dot: {
    width: 12,
    height: 12,
  },
  deleteText: {
    color: colors.danger,
    fontSize: 13,
  },
  fab: {
    position: "absolute",
    right: spacing.xl,
    bottom: spacing.xl,
    width: 56,
    height: 56,
    backgroundColor: colors.accent,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  fabText: {
    color: colors.accentText,
    fontSize: 28,
    fontWeight: "600",
    lineHeight: 32,
  },
}