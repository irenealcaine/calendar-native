import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

import { loadEventos, saveEventos } from "../services/storage"
import { scheduleTaskReminders } from "../services/notifications"

const EventosContext = createContext(null)

export function EventosProvider({ children }) {
  const [eventos, setEventos] = useState([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    loadEventos().then((stored) => {
      setEventos(stored)
      setReady(true)
    })
  }, [])

  useEffect(() => {
    if (ready) {
      saveEventos(eventos)
    }
  }, [eventos, ready])

  useEffect(() => {
    if (ready) {
      scheduleTaskReminders(eventos)
    }
  }, [eventos, ready])

  const addEvento = useCallback((evento) => {
    setEventos((prev) => [...prev, evento])
  }, [])

  const updateEvento = useCallback((evento) => {
    setEventos((prev) => prev.map((item) => (item.id === evento.id ? evento : item)))
  }, [])

  const deleteEvento = useCallback((id) => {
    setEventos((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const value = useMemo(
    () => ({ eventos, ready, addEvento, updateEvento, deleteEvento }),
    [eventos, ready, addEvento, updateEvento, deleteEvento],
  )

  return <EventosContext.Provider value={value}>{children}</EventosContext.Provider>
}

export function useEventos() {
  const context = useContext(EventosContext)
  if (!context) {
    throw new Error("useEventos debe usarse dentro de EventosProvider")
  }
  return context
}