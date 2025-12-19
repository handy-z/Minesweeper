import type { CellData } from '../types';

export class Cell implements CellData {
  r: number;
  c: number;
  el: HTMLDivElement;
  mine: boolean = false;
  revealed: boolean = false;
  flagged: boolean = false;

  constructor(r: number, c: number, el: HTMLDivElement) {
    this.r = r;
    this.c = c;
    this.el = el;
  }
}
