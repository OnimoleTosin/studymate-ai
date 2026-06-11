import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Note, Quiz, Summary } from "@/types";

// ── Notes ──────────────────────────────────────────────────────────────────
export async function createNote(userId: string, title: string, content: string) {
  return addDoc(collection(db, "notes"), {
    userId,
    title,
    content,
    createdAt: serverTimestamp(),
  });
}

export async function getUserNotes(userId: string): Promise<Note[]> {
  const q = query(
    collection(db, "notes"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Note));
}

export async function getNote(noteId: string): Promise<Note | null> {
  const snap = await getDoc(doc(db, "notes", noteId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Note;
}

export async function deleteNote(noteId: string) {
  return deleteDoc(doc(db, "notes", noteId));
}

// ── Summaries ──────────────────────────────────────────────────────────────
export async function saveSummary(userId: string, noteId: string, noteTitle: string, content: string) {
  return addDoc(collection(db, "summaries"), {
    userId,
    noteId,
    noteTitle,
    content,
    createdAt: serverTimestamp(),
  });
}

export async function getUserSummaries(userId: string): Promise<Summary[]> {
  const q = query(
    collection(db, "summaries"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Summary));
}

// ── Quizzes ────────────────────────────────────────────────────────────────
export async function saveQuiz(userId: string, noteId: string, noteTitle: string, content: string) {
  return addDoc(collection(db, "quizzes"), {
    userId,
    noteId,
    noteTitle,
    content,
    createdAt: serverTimestamp(),
  });
}

export async function getUserQuizzes(userId: string): Promise<Quiz[]> {
  const q = query(
    collection(db, "quizzes"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Quiz));
}
