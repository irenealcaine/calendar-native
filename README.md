# calendar-native

Calendario personalizable para Android y Web construido con Expo SDK 57 y expo-router.

## Funcionalidades

- Vista mensual con navegación entre meses y años.
- Al pulsar un día se abre su detalle con los eventos y tareas de esa fecha.
- Dos tipos de elementos con color personalizable:
  - **Evento**: pinta el día completo o un rango de varios días.
  - **Tarea**: marca un punto de color en un día concreto.
- Crear, editar y borrar eventos/tareas desde el detalle del día.
- Persistencia local (AsyncStorage en Android, localStorage en Web). Sin backend.
- Tema oscuro, interfaz en español.
- PWA instalable en dispositivos compatibles.
- Diseño responsive: en desktop (web) el calendario y el detalle del día se muestran en dos paneles; en móvil se navega a una pantalla dedicada.
- Navegación por teclado en web (flechas izquierda/derecha cambian de mes).
- Gestos de swipe entre meses en Android.
- Acción rápida: pulsación larga en un día abre el formulario de creación.
- Botón de acción flotante (FAB) para añadir eventos/tareas.
- Vibración háptica al interactuar en Android (expo-haptics).
- Notificación local a las 9:00 en los días con tareas programadas (Android; requiere permiso de notificaciones).

## Stack

- Expo SDK 57 (React Native)
- expo-router (file-based routing)
- JavaScript (ES6+)
- @react-native-async-storage/async-storage
- expo-haptics
- expo-notifications
- pnpm

## Requisitos

- Node.js
- pnpm
- Expo Go (opcional, para probar en Android) o un emulador/APK

## Instalación

```bash
pnpm install
```

## Uso

```bash
pnpm start     # dev server
pnpm web       # versión web
pnpm android   # versión Android (emulador o dispositivo con Expo Go)
```

Para generar el build estático web:

```bash
pnpm export
```

## Build APK (EAS Build)

Requisitos: cuenta gratuita de Expo y `eas-cli` (ya incluido como dependencia de desarrollo).

```bash
pnpm exec eas login                    # iniciar sesión (una vez)
pnpm exec eas init                     # vincular el proyecto (una vez, crea projectId)
pnpm apk                               # genera el APK con el perfil preview
```

Al terminar, EAS muestra un enlace y un QR para descargar e instalar el APK en el móvil.

## Estructura

```text
app/            # rutas: index (mes), dia/[fecha] (detalle del día)
components/     # CalendarioMes, CeldaDia, DetalleDia, FormularioEvento, SelectorFecha, SelectorAnio, SelectorColor
constants/      # theme.js (colores, tokens de diseño y paleta)
contexts/       # EventosContext (estado global y persistencia)
hooks/          # useCalendario (navegación de fechas), useResponsive (breakpoints)
services/       # storage.js (carga/guardado local), notifications.js (recordatorios)
utils/          # dateUtils.js (helpers de fechas ISO)
assets/         # iconos y splash
```