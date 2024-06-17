'use client';
import { useState, useEffect } from 'react';
import { getExpenses } from '../../app/firebase/firestoreService'; // Ajusta la ruta según tu estructura de archivos
import { Expense } from '../../components/types'; // Ajusta la ruta según tu estructura de archivos
import ExpenseList from '@/components/ExpenseList';
const Movements = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error('Failed to fetch expenses: ', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movimientos</h1>
      <ExpenseList expenses={expenses} onTogglePayed={(index) => {}} />
    </div>
  );
};

export default Movements;
