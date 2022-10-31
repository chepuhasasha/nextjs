import {
  Application,
  Container,
  Filter,
  Graphics,
  ICanvas,
  Sprite,
  Texture,
} from "pixi.js";
import { modes } from "./mask.modes";
import fragment from "./shaders/gradient.frag";

export interface IMaskLine {
  start: { x: number; y: number };
  points: { x: number; y: number }[];
  end: { x: number; y: number };
}

export interface IMaskShape {
  type: "ellipse" | "star";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface IMaskConfig {
  lines: IMaskLine[];
  shapes: IMaskShape[];
  masks: IMaskShape[];
  stroke: number;
  bg: number;
  offset: number;
}

export class Mask {
  mouse: { x: number; y: number } = { x: 0, y: 0 };
  // DISPLAY
  rect: { width: number; height: number; x: number; y: number } = {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  };
  // CONFIG
  lines: IMaskLine[];
  shapes: IMaskShape[];
  masks: IMaskShape[];
  url: string;
  stroke: number = 0x8a8c92;
  bg: number = 0xf1f4f9;
  offset: number = 0.5;
  // PIXI
  APP: Application = new Application({
    backgroundColor: this.bg,
    antialias: true,
  });
  SPRITE: Sprite = new Sprite();
  TEXTURE: Texture;
  GRAPHICS: Graphics = new Graphics();
  CONTAINER: Container = new Container();
  MASK: Graphics = new Graphics();
  FILTER: Filter;

  constructor(private div: HTMLDivElement, mode: number, url: string) {
    this.config = modes[mode];
    this.image = url;
    this.div.appendChild(this.APP.view as HTMLCanvasElement);
    this.FILTER = new Filter(null, fragment, { timeX: 0.0, timeY: 0.0 });

    this.APP.stage.addChild(this.GRAPHICS);
    this.APP.stage.addChild(this.CONTAINER);
    this.APP.stage.addChild(this.MASK);
    this.CONTAINER.addChild(this.SPRITE);
    this.SPRITE.filters = [this.FILTER];
    this.CONTAINER.mask = this.MASK;

    this.APP.ticker.add(() => {
      this.mouse = this.APP.renderer.plugins.interaction.mouse.global;
      this.FILTER.uniforms.timeX += this.delta.dx / 100;
      this.FILTER.uniforms.timeY += this.delta.dy / 100;
      this.FILTER.uniforms.mouse = this.mouse;
      this.Resize();
      this.MASK.clear();
      this.GRAPHICS.clear();
      this.DrawLines();
      this.DrawShapes();
      this.DrawMasks();
      this.SPRITE.position.set(this.delta.x / 2, this.delta.y / 2);
    });
  }

  Resize() {
    this.rect = this.div.getBoundingClientRect();
    this.APP.screen.width = this.rect.width;
    this.APP.screen.height = this.rect.height;
    this.APP.view.width = this.rect.width;
    this.APP.view.height = this.rect.height;
    this.CONTAINER.width = this.rect.width;
    this.CONTAINER.height = this.rect.height;
  }

  DrawLines() {
    this.GRAPHICS.lineStyle(1, this.stroke, 1);
    this.lines.forEach((line) => {
      this.GRAPHICS.moveTo(
        this.PCTToPX(this.rect.width, line.start.x),
        this.PCTToPX(this.rect.height, line.start.y)
      );
      line.points.forEach((point) => {
        this.GRAPHICS.lineTo(
          this.PCTToPX(this.rect.width, point.x),
          this.PCTToPX(this.rect.height, point.y)
        );
      });

      this.GRAPHICS.lineTo(
        this.PCTToPX(this.rect.width, line.end.x),
        this.PCTToPX(this.rect.height, line.end.y)
      );
    });
  }

  DrawShapes() {
    this.GRAPHICS.lineStyle(1, this.stroke, 1);
    this.shapes.forEach((shape) => {
      if (shape.type === "ellipse") this.DrawEllipse(this.GRAPHICS, shape);
      if (shape.type === "star") this.DrawStar(this.GRAPHICS, shape);
    });
  }

  DrawMasks() {
    this.MASK.beginFill(0xffffff, 0.1);
    this.GRAPHICS.lineStyle(2, this.stroke, 1);
    this.masks.forEach((mask, i) => {
      if (mask.type === "ellipse") {
        this.DrawEllipse(this.MASK, mask, i);
        this.DrawEllipse(this.GRAPHICS, mask, i);
      }
      if (mask.type === "star") {
        this.DrawStar(this.MASK, mask);
        this.DrawStar(this.GRAPHICS, mask);
      }
    });
    this.MASK.endFill();
  }

  DrawEllipse(
    graphics: Graphics,
    ellipse: { w: number; h: number; x: number; y: number },
    i?: number
  ) {
    graphics.drawEllipse(
      this.PCTToPX(this.rect.width, ellipse.x) +
        (i ? this.delta.x * (i + 1) : 0),
      this.PCTToPX(this.rect.height, ellipse.y) +
        (i ? (this.delta.y / 2) * (i + 1) : 0),
      this.PCTToPX(this.rect.width, ellipse.w),
      this.PCTToPX(this.rect.height, ellipse.h)
    );
  }

  DrawStar(
    graphics: Graphics,
    star: { w: number; h: number; x: number; y: number }
  ) {
    const r = this.PCTToPX(this.rect.width, star.w / 2);
    const x = this.PCTToPX(this.rect.width, star.x);
    const y = this.PCTToPX(this.rect.height, star.y);
    const rad = Math.PI / 180;
    graphics.moveTo(x, y - r);
    graphics.arc(x - r, y - r, r, 0, 90 * rad);
    graphics.arc(x - r, y + r, r, 270 * rad, 0);
    graphics.arc(x + r, y + r, r, 180 * rad, 270 * rad);
    graphics.arc(x + r, y - r, r, 90 * rad, 180 * rad);
  }

  PCTToPX(value: number, percent: number) {
    return (value / 100) * percent;
  }

  set config(config: IMaskConfig) {
    this.lines = config.lines;
    this.shapes = config.shapes;
    this.masks = config.masks;
    this.stroke = config.stroke;
    this.bg = config.bg;
    this.offset = config.offset;
  }

  set image(url: string) {
    this.url = url;
    this.TEXTURE = Texture.from(this.url);
    this.SPRITE.texture = this.TEXTURE;
  }

  get delta() {
    let dx = 1;
    let dy = 1;
    if (this.mouse.x > this.rect.width / 2) dx = 1.0;
    if (this.mouse.x < this.rect.width / 2) dx = -1.0;
    if (this.mouse.y > this.rect.height / 2) dy = 1.0;
    if (this.mouse.y < this.rect.height / 2) dy = -1.0;
    return {
      x: (this.mouse.x - this.rect.width / 2) * this.offset,
      y: (this.mouse.y - this.rect.height / 2) * this.offset,
      dx,
      dy,
    };
  }
}
