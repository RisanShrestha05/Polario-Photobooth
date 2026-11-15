# Polario: Online Photo Booth (React)

Take a strip of photos in your browser, dress it up, and watch it print out of a photo-booth machine. Everything runs locally: no backend, no database, nothing is uploaded.

## Run it

```bash
npm install
npm run dev        # development server
npm run build      # production build in dist/
npm run preview    # serve the production build
```

The camera needs `localhost` or HTTPS.

## The flow

| Screen | Route | What happens |
|---|---|---|
| Landing | `#/` | Burgundy stage with your photo booth in the middle. **Start Photo Session** closes red velvet curtains, which open again on the next screen. |
| Choose layout | `#/select` | Seven named layout cards (max 2 columns x 4 rows, portrait only). Tap one, then Continue. Every screen is sized to fit the window with no scrolling. |
| Take photo(s) | `#/camera` | Square viewfinder at 1080p (falls back to 720p, 480p, then the device default; also tries portrait-swapped sizes for phones). Timer 3s / 4s / 10s applies to the **first** photo; every later photo has a fixed **3s** countdown. Tap a thumbnail to retake just that one. The headline reads "Take photo" for the single layout and "Take photos" otherwise. |
| Customize | `#/customize` | Strip hangs from a clip. Caption plus preset frame and caption colors. **Download** plays the machine print-out animation, then saves a PNG. |

Route guards: `/camera` needs a confirmed layout, `/customize` needs every photo taken. There is no step bar and no subtitle on any screen.

### Layouts

| 1 column | 2 columns |
|---|---|
| 1x1 Single | 2x2 Square |
| 1x2 Duo | 2x3 Collage |
| 1x3 Triple (default) | 2x4 Tall collage |
| 1x4 Classic | |

Edit `LAYOUTS` in `src/utils/grids.js` to rename or change them. Limits live in `src/constants/config.js`.

## Two palettes

- **Landing: "Curtain night"** (burgundy `#4A0D1B`, brass `#E3A83B`, cream text). Defined in `pages/Landing/Landing.module.css` and `CurtainTransition.module.css`.
- **Booth screens: "Warm film"** (cream `#F3E3C3`, burgundy buttons `#6B1428`, ink `#2B1A12`, brass only as a small highlight). Defined as tokens in `src/styles/tokens.css`.

Burgundy appears on both sides, so the two halves read as one product.

## Responsive

Designed for phone (under 700px), tablet (700-1100px) and laptop. On phones the Back/Continue bar is pinned to the bottom, layout cards go two per row, the camera controls sit under the viewfinder with a swipeable thumbnail row, and tap targets are at least 44px. Safe-area insets are respected, and hover lifts are disabled on touch devices.

## Keyboard

Space / Enter: start taking photos (camera screen) · Esc: go back

## Project structure

```
src/
  main.jsx, App.jsx            entry, routes + guards
  styles/                      tokens.css (Warm film theme), global.css
  constants/                   config.js (limits, timers, resolutions), palettes.js, animation.js
  utils/                       grids.js (layouts + portrait rule), canvas.js (capture + strip drawing), download.js
  context/                     BoothContext + boothReducer (session state), ToastContext
  hooks/                       useCamera, useCaptureSession, usePrintAnimation, useKeyboardShortcuts, useViewport
  pages/                       Landing, SelectGrid, Camera, Customize
  components/
    landing/                   PhotoStrip, CurtainTransition (curtain provider + overlay)
    layout/                    PageFrame (headline + content + nav), StepNav
    select/                    GridPicker, GridCard, StripPreview
    camera/                    CameraView, CameraError, TimerPicker, ShutterButton, ShotProgress, ReviewBar
    customize/                 Customizer, ColorSwatches, StripCanvas
    viewer/                    ClipViewer (strip hanging from the clip)
    download/                  PrinterAnimation (machine print-out)
    ui/                        Button, SegmentedControl, Toast, Icon
  assets/images/               booth-hero.png, clip-frame.png, booth-machine.png, cat1-4.jpg
```

## Things to know

- **Landing strip photos:** `src/assets/images/cat1.jpg ... cat4.jpg` are placeholders. Replace them with your own photos (same file names).
- **Routing** uses `HashRouter`, so the built site works on any static host and the browser Back button works.
- **Photos are square.** Each shot is centre-cropped at capture time and the paper is drawn in code, so frame colors apply to the whole strip.
- `prefers-reduced-motion` is respected: the curtains and print-out are skipped.

## Dependencies

`react`, `react-dom`, `react-router-dom` (runtime) · `vite`, `@vitejs/plugin-react` (dev). No UI, state, or animation libraries.
