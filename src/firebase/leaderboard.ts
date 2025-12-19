import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firebaseConfig } from "./config";
import type { PendingScore } from "../types";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getDeviceId(): string {
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = "device_" + crypto.randomUUID();
    localStorage.setItem("deviceId", deviceId);
  }
  return deviceId;
}

export const DEVICE_ID = getDeviceId();

export async function fetchLeaderboard(difficulty: string): Promise<void> {
  const leaderboardList = document.getElementById("leaderboardList");
  if (!leaderboardList) return;

  leaderboardList.innerHTML = "<p>Loading...</p>";

  try {
    const scoresRef = collection(db, `leaderboard_${difficulty}`);
    const q = query(scoresRef, orderBy("time", "asc"), limit(10));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      leaderboardList.innerHTML = "<p>No scores yet. Be the first!</p>";
      return;
    }

    leaderboardList.innerHTML = "";
    let rank = 1;
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const item = document.createElement("div");
      item.className = "leaderboard-item";
      item.innerHTML = `
        <span class="rank">#${rank}</span>
        <span class="name">${data.name}</span>
        <span class="time">${data.time}s</span>
      `;
      leaderboardList.appendChild(item);
      rank++;
    });
  } catch (e) {
    console.error("Error fetching leaderboard:", e);
    leaderboardList.innerHTML = "<p>Error loading scores.</p>";
  }
}

export async function submitScore(
  pendingScore: PendingScore,
  name: string,
  onSuccess: () => void
): Promise<void> {
  const collectionName = `leaderboard_${pendingScore.difficulty}`;

  try {
    const scoresRef = collection(db, collectionName);
    const q = query(scoresRef, orderBy("time", "asc"));
    const snapshot = await getDocs(q);

    let existingDocId: string | null = null;
    let existingDocTime: number = Infinity;

    for (const docSnap of snapshot.docs) {
      if (docSnap.data().deviceId === DEVICE_ID) {
        existingDocId = docSnap.id;
        existingDocTime = docSnap.data().time;
        break;
      }
    }

    if (existingDocId) {
      if (pendingScore.time < existingDocTime) {
        const docToUpdate = doc(db, collectionName, existingDocId);
        await updateDoc(docToUpdate, {
          name: name,
          time: pendingScore.time,
          timestamp: Date.now(),
        });
      } else {
        const docToUpdate = doc(db, collectionName, existingDocId);
        await updateDoc(docToUpdate, { name: name });
      }
    } else {
      await addDoc(collection(db, collectionName), {
        deviceId: DEVICE_ID,
        name: name,
        time: pendingScore.time,
        timestamp: Date.now(),
      });
    }

    onSuccess();
  } catch (e) {
    console.error("Error submitting score:", e);
    alert("Failed to submit score. Please try again.");
  }
}
