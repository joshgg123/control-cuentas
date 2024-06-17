// firestoreService.ts
import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Expense } from '../../components/types';

const expensesCollection = collection(db, 'expenses');

export const addExpense = async (expense: Expense) => {
  await addDoc(expensesCollection, expense);
};

export const getExpenses = async (): Promise<Expense[]> => {
  const snapshot = await getDocs(expensesCollection);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as Omit<Expense, 'id'> // Casting para asegurar el tipo de datos
  }));
};

export const updateExpense = async (id: string, updatedExpense: Partial<Expense>) => {
  const expenseDoc = doc(db, 'expenses', id);
  await updateDoc(expenseDoc, updatedExpense);
};

export const deleteExpense = async (id: string) => {
  const expenseDoc = doc(db, 'expenses', id);
  await deleteDoc(expenseDoc);
};