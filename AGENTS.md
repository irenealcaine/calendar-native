# AGENTS.md

Guía para agentes de IA que trabajan en este proyecto.

## Stack

- Expo SDK 57 (React Native) con `expo-router`.
- JavaScript (ES6+), sin TypeScript.
- Estado global con Context (sin librerías externas de estado).
- Persistencia local con `@react-native-async-storage/async-storage` (funciona en Android y Web).
- Gestión de paquetes: pnpm.
- Tema oscuro fijo.

## Estructura

```text
app/          # rutas de expo-router (index = mes, dia/[fecha] = detalle)
components/   # componentes de UI, un componente por archivo
constants/    # theme.js: colores y paleta de eventos
contexts/     # EventosContext: estado global de eventos
hooks/        # useCalendario: navegación mes/año
services/     # storage.js: carga y guardado local; notifications.js: recordatorios
utils/        # dateUtils.js: helpers de fechas (ISO YYYY-MM-DD)
assets/       # iconos y recursos
```

## Reglas

- Todo el código en inglés (variables, funciones, componentes, archivos).
- Interfaz visible al usuario en español.
- Componentes funcionales con hooks, sin clases.
- Estilos con `StyleSheet` (React Native), nunca CSS.
- Fechas siempre en formato ISO `YYYY-MM-DD` en el almacenamiento y rutas.
- No añadir emojis ni iconos salvo petición explícita.
- No introducir dependencias sin necesidad; preferir APIs nativas.

## Modelo de datos

Cada evento se guarda en AsyncStorage bajo la clave `calendar-native:eventos`:

```js
{
  id: string,
  tipo: "evento" | "tarea",
  titulo: string,
  color: string,           // hex de la paleta en constants/theme.js
  fechaInicio: "YYYY-MM-DD",
  fechaFin: "YYYY-MM-DD",  // para "tarea" coincide con fechaInicio
}
```

- `evento`: pinta uno o varios días completos (rango fechaInicio–fechaFin).
- `tarea`: marca un punto de color en un solo día.

## Comandos

- `pnpm start` — arranca el dev server.
- `pnpm web` — arranca en web.
- `pnpm android` — arranca en Android.
- `pnpm export` — genera el build estático (web).
- `pnpm lint` — ESLint.

## Documentación de Expo

Expo cambia con frecuencia. Antes de escribir código de Expo, leer la documentación versionada:
https://docs.expo.dev/versions/v57.0.0/

## Metadatos / PWA

- La app web se exporta estática con `web.output: "static"`.
- El manifest PWA e iconos se generan desde `app.json` en el export.
- Mantener `app.json` alineado con nombre, tema y descripción de la app.