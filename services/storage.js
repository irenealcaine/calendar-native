import AsyncStorage from "@react-native-async-storage/async-storage"

const STORAGE_KEY = "calendar-native:eventos"

export async function loadEventos() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export async function saveEventos(eventos) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(eventos))
  } catch {
    // Persistencia local sin backend: ignoramos fallos de escritura.
  }
}