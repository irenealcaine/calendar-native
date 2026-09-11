import * as Notifications from "expo-notifications"
import { Platform } from "react-native"

import { parseISODate, todayISO } from "../utils/dateUtils"

const REMINDER_HOUR = 9
const MAX_SCHEDULED = 60
const CHANNEL_ID = "task-reminders"
const supported = Platform.OS !== "web"

async function ensureChannel() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: "Recordatorios de tareas",
      importance: Notifications.AndroidImportance.DEFAULT,
    })
  }
}

async function requestPermission() {
  const current = await Notifications.getPermissionsAsync()
  if (current.granted) return true
  if (!current.canAskAgain) return false
  const requested = await Notifications.requestPermissionsAsync()
  return requested.granted
}

export async function scheduleTaskReminders(eventos) {
  if (!supported) return

  const today = todayISO()
  const tasksByDate = new Map()
  for (const evento of eventos) {
    if (evento.tipo !== "tarea" || evento.fechaInicio < today) continue
    if (!tasksByDate.has(evento.fechaInicio)) tasksByDate.set(evento.fechaInicio, [])
    tasksByDate.get(evento.fechaInicio).push(evento.titulo)
  }

  await Notifications.cancelAllScheduledNotificationsAsync()
  if (tasksByDate.size === 0) return

  const granted = await requestPermission()
  if (!granted) return

  await ensureChannel()

  const dates = [...tasksByDate.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(0, MAX_SCHEDULED)

  for (const [dateISO, titles] of dates) {
    const date = parseISODate(dateISO)
    date.setHours(REMINDER_HOUR, 0, 0, 0)
    if (date.getTime() <= Date.now()) continue
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Tienes una tarea pendiente",
        body: titles.join(", "),
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date,
        channelId: CHANNEL_ID,
      },
    })
  }
}