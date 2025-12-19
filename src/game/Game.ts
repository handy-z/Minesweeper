import { Cell } from "./Cell";
import { DIFFICULTY_LEVELS, HINTS_PER_GAME } from "./constants";
import type { CustomConfig, DifficultyKey, PendingScore } from "../types";
import { fetchLeaderboard, submitScore } from "../firebase/leaderboard";

import { SoundManager } from "./SoundManager";

export class Game {
  private levels = DIFFICULTY_LEVELS;
  private gridEl: HTMLDivElement;
  private mineEl: HTMLElement;
  private hintEl: HTMLButtonElement;
  private timerEl: HTMLElement;
  private diffSelect: HTMLSelectElement;
  private customModal: HTMLElement;
  private customInputs: {
    r: HTMLInputElement;
    c: HTMLInputElement;
    m: HTMLInputElement;
  };
  private overlay: HTMLElement;
  private modal: HTMLElement;
  private modalTitle: HTMLElement;
  private modalText: HTMLElement;
  private bestEl: HTMLElement;
  private soundBtn: HTMLButtonElement;

  private grid: Cell[][] = [];
  private R: number = 9;
  private C: number = 9;
  private M: number = 10;
  private flags: number = 0;
  private hints: number = HINTS_PER_GAME;
  private started: boolean = false;
  private gameOver: boolean = false;
  private time: number = 0;
  private timerInterval?: ReturnType<typeof setInterval>;
  private startTime: number = 0;
  private currentDiff: DifficultyKey = "easy";
  private customConfig: CustomConfig | null = null;
  private isLeftDown: boolean = false;
  private isRightDown: boolean = false;
  private soundManager: SoundManager;

  constructor() {
    this.soundManager = new SoundManager();
    this.gridEl = document.getElementById("grid") as HTMLDivElement;
    this.gridEl.addEventListener("contextmenu", (e) => e.preventDefault());
    this.mineEl = document.getElementById("mineCount")!;
    this.hintEl = document.getElementById("hintBtn") as HTMLButtonElement;
    this.timerEl = document.getElementById("timer")!;
    this.diffSelect = document.getElementById(
      "difficulty"
    ) as HTMLSelectElement;
    this.customModal = document.getElementById("customModalOverlay")!;
    this.customInputs = {
      r: document.getElementById("customR") as HTMLInputElement,
      c: document.getElementById("customC") as HTMLInputElement,
      m: document.getElementById("customM") as HTMLInputElement,
    };
    this.overlay = document.getElementById("overlay")!;
    this.modal = this.overlay.querySelector(".modal")!;
    this.modalTitle = document.getElementById("modalTitle")!;
    this.modalText = document.getElementById("modalText")!;
    this.bestEl = document.getElementById("best")!;
    this.soundBtn = document.getElementById("soundBtn") as HTMLButtonElement;

    this.loadTheme();
    this.updateBest();
    this.restart();
    this.setupGlobalEvents();
  }

  toggleSound(): void {
    const enabled = this.soundManager.toggle();
    this.soundBtn.innerText = enabled ? "🔊" : "🔇";
  }

  private setupGlobalEvents(): void {
    document.addEventListener("mousedown", (e) => {
      if (e.button === 0) this.isLeftDown = true;
      if (e.button === 2) this.isRightDown = true;
    });

    document.addEventListener("mouseup", () => {
      this.isLeftDown = false;
      this.isRightDown = false;
    });

    document.addEventListener("keydown", (e) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return;
      switch (e.key.toLowerCase()) {
        case "r":
          this.restart();
          break;
        case "h":
          this.useHint();
          break;
        case "t":
          this.handleTheme();
          break;
        case "m":
          this.toggleSound();
          break;
      }
    });
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || !savedTheme) {
      document.body.classList.add("dark");
      if (!savedTheme) localStorage.setItem("theme", "dark");
    }
  }

  handleTheme(): void {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  restart(): void {
    this.stopTimer();
    this.overlay.style.display = "none";
    this.overlay.classList.remove("visible");
    this.modal.classList.remove("win", "lose");

    this.started = false;
    this.gameOver = false;
    this.time = 0;
    this.timerEl.innerText = "00:00";

    const diff = this.diffSelect.value as DifficultyKey;

    if (diff === "custom") {
      if (!this.customConfig) {
        this.customModal.classList.add("visible");
        this.customModal.style.display = "flex";
        return;
      }
      this.R = this.customConfig.r;
      this.C = this.customConfig.c;
      this.M = this.customConfig.m;
    } else {
      this.customConfig = null;
      this.currentDiff = diff;
      const level = this.levels[diff];
      this.R = level.r;
      this.C = level.c;
      this.M = level.m;
    }

    this.flags = 0;
    this.hints = HINTS_PER_GAME;
    this.updateMineCount();
    this.updateHintCount();

    this.grid = [];
    this.gridEl.innerHTML = "";
    this.gridEl.style.gridTemplateColumns = `repeat(${this.C}, auto)`;

    for (let r = 0; r < this.R; r++) {
      this.grid[r] = [];
      for (let c = 0; c < this.C; c++) {
        const el = document.createElement("div");
        el.className = "cell";

        const cell = new Cell(r, c, el);

        el.addEventListener("mousedown", (e) => {
          if (e.button === 0) {
            this.handleClick(cell);
          } else if (e.button === 2) {
            e.preventDefault();
            this.toggleFlag(cell);
          }
        });

        el.addEventListener("mouseenter", () => {
          if (this.isLeftDown) {
            this.handleClick(cell);
          } else if (this.isRightDown) {
            if (!cell.revealed && !cell.flagged) {
              this.toggleFlag(cell);
            }
          }
        });

        let pressTimer: ReturnType<typeof setTimeout>;
        el.addEventListener("touchstart", () => {
          pressTimer = setTimeout(() => this.toggleFlag(cell), 500);
        });
        el.addEventListener("touchend", () => clearTimeout(pressTimer));

        el.addEventListener("dblclick", () => this.tryChord(cell));

        this.gridEl.appendChild(el);
        this.grid[r][c] = cell;
      }
    }

    this.updateBest();
  }

  private updateMineCount(): void {
    this.mineEl.innerHTML = `💣 ${this.M - this.flags}`;
  }

  private updateHintCount(): void {
    this.hintEl.innerText = `💡 ${this.hints}`;
    this.hintEl.disabled = this.hints === 0 || this.gameOver;
  }

  useHint(): void {
    if (this.gameOver || this.hints <= 0 || !this.started) return;

    const safeCells: Cell[] = [];
    for (let r = 0; r < this.R; r++) {
      for (let c = 0; c < this.C; c++) {
        const cell = this.grid[r][c];
        if (!cell.mine && !cell.revealed && !cell.flagged) {
          safeCells.push(cell);
        }
      }
    }

    if (safeCells.length > 0) {
      const randomCell =
        safeCells[Math.floor(Math.random() * safeCells.length)];
      this.reveal(randomCell);
      randomCell.el.style.transition = "background-color 0.5s";
      randomCell.el.style.backgroundColor = "#fbbf24";
      setTimeout(() => {
        randomCell.el.style.backgroundColor = "";
      }, 500);

      this.hints--;
      this.updateHintCount();
    }
  }

  applyCustom(): void {
    const r = parseInt(this.customInputs.r.value);
    const c = parseInt(this.customInputs.c.value);
    const m = parseInt(this.customInputs.m.value);

    if (r < 5 || c < 5 || m < 1) return;
    if (m >= r * c) {
      alert("Too many mines!");
      return;
    }

    this.customConfig = { r, c, m };
    this.customModal.style.display = "none";
    this.customModal.classList.remove("visible");
    this.restart();
  }

  cancelCustom(): void {
    this.customModal.style.display = "none";
    this.customModal.classList.remove("visible");
    this.diffSelect.value = this.currentDiff;
    this.restart();
  }

  private startTimer(): void {
    this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
      const delta = Math.floor((Date.now() - this.startTime) / 1000);
      this.time = delta;
      const m = Math.floor(delta / 60)
        .toString()
        .padStart(2, "0");
      const s = (delta % 60).toString().padStart(2, "0");
      this.timerEl.innerText = `${m}:${s}`;
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private placeMines(safeCell: Cell): void {
    let placed = 0;
    while (placed < this.M) {
      const r = Math.floor(Math.random() * this.R);
      const c = Math.floor(Math.random() * this.C);
      const cell = this.grid[r][c];

      const distR = Math.abs(r - safeCell.r);
      const distC = Math.abs(c - safeCell.c);
      const isSafeZone = distR <= 1 && distC <= 1;

      if (!cell.mine && !isSafeZone) {
        cell.mine = true;
        placed++;
      }
    }
  }

  private handleClick(cell: Cell): void {
    if (this.gameOver || cell.flagged) return;

    if (cell.revealed) {
      this.tryChord(cell);
      return;
    }

    if (!this.started) {
      this.started = true;
      this.placeMines(cell);
      this.startTimer();
    }

    this.reveal(cell);
    this.soundManager.playClick();
  }

  private toggleFlag(cell: Cell): void {
    if (this.gameOver || cell.revealed || !this.started) return;

    cell.flagged = !cell.flagged;
    cell.el.classList.toggle("flagged");
    cell.el.textContent = cell.flagged ? "🚩" : "";

    this.flags += cell.flagged ? 1 : -1;
    this.updateMineCount();
    this.soundManager.playFlag();
  }

  private reveal(cell: Cell): void {
    if (cell.revealed || cell.flagged) return;

    cell.revealed = true;
    cell.el.classList.add("revealed");

    if (cell.mine) {
      this.endGame(false, cell);
      return;
    }

    const count = this.countMines(cell);
    if (count > 0) {
      cell.el.textContent = count.toString();
      cell.el.classList.add(`n${count}`);
    } else {
      this.getNeighbors(cell).forEach((n) => this.reveal(n));
    }

    this.checkWin();
  }

  private tryChord(cell: Cell): void {
    if (!cell.revealed) return;

    const count = this.countMines(cell);
    const neighbors = this.getNeighbors(cell);
    const flaggedCount = neighbors.filter((n) => n.flagged).length;

    if (count === flaggedCount) {
      neighbors.forEach((n) => {
        if (!n.flagged && !n.revealed) {
          this.reveal(n);
        }
      });
    }
  }

  private countMines(cell: Cell): number {
    return this.getNeighbors(cell).filter((n) => n.mine).length;
  }

  private getNeighbors(cell: Cell): Cell[] {
    const neighbors: Cell[] = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const r = cell.r + dr;
        const c = cell.c + dc;
        if (r >= 0 && r < this.R && c >= 0 && c < this.C) {
          neighbors.push(this.grid[r][c]);
        }
      }
    }
    return neighbors;
  }

  private checkWin(): void {
    if (this.gameOver) return;

    const totalCells = this.R * this.C;
    const revealedCount = this.grid.flat().filter((c) => c.revealed).length;

    if (revealedCount === totalCells - this.M) {
      this.endGame(true);
    }
  }

  private endGame(win: boolean, triggerCell?: Cell): void {
    this.gameOver = true;
    this.stopTimer();

    if (win) {
      this.soundManager.playWin();
    } else {
      this.soundManager.playExplosion();
    }

    this.grid.flat().forEach((c) => {
      if (c.mine) {
        if (win) {
          c.el.textContent = "🚩";
          c.el.classList.add("flagged");
        } else {
          if (!c.revealed) {
            c.el.textContent = "💣";
            c.el.classList.add("mine");
          }
          if (c === triggerCell) {
            c.el.classList.add("mine-trigger");
          }
        }
      } else if (c.flagged) {
        c.el.classList.add("wrong-flag");
      }
    });

    if (win) {
      const currentDiff = this.diffSelect.value;
      const savedBest = localStorage.getItem("best-" + currentDiff);
      if (!savedBest || this.time < parseInt(savedBest)) {
        localStorage.setItem("best-" + currentDiff, this.time.toString());
      }

      if (["easy", "medium", "hard"].includes(currentDiff)) {
        this.showNameModal();
      } else {
        this.showModal(true);
      }
    } else {
      this.showModal(false);
    }

    this.updateBest();
  }

  private showModal(win: boolean): void {
    this.modalTitle.textContent = win ? "You Won! 🎉" : "Game Over 💥";
    this.modalText.textContent = win
      ? `Completed in ${this.timerEl.innerText}`
      : "Better luck next time!";

    this.modal.className = `modal ${win ? "win" : "lose"}`;
    this.overlay.style.display = "flex";
    this.overlay.offsetHeight;
    this.overlay.classList.add("visible");
  }

  private showNameModal(): void {
    const overlay = document.getElementById("nameModalOverlay")!;
    overlay.style.display = "flex";
    overlay.classList.add("visible");
    const input = document.getElementById("playerName") as HTMLInputElement;
    input.value = localStorage.getItem("playerName") || "";
    input.focus();
  }

  submitScoreHandler(): void {
    const nameInput = document.getElementById("playerName") as HTMLInputElement;
    const name = nameInput.value.trim() || "Anonymous";
    localStorage.setItem("playerName", name);

    const pendingScore: PendingScore = {
      time: this.time,
      difficulty: this.diffSelect.value,
    };

    submitScore(pendingScore, name, () => {
      this.closeNameModal();
      this.restart();
      this.showLeaderboardHandler();
    });
  }

  closeNameModal(): void {
    const overlay = document.getElementById("nameModalOverlay")!;
    overlay.style.display = "none";
    overlay.classList.remove("visible");
  }

  showLeaderboardHandler(): void {
    const overlay = document.getElementById("leaderboardOverlay")!;
    overlay.style.display = "flex";
    overlay.classList.add("visible");
    fetchLeaderboard("easy");

    document.querySelectorAll(".tab-btn").forEach((btn) => {
      (btn as HTMLElement).onclick = () => {
        document
          .querySelectorAll(".tab-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        fetchLeaderboard((btn as HTMLElement).dataset.diff || "easy");
      };
    });
  }

  closeLeaderboard(): void {
    const overlay = document.getElementById("leaderboardOverlay")!;
    overlay.style.display = "none";
    overlay.classList.remove("visible");
  }

  private updateBest(): void {
    const diff = this.diffSelect.value;
    const best = localStorage.getItem("best-" + diff);
    this.bestEl.textContent = best ? `🏆 Best: ${best}s` : "";
  }
}
