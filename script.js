import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "__FIREBASE_API_KEY__",
  authDomain: "__FIREBASE_AUTH_DOMAIN__",
  projectId: "__FIREBASE_PROJECT_ID__",
  storageBucket: "__FIREBASE_STORAGE_BUCKET__",
  messagingSenderId: "__FIREBASE_MESSAGING_SENDER_ID__",
  appId: "__FIREBASE_APP_ID__",
  measurementId: "__FIREBASE_MEASUREMENT_ID__"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getDeviceId() {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = 'device_' + crypto.randomUUID();
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
}
const DEVICE_ID = getDeviceId();

class Cell {
  constructor(r, c, el) {
    this.r = r;
    this.c = c;
    this.el = el;
    this.mine = false;
    this.revealed = false;
    this.flagged = false;
  }
}

class Game {
  constructor() {
    this.levels = {
      easy: { r: 9, c: 9, m: 10 },
      medium: { r: 16, c: 16, m: 40 },
      hard: { r: 16, c: 30, m: 99 },
    };

    this.gridEl = document.getElementById("grid");
    this.gridEl.addEventListener("contextmenu", (e) => e.preventDefault());
    this.mineEl = document.getElementById("mineCount");
    this.hintEl = document.getElementById("hintBtn");
    this.timerEl = document.getElementById("timer");
    this.diffSelect = document.getElementById("difficulty");
    this.customModal = document.getElementById("customModalOverlay");
    this.customInputs = {
      r: document.getElementById("customR"),
      c: document.getElementById("customC"),
      m: document.getElementById("customM"),
    };
    this.overlay = document.getElementById("overlay");
    this.modal = this.overlay.querySelector(".modal");
    this.modalTitle = document.getElementById("modalTitle");
    this.modalText = document.getElementById("modalText");
    this.bestEl = document.getElementById("best");

    this.restart = this.restart.bind(this);
    this.handleTheme = this.handleTheme.bind(this);
    this.useHint = this.useHint.bind(this);
    this.applyCustom = this.applyCustom.bind(this);
    this.cancelCustom = this.cancelCustom.bind(this);

    this.currentDiff = "easy";
    this.loadTheme();
    this.updateBest();

    this.restart();

    this.isLeftDown = false;
    this.isRightDown = false;

    document.addEventListener("mousedown", (e) => {
      if (e.button === 0) this.isLeftDown = true;
      if (e.button === 2) this.isRightDown = true;
    });

    document.addEventListener("mouseup", () => {
      this.isLeftDown = false;
      this.isRightDown = false;
    });

    document.addEventListener("keydown", (e) => {
      if (e.target.tagName === 'INPUT') return;
      
      switch(e.key.toLowerCase()) {
        case 'r':
          this.restart();
          break;
        case 'h':
          this.useHint();
          break;
        case 't':
          this.handleTheme();
          break;
      }
    });
  }

  loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }
  }

  handleTheme() {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  restart() {
    this.stopTimer();
    this.overlay.style.display = "none";
    this.overlay.classList.remove("visible");
    this.modal.classList.remove("win", "lose");

    this.started = false;
    this.gameOver = false;
    this.time = 0;
    this.timerEl.innerText = "00:00";

    const diff = this.diffSelect.value;

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
    this.hints = 3;
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

        let pressTimer;
        el.addEventListener("touchstart", (e) => {
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

  updateMineCount() {
    this.mineEl.innerHTML = `💣 ${this.M - this.flags}`;
  }

  updateHintCount() {
    this.hintEl.innerText = `💡 ${this.hints}`;
    this.hintEl.disabled = this.hints === 0 || this.gameOver;
  }

  useHint() {
    if (this.gameOver || this.hints <= 0 || !this.started) return;

    let safeCells = [];
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

  applyCustom() {
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

  cancelCustom() {
    this.customModal.style.display = "none";
    this.customModal.classList.remove("visible");
    this.diffSelect.value = this.currentDiff;
    this.restart();
  }

  startTimer() {
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

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  placeMines(safeCell) {
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

  handleClick(cell) {
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
  }

  toggleFlag(cell) {
    if (this.gameOver || cell.revealed || !this.started) return;

    cell.flagged = !cell.flagged;
    cell.el.classList.toggle("flagged");
    cell.el.textContent = cell.flagged ? "🚩" : "";

    this.flags += cell.flagged ? 1 : -1;
    this.updateMineCount();
  }

  reveal(cell) {
    if (cell.revealed || cell.flagged) return;

    cell.revealed = true;
    cell.el.classList.add("revealed");

    if (cell.mine) {
      this.endGame(false, cell);
      return;
    }

    const count = this.countMines(cell);
    if (count > 0) {
      cell.el.textContent = count;
      cell.el.classList.add(`n${count}`);
    } else {
      this.getNeighbors(cell).forEach((n) => this.reveal(n));
    }

    this.checkWin();
  }

  tryChord(cell) {
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

  countMines(cell) {
    return this.getNeighbors(cell).filter((n) => n.mine).length;
  }

  getNeighbors(cell) {
    const neighbors = [];
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

  checkWin() {
    if (this.gameOver) return;

    const totalCells = this.R * this.C;
    const revealedCount = this.grid.flat().filter((c) => c.revealed).length;

    if (revealedCount === totalCells - this.M) {
      this.endGame(true);
    }
  }

  endGame(win, triggerCell) {
    this.gameOver = true;
    this.stopTimer();

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
        localStorage.setItem("best-" + currentDiff, this.time);
      }
      
      if (['easy', 'medium', 'hard'].includes(currentDiff)) {
        showNameModal(this.time, currentDiff);
      } else {
        this.showModal(true);
      }
    } else {
      this.showModal(false);
    }

    this.updateBest();
  }

  showModal(win) {
    this.modalTitle.textContent = win ? "You Won! 🎉" : "Game Over 💥";
    this.modalText.textContent = win
      ? `Completed in ${this.timerEl.innerText}`
      : "Better luck next time!";

    this.modal.className = `modal ${win ? "win" : "lose"}`;
    this.overlay.style.display = "flex";
    this.overlay.offsetHeight;
    this.overlay.classList.add("visible");
  }

  updateBest() {
    const diff = this.diffSelect.value;
    const best = localStorage.getItem("best-" + diff);
    this.bestEl.textContent = best ? `🏆 Best: ${best}s` : "";
  }
}

const game = new Game();

let currentLeaderboardDiff = 'easy';
let pendingScore = null;

async function fetchLeaderboard(difficulty) {
  const leaderboardList = document.getElementById('leaderboardList');
  leaderboardList.innerHTML = '<p>Loading...</p>';
  
  try {
    const scoresRef = collection(db, `leaderboard_${difficulty}`);
    const q = query(scoresRef, orderBy('time', 'asc'), limit(10));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      leaderboardList.innerHTML = '<p>No scores yet. Be the first!</p>';
      return;
    }
    
    leaderboardList.innerHTML = '';
    let rank = 1;
    snapshot.forEach(doc => {
      const data = doc.data();
      const item = document.createElement('div');
      item.className = 'leaderboard-item';
      item.innerHTML = `
        <span class="rank">#${rank}</span>
        <span class="name">${data.name}</span>
        <span class="time">${data.time}s</span>
      `;
      leaderboardList.appendChild(item);
      rank++;
    });
  } catch (e) {
    console.error('Error fetching leaderboard:', e);
    leaderboardList.innerHTML = '<p>Error loading scores.</p>';
  }
}

function showLeaderboard() {
  const overlay = document.getElementById('leaderboardOverlay');
  overlay.style.display = 'flex';
  overlay.classList.add('visible');
  fetchLeaderboard(currentLeaderboardDiff);
  
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLeaderboardDiff = btn.dataset.diff;
      fetchLeaderboard(currentLeaderboardDiff);
    };
  });
}

function closeLeaderboard() {
  const overlay = document.getElementById('leaderboardOverlay');
  overlay.style.display = 'none';
  overlay.classList.remove('visible');
}

function showNameModal(time, difficulty) {
  pendingScore = { time, difficulty };
  const overlay = document.getElementById('nameModalOverlay');
  overlay.style.display = 'flex';
  overlay.classList.add('visible');
  document.getElementById('playerName').value = localStorage.getItem('playerName') || '';
  document.getElementById('playerName').focus();
}

function closeNameModal() {
  const overlay = document.getElementById('nameModalOverlay');
  overlay.style.display = 'none';
  overlay.classList.remove('visible');
  pendingScore = null;
}

async function submitScore() {
  if (!pendingScore) return;
  
  const nameInput = document.getElementById('playerName');
  const name = nameInput.value.trim() || 'Anonymous';
  localStorage.setItem('playerName', name);
  
  const collectionName = `leaderboard_${pendingScore.difficulty}`;
  
  try {
    const scoresRef = collection(db, collectionName);
    const q = query(scoresRef, orderBy('time', 'asc'));
    const snapshot = await getDocs(q);
    
    let existingDoc = null;
    snapshot.forEach(doc => {
      if (doc.data().deviceId === DEVICE_ID) {
        existingDoc = { id: doc.id, ...doc.data() };
      }
    });
    
    if (existingDoc) {
      if (pendingScore.time < existingDoc.time) {
        const { doc: docRef, updateDoc } = await import("https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js");
        const docToUpdate = docRef(db, collectionName, existingDoc.id);
        await updateDoc(docToUpdate, {
          name: name,
          time: pendingScore.time,
          timestamp: Date.now()
        });
      } else {
        const { doc: docRef, updateDoc } = await import("https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js");
        const docToUpdate = docRef(db, collectionName, existingDoc.id);
        await updateDoc(docToUpdate, { name: name });
      }
    } else {
      await addDoc(collection(db, collectionName), {
        deviceId: DEVICE_ID,
        name: name,
        time: pendingScore.time,
        timestamp: Date.now()
      });
    }
    
    closeNameModal();
    game.restart();
    showLeaderboard();
  } catch (e) {
    console.error('Error submitting score:', e);
    alert('Failed to submit score. Please try again.');
  }
}

window.restartGame = () => game.restart();
window.toggleTheme = () => game.handleTheme();
window.useHint = () => game.useHint();
window.applyCustom = () => game.applyCustom();
window.cancelCustom = () => game.cancelCustom();
window.showLeaderboard = showLeaderboard;
window.closeLeaderboard = closeLeaderboard;
window.submitScore = submitScore;
window.closeNameModal = closeNameModal;
document.getElementById("difficulty").addEventListener("change", () => game.restart());
