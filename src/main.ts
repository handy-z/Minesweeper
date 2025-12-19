import { Game } from './game/Game';

const game = new Game();

// Expose to window for HTML onclick handlers
declare global {
  interface Window {
    restartGame: () => void;
    toggleTheme: () => void;
    useHint: () => void;
    applyCustom: () => void;
    cancelCustom: () => void;
    showLeaderboard: () => void;
    closeLeaderboard: () => void;
    submitScore: () => void;
    closeNameModal: () => void;
  }
}

window.restartGame = () => game.restart();
window.toggleTheme = () => game.handleTheme();
window.useHint = () => game.useHint();
window.applyCustom = () => game.applyCustom();
window.cancelCustom = () => game.cancelCustom();
window.showLeaderboard = () => game.showLeaderboardHandler();
window.closeLeaderboard = () => game.closeLeaderboard();
window.submitScore = () => game.submitScoreHandler();
window.closeNameModal = () => game.closeNameModal();

document.getElementById('difficulty')?.addEventListener('change', () => game.restart());
