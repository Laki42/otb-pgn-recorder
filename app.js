import { Chess } from 'https://cdn.jsdelivr.net/npm/chess.js@1.4.0/+esm';

const GAME_KEY = 'otb_chess_scoresheet_state_v1';
const ORIENT_KEY = 'otb_chess_scoresheet_orientation_v1';
const META_KEY = 'otb_chess_scoresheet_metadata_v1';
const PLAYER_NAME = 'Aki';
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const PIECES = {
  wp: '♙', wn: '♘', wb: '♗', wr: '♖', wq: '♕', wk: '♔',
  bp: '♟', bn: '♞', bb: '♝', br: '♜', bq: '♛', bk: '♚'
};

const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const moveListEl = document.getElementById('moveList');
const undoBtn = document.getElementById('undoBtn');
const newGameBtn = document.getElementById('newGameBtn');
const flipBtn = document.getElementById('flipBtn');
const copyPgnBtn = document.getElementById('copyPgnBtn');
const copyLichessBtn = document.getElementById('copyLichessBtn');
const exportPgnBtn = document.getElementById('exportPgnBtn');
const myColorInput = document.getElementById('myColorInput');
const opponentInput = document.getElementById('opponentInput');
const roundInput = document.getElementById('roundInput');
const dateInput = document.getElementById('dateInput');

let chess = new Chess();
let selectedSquare = null;
let orientation = localStorage.getItem(ORIENT_KEY) || 'white';

function todayDateValue() {
  const now = new Date();
  const localTime = now.getTime() - now.getTimezoneOffset() * 60000;
  return new Date(localTime).toISOString().slice(0, 10);
}

function defaultMetadata() {
  return {
    myColor: 'white',
    opponent: '',
    round: '1',
    date: todayDateValue()
  };
}

function readMetadata() {
  const round = Math.max(1, Number.parseInt(roundInput.value, 10) || 1);
  return {
    myColor: myColorInput.value === 'black' ? 'black' : 'white',
    opponent: opponentInput.value.trim(),
    round: String(round),
    date: dateInput.value || todayDateValue()
  };
}

function saveMetadata() {
  localStorage.setItem(META_KEY, JSON.stringify(readMetadata()));
}

function restoreMetadata() {
  let metadata = defaultMetadata();
  try {
    const saved = JSON.parse(localStorage.getItem(META_KEY) || 'null');
    if (saved) metadata = { ...metadata, ...saved };
  } catch (_error) {
    console.warn('Could not restore saved metadata.');
  }

  myColorInput.value = metadata.myColor === 'black' ? 'black' : 'white';
  opponentInput.value = metadata.opponent || '';
  roundInput.value = metadata.round || '1';
  dateInput.value = metadata.date || todayDateValue();
}

function formatPgnDate(value) {
  return (value || todayDateValue()).replaceAll('-', '.');
}

function escapePgnValue(value) {
  return String(value || '?').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function resultText() {
  if (chess.isCheckmate()) return chess.turn() === 'w' ? '0-1' : '1-0';
  if (chess.isDraw()) return '1/2-1/2';
  return '*';
}

function moveText() {
  const history = chess.history();
  if (history.length === 0) return '';

  const turns = [];
  for (let i = 0; i < history.length; i += 2) {
    const number = (i / 2) + 1;
    const white = history[i] || '';
    const black = history[i + 1] ? ` ${history[i + 1]}` : '';
    turns.push(`${number}. ${white}${black}`);
  }

  return `${turns.join(' ')} ${resultText()}`;
}

function pgnWithMetadata() {
  const metadata = readMetadata();
  const opponent = metadata.opponent || '?';
  const white = metadata.myColor === 'white' ? PLAYER_NAME : opponent;
  const black = metadata.myColor === 'white' ? opponent : PLAYER_NAME;
  const headers = [
    ['Date', formatPgnDate(metadata.date)],
    ['Round', metadata.round],
    ['White', white],
    ['Black', black]
  ];
  const headerText = headers.map(([key, value]) => `[${key} "${escapePgnValue(value)}"]`).join('\n');
  const moves = moveText();

  return moves ? `${headerText}\n\n${moves}` : `${headerText}\n`;
}

function ranksForView() {
  return orientation === 'white' ? [8, 7, 6, 5, 4, 3, 2, 1] : [1, 2, 3, 4, 5, 6, 7, 8];
}

function filesForView() {
  return orientation === 'white' ? FILES : [...FILES].reverse();
}

function saveState() {
  localStorage.setItem(GAME_KEY, JSON.stringify({ pgn: chess.pgn() }));
  localStorage.setItem(ORIENT_KEY, orientation);
}

function restoreState() {
  const raw = localStorage.getItem(GAME_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    if (parsed.pgn && parsed.pgn.trim()) chess.loadPgn(parsed.pgn);
  } catch (_error) {
    console.warn('Could not restore saved game.');
  }
}

function squareColor(file, rank) {
  return ((FILES.indexOf(file) + rank) % 2 === 0) ? 'square--dark' : 'square--light';
}

function legalMovesFrom(from) {
  return chess.moves({ square: from, verbose: true });
}

function legalDestinations(from) {
  return legalMovesFrom(from).map((m) => m.to);
}

function drawBoard() {
  boardEl.innerHTML = '';
  const legal = selectedSquare ? legalDestinations(selectedSquare) : [];

  for (const rank of ranksForView()) {
    for (const file of filesForView()) {
      const square = `${file}${rank}`;
      const piece = chess.get(square);
      const button = document.createElement('button');
      button.className = `square ${squareColor(file, rank)}`;
      if (selectedSquare === square) button.classList.add('square--selected');
      if (legal.includes(square)) button.classList.add('square--legal');
      button.dataset.square = square;
      button.type = 'button';
      button.setAttribute('role', 'gridcell');
      button.setAttribute('aria-label', `Square ${square}${piece ? ` with ${piece.color}${piece.type}` : ''}`);
      button.textContent = piece ? PIECES[`${piece.color}${piece.type}`] : '';
      button.addEventListener('click', onSquareTap);
      boardEl.appendChild(button);
    }
  }

  renderMoves();
  renderStatus();
}

function renderMoves() {
  const history = chess.history(); // SAN list
  moveListEl.innerHTML = '';

  for (let i = 0; i < history.length; i += 2) {
    const li = document.createElement('li');
    const white = history[i] || '';
    const black = history[i + 1] || '';
    li.textContent = black ? `${white} ${black}` : white;
    moveListEl.appendChild(li);
  }
}

function renderStatus() {
  if (chess.isGameOver()) {
    if (chess.isCheckmate()) {
      statusEl.textContent = `Checkmate. ${chess.turn() === 'w' ? 'Black' : 'White'} wins.`;
    } else if (chess.isDraw()) {
      statusEl.textContent = 'Draw.';
    } else {
      statusEl.textContent = 'Game over.';
    }
    return;
  }

  statusEl.textContent = `${chess.turn() === 'w' ? 'White' : 'Black'} to move${chess.inCheck() ? ' (check)' : ''}.`;
}

function choosePromotion() {
  const choice = prompt('Promote to: q (Queen), r (Rook), b (Bishop), n (Knight)', 'q');
  if (!choice) return null;
  const pick = choice.trim().toLowerCase();
  if (['q', 'r', 'b', 'n'].includes(pick)) return pick;

  statusEl.textContent = 'Invalid promotion choice. Use q, r, b, or n.';
  return null;
}

function performMove(from, to) {
  const candidates = legalMovesFrom(from).filter((m) => m.to === to);
  if (candidates.length === 0) return null;

  const needsPromotion = candidates.some((m) => m.promotion);
  if (!needsPromotion) return chess.move({ from, to });

  const pick = choosePromotion();
  if (!pick) return null;

  return chess.move({ from, to, promotion: pick });
}

function onSquareTap(e) {
  const square = e.currentTarget.dataset.square;
  const piece = chess.get(square);

  if (!selectedSquare) {
    if (piece && piece.color === chess.turn()) selectedSquare = square;
    drawBoard();
    return;
  }

  if (selectedSquare === square) {
    selectedSquare = null;
    drawBoard();
    return;
  }

  const move = performMove(selectedSquare, square);
  if (!move) {
    if (piece && piece.color === chess.turn()) selectedSquare = square;
    else selectedSquare = null;
    drawBoard();
    return;
  }

  selectedSquare = null;
  saveState();
  drawBoard();
}

[myColorInput, opponentInput, roundInput, dateInput].forEach((input) => {
  input.addEventListener('change', saveMetadata);
  input.addEventListener('input', saveMetadata);
});

undoBtn.addEventListener('click', () => {
  chess.undo();
  selectedSquare = null;
  saveState();
  drawBoard();
});

newGameBtn.addEventListener('click', () => {
  if (!confirm('Start a new game? Current game will be lost.')) return;
  chess = new Chess();
  selectedSquare = null;
  saveState();
  drawBoard();
});

flipBtn.addEventListener('click', () => {
  orientation = orientation === 'white' ? 'black' : 'white';
  saveState();
  drawBoard();
});

copyPgnBtn.addEventListener('click', async () => {
  const pgn = pgnWithMetadata();
  saveMetadata();
  try {
    await navigator.clipboard.writeText(pgn);
    statusEl.textContent = 'PGN copied.';
  } catch (_error) {
    statusEl.textContent = 'Clipboard not available in this browser context.';
  }
});

copyLichessBtn.addEventListener('click', async () => {
  const pgn = pgnWithMetadata();
  saveMetadata();
  try {
    await navigator.clipboard.writeText(pgn);
    statusEl.textContent = 'PGN copied. Opening Lichess.';
    window.open('https://lichess.org/paste', '_blank', 'noopener');
  } catch (_error) {
    statusEl.textContent = 'Clipboard not available in this browser context.';
  }
});

exportPgnBtn.addEventListener('click', () => {
  const pgn = pgnWithMetadata();
  saveMetadata();
  const blob = new Blob([pgn], { type: 'application/x-chess-pgn' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `game-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.pgn`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

restoreMetadata();
restoreState();
drawBoard();
