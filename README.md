# Polario: Online Photo Booth

A web app where you pick a layout, take a strip of photos with your webcam, add a caption and colors, and watch the finished polaroid strip print out of a vintage photo booth before it saves to your device.

## Project purpose

Polario lets one person create a keepsake photo strip in a few taps. The user chooses how many photos the strip holds, takes the photos with a countdown, customizes the caption and colors, and downloads the result as a PNG. The experience is meant to feel like stepping into a real booth: red velvet curtains close on the landing page, the strip hangs from a metal clip while you edit it, and it prints out of a booth machine when you download.

The application is intentionally frontend-only. It does not use accounts, authentication, a server database, or any upload API. Photos exist only in the browser's memory while the page is open and are never sent anywhere.

## Technology fundamentals

The application uses the following technology stack:

| Technology | Purpose |
|---|---|
| React 18 | Component-based user interface and session state (`useReducer` with context) |
| React Router 6 (hash routing) | Screen navigation that works on any static host, with a working browser Back button |
| Vite | Development server and production build tooling |
| JavaScript/JSX | Application logic and component markup |
| CSS3 with CSS Modules | Visual design, responsive behavior, animation, and shared design tokens |
| Browser MediaDevices API | Live camera access and resolution selection |
| Browser Canvas API | Frame capture, strip drawing, and PNG export |

The application source is implemented entirely with JavaScript and JSX. It has no backend routes, database, authentication system, or server-side storage. The only runtime dependencies are `react`, `react-dom`, and `react-router-dom`.

## Design reference and decisions

The supplied reference images were treated as the visual source of truth: a landing page with a huge title, flanking photo strips, and a pill-shaped start button; a vintage photo booth with a red curtain; a metal binder clip holding a photo strip; and a photo booth machine with a print slot. The implementation follows their key characteristics:

- A dramatic burgundy stage with red velvet curtains for the landing page.
- A vintage photo booth illustration as the centerpiece, flanked by tilted photo strips.
- A calm, warm cream workspace for the setup and customization screens.
- Serif headlines with pill-shaped buttons.
- Polaroid details: a thicker footer, thin photo borders, and soft shadows.
- One headline per screen, with no step bar and no subtitles, so it does not look like a generic form flow.
- Visual cards for choosing a layout instead of dropdowns or number controls.
- Every screen sized to fit the window without scrolling.

The chosen design direction uses **two palettes**: *Curtain night* on the landing page and *Warm film* everywhere else. Burgundy appears in both, so the two halves read as one product.

| Design element | Implementation |
|---|---|
| Landing background | Burgundy `#4A0D1B` |
| Curtains | Red velvet pleats `#8A1A2E` and `#6E1324`, with a brass edge on the transition |
| Landing text | Cream `#F8EBD2` and `#EBD9B8` |
| Landing button | Brass `#E3A83B` with dark ink `#2A0A12` |
| Workspace background | Warm cream `#F3E3C3` |
| Card surface | `#FBF3E2`, white when selected |
| Ink | `#2B1A12` (body) and `#5A4636` (secondary text) |
| Primary and selection color | Burgundy `#6B1428` |
| Polaroid paper | White `#FFFFFF` |
| Display font | Georgia (serif) |
| Interface font | Avenir Next, Segoe UI, or the system sans-serif |
| Primary visual object | Vintage photo booth with a red curtain |
| Supporting visual objects | Metal clip holding the strip, and the booth machine with its print slot |

The design intentionally avoids a dashboard look, a step bar, long instructions, and filters. It is a single calm column of choices at a time, and the only big moments are the curtains, the clip drop, and the print-out.

## How it works

For the user, there are three steps after the landing page:

- **Choose layout.** Tap one of seven visual cards. Each card shows the strip as an empty polaroid with its name and photo count. The headline reads "Choose layout".
- **Take photos.** Allow camera access, pick a timer, and press the shutter. The headline reads "Take photos", or "Take photo" if the single layout was chosen. The viewfinder is square, so what you see is exactly what gets captured. Thumbnails fill in as each photo is taken.
- **Customize.** The strip hangs from a metal clip. Add a caption and choose a frame color and a caption color from the presets. The headline reads "Customize".

Pressing **Download** plays the booth print-out: the photo booth machine slides in and the strip prints out of its slot in mechanical steps. The file then saves automatically. After printing, the user can download again, take another strip, or go back to editing.

On the landing page, pressing **Start Photo Session** closes the red curtains over the screen. They open again on the layout screen.

## Rules and behavior

**Layouts**
- Maximum of 2 columns and 4 rows, giving seven layouts.
- Portrait only: a strip is never wider than it is tall. 1×2 exists, 2×1 does not.
- The default layout is 1×3. Changing the layout clears any photos already taken.

| 1 column | 2 columns |
|---|---|
| 1×1 Single | 2×2 Square |
| 1×2 Duo | 2×3 Collage |
| 1×3 Triple (default) | 2×4 Tall collage |
| 1×4 Classic | |

**Camera and timer**
- The camera asks for 1080p first, then steps down to 720p, 480p, and finally whatever the device offers. It also tries portrait-swapped sizes, which many phones expect. The resolution received is shown on screen.
- The timer options are 3, 4, and 10 seconds. The chosen timer applies to the first photo only.
- Every photo after the first has a fixed 3-second countdown, whichever timer was chosen.
- Each photo is cropped to a square and mirrored like the preview. There are no filters.
- After all photos are taken, tapping a thumbnail retakes just that photo. **Retake all** starts over.
- The camera stops when the user leaves the camera screen.

**Customizing**
- The caption holds up to 38 characters. If it is left empty, the strip says "Polario".
- There are 12 frame colors and 8 caption colors, chosen with one tap.
- A warning appears if the caption color is hard to read on the chosen frame.
- Reset returns the caption and colors to their defaults.

**Navigation and validation**
- The camera screen cannot be opened until a layout has been confirmed.
- The customize screen cannot be opened until every photo has been taken. The Customize button stays disabled until then.
- Keyboard shortcuts on the camera screen: Space or Enter starts taking photos, Escape goes back.

**Responsive behavior and accessibility**
- Layouts adapt to phones, tablets, and laptops, in portrait and landscape.
- Every screen is sized from the window height to fit in one view. On very short windows, such as a phone held sideways, scrolling is allowed as a last resort.
- Tap targets are at least 44 pixels, and hover effects are disabled on touch screens.
- Controls are keyboard operable with visible focus outlines, and the countdown is announced to screen readers.
- If the device asks for reduced motion, the curtains and print-out animation are skipped.

## Download behavior

- The result is saved as a PNG named `polario-strip-<date and time>.png`.
- Each photo is exported at up to 1080 pixels, and the paper, photos, and caption are drawn together, so the downloaded file matches the preview.
- The file downloads automatically when the strip finishes printing. **Download again** saves it a second time.
- **Take another** clears the session and returns to the layout screen.

## Data handling fundamentals

The application keeps everything in memory because there is no backend.

- The chosen layout, timer, photos, caption, and colors live in a React reducer for the current visit only.
- Nothing is written to local storage or cookies, and nothing is uploaded.
- Refreshing or closing the page clears the session.
- Anyone using the same device can only see what is currently on screen. There are no links to share and nothing to recover.


## Known frontend-only limitations

Because this project does not use a backend or database:

- A strip exists only until the page is refreshed or closed, unless it has been downloaded.
- There is no account, saved library, gallery, or recovery of earlier strips.
- There is no sharing link. The only output is the downloaded PNG.
- The camera requires the user's permission, and the picture quality depends on the device. Many laptop cameras top out at 720p or 1080p.
- The camera works only on `localhost` or HTTPS, and only if no other app is using it.
- The landing page photos are placeholders. Replace `cat1.jpg` to `cat4.jpg` in `src/assets/images/` with real photos.
- Navigation uses hash URLs such as `#/camera`, and a refresh on the camera or customize screen returns to the layout screen.
- The layouts use modern viewport units, so recent browsers are recommended: Chrome and Edge 108+, Firefox 101+, and Safari 15.4+.

These limitations follow the original frontend-only technical direction.

## Future implementations

Ideas gathered from researching other online photo booths and current design practice. None are built yet.

| Idea | Why it is worth adding |
|---|---|
| Share button | The Web Share API can send the finished image to other apps on phones, with the normal download as a fallback. It needs HTTPS |
| Thumb-reach camera controls on phones | Other booths use a side panel on desktop and a bottom sheet on mobile, which keeps the shutter and timer within easy reach |
| "Your photos stay on your device" note | Polario never uploads photos, and saying so near the camera permission prompt builds trust |
| Optional stickers | Stickers are a standard feature in online photo booths. A small set of vector stickers would fit, with undo and redo |
| Paper grain on the strip | Subtle texture suits the retro look and current design trends, and would apply to the paper only, not the camera |
| Booth slot transition | On Start, a strip could slide out of the slot on the booth illustration before the curtains close |
| Print and QR code sharing | Carried over from the original plan: send a strip to a printer, or share a gallery by QR code |