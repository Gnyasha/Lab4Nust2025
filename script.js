/* ---------- helpers ---------- */
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function createEl(tag, classes = [], attrs = {}) {
  const el = document.createElement(tag);
  if (classes) {
    if (Array.isArray(classes)) {
      classes.forEach(c => { if (c && c.trim()) el.classList.add(c.trim()); });
    } else if (typeof classes === 'string' && classes.trim()) {
      el.classList.add(classes.trim());
    }
  }
  for (const [key, val] of Object.entries(attrs)) {
    if (['innerHTML', 'textContent', 'innerText'].includes(key)) el[key] = val;
    else el.setAttribute(key, val);
  }
  return el;
}

function clearErrors() {
  document.querySelectorAll('.error').forEach(el => el.textContent = '');
}

function setFormMessage(msg, isError = false) {
  const msgEl = document.getElementById('formMessage');
  msgEl.textContent = msg;
  msgEl.style.color = isError ? '#d93025' : '#0a8b00';
}

/* ---------- storage ---------- */
const STORAGE_KEY = 'lab4-profiles';
function loadProfiles() { return localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)) : []; }
function saveProfiles(progs) { localStorage.setItem(STORAGE_KEY, JSON.stringify(progs)); }

/* ---------- main ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const cardsContainer = document.getElementById('cardsContainer');
  const summaryTableBody = document.querySelector('#summaryTable tbody');
  const themeToggle = document.getElementById('themeToggle');

  /* ----- theme toggle ----- */
  const THEME_KEY = 'lab4-theme';
  if (localStorage.getItem(THEME_KEY) === 'dark') document.body.classList.add('dark-mode');
  themeToggle.addEventListener('click', () => {
    const toggled = document.body.classList.toggle('dark-mode');
    localStorage.setItem(THEME_KEY, toggled ? 'dark' : 'light');
  });

  /* ----- profiles data ----- */
  let profiles = loadProfiles();
  let uniqueId = profiles.reduce((m, p) => Math.max(m, p.id), 0);
  function generateId() { return ++uniqueId; }

  /* ----- render existing profiles ----- */
  profiles.forEach(p => addProfile(p, false));

  /* ----- form submission ----- */
  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();
    setFormMessage('');

    const inputs = {
      firstName: form.firstName.value.trim(),
      lastName: form.lastName.value.trim(),
      email: form.email.value.trim(),
      programme: form.programme.value,
      year: form.year.value,
      interests: form.interests.value.trim(),
      photo: form.photo.value.trim(),
    };

    let isValid = true;

    if (!inputs.firstName) { document.getElementById('firstNameError').textContent = 'First name is required.'; isValid = false; }
    if (!inputs.lastName) { document.getElementById('lastNameError').textContent = 'Last name is required.'; isValid = false; }
    if (!inputs.email || !isValidEmail(inputs.email)) { document.getElementById('emailError').textContent = 'A valid email is required.'; isValid = false; }
    if (!inputs.programme) { document.getElementById('programmeError').textContent = 'Please select a programme.'; isValid = false; }
    if (!inputs.year) { document.getElementById('yearError').textContent = 'Please select a year.'; isValid = false; }

    if (!isValid) {
      setFormMessage('Please fix the highlighted errors.', true);
      return;
    }

    const newProfile = {
      id: generateId(),
      ...inputs,
    };

    addProfile(newProfile, true);
    form.reset();
    setFormMessage('Profile successfully added.');
  });

  /* ----- remove profile ----- */
  function removeProfile(id) {
    const cardEl = cardsContainer.querySelector(`.card[data-id="${id}"]`);
    if (cardEl) cardEl.remove();
    const rowEl = summaryTableBody.querySelector(`tr[data-id="${id}"]`);
    if (rowEl) rowEl.remove();

    profiles = profiles.filter(p => p.id !== id);
    saveProfiles(profiles);
    setFormMessage('Profile removed.');
  }

  /* ----- helper to add profile UI and optionally store it ----- */
  function addProfile(data, store = true) {
    const { id, firstName, lastName, email, programme, year, interests, photo } = data;

    /* card */
    const card = createEl('div', 'card', { 'data-id': id });
    if (photo) {
      const img = createEl('img', '', { src: photo, alt: `${firstName} ${lastName}'s photo` });
      card.appendChild(img);
    }
    card.appendChild(createEl('h3', '', { innerHTML: `<strong>${firstName} ${lastName}</strong>` }));
    card.appendChild(createEl('p', '', { textContent: email }));
    card.appendChild(createEl('p', '', { textContent: programme }));
    card.appendChild(createEl('p', '', { textContent: year }));
    if (interests) card.appendChild(createEl('p', '', { textContent: `Interests: ${interests}` }));

    const removeBtn = createEl('button', 'removeBtn', { textContent: 'Remove' });
    removeBtn.addEventListener('click', () => removeProfile(id));
    card.appendChild(removeBtn);

    cardsContainer.appendChild(card);

    /* row */
    const tr = createEl('tr', '', { 'data-id': id });
    tr.append(
      createEl('td', '', { textContent: `${firstName} ${lastName}` }),
      createEl('td', '', { textContent: programme }),
      createEl('td', '', { textContent: year })
    );
    const actionTd = createEl('td', '', {});
    const rmButtonTd = createEl('button', 'removeBtn', { textContent: 'Remove' });
    rmButtonTd.addEventListener('click', () => removeProfile(id));
    actionTd.appendChild(rmButtonTd);
    tr.appendChild(actionTd);
    summaryTableBody.appendChild(tr);

    if (store) {
      profiles.push(data);
      saveProfiles(profiles);
    }
  }
});
