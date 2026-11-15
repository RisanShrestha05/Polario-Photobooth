// Machine image (src/assets/images/booth-machine.png) is 878 x 257.
export const MACHINE_ASPECT = 257 / 878; // height / width
export const SLOT_Y = 0.459; // slot centre as a fraction of machine height

// Clip image (src/assets/images/clip-frame.png) is 553 x 363.
export const CLIP_ASPECT = 363 / 553; // height / width

// Strip width as a fraction of machine width, by column count.
export const COL_WIDTH_FRACTION = { 1: 0.5, 2: 0.68 };

export const MACHINE_IN_MS = 700;
export const PRINT_MS = 3400;
export const PRINT_STEPS = 20; // stepped motion = mechanical printer feel
