// lib/firestore.ts
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  writeBatch,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

/* ----------------------- Users ----------------------- */
export async function getUserDoc(uid: string) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as any) : null;
}
export async function upsertUserDoc(uid: string, payload: Record<string, any>) {
  await setDoc(doc(db, "users", uid), { ...payload, updatedAt: serverTimestamp() }, { merge: true });
}

/* --------------------- Internships -------------------- */
export async function createInternship(payload: Record<string, any>) {
  const ref = await addDoc(collection(db, "internships"), { ...payload, createdAt: serverTimestamp() });
  return ref.id;
}
export async function getInternship(id: string) {
  const snap = await getDoc(doc(db, "internships", id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as any) : null;
}
export async function listInternshipsByUser(uid: string) {
  const q = query(collection(db, "internships"), where("ownerUid", "==", uid), orderBy("createdAt", "desc"));
  const snaps = await getDocs(q);
  return snaps.docs.map((d) => ({ id: d.id, ...d.data() } as any));
}
export async function listInternshipsByTrainer(trainerUid: string) {
  const q = query(collection(db, "internships"), where("trainerUid", "==", trainerUid), orderBy("createdAt", "desc"));
  const snaps = await getDocs(q);
  return snaps.docs.map((d) => ({ id: d.id, ...d.data() } as any));
}
export async function updateInternship(id: string, patch: Record<string, any>) {
  await updateDoc(doc(db, "internships", id), { ...patch, updatedAt: serverTimestamp() });
}
export async function deleteInternship(id: string) {
  await deleteDoc(doc(db, "internships", id));
}

/* ------------------- Training Sessions ------------------ */
export async function createTrainingSession(payload: Record<string, any>) {
  const ref = await addDoc(collection(db, "trainingSessions"), { ...payload, createdAt: serverTimestamp() });
  return ref.id;
}
export async function getTrainingSession(id: string) {
  const snap = await getDoc(doc(db, "trainingSessions", id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as any) : null;
}
export async function listTrainingByUser(uid: string) {
  const q = query(collection(db, "trainingSessions"), where("ownerUid", "==", uid), orderBy("createdAt", "desc"));
  const snaps = await getDocs(q);
  return snaps.docs.map((d) => ({ id: d.id, ...d.data() } as any));
}
export async function listTrainingByTrainer(trainerUid: string) {
  const q = query(collection(db, "trainingSessions"), where("trainerUid", "==", trainerUid), orderBy("createdAt", "desc"));
  const snaps = await getDocs(q);
  return snaps.docs.map((d) => ({ id: d.id, ...d.data() } as any));
}
export async function updateTrainingSession(id: string, patch: Record<string, any>) {
  await updateDoc(doc(db, "trainingSessions", id), { ...patch, updatedAt: serverTimestamp() });
}
export async function deleteTrainingSession(id: string) {
  await deleteDoc(doc(db, "trainingSessions", id));
}

/* ------------------ Counselling Sessions ----------------- */
export async function createCounsellingSession(payload: Record<string, any>) {
  const ref = await addDoc(collection(db, "counsellingSessions"), { ...payload, createdAt: serverTimestamp() });
  return ref.id;
}
export async function getCounsellingSession(id: string) {
  const snap = await getDoc(doc(db, "counsellingSessions", id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as any) : null;
}
export async function listCounsellingByUser(uid: string) {
  const q = query(collection(db, "counsellingSessions"), where("ownerUid", "==", uid), orderBy("createdAt", "desc"));
  const snaps = await getDocs(q);
  return snaps.docs.map((d) => ({ id: d.id, ...d.data() } as any));
}
export async function listCounsellingByTrainer(trainerUid: string) {
  const q = query(collection(db, "counsellingSessions"), where("trainerUid", "==", trainerUid), orderBy("createdAt", "desc"));
  const snaps = await getDocs(q);
  return snaps.docs.map((d) => ({ id: d.id, ...d.data() } as any));
}
export async function updateCounsellingSession(id: string, patch: Record<string, any>) {
  await updateDoc(doc(db, "counsellingSessions", id), { ...patch, updatedAt: serverTimestamp() });
}
export async function deleteCounsellingSession(id: string) {
  await deleteDoc(doc(db, "counsellingSessions", id));
}

/* --------------------- Utilities --------------------- */
/**
 * Batch delete a collection of doc ids (use carefully)
 */
export async function batchDelete(collectionPath: string, ids: string[]) {
  if (!ids.length) return;
  const batch = writeBatch(db);
  ids.forEach((id) => batch.delete(doc(db, collectionPath, id)));
  await batch.commit();
}

/* --------------------- Types / Helpers --------------------- */
export type TimestampLike = Timestamp | { seconds: number; nanoseconds: number } | string | number;