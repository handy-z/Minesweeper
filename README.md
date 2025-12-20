# Minesweeper

A modern Minesweeper game featuring glassmorphism UI, custom themes, and an online leaderboard.

**Website**: [https://handy-z.github.io/Minesweeper/](https://handy-z.github.io/Minesweeper/)

## How to Play

**Goal**: Clear the board without detonating any mines.
**Winning**: Flag all mines correctly or reveal all safe cells.

## Controls

### Desktop Mouse / Keyboard
- **Left Click**/**Drag Left Click**: Reveal a cell.
- **Right Click**/**Drag Right Click**: Flag a cell.
- **R**: Restart Game
- **H**: Use Hint
- **T**: Toggle Theme (Light/Dark)
- **M**: Toggle Sound

### Mobile / Touch
- **Tap**: Reveal a cell.
- **Long Press**: Flag a cell.
- **Flag Mode Button**: Toggle to tap-to-flag mode.

## Tech Stack

- **Runtime**: [Bun](https://bun.sh)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Backend**: [Firebase](https://firebase.google.com/)
- **Styling**: CSS

## Prerequisites

- [Bun](https://bun.sh) installed on your machine.

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/handy-z/Minesweeper.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd Minesweeper
    ```
3.  Install dependencies:
    ```bash
    bun install
    ```

## Usage

### Development Server
Run the build in watch mode:
```bash
bun run dev
```

### Live Server
Start a local server to view the game:
```bash
bun run serve
```

## License

This project is open source and available under the [MIT License](LICENSE).
