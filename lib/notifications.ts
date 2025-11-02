// lib/notifications.ts
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  Unsubscribe,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";

const db = getFirestore();

export type NotificationPayload = Record<string, any>;
export type NotificationMeta = Record<string, any>;

export type NotificationRecord = {
  id: string;
  targetUid: string;
  type: string;
  read: boolean;
  payload: NotificationPayload;
  meta?: NotificationMeta;
  createdAt?: any;
};

export async function createNotification(
  targetUid: string,
  type: string,
  payload: NotificationPayload = {},
  meta: NotificationMeta = {}
): Promise<string> {
  if (!targetUid || !type) throw new Error("targetUid and type are required");
  const ref = await addDoc(collection(db, "notifications"), {
    targetUid,
    type,
    read: false,
    payload,
    meta,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function markNotificationRead(notificationId: string): Promise<void> {
  if (!notificationId) throw new Error("notificationId is required");
  const ref = doc(db, "notifications", notificationId);
  await updateDoc(ref, { read: true });
}

export async function markNotificationUnread(notificationId: string): Promise<void> {
  if (!notificationId) throw new Error("notificationId is required");
  const ref = doc(db, "notifications", notificationId);
  await updateDoc(ref, { read: false });
}

export async function deleteNotification(notificationId: string): Promise<void> {
  if (!notificationId) throw new Error("notificationId is required");
  const ref = doc(db, "notifications", notificationId);
  await deleteDoc(ref);
}

export async function fetchRecentNotificationsForUid(
  uid: string,
  limitCount = 25
): Promise<NotificationRecord[]> {
  if (!uid) return [];
  const q = query(
    collection(db, "notifications"),
    where("targetUid", "==", uid),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as DocumentData) })) as NotificationRecord[];
}

export async function fetchRecentNotificationsForCurrentUser(
  limitCount = 25
): Promise<NotificationRecord[]> {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return [];
  return fetchRecentNotificationsForUid(user.uid, limitCount);
}

export function listenToNotificationsForUid(
  uid: string,
  onUpdate: (items: NotificationRecord[]) => void,
  limitCount = 25
): Unsubscribe {
  const q = query(
    collection(db, "notifications"),
    where("targetUid", "==", uid),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  const unsub = onSnapshot(q, (snap: QuerySnapshot<DocumentData>) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as DocumentData) })) as NotificationRecord[];
    onUpdate(items);
  });
  return unsub;
}

export function listenToNotificationsForCurrentUser(
  onUpdate: (items: NotificationRecord[]) => void,
  limitCount = 25
): Unsubscribe | null {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return null;
  return listenToNotificationsForUid(user.uid, onUpdate, limitCount);
}

export async function markAllNotificationsReadForUid(uid: string): Promise<void> {
  if (!uid) return;
  const items = await fetchRecentNotificationsForUid(uid, 500);
  await Promise.all(items.map((n) => updateDoc(doc(db, "notifications", n.id), { read: true })));
}

export async function markAllNotificationsReadForCurrentUser(): Promise<void> {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return;
  await markAllNotificationsReadForUid(user.uid);
}
