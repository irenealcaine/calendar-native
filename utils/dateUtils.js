const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
const DAYS_SHORT = ["L", "M", "X", "J", "V", "S", "D"]
const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]

export function parseISODate(iso) {
  const [year, month, day] = iso.split("-").map(Number)
  return new Date(year, month - 1, day)
}

export function toISODate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function todayISO() {
  return toISODate(new Date())
}

export function addDays(date, amount) {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + amount)
  return copy
}

export function mondayIndex(date) {
  return (date.getDay() + 6) % 7
}

export function getMonthGrid(year, month) {
  const firstOfMonth = new Date(year, month, 1)
  const startOffset = mondayIndex(firstOfMonth)
  const startDate = addDays(firstOfMonth, -startOffset)
  const cells = []
  for (let i = 0; i < 42; i += 1) {
    const date = addDays(startDate, i)
    cells.push({
      dateISO: toISODate(date),
      day: date.getDate(),
      inMonth: date.getMonth() === month,
    })
  }
  return cells
}

export function getDayNames() {
  return DAYS_SHORT
}

export function getMonthName(month) {
  return MONTHS[month]
}

export function formatDateLong(iso) {
  const date = parseISODate(iso)
  const dayName = DAYS[mondayIndex(date)]
  return `${dayName}, ${date.getDate()} de ${MONTHS[date.getMonth()]} de ${date.getFullYear()}`
}

export function formatRange(inicio, fin) {
  const inicioDate = parseISODate(inicio)
  const finDate = parseISODate(fin)
  const sameMonth = inicioDate.getMonth() === finDate.getMonth()
  if (inicio === fin) {
    return `${inicioDate.getDate()} de ${MONTHS[inicioDate.getMonth()]}`
  }
  if (sameMonth) {
    return `${inicioDate.getDate()} – ${finDate.getDate()} de ${MONTHS[finDate.getMonth()]}`
  }
  return `${inicioDate.getDate()} de ${MONTHS[inicioDate.getMonth()]} – ${finDate.getDate()} de ${MONTHS[finDate.getMonth()]} de ${finDate.getFullYear()}`
}

export function isDateBetween(iso, inicio, fin) {
  return iso >= inicio && iso <= fin
}

export function isSameDate(a, b) {
  return a === b
}

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}