import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import firebaseConfig from "../firebaseConfig";

// Initialize Firestore
const db = getFirestore(firebaseConfig.app);

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setTodos([]);
      setLoading(false);
      return;
    }

    // Reference to user's todos collection
    const todosRef = collection(db, "users", currentUser.uid, "todos");

    // Subscribe to todos changes
    const unsubscribe = onSnapshot(todosRef, (snapshot) => {
      const todosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTodos(todosData);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  // Add a new todo
  async function addTodo(title) {
    if (!currentUser) return;

    const newTodo = {
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const todoRef = doc(collection(db, "users", currentUser.uid, "todos"));
    await setDoc(todoRef, newTodo);
  }

  // Toggle completion status
  async function toggleTodo(id) {
    if (!currentUser) return;

    const todoRef = doc(db, "users", currentUser.uid, "todos", id);
    const todoSnap = await getDoc(todoRef);

    if (todoSnap.exists()) {
      await updateDoc(todoRef, {
        completed: !todoSnap.data().completed,
      });
    }
  }

  // Update todo title
  async function updateTodo(id, title) {
    if (!currentUser) return;

    const todoRef = doc(db, "users", currentUser.uid, "todos", id);
    await updateDoc(todoRef, { title });
  }

  // Delete a todo
  async function deleteTodo(id) {
    if (!currentUser) return;

    const todoRef = doc(db, "users", currentUser.uid, "todos", id);
    await deleteDoc(todoRef);
  }

  return {
    todos,
    loading,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
  };
}
