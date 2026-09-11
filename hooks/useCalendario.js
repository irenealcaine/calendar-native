import { useState } from "react"

export function useCalendario() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())

  function goToMonth(nextYear, nextMonth) {
    setYear(nextYear)
    setMonth(nextMonth)
  }

  function shiftMonth(delta) {
    const total = year * 12 + month + delta
    setYear(Math.floor(total / 12))
    setMonth(((total % 12) + 12) % 12)
  }

  function goToToday() {
    const today = new Date()
    goToMonth(today.getFullYear(), today.getMonth())
  }

  return {
    year,
    month,
    goToPrevMonth: () => shiftMonth(-1),
    goToNextMonth: () => shiftMonth(1),
    goToMonth,
    goToToday,
  }
}