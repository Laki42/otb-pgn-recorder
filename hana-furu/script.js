const TODAY_KEY = 'hana_furu_today_v1';
const HISTORY_KEY = 'hana_furu_history_v1';
const MAX_HISTORY_ITEMS = 7;

const flowerOracles = [
  { flowerName: 'White Camellia', omenType: 'Small Blessing', message: 'A quiet kindness is waiting where you stopped looking.', meaning: 'You may be carrying something silently. It does not need to be solved all at once.', smallAction: 'Make one warm drink and hold it with both hands.', luckyItem: 'A white cup', warning: 'Do not mistake exhaustion for failure.' },
  { flowerName: 'Moonlit Sakura', omenType: 'Gentle Change', message: 'Something beautiful may leave, but not everything lost becomes empty.', meaning: 'A small ending can make room for a softer beginning.', smallAction: 'Put away one thing that no longer belongs to today.', luckyItem: 'A pale pink object', warning: 'Do not chase what is already becoming memory.' },
  { flowerName: 'Temple Chrysanthemum', omenType: 'Hidden Strength', message: 'You are steadier than your mood is willing to admit.', meaning: 'Today favors patience, simple order, and quiet dignity.', smallAction: 'Clean one small surface.', luckyItem: 'Fresh water', warning: 'Avoid people who treat your patience like public property.' },
  { flowerName: 'Night Iris', omenType: 'Quiet Warning', message: 'A closed door may be protecting your sleep.', meaning: 'Not every delay is an insult. Some pauses keep your spirit intact.', smallAction: 'Leave one message unanswered until you feel clear.', luckyItem: 'A dark blue cloth', warning: 'Do not explain yourself to someone committed to misunderstanding.' },
  { flowerName: 'Gold Osmanthus', omenType: 'Small Blessing', message: 'A small sweetness will travel farther than expected.', meaning: 'Gentle words and ordinary care may change the shape of the day.', smallAction: 'Send one sincere thank-you.', luckyItem: 'Citrus peel', warning: 'Do not hide warmth because someone once wasted it.' },
  { flowerName: 'Rain Lily', omenType: 'Gentle Change', message: 'What looked empty may answer after the rain.', meaning: 'Your patience is not motionless; it is quietly rooting.', smallAction: 'Water a plant or rinse a cup slowly.', luckyItem: 'Clear glass', warning: 'Do not demand a flower from a seed.' },
  { flowerName: 'Plum Blossom', omenType: 'Hidden Strength', message: 'You can bloom before the air becomes kind.', meaning: 'A difficult season has taught you practical courage.', smallAction: 'Step outside for three slow breaths.', luckyItem: 'A folded note', warning: 'Do not call your resilience ordinary.' },
  { flowerName: 'Red Spider Lily', omenType: 'Quiet Warning', message: 'Some paths glow because they are meant to be passed, not followed.', meaning: 'A tempting old pattern may appear with a softer face.', smallAction: 'Name one boundary before evening.', luckyItem: 'Red thread', warning: 'Do not return to what made you disappear.' },
  { flowerName: 'Wisteria at Dusk', omenType: 'Gentle Change', message: 'Let support arrive in a form you did not design.', meaning: 'You do not need to hold every beam by yourself.', smallAction: 'Ask for one small, specific help.', luckyItem: 'A hanging key', warning: 'Do not confuse solitude with proof that no one cares.' },
  { flowerName: 'Lotus Lantern', omenType: 'Hidden Strength', message: 'Your calm place still exists beneath the stirred water.', meaning: 'Feelings may ripple, but they do not have to command your hands.', smallAction: 'Sit quietly for five minutes without fixing anything.', luckyItem: 'A candle or lamp', warning: 'Do not make permanent choices in a temporary storm.' },
  { flowerName: 'Snowdrop', omenType: 'Small Blessing', message: 'A tiny sign of return is enough for today.', meaning: 'Progress may arrive as a whisper rather than a gate opening.', smallAction: 'Write down one thing that is better than before.', luckyItem: 'A silver coin', warning: 'Do not overlook small mercy because it is small.' },
  { flowerName: 'Peony Shadow', omenType: 'Quiet Warning', message: 'Beauty does not need to be offered to every passing eye.', meaning: 'Your energy is precious, and privacy can be a form of grace.', smallAction: 'Keep one plan to yourself for now.', luckyItem: 'A closed book', warning: 'Do not perform your tenderness for applause.' },
  { flowerName: 'Bellflower', omenType: 'Small Blessing', message: 'A sincere voice will carry through the evening air.', meaning: 'Truth spoken gently can travel without force.', smallAction: 'Say the simple version of what you mean.', luckyItem: 'A blue pen', warning: 'Do not decorate a no until it becomes a maybe.' },
  { flowerName: 'Magnolia Moon', omenType: 'Hidden Strength', message: 'Your softness has survived more than noise ever could.', meaning: 'There is power in remaining tender without becoming available to harm.', smallAction: 'Touch something smooth and breathe out slowly.', luckyItem: 'A cream-colored stone', warning: 'Do not let urgency borrow your peace.' },
  { flowerName: 'Hydrangea Mist', omenType: 'Gentle Change', message: 'Your heart may change color without betraying itself.', meaning: 'Mixed feelings are still honest feelings.', smallAction: 'Make a list with two true things on it.', luckyItem: 'Rain sounds', warning: 'Do not force clarity before it has gathered.' },
  { flowerName: 'Gardenia Smoke', omenType: 'Small Blessing', message: 'A hidden kindness may become fragrant after it passes.', meaning: 'You may not see the effect of your care right away.', smallAction: 'Do one helpful thing without announcing it.', luckyItem: 'Clean linen', warning: 'Do not measure goodness only by being noticed.' },
  { flowerName: 'Violet Prayer', omenType: 'Hidden Strength', message: 'A modest wish can still reach the rafters.', meaning: 'Hope does not need to be loud to be alive.', smallAction: 'Write a wish on scrap paper and fold it once.', luckyItem: 'Something purple', warning: 'Do not mock your own longing.' },
  { flowerName: 'Narcissus Pond', omenType: 'Quiet Warning', message: 'Look softly, but do not fall into your reflection.', meaning: 'Self-examination is useful until it becomes a maze.', smallAction: 'Do one task that brings you back to the room.', luckyItem: 'A shallow bowl', warning: 'Do not turn every feeling into a verdict.' },
  { flowerName: 'Jasmine Window', omenType: 'Small Blessing', message: 'The night may bring a gentler thought than the afternoon allowed.', meaning: 'Rest can rearrange what effort could not.', smallAction: 'Prepare your sleeping space with care.', luckyItem: 'A small towel', warning: 'Do not invite tomorrow into your pillow.' },
  { flowerName: 'Pine Orchid', omenType: 'Hidden Strength', message: 'Elegance is sometimes simply refusing to rush.', meaning: 'Your timing deserves respect, even when others tap their feet.', smallAction: 'Walk slower for one hallway or street.', luckyItem: 'A wooden object', warning: 'Do not trade your rhythm for someone else’s panic.' },
  { flowerName: 'Azalea Gate', omenType: 'Gentle Change', message: 'A familiar entrance may open onto a different garden.', meaning: 'Repetition is not always stagnation; sometimes it is return with new eyes.', smallAction: 'Take a slightly different route.', luckyItem: 'A small gate or doorway', warning: 'Do not assume you already know the whole path.' },
  { flowerName: 'Marigold Incense', omenType: 'Quiet Warning', message: 'Not every bright thing deserves your attention.', meaning: 'Distraction may arrive dressed as importance.', smallAction: 'Put one device away for twenty minutes.', luckyItem: 'A warm-colored thread', warning: 'Do not feed every spark until it becomes a fire.' },
  { flowerName: 'Clover Lantern', omenType: 'Small Blessing', message: 'Luck may be hiding in a practical detail.', meaning: 'A humble correction or small preparation can protect your ease.', smallAction: 'Check one appointment, bag, or pocket.', luckyItem: 'A green token', warning: 'Do not ignore the quiet usefulness of preparation.' },
  { flowerName: 'Evening Primrose', omenType: 'Gentle Change', message: 'Some parts of you open only after the world grows quiet.', meaning: 'Give yourself permission to unfold outside ordinary hours.', smallAction: 'Spend ten minutes with a private pleasure.', luckyItem: 'Soft yellow light', warning: 'Do not compare your blooming time to daylight flowers.' }
];

const moodSelect = document.getElementById('moodSelect');
const drawButton = document.getElementById('drawButton');
const drawAgainButton = document.getElementById('drawAgainButton');
const resultCard = document.getElementById('resultCard');
const historyList = document.getElementById('historyList');
const clearHistoryButton = document.getElementById('clearHistoryButton');

function todayKey() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function formatDate(dateText) {
  return new Date(`${dateText}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function getStoredJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch (error) {
    return fallback;
  }
}

function randomOracle() {
  return flowerOracles[Math.floor(Math.random() * flowerOracles.length)];
}

function saveResult(result) {
  localStorage.setItem(TODAY_KEY, JSON.stringify(result));
  const history = getStoredJson(HISTORY_KEY, []);
  history.unshift(result);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 30)));
}

function drawFlower(forceNew = false) {
  const today = todayKey();
  const saved = getStoredJson(TODAY_KEY, null);

  if (!forceNew && saved && saved.date === today) {
    showResult(saved);
    return;
  }

  const id = globalThis.crypto?.randomUUID?.() || String(Date.now());
  const result = { ...randomOracle(), mood: moodSelect.value, date: today, id };
  saveResult(result);
  showResult(result);
  renderHistory();
}

function showResult(result) {
  moodSelect.value = result.mood || 'Quiet';
  resultCard.classList.remove('hidden');
  resultCard.innerHTML = `
    <p class="result-kicker">Mood: ${escapeHtml(result.mood || 'Quiet')}</p>
    <h3>${escapeHtml(result.flowerName)}</h3>
    <p class="omen">${escapeHtml(result.omenType)}</p>
    <p class="message">“${escapeHtml(result.message)}”</p>
    <div class="detail-grid">
      <p class="detail"><strong>Meaning</strong>${escapeHtml(result.meaning)}</p>
      <p class="detail"><strong>Small action</strong>${escapeHtml(result.smallAction)}</p>
      <p class="detail"><strong>Lucky item</strong>${escapeHtml(result.luckyItem)}</p>
      <p class="detail"><strong>Gentle warning</strong>${escapeHtml(result.warning)}</p>
    </div>
  `;
}

function renderHistory() {
  const history = getStoredJson(HISTORY_KEY, []).slice(0, MAX_HISTORY_ITEMS);
  historyList.innerHTML = '';

  if (history.length === 0) {
    historyList.innerHTML = '<li class="empty-history">No flowers have fallen yet.</li>';
    return;
  }

  history.forEach((item) => {
    const entry = document.createElement('li');
    entry.innerHTML = `
      <span class="history-date">${escapeHtml(formatDate(item.date))}${item.mood ? ` · Mood: ${escapeHtml(item.mood)}` : ''}</span>
      <span>${escapeHtml(item.flowerName)} — <strong>${escapeHtml(item.omenType)}</strong></span>
    `;
    historyList.appendChild(entry);
  });
}

function clearHistory() {
  if (!confirm('Clear all saved flower history?')) return;
  localStorage.removeItem(TODAY_KEY);
  localStorage.removeItem(HISTORY_KEY);
  resultCard.classList.add('hidden');
  resultCard.innerHTML = '';
  renderHistory();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[character]);
}

drawButton.addEventListener('click', () => drawFlower(false));
drawAgainButton.addEventListener('click', () => drawFlower(true));
clearHistoryButton.addEventListener('click', clearHistory);

const savedToday = getStoredJson(TODAY_KEY, null);
if (savedToday && savedToday.date === todayKey()) showResult(savedToday);
renderHistory();
