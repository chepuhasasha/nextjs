import { IMaskConfig } from "./mask";

export const modes: IMaskConfig[] = [
  {
    lines: [
      {
        start: { x: 0, y: 50 },
        points: [
          { x: 50, y: 50 },
          { x: 100, y: 100 },
          { x: 100, y: 0 },
        ],
        end: { x: 50, y: 50 },
      },
    ],
    shapes: [
      { type: "ellipse", w: 24, h: 40, x: 50, y: 50 },
      { type: "star", w: 100, h: 100, x: 0, y: 50 },
    ],
    masks: [
      { type: "ellipse", w: 25, h: 40, x: 60, y: 50 },
      { type: "ellipse", w: 25, h: 40, x: 50, y: 50 },
      { type: "star", w: 20, h: 20, x: 10, y: 12 },
    ],
    stroke: 0x8a8c92,
    bg: 0xf1f4f9,
    offset: 0.2,
  },
];
