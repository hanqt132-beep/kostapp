import axios from 'axios';

// ─── Config ────────────────────────────────────────────────────────────────
const API_URL = 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 3000, // 3s timeout agar cepat failover ke local
});

// ─── Local Storage Keys ─────────────────────────────────────────────────────
const LS_USERS_KEY = 'kostapp_local_users';

// ─── Hardcoded Admin (aktif saat tanpa database) ────────────────────────────
// ⚠️  Ganti password setelah database terhubung!
const ADMIN_USER = {
  id: 'admin-001',
  name: 'Administrator',
  username: 'admin',
  contact: 'admin@kostapp.id',
  password: 'admin123',
  photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  role: 'admin' as const,
  nik: '',
  address: '',
  createdAt: new Date().toISOString(),
};

// ─── Helpers ────────────────────────────────────────────────────────────────
function uid(prefix = 'u') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function getLocalUsers(): typeof ADMIN_USER[] {
  try {
    return JSON.parse(localStorage.getItem(LS_USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveLocalUsers(users: typeof ADMIN_USER[]) {
  localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
}

function stripPassword<T extends { password?: string }>(user: T): Omit<T, 'password'> & { password: string } {
  return user as any; // return full object; caller hides password from UI
}

// ─── Check apakah backend tersedia ─────────────────────────────────────────
async function isBackendAvailable(): Promise<boolean> {
  try {
    await axios.get(`${API_URL}/health`, { timeout: 2000 });
    return true;
  } catch {
    return false;
  }
}

// ─── LOCAL AUTH ─────────────────────────────────────────────────────────────
function localLogin(identity: string, password: string) {
  const id = identity.trim().toLowerCase();

  // Cek admin hardcoded
  if (
    (id === ADMIN_USER.username ||
      id === ADMIN_USER.contact) &&
    password === ADMIN_USER.password
  ) {
    return { ...ADMIN_USER, lastLogin: new Date().toISOString() };
  }

  // Cek user yang sudah daftar di localStorage
  const users = getLocalUsers();
  const user = users.find(
    (u) =>
      (u.username.toLowerCase() === id ||
        u.contact.toLowerCase() === id) &&
      u.password === password
  );
  return user ? { ...user, lastLogin: new Date().toISOString() } : null;
}

function localRegister(userData: {
  name: string;
  username: string;
  contact: string;
  password: string;
  photo: string;
}) {
  const users = getLocalUsers();

  const duplicate = users.some(
    (u) =>
      u.username.toLowerCase() === userData.username.toLowerCase() ||
      u.contact.toLowerCase() === userData.contact.toLowerCase()
  );
  if (duplicate) return null;

  const newUser = {
    ...userData,
    id: uid('user'),
    role: 'user' as const,
    nik: '',
    address: '',
    createdAt: new Date().toISOString(),
  };
  saveLocalUsers([...users, newUser]);
  return newUser;
}

// ─── AUTH EXPORTS (digunakan oleh useStore) ─────────────────────────────────

/**
 * Login: coba backend dulu, fallback ke local jika tidak tersedia.
 */
export async function loginAPI(identity: string, password: string) {
  const online = await isBackendAvailable();

  if (online) {
    const res = await api.post('/auth/login', { identity, password });
    return res.data;
  }

  // Fallback local
  const user = localLogin(identity, password);
  if (!user) throw new Error('Kredensial salah');
  return user;
}

/**
 * Register: coba backend dulu, fallback ke local jika tidak tersedia.
 */
export async function registerAPI(userData: {
  name: string;
  username: string;
  contact: string;
  password: string;
  photo: string;
}) {
  const online = await isBackendAvailable();

  if (online) {
    const res = await api.post('/auth/register', userData);
    return res.data;
  }

  // Fallback local
  const user = localRegister(userData);
  if (!user) throw new Error('Username atau kontak sudah digunakan');
  return user;
}

// ─── KOSTS ──────────────────────────────────────────────────────────────────
export const getKostsAPI = async () => {
  const res = await api.get('/kosts');
  return res.data;
};

export const getKostByIdAPI = async (id: number) => {
  const res = await api.get(`/kosts/${id}`);
  return res.data;
};

// ─── TRANSACTIONS ────────────────────────────────────────────────────────────
export const initiateTransactionAPI = async (data: any) => {
  const res = await api.post('/transactions/initiate', data);
  return res.data;
};

export const updateTransactionStatusAPI = async (id: string, status: string, qrData?: string) => {
  const res = await api.put(`/transactions/${id}/status`, { status, qrData });
  return res.data;
};

export const completeTransactionAPI = async (id: string) => {
  const res = await api.post(`/transactions/${id}/complete`);
  return res.data;
};

export const getUserTransactionsAPI = async (userId: string) => {
  const res = await api.get(`/transactions/user/${userId}`);
  return res.data;
};

export const getUserBookingsAPI = async (userId: string) => {
  const res = await api.get(`/transactions/user/${userId}/bookings`);
  return res.data;
};
