import { db, auth } from './firebase';
import { doc, setDoc, getDoc, updateDoc, onSnapshot, collection, getDocs, query, orderBy, addDoc } from 'firebase/firestore';

// Save progress to LocalStorage for Guests
const saveProgressLocally = (topicId, data) => {
  const existing = JSON.parse(localStorage.getItem('guestProgress')) || {};
  existing[topicId] = { ...existing[topicId], ...data };
  localStorage.setItem('guestProgress', JSON.stringify(existing));
};

// Save progress to Firestore for Authenticated Users
const saveProgressToFirestore = async (userId, topicId, data) => {
  const docRef = doc(db, `progress/${userId}/topics`, topicId);
  await setDoc(docRef, data, { merge: true });
};

// Main save function
export const saveProgress = async (topicId, data) => {
  if (auth.currentUser) {
    await saveProgressToFirestore(auth.currentUser.uid, topicId, data);
  } else {
    saveProgressLocally(topicId, data);
  }
};

// --- USER STATS ---
export const getUserStats = async () => {
  if (auth.currentUser) {
    const docRef = doc(db, `users/${auth.currentUser.uid}/data`, 'stats');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data();
    }
  } else {
    const local = localStorage.getItem('guestStats');
    if (local) return JSON.parse(local);
  }
  return { topicsCompleted: 0, streakDays: 0, progressPercent: 0 };
};

export const updateUserStats = async (updates) => {
  if (auth.currentUser) {
    const docRef = doc(db, `users/${auth.currentUser.uid}/data`, 'stats');
    await setDoc(docRef, updates, { merge: true });
  } else {
    const current = JSON.parse(localStorage.getItem('guestStats') || '{"topicsCompleted":0,"streakDays":0,"progressPercent":0}');
    localStorage.setItem('guestStats', JSON.stringify({ ...current, ...updates }));
  }
};

export const incrementTopics = async () => {
  const current = await getUserStats();
  let newTopics = (current.topicsCompleted || 0) + 1;
  let newProgress = Math.min(100, Math.round((newTopics / 20) * 100)); // e.g. 20 topics to reach 100%
  await updateUserStats({ topicsCompleted: newTopics, progressPercent: newProgress, streakDays: current.streakDays || 1 });
};

// --- HISTORY ---
export const saveChatHistory = async (title) => {
  const chatData = { title, timestamp: new Date().toISOString() };
  if (auth.currentUser) {
    const colRef = collection(db, `users/${auth.currentUser.uid}/history`);
    await addDoc(colRef, chatData);
  } else {
    const savedChats = JSON.parse(localStorage.getItem('calp_recent_chats') || '[]');
    const newChat = { id: Date.now().toString(), ...chatData };
    localStorage.setItem('calp_recent_chats', JSON.stringify([newChat, ...savedChats]));
  }
};

export const getChatHistory = async () => {
  if (auth.currentUser) {
    const colRef = collection(db, `users/${auth.currentUser.uid}/history`);
    const q = query(colRef, orderBy('timestamp', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } else {
    return JSON.parse(localStorage.getItem('calp_recent_chats') || '[]');
  }
};

// Migrate data upon login
export const migrateGuestDataToFirestore = async (userId) => {
  // Migrate Progress
  const guestData = JSON.parse(localStorage.getItem('guestProgress'));
  if (guestData && Object.keys(guestData).length > 0) {
    for (const [topicId, data] of Object.entries(guestData)) {
      await saveProgressToFirestore(userId, topicId, data);
    }
    localStorage.removeItem('guestProgress');
  }

  // Migrate Stats
  const guestStats = JSON.parse(localStorage.getItem('guestStats'));
  if (guestStats) {
    const docRef = doc(db, `users/${userId}/data`, 'stats');
    await setDoc(docRef, guestStats, { merge: true });
    localStorage.removeItem('guestStats');
  }

  // Migrate History
  const guestHistory = JSON.parse(localStorage.getItem('calp_recent_chats'));
  if (guestHistory && guestHistory.length > 0) {
    const colRef = collection(db, `users/${userId}/history`);
    for (const chat of guestHistory) {
      await addDoc(colRef, { title: chat.title, timestamp: chat.timestamp || new Date().toISOString() });
    }
    localStorage.removeItem('calp_recent_chats');
  }
  
  localStorage.removeItem('isGuest');
};

// Listen to progress updates (Real-time)
export const listenToProgress = (userId, callback) => {
  const topicsRef = collection(db, `progress/${userId}/topics`);
  return onSnapshot(topicsRef, (snapshot) => {
    const progress = [];
    snapshot.forEach((doc) => {
      progress.push({ id: doc.id, ...doc.data() });
    });
    callback(progress);
  });
};
