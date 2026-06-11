import { Timestamp } from "firebase/firestore";

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Timestamp;
}

export interface Summary {
  id: string;
  userId: string;
  noteId: string;
  noteTitle: string;
  content: string;
  createdAt: Timestamp;
}

export interface Quiz {
  id: string;
  userId: string;
  noteId: string;
  noteTitle: string;
  content: string;
  createdAt: Timestamp;
}
