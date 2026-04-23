/* =======================================================
   LERA ETL DASHBOARD — app.js
   All API calls are commented out with DUMMY data below.
   To activate: uncomment the fetch() blocks and remove
   the dummy data assignments below each.
   ======================================================= */

// ─────────────────────────────────────────────
//  CONFIG
// ─────────────────────────────────────────────
const API_BASE = 'http://localhost:8080'; // ← Replace with actual base URL

// ─────────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────────
let accessToken = null;
let currentUser = null;
let allClients = [];
let currentClientId = null;
let clientToDelete = null;

// ─────────────────────────────────────────────
//  HELPERS: API
// ─────────────────────────────────────────────
function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  };
}

// ─────────────────────────────────────────────
//  HELPERS: UI
// ─────────────────────────────────────────────
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.classList.add('hidden');
  });
  const target = document.getElementById(`page-${pageId}`);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('active');
  }
}

function showAlert(elementId, message, type = 'error') {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.className = `alert alert-${type}`;
  el.textContent = message;
  el.classList.remove('hidden');
}

function hideAlert(elementId) {
  const el = document.getElementById(elementId);
  if (el) el.classList.add('hidden');
}

function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = message;
  toast.className = isError ? 'toast toast-error' : 'toast';
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3500);
}

function setButtonLoading(btnEl, loading) {
  if (!btnEl) return;
  const text = btnEl.querySelector('.btn-text');
  const spinner = btnEl.querySelector('.btn-spinner');
  if (text) text.classList.toggle('hidden', loading);
  if (spinner) spinner.classList.toggle('hidden', !loading);
  btnEl.disabled = loading;
}

function togglePassword() {
  const input = document.getElementById('login-password');
  input.type = input.type === 'password' ? 'text' : 'password';
}

function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
}
function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}
function closeModalOnOverlay(e, id) {
  if (e.target === e.currentTarget) closeModal(id);
}

// ─────────────────────────────────────────────
//  AUTH: LOGIN
// ─────────────────────────────────────────────
async function handleLogin() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  hideAlert('login-error');

  if (!username || !password) {
    showAlert('login-error', 'Please enter both username and password.');
    return;
  }

  const btn = document.getElementById('login-btn');
  setButtonLoading(btn, true);

  try {
    // ── UNCOMMENT FOR REAL API ──────────────────────
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName: username, password })
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Invalid credentials. Please try again.');
    }
    const data = await response.json();
    console.log("aducbshkudcsac");
    console.log(data.username);
    accessToken = data.accessToken;
    currentUser = data.username || username;
    // ── END REAL API ────────────────────────────────

    // ── DUMMY: Remove when using real API ───────────
    // await delay(800);
    // if (username === 'admin' && password === 'admin') {
    //   accessToken = 'dummy-access-token-abc123';
    //   currentUser = username;
    // } else {
    //   throw new Error('Invalid credentials. Please try again.');
    // }
    // ── END DUMMY ────────────────────────────────────

    onLoginSuccess();
  } catch (err) {
    showAlert('login-error', err.message || 'Login failed. Please try again.', 'error');
  } finally {
    setButtonLoading(btn, false);
  }
}

function onLoginSuccess() {
  // Strip domain prefix like "Lera\" or any "domain\" prefix from username
  const rawName = currentUser || '';
  const displayName = rawName.includes('\\') ? rawName.split('\\').pop() : rawName;

  document.getElementById('sidebar-username').textContent = displayName;
  document.getElementById('sidebar-username-2').textContent = displayName;
  document.getElementById('sidebar-avatar').textContent = displayName[0]?.toUpperCase() || 'U';
  document.getElementById('sidebar-avatar-2').textContent = displayName[0]?.toUpperCase() || 'U';

  showPage('home');
  fetchClients();
}

// ─────────────────────────────────────────────
//  AUTH: LOGOUT
// ─────────────────────────────────────────────
async function handleLogout() {
  // ── UNCOMMENT FOR REAL API ──────────────────────
  // try {
  //   await fetch(`${API_BASE}/auth/logout`, {
  //     method: 'POST',
  //     headers: authHeaders()
  //   });
  // } catch (_) { /* ignore */ }
  // ── END REAL API ────────────────────────────────

  // Dummy logout — just clear token
  accessToken = null;
  currentUser = null;
  allClients = [];

  document.getElementById('login-username').value = '';
  document.getElementById('login-password').value = '';
  showPage('login');
}

// ─────────────────────────────────────────────
//  CLIENTS: FETCH ALL
// ─────────────────────────────────────────────
async function fetchClients() {
  const tbody = document.getElementById('clients-tbody');
  tbody.innerHTML = '<tr><td colspan="6" class="table-empty">Loading clients...</td></tr>';

  try {
    // ── UNCOMMENT FOR REAL API ──────────────────────
    // const response = await fetch(`${API_BASE}/clients`, {
    //   headers: authHeaders()
    // });
    // if (!response.ok) throw new Error('Failed to fetch clients');
    // allClients = await response.json();
    // ── END REAL API ────────────────────────────────

    // ── DUMMY ────────────────────────────────────────
    await delay(600);
    allClients = getDummyClients();
    // ── END DUMMY ────────────────────────────────────

    renderClients(allClients);
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="6" class="table-empty">Failed to load clients. ${err.message}</td></tr>`;
  }
}

function renderClients(clients) {
  const tbody = document.getElementById('clients-tbody');
  document.getElementById('total-clients').textContent = clients.length;
  document.getElementById('active-clients').textContent = clients.filter(c => c.deploymentStatus === 'DEPLOYED').length;

  if (!clients.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="table-empty">No clients found. Add your first client.</td></tr>';
    return;
  }

  tbody.innerHTML = clients.map((c, i) => `
    <tr>
      <td style="color:var(--text-muted);font-size:0.8rem;">${i + 1}</td>
      <td>
        <span class="client-name-link" onclick="openClientDetail('${c.id}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 8 16 12 12 16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          ${escHtml(c.clientName)}
        </span>
      </td>
      <td><span class="badge badge-blue">${escHtml(c.t24Version || '—')}</span></td>
      <td><span class="badge badge-green">${escHtml(c.etlVersion || '—')}</span></td>
      <td>${deployStatusBadge(c.deploymentStatus)}</td>
      <td class="action-cell">
        <button class="btn btn-sm btn-danger" onclick="openDeleteModal('${c.id}', '${escHtml(c.clientName)}')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          Delete
        </button>
      </td>
    </tr>
  `).join('');
}

function filterClients() {
  const q = document.getElementById('client-search').value.toLowerCase();
  const filtered = allClients.filter(c =>
    c.clientName.toLowerCase().includes(q) ||
    (c.t24Version || '').toLowerCase().includes(q) ||
    (c.etlVersion || '').toLowerCase().includes(q)
  );
  renderClients(filtered);
}

function deployStatusBadge(status) {
  const map = {
    'DEPLOYED': ['status-deployed', 'Deployed'],
    'IN_PROGRESS': ['status-pending', 'In Progress'],
    'PENDING': ['status-pending', 'Pending'],
    'FAILED': ['status-failed', 'Failed'],
    'ROLLED_BACK': ['status-failed', 'Rolled Back'],
  };
  const [cls, label] = map[status] || ['status-default', status || 'Unknown'];
  return `<span class="status-pill ${cls}">${label}</span>`;
}

// ─────────────────────────────────────────────
//  CLIENTS: ADD
// ─────────────────────────────────────────────
function openAddClientModal() {
  hideAlert('add-client-alert');
  document.getElementById('new-client-name').value = '';
  document.getElementById('new-t24-version').value = '';
  document.getElementById('new-etl-version').value = '';
  openModal('modal-add-client');
}

async function handleAddClient() {
  const clientName = document.getElementById('new-client-name').value.trim();
  const t24Version = document.getElementById('new-t24-version').value;
  const etlVersion = document.getElementById('new-etl-version').value;
  hideAlert('add-client-alert');

  if (!clientName || !t24Version || !etlVersion) {
    showAlert('add-client-alert', 'Please fill in all required fields.', 'error');
    return;
  }

  const btn = document.querySelector('#modal-add-client .btn-primary');
  setButtonLoading(btn, true);

  try {
    const payload = { clientName, t24Version, etlVersion };

    // ── UNCOMMENT FOR REAL API ──────────────────────
    // const response = await fetch(`${API_BASE}/clients`, {
    //   method: 'POST',
    //   headers: authHeaders(),
    //   body: JSON.stringify(payload)
    // });
    // if (!response.ok) {
    //   const err = await response.json().catch(() => ({}));
    //   throw new Error(err.message || 'Failed to add client');
    // }
    // ── END REAL API ────────────────────────────────

    // ── DUMMY ────────────────────────────────────────
    await delay(700);
    const newClient = {
      id: 'c' + Date.now(),
      ...payload,
      deploymentStatus: 'PENDING',
      vpnDetails: '',
      envDetails: '',
      deployment: {}
    };
    allClients.unshift(newClient);
    // ── END DUMMY ────────────────────────────────────

    closeModal('modal-add-client');
    await fetchClients(); // Re-fetch to get updated list
    showToast(`Client "${clientName}" added successfully.`);
  } catch (err) {
    showAlert('add-client-alert', err.message, 'error');
  } finally {
    setButtonLoading(btn, false);
  }
}

// ─────────────────────────────────────────────
//  CLIENTS: DELETE
// ─────────────────────────────────────────────
function openDeleteModal(clientId, clientName) {
  clientToDelete = clientId;
  document.getElementById('delete-client-name-confirm').textContent = clientName;
  openModal('modal-delete');
}

async function confirmDelete() {
  if (!clientToDelete) return;
  const btn = document.querySelector('#modal-delete .btn-danger');
  btn.disabled = true;
  btn.textContent = 'Deleting...';

  try {
    // ── UNCOMMENT FOR REAL API ──────────────────────
    // const response = await fetch(`${API_BASE}/clients/${clientToDelete}`, {
    //   method: 'DELETE',
    //   headers: authHeaders()
    // });
    // if (!response.ok) throw new Error('Failed to delete client');
    // ── END REAL API ────────────────────────────────

    // ── DUMMY ────────────────────────────────────────
    await delay(600);
    allClients = allClients.filter(c => c.id !== clientToDelete);
    // ── END DUMMY ────────────────────────────────────

    closeModal('modal-delete');
    await fetchClients();
    showToast('Client deleted successfully.');
  } catch (err) {
    showToast('Failed to delete client: ' + err.message, true);
  } finally {
    clientToDelete = null;
    btn.disabled = false;
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg> Delete Client';
  }
}

// ─────────────────────────────────────────────
//  CLIENT DETAIL: OPEN
// ─────────────────────────────────────────────
async function openClientDetail(clientId) {
  currentClientId = clientId;
  showPage('client');

  // Reset tabs
  switchTab('vpn');
  // Reset fields
  ['vpn-textarea', 'env-textarea'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.value = ''; el.setAttribute('readonly', true); }
  });
  ['vpn-save-row', 'env-save-row'].forEach(id => document.getElementById(id)?.classList.add('hidden'));
  ['vpn-edit-btn', 'env-edit-btn'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit`;
  });
  document.getElementById('enclosure-list').innerHTML = '<div class="enclosure-empty">Loading...</div>';

  try {
    // ── UNCOMMENT FOR REAL API ──────────────────────
    // const [clientRes, enclosureRes] = await Promise.all([
    //   fetch(`${API_BASE}/clients/${clientId}`, { headers: authHeaders() }),
    //   fetch(`${API_BASE}/clients/${clientId}/enclosures`, { headers: authHeaders() })
    // ]);
    // if (!clientRes.ok) throw new Error('Failed to load client');
    // const client = await clientRes.json();
    // const enclosures = enclosureRes.ok ? await enclosureRes.json() : [];
    // ── END REAL API ────────────────────────────────

    // ── DUMMY ────────────────────────────────────────
    await delay(500);
    const client = getDummyClientDetail(clientId);
    const enclosures = getDummyEnclosures(clientId);
    // ── END DUMMY ────────────────────────────────────

    populateClientDetail(client);
    renderEnclosures(enclosures);
  } catch (err) {
    showToast('Error loading client: ' + err.message, true);
    showPage('home');
  }
}

function populateClientDetail(client) {
  document.getElementById('breadcrumb-client-name').textContent = client.clientName;
  document.getElementById('detail-client-name').textContent = client.clientName;
  document.getElementById('detail-avatar').textContent = client.clientName[0].toUpperCase();
  document.getElementById('detail-t24').textContent = client.t24Version || '—';
  document.getElementById('detail-etl').textContent = client.etlVersion || '—';

  // VPN / ENV text areas
  document.getElementById('vpn-textarea').value = client.vpnDetails || '';
  document.getElementById('env-textarea').value = client.envDetails || '';

  // Deployment fields
  const d = client.deployment || {};
  document.getElementById('view-deploy-env').textContent = d.deploymentEnv || '—';
  document.getElementById('view-deploy-status').textContent = d.deploymentStatus || '—';
  document.getElementById('view-deploy-date').textContent = d.deployedOn || '—';
  document.getElementById('view-testing-status').textContent = d.testingstatus || '—';
  document.getElementById('view-t24-packs').textContent = d.t24Packs || '—';
  // document.getElementById('deploy-env').value = d.deploymentEnv || '';
  // document.getElementById('deploy-status').value = d.deploymentStatus || '';
  // document.getElementById('deploy-date').value = d.deployedOn || '';
  // document.getElementById('testing-status').value = d.testingstatus || '';
  // document.getElementById('t24-packs').value = d.t24Packs || '';
}

// ─────────────────────────────────────────────
//  TABS
// ─────────────────────────────────────────────
function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach((btn, i) => {
    const tabs = ['vpn', 'env', 'deploy'];
    btn.classList.toggle('active', tabs[i] === tab);
  });
  ['vpn', 'env', 'deploy'].forEach(t => {
    const el = document.getElementById(`tab-${t}`);
    if (el) el.classList.toggle('hidden', t !== tab);
    if (el) el.classList.toggle('active', t === tab);
  });
}

// ─────────────────────────────────────────────
//  VPN / ENV EDIT & SAVE
// ─────────────────────────────────────────────
function toggleEdit(type) {
  const textarea = document.getElementById(`${type}-textarea`);
  const saveRow = document.getElementById(`${type}-save-row`);
  const editBtn = document.getElementById(`${type}-edit-btn`);
  const isEditing = !textarea.hasAttribute('readonly');

  if (isEditing) {
    cancelEdit(type);
  } else {
    textarea.removeAttribute('readonly');
    textarea.focus();
    saveRow.classList.remove('hidden');
    editBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Cancel`;
  }
}

function cancelEdit(type) {
  const textarea = document.getElementById(`${type}-textarea`);
  const saveRow = document.getElementById(`${type}-save-row`);
  const editBtn = document.getElementById(`${type}-edit-btn`);
  textarea.setAttribute('readonly', true);
  saveRow.classList.add('hidden');
  editBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit`;
  hideAlert(`${type}-alert`);
}

async function saveVPN() {
  const details = document.getElementById('vpn-textarea').value;
  hideAlert('vpn-alert');

  try {
    // ── UNCOMMENT FOR REAL API ──────────────────────
    // const response = await fetch(`${API_BASE}/clients/${currentClientId}/vpn`, {
    //   method: 'PUT',
    //   headers: authHeaders(),
    //   body: JSON.stringify({ vpnDetails: details })
    // });
    // if (!response.ok) throw new Error('Failed to save VPN details');
    // ── END REAL API ────────────────────────────────

    // ── DUMMY ────────────────────────────────────────
    await delay(500);
    // ── END DUMMY ────────────────────────────────────

    cancelEdit('vpn');
    showToast('VPN details saved successfully.');
  } catch (err) {
    showAlert('vpn-alert', err.message, 'error');
  }
}

async function saveEnv() {
  const details = document.getElementById('env-textarea').value;
  hideAlert('env-alert');

  try {
    // ── UNCOMMENT FOR REAL API ──────────────────────
    // const response = await fetch(`${API_BASE}/clients/${currentClientId}/environment`, {
    //   method: 'PUT',
    //   headers: authHeaders(),
    //   body: JSON.stringify({ envDetails: details })
    // });
    // if (!response.ok) throw new Error('Failed to save environment details');
    // ── END REAL API ────────────────────────────────

    // ── DUMMY ────────────────────────────────────────
    await delay(500);
    // ── END DUMMY ────────────────────────────────────

    cancelEdit('env');
    showToast('Environment details saved successfully.');
  } catch (err) {
    showAlert('env-alert', err.message, 'error');
  }
}

// ─────────────────────────────────────────────
//  DEPLOYMENT: SAVE
// ─────────────────────────────────────────────
async function saveDeployment() {
  hideAlert('deploy-alert');
  const payload = {
    deploymentEnv: document.getElementById('deploy-env').value,
    deploymentStatus: document.getElementById('deploy-status').value,
    deployedOn: document.getElementById('deploy-date').value,
    testingstatus: document.getElementById('testing-status').value,
    t24Packs: document.getElementById('t24-packs').value,
  };

  try {
    // ── UNCOMMENT FOR REAL API ──────────────────────
    // const response = await fetch(`${API_BASE}/clients/${currentClientId}/deployment`, {
    //   method: 'PUT',
    //   headers: authHeaders(),
    //   body: JSON.stringify(payload)
    // });
    // if (!response.ok) throw new Error('Failed to save deployment details');
    // ── END REAL API ────────────────────────────────

    // ── DUMMY ────────────────────────────────────────
    await delay(600);
    // ── END DUMMY ────────────────────────────────────

    showAlert('deploy-alert', 'Deployment details saved successfully.', 'success');
    showToast('Deployment details saved.');
  } catch (err) {
    showAlert('deploy-alert', err.message, 'error');
  }
}

function openDeploymentModal() {
  document.getElementById('modal-deploy-env').value =
    document.getElementById('view-deploy-env').textContent;

  document.getElementById('modal-deploy-status').value =
    document.getElementById('view-deploy-status').textContent;

  document.getElementById('modal-deploy-date').value =
    document.getElementById('view-deploy-date').textContent;

  document.getElementById('modal-testing-status').value =
    document.getElementById('view-testing-status').textContent;

  document.getElementById('modal-t24-packs').value =
    document.getElementById('view-t24-packs').textContent;

  openModal('modal-deployment');
}

function saveDeploymentFromModal() {
  const payload = {
    deploymentEnv: document.getElementById('modal-deploy-env').value,
    deploymentStatus: document.getElementById('modal-deploy-status').value,
    deployedOn: document.getElementById('modal-deploy-date').value,
    testingstatus: document.getElementById('modal-testing-status').value,
    t24Packs: document.getElementById('modal-t24-packs').value
  };

  document.getElementById('view-deploy-env').textContent = payload.deploymentEnv || '—';
  document.getElementById('view-deploy-status').textContent = payload.deploymentStatus || '—';
  document.getElementById('view-deploy-date').textContent = payload.deployedOn || '—';
  document.getElementById('view-testing-status').textContent = payload.testingstatus || '—';
  document.getElementById('view-t24-packs').textContent = payload.t24Packs || '—';

  closeModal('modal-deployment');
  showToast('Deployment details updated');
}

async function saveT24Packs() {
  const t24Packs = document.getElementById('t24-packs').value;

  try {
    // ── UNCOMMENT FOR REAL API ──────────────────────
    // const response = await fetch(`${API_BASE}/clients/${currentClientId}/deployment/t24packs`, {
    //   method: 'PUT',
    //   headers: authHeaders(),
    //   body: JSON.stringify({ t24Packs })
    // });
    // if (!response.ok) throw new Error('Failed to save T24 packs');
    // ── END REAL API ────────────────────────────────

    // ── DUMMY ────────────────────────────────────────
    await delay(400);
    // ── END DUMMY ────────────────────────────────────

    showToast('T24 Packs saved successfully.');
  } catch (err) {
    showToast('Failed to save T24 Packs: ' + err.message, true);
  }
}

// ─────────────────────────────────────────────
//  ENCLOSURES
// ─────────────────────────────────────────────
function openPostEnclosureModal() {
  document.getElementById('enclosure-comment').value = '';
  hideAlert('enclosure-alert');
  openModal('modal-enclosure');
}

async function handlePostEnclosure() {
  const comment = document.getElementById('enclosure-comment').value.trim();
  hideAlert('enclosure-alert');

  if (!comment) {
    showAlert('enclosure-alert', 'Please enter a comment.', 'error');
    return;
  }

  const btn = document.querySelector('#modal-enclosure .btn-primary');
  setButtonLoading(btn, true);

  try {
    const now = new Date();
    const payload = {
      comment,
      date: now.toISOString(),
    };

    // ── UNCOMMENT FOR REAL API ──────────────────────
    // const response = await fetch(`${API_BASE}/clients/${currentClientId}/enclosures`, {
    //   method: 'POST',
    //   headers: authHeaders(),
    //   body: JSON.stringify(payload)
    // });
    // if (!response.ok) throw new Error('Failed to post enclosure');
    // const enclosureRes = await fetch(`${API_BASE}/clients/${currentClientId}/enclosures`, {
    //   headers: authHeaders()
    // });
    // const enclosures = enclosureRes.ok ? await enclosureRes.json() : [];
    // ── END REAL API ────────────────────────────────

    // ── DUMMY ────────────────────────────────────────
    await delay(500);
    const existing = getDummyEnclosures(currentClientId);
    const newEnc = {
      id: 'e' + Date.now(),
      comment,
      date: now.toISOString(),
      updatedBy: currentUser,
    };
    const enclosures = [newEnc, ...existing];
    // Store in dummy store
    dummyEnclosureStore[currentClientId] = enclosures;
    // ── END DUMMY ────────────────────────────────────

    renderEnclosures(enclosures);
    closeModal('modal-enclosure');
    showToast('Enclosure posted successfully.');
  } catch (err) {
    showAlert('enclosure-alert', err.message, 'error');
  } finally {
    setButtonLoading(btn, false);
  }
}

function renderEnclosures(enclosures) {
  const list = document.getElementById('enclosure-list');
  const count = document.getElementById('enclosure-count');

  count.textContent = enclosures.length;

  if (!enclosures.length) {
    list.innerHTML = '<div class="enclosure-empty">No enclosures yet. Be the first to post one.</div>';
    return;
  }

  // Sort latest first
  const sorted = [...enclosures].sort((a, b) => new Date(b.date) - new Date(a.date));

  list.innerHTML = sorted.map(enc => {
    const d = new Date(enc.date);
    const dateStr = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    // Strip domain prefix like "Lera\" or "domain\" — also handle "LastName, FirstName" format
    const fullUser = enc.updatedBy || 'Unknown';
    let displayUser = fullUser;
    if (fullUser.includes('\\')) {
      displayUser = fullUser.split('\\').pop();
    } else if (fullUser.includes(', ')) {
      displayUser = fullUser.split(', ')[1].trim();
    }

    return `
      <div class="enclosure-item">
        <div class="enclosure-meta">
          <span class="enclosure-user">${escHtml(displayUser)}</span>
          <span class="enclosure-dot"></span>
          <span class="enclosure-date">${dateStr} · ${timeStr}</span>
        </div>
        <div class="enclosure-comment">${escHtml(enc.comment)}</div>
      </div>
    `;
  }).join('');
}

// ─────────────────────────────────────────────
//  UTILITIES
// ─────────────────────────────────────────────
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─────────────────────────────────────────────
//  DUMMY DATA STORE (Remove when using real API)
// ─────────────────────────────────────────────
const dummyEnclosureStore = {};

function getDummyClients() {
  return [
    {
      id: 'c001', clientName: 'Acme Bank Ltd', t24Version: 'R22', etlVersion: '2.4.0',
      deploymentStatus: 'DEPLOYED', vpnDetails: 'VPN Endpoint: 10.0.0.1\nPort: 1194\nProtocol: UDP',
      envDetails: 'DB_HOST=db.acme.internal\nDB_PORT=5432\nDB_NAME=acme_etl',
      deployment: { deploymentEnv: 'Production', deploymentStatus: 'DEPLOYED', deployedOn: '2024-11-15', testingstatus: 'PASSED', t24Packs: 'PACK-001, PACK-002' }
    },
    {
      id: 'c002', clientName: 'Global Finance Corp', t24Version: 'R21', etlVersion: '2.2.0',
      deploymentStatus: 'IN_PROGRESS', vpnDetails: '', envDetails: '',
      deployment: { deploymentEnv: 'Staging', deploymentStatus: 'IN_PROGRESS', deployedOn: '2024-12-01', testingstatus: 'IN_PROGRESS', t24Packs: '' }
    },
    {
      id: 'c003', clientName: 'Northern Trust Group', t24Version: 'R23', etlVersion: '2.4.0',
      deploymentStatus: 'PENDING', vpnDetails: '', envDetails: '',
      deployment: { deploymentEnv: '', deploymentStatus: 'PENDING', deployedOn: '', testingstatus: 'NOT_STARTED', t24Packs: '' }
    },
    {
      id: 'c004', clientName: 'Pacific Rim Bank', t24Version: 'R20', etlVersion: '2.1.0',
      deploymentStatus: 'DEPLOYED', vpnDetails: 'VPN: 192.168.1.1\nPort: 443', envDetails: 'ENV=prod',
      deployment: { deploymentEnv: 'Production', deploymentStatus: 'DEPLOYED', deployedOn: '2024-09-20', testingstatus: 'PASSED', t24Packs: 'PACK-005' }
    },
    {
      id: 'c005', clientName: 'Metro Capital Services', t24Version: 'R24', etlVersion: '2.3.0',
      deploymentStatus: 'FAILED', vpnDetails: '', envDetails: '',
      deployment: { deploymentEnv: 'UAT', deploymentStatus: 'FAILED', deployedOn: '2024-12-10', testingstatus: 'FAILED', t24Packs: '' }
    },
  ];
}

function getDummyClientDetail(clientId) {
  return getDummyClients().find(c => c.id === clientId) || getDummyClients()[0];
}

function getDummyEnclosures(clientId) {
  if (dummyEnclosureStore[clientId]) return dummyEnclosureStore[clientId];
  const base = [
    { id: 'e1', comment: 'Initial setup completed. VPN credentials shared via secure channel.', date: '2024-11-15T10:30:00Z', updatedBy: 'Admin, Risha' },
    { id: 'e2', comment: 'Deployment environment configured. Awaiting sign-off from client team.', date: '2024-11-20T14:00:00Z', updatedBy: 'Admin, Kumar' },
    { id: 'e3', comment: 'T24 packs updated to latest version. Migration scripts verified.', date: '2024-12-01T09:15:00Z', updatedBy: 'Admin, Priya' },
  ];
  dummyEnclosureStore[clientId] = base;
  return base;
}

// ─────────────────────────────────────────────
//  ENTER KEY: LOGIN
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-password').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleLogin();
  });
  document.getElementById('login-username').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('login-password').focus();
  });
});

// ─────────────────────────────────────────────
//  VERSION EDIT (T24 / ETL)
// ─────────────────────────────────────────────
function openVersionEdit() {
  // Pre-fill dropdowns with current values
  const t24 = document.getElementById('detail-t24').textContent.trim();
  const etl = document.getElementById('detail-etl').textContent.trim();

  const t24Sel = document.getElementById('edit-t24-version');
  const etlSel = document.getElementById('edit-etl-version');

  // Select matching option, fallback to first
  if (t24 && t24 !== '—') {
    for (let opt of t24Sel.options) { if (opt.value === t24) { t24Sel.value = t24; break; } }
  }
  if (etl && etl !== '—') {
    for (let opt of etlSel.options) { if (opt.value === etl) { etlSel.value = etl; break; } }
  }

  document.getElementById('version-view-row').classList.add('hidden');
  document.getElementById('version-edit-row').classList.remove('hidden');
}

function cancelVersionEdit() {
  document.getElementById('version-edit-row').classList.add('hidden');
  document.getElementById('version-view-row').classList.remove('hidden');
}

async function saveVersionEdit() {
  const t24Version = document.getElementById('edit-t24-version').value;
  const etlVersion = document.getElementById('edit-etl-version').value;

  try {
    // ── UNCOMMENT FOR REAL API ──────────────────────
    // const response = await fetch(`${API_BASE}/clients/${currentClientId}`, {
    //   method: 'PUT',
    //   headers: authHeaders(),
    //   body: JSON.stringify({ t24Version, etlVersion })
    // });
    // if (!response.ok) throw new Error('Failed to update versions');
    // ── END REAL API ────────────────────────────────

    // ── DUMMY ────────────────────────────────────────
    await delay(400);
    const client = allClients.find(c => c.id === currentClientId);
    if (client) { client.t24Version = t24Version; client.etlVersion = etlVersion; }
    // ── END DUMMY ────────────────────────────────────

    document.getElementById('detail-t24').textContent = t24Version;
    document.getElementById('detail-etl').textContent = etlVersion;
    cancelVersionEdit();
    showToast('Versions updated successfully.');
  } catch (err) {
    showToast('Failed to update versions: ' + err.message, true);
  }
}
