import { useState } from "react"
import { Modal, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native"
import * as Haptics from "expo-haptics"

import { colors, eventPalette, spacing } from "../constants/theme"
import { useEventos } from "../contexts/EventosContext"
import { formatDateLong, generateId } from "../utils/dateUtils"
import SelectorColor from "./SelectorColor"
import SelectorFecha from "./SelectorFecha"

export default function FormularioEvento({ visible, onClose, initial, defaultDate }) {
  const { addEvento, updateEvento } = useEventos()
  const [titulo, setTitulo] = useState(initial ? initial.titulo : "")
  const [tipo, setTipo] = useState(initial ? initial.tipo : "evento")
  const [color, setColor] = useState(initial ? initial.color : eventPalette[0])
  const [fechaInicio, setFechaInicio] = useState(initial ? initial.fechaInicio : defaultDate)
  const [fechaFin, setFechaFin] = useState(
    initial ? initial.fechaFin || initial.fechaInicio : defaultDate,
  )
  const [dateField, setDateField] = useState(null)

  const isValid = titulo.trim().length > 0 && fechaInicio <= fechaFin

  function selectTipo(nextTipo) {
    setTipo(nextTipo)
    if (nextTipo === "tarea") {
      setFechaFin(fechaInicio)
    }
  }

  function guardar() {
    if (!isValid) return
    if (Platform.OS === "android") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {})
    }
    const evento = {
      id: initial ? initial.id : generateId(),
      tipo,
      titulo: titulo.trim(),
      color,
      fechaInicio,
      fechaFin: tipo === "tarea" ? fechaInicio : fechaFin,
    }
    if (initial) {
      updateEvento(evento)
    } else {
      addEvento(evento)
    }
    onClose()
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.dragHandle} />
          <Text style={styles.title}>{initial ? "Editar" : "Nuevo"} {tipo === "evento" ? "evento" : "tarea"}</Text>

          <ScrollView keyboardShouldPersistTaps="handled">
            <TextInput
              style={styles.input}
              placeholder="Título"
              placeholderTextColor={colors.textSecondary}
              value={titulo}
              onChangeText={setTitulo}
            />

            <View style={styles.tipoRow}>
              {["evento", "tarea"].map((item) => (
                <Pressable
                  key={item}
                  onPress={() => selectTipo(item)}
                  style={[styles.tipoButton, tipo === item && styles.tipoButtonActive]}
                >
                  <Text style={[styles.tipoText, tipo === item && styles.tipoTextActive]}>
                    {item === "evento" ? "Evento" : "Tarea"}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.label}>Color</Text>
            <SelectorColor selected={color} onSelect={setColor} />

            <Text style={styles.label}>Fecha de inicio</Text>
            <Pressable onPress={() => setDateField("inicio")} style={styles.dateField}>
              <Text style={styles.dateText}>{formatDateLong(fechaInicio)}</Text>
            </Pressable>

            {tipo === "evento" && (
              <>
                <Text style={styles.label}>Fecha de fin</Text>
                <Pressable onPress={() => setDateField("fin")} style={styles.dateField}>
                  <Text style={styles.dateText}>{formatDateLong(fechaFin)}</Text>
                </Pressable>
              </>
            )}

            {titulo.trim().length > 0 && !isValid && (
              <Text style={styles.warning}>La fecha de fin debe ser igual o posterior a la de inicio</Text>
            )}
          </ScrollView>

          <View style={styles.actions}>
            <Pressable onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
            <Pressable
              onPress={guardar}
              disabled={!isValid}
              style={[styles.saveButton, !isValid && styles.saveButtonDisabled]}
            >
              <Text style={styles.saveText}>Guardar</Text>
            </Pressable>
          </View>

          <SelectorFecha
            visible={dateField !== null}
            value={dateField === "fin" ? fechaFin : fechaInicio}
            onClose={() => setDateField(null)}
            onChange={(iso) => {
              if (dateField === "fin") {
                setFechaFin(iso)
              } else {
                setFechaInicio(iso)
                if (tipo === "tarea") setFechaFin(iso)
              }
            }}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = {
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: Platform.OS === "web" ? "center" : "flex-end",
    padding: Platform.OS === "web" ? spacing.xl : 0,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    maxHeight: "85%",
    ...Platform.select({
      web: { width: "100%", maxWidth: 440, alignSelf: "center", borderRadius: 12 },
      default: {},
    }),
  },
  dragHandle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    backgroundColor: colors.muted,
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.textPrimary,
    fontSize: 15,
    marginBottom: 16,
  },
  tipoRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  tipoButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    borderRadius: 8,
  },
  tipoButtonActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  tipoText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  tipoTextActive: {
    color: colors.accentText,
    fontWeight: "600",
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 8,
    marginTop: 16,
  },
  dateField: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
  },
  dateText: {
    color: colors.textPrimary,
    fontSize: 15,
  },
  warning: {
    color: colors.danger,
    fontSize: 13,
    marginTop: 12,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    borderRadius: 8,
  },
  cancelText: {
    color: colors.textPrimary,
    fontSize: 15,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: colors.accent,
    alignItems: "center",
    borderRadius: 8,
  },
  saveButtonDisabled: {
    opacity: 0.4,
  },
  saveText: {
    color: colors.accentText,
    fontSize: 15,
    fontWeight: "600",
  },
}